import { animateTo, stopAnimations } from '../helpers/animate.js';
import type { ElementAnimation } from '../helpers/animate-registry.js';
import { clone } from '../helpers/clone.js';
import { createPromiseResolver } from '../helpers/createPromise.js';
import { storageHandler } from '../helpers/storageHandler.js';

/* ------------------------------------------------- */

interface Route {
	path: string;
	name?: string;
	component?: string;
	action?: () => Promise<void | undefined | typeof HTMLElement>;
	animation?: { show: ElementAnimation; hide: ElementAnimation };
	redirect?: string;
	children?: Route[];
}

interface InternalRoute {
	path: Route['path'][];
	name: Route['name'];
	component: Route['component'][];
	action: Route['action'][];
	animation: Route['animation'][];
	redirect: Route['redirect'][];
}

type RouteElement = Element & { __routeAnimation?: Route['animation']; };


/* ------------------------------------------------- */

export class RouteHistory {

	protected history: string[] = [];

	public getRoute() {
		return storageHandler.getItem('currentRoute', '');
	}

	public setRoute(route: string) {
		storageHandler.setItem('currentRoute', route);
		this.appendHistory(route);

		return route;
	}

	public appendHistory(route: string) {
		const history = storageHandler.getItem<string[]>('routeHistory', []);
		history.push(route);

		storageHandler.setItem('routeHistory', history);
	}

	public clearHistory() {
		this.history.length = 0;
	}

}

/* ------------------------------------------------- */

export class Router {

	protected outlet: Element;
	protected routes: InternalRoute[];
	protected history: RouteHistory = new RouteHistory();
	protected baseUrl = location.origin;
	protected updateComplete = Promise.resolve(true);


	constructor() { }


	public setOutlet(element: Element) {
		this.outlet = element;
		if (element.shadowRoot) {
			const slot = document.createElement('slot');
			element.shadowRoot?.appendChild(slot);
		}

		if (this.routes)
			this.initialize();
	}

	public setRoutes(routes: Route[]) {
		this.routes = this.parseRoutes(routes);

		if (this.outlet)
			this.initialize();
	}

	protected initialize() {
		this.history.clearHistory();
		this.navigate(this.location());
	}

	public location() {
		return this.history.getRoute();
	}

	public async navigate(route: string) {
		await this.updateComplete;

		const [ promise, resolver ] = createPromiseResolver<boolean>();
		this.updateComplete = promise;

		/* find the best matching route */
		const futureRoute = this.getMatchingRoute(route);

		/* if a match was not found, do nothing */
		if (!futureRoute)
			return resolver(true);

		/* Generate the component chain for the matching route */
		const componentChain: RouteElement[] = [];
		for (let i = 0; i < futureRoute.component.length; i++) {
			const component = futureRoute.component[i];

			let actionResult = await futureRoute.action[i]?.();

			let el: RouteElement | undefined;
			if (actionResult)
				el = new actionResult();

			el = !el ? document.createElement(component ?? 'div') : el;
			el.__routeAnimation = futureRoute.animation[i];

			componentChain.push(el);
		}

		/* Redirect to the last redirect if there is one. */
		const whereToRedirect = futureRoute.redirect.at(-1);
		if (whereToRedirect) {
			this.navigate(whereToRedirect);

			return resolver(true);
		}

		const replaceRouteNodes = async (parent: Element, depth = 0) => {
			let nodeToInsert = componentChain[depth];
			if (!nodeToInsert)
				return await this.reversedRouteNodeRemoval(parent as RouteElement);

			let childElements = Array.from(parent.children) as RouteElement[];
			let invalidNodes = childElements.filter(el => el.tagName !== nodeToInsert?.tagName);
			for (const el of invalidNodes)
				await this.reversedRouteNodeRemoval(el, true);

			depth ++;

			if (parent.firstElementChild) {
				await replaceRouteNodes(parent.firstElementChild, depth);
			}
			else {
				parent.insertAdjacentElement('afterbegin', nodeToInsert);

				let anim = nodeToInsert?.__routeAnimation?.show;
				if (anim) {
					await stopAnimations(nodeToInsert);
					await animateTo(nodeToInsert, anim.keyframes, anim.options);
				}

				await replaceRouteNodes(nodeToInsert, depth);
			}
		};

		replaceRouteNodes(this.outlet);

		await this.beforeNavigate();
		this.history.setRoute(route);
		await this.afterNavigate();

		resolver(true);

		return route;
	}

	protected async beforeNavigate() {
		//console.log('before set route');
	}

	protected async afterNavigate() {
		//console.log('after set route');

		document.head.querySelector('title')!.innerText = this.location();
	}

	protected parseRoutes(
		routes: Route[] | undefined,
		parsedRoutes: InternalRoute[] = [],
		route: InternalRoute = {
			path:      [],
			name:      undefined,
			component: [],
			action:    [],
			animation: [],
			redirect:  [],
		},
	) {
		if (!routes?.length)
			return parsedRoutes;

		routes.forEach(r => {
			const clonedRoute = clone(route);

			clonedRoute.name = r.name;
			clonedRoute.path.push(r.path);
			clonedRoute.redirect.push(r.redirect);
			clonedRoute.component.push(r.component);
			clonedRoute.action.push(r.action);
			clonedRoute.animation.push(r.animation);

			parsedRoutes.push(clonedRoute);

			this.parseRoutes(r.children, parsedRoutes, clonedRoute);
		});

		return parsedRoutes;
	}

	protected getMatchingRoute(route: string) {
		const match = this.routes.find(r => {
			const pattern = new URLPattern({
				pathname: r.path.join('/'),
				baseURL:  this.baseUrl,
			});

			return pattern.test(route, this.baseUrl);
		});

		return match;
	}

	protected async removeRouteElement(el: RouteElement) {
		let anim = el.__routeAnimation?.hide;
		if (anim) {
			await stopAnimations(el);
			await animateTo(el, anim.keyframes, anim.options);
		}

		el.remove();
	}

	protected async reversedRouteNodeRemoval(node: RouteElement, removeParent?: boolean) {
		while (node.firstChild) {
			let child = node.firstChild as RouteElement;
			await this.reversedRouteNodeRemoval(child);
			await this.removeRouteElement(child);
		}

		if (removeParent)
			await this.removeRouteElement(node);
	}

}
