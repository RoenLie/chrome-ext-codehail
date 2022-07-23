import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import { router } from '../router/router.cmp.js';

/* ------------------------------------------------- */

@customElement('ch-layout')
export class CHLayoutCmp extends LitElement {

	public override async connectedCallback() {
		super.connectedCallback();
	}

	public override render() {
		return html`
		<nav class="nav">
			<div @click=${ () => { router.navigate('/first'); } }>PAGE 1</div>
			<div @click=${ () => { router.navigate('/first/second'); } }>PAGE 2</div>
			<div @click=${ () => { router.navigate('/options'); } }>PAGE 3</div>
		</nav>

		<div class="divider"></div>

		<slot></slot>
		`;
	}

	public static override styles = [
		css`
		:host {
			display: grid;
			height: 100%;
			grid-template-columns: 50px auto 1fr;
			grid-template-rows: 1fr;
		}
		.nav {
			display: flex;
			flex-flow: column nowrap;
			gap: 4px;
		}
		.nav > * {
			position: relative;
			cursor: pointer;
			box-shadow: 0 0 2px rgba(0,0,0,0.5);
			padding: 8px;
		}
		.nav > *:hover::after {
			content: '';
			inset: 0;
			position: absolute;
			background-color: rgba(0,0,0,0.5);
		}
		.divider {
			width: 1px;
			background-color: whitesmoke;
		}
		`,
	];

}
