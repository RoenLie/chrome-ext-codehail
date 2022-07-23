import { getAnimation, setDefaultAnimation } from '../helpers/animate-registry.js';

/* ------------------------------------------------- */

export const generateRoutes = (el: Element) => {
	return [
		{
			path:      '',
			redirect:  '/first',
			component: 'ch-layout',
			action:    async () => { await import('../pages/layout.cmp.js'); },
			children:  [
				{
					name:      'firstPage',
					path:      'first',
					component: 'ch-first-page',
					animation: {
						show: getAnimation(el, 'route.show'),
						hide: getAnimation(el, 'route.hide'),
					},
					action:   async () => { await import('../pages/firstPage.js'); },
					children: [
						{
							name:      'secondPage',
							path:      'second',
							component: 'ch-second-page',
							animation: {
								show: getAnimation(el, 'route.show'),
								hide: getAnimation(el, 'route.hide'),
							},
							action: async () => { await import('../pages/secondPage.js'); },
						},
					],
				},
				{
					name:      'options',
					path:      'options',
					component: 'ch-options-page',
					animation: {
						show: getAnimation(el, 'route.show'),
						hide: getAnimation(el, 'route.hide'),
					},
					action: async () => { await import('../pages/options.page.js'); },
				},
			],
		},
		{
			path:     '(.*)',
			redirect: '/first',
		},
	];
};


/* ------------------------------------------------- */

setDefaultAnimation('route.show', {
	keyframes: [
		{ opacity: 0 },
		{ opacity: 1 },
	],
	options: { duration: 200, easing: 'linear' },
});

setDefaultAnimation('route.hide', {
	keyframes: [
		{ opacity: 1 },
		{ opacity: 0 },
	],
	options: { duration: 200, easing: 'linear' },
});
