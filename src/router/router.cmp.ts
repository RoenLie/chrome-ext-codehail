import { css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { getAnimation } from '../helpers/animate-registry.js';
import { Router } from './router.js';
import { generateRoutes } from './routes.js';

/* ------------------------------------------------- */

export const router = new Router();

/* ------------------------------------------------- */

@customElement('ch-router')
export class CHRouterCmp extends LitElement {

	public override connectedCallback() {
		super.connectedCallback();

		router.setOutlet(this);
		router.setRoutes(generateRoutes(this));
	}

	public override disconnectedCallback() {
		super.disconnectedCallback();
	}

	public static override styles = [
		css`
		:host {
			position: relative;
			display: flex;
			flex-flow: column nowrap;
			height: 100%;
			overflow:hidden;
		}
		`,
	];

}
