import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

/* ------------------------------------------------- */

@customElement('ch-second-page')
export class CHSecondPageCmp extends LitElement {

	//#region state
	//#endregion state


	//#region properties
	//#endregion properties


	//#region logic
	//#endregion logic


	//#region controllers
	//#endregion controllers


	//#region lifecycle
	public override connectedCallback() {
		super.connectedCallback();

		console.log('second page connected');
	}

	public override disconnectedCallback() {
		super.disconnectedCallback();
		console.log('second page disconnected');
	}
	//#endregion lifecycle


	//#region template
	public override render() {
		return html`
		<div>
			I AM THE SECOND PAGE
		</div>
		`;
	}
	//#endregion template


	//#region style
	public static override styles = [
		css`
		:host {

		}
		`,
	];
	//#endregion style

}
