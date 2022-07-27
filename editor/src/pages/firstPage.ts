import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

/* ------------------------------------------------- */

@customElement('ch-first-page')
export class CHFirstPageCmp extends LitElement {


	//#region state
	//#endregion state


	//#region properties
	//#endregion properties


	//#region logic
	protected logLocation() {
		console.log(location);
	}
	//#endregion logic


	//#region controllers
	//#endregion controllers


	//#region lifecycle
	public override connectedCallback() {
		super.connectedCallback();

		console.log('first page connected');
	}

	public override disconnectedCallback() {
		super.disconnectedCallback();
		console.log('first page disconnected');
	}
	//#endregion lifecycle


	//#region template
	public override render() {
		return html`
		<div>
			I AM THE FIRST PAGE
		</div>
		<slot></slot>
		`;
	}
	//#endregion template


	//#region style
	public static override styles = [
		css`
		:host {
			background-color: black;
			color: white;
		}
		`,
	];
	//#endregion style

}
