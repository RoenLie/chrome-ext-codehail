import loader from '@monaco-editor/loader';
import { css, html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createRef, Ref, ref } from 'lit/directives/ref.js';
import { type editor } from 'monaco-editor';

/* ------------------------------------------------- */

loader.config({
	paths: {
		vs: '../../editor/node_modules/monaco-editor/min/vs',
	},
});

const monaco = loader.init();

/* ------------------------------------------------- */

@customElement('ch-source-editor')
export class CHSourceEditorCmp extends LitElement {

	@property({ type: String })
	public set source(v: string) {
		this._source = v;
	}

	public get source() {
		return this.editor?.getValue();
	}

	@property({ type: Number, attribute: 'max-height' }) public maxHeight = 500;
	@property({ type: Boolean }) public immediate: boolean;
	protected _source = '';

	private editor: editor.IStandaloneCodeEditor;
	private editorRef: Ref<HTMLDivElement> = createRef();

	public override connectedCallback() {
		super.connectedCallback();
		window.addEventListener('resize', this.updateConstraints);
	}

	public override disconnectedCallback() {
		super.disconnectedCallback();
		window.removeEventListener('resize', this.updateConstraints);
		this.editor.dispose();
	}

	public override async firstUpdated() {
		this.editor = (await monaco).editor.create(this.editorRef.value!, {
			value:              this.source,
			scrollbar:          { alwaysConsumeMouseWheel: false },
			language:           'typescript',
			wordWrap:           'on',
			wrappingStrategy:   'advanced',
			minimap:            { enabled: false },
			overviewRulerLanes: 3,
			fontFamily:         'Cascadia Code',
			fontLigatures:      true,
			theme:              'vs-dark',
			guides:             { bracketPairs: true },
			foldingStrategy:    'indentation',
		});

		this.editor.onDidContentSizeChange(() => this.updateHeight());
		this.editor.onDidChangeModelContent(() => this.execute());
		this.updateHeight();
	}

	protected updateConstraints = () => {
		this.updateHeight();
	};

	protected updateHeight() {
		// Based on: https://github.com/microsoft/monaco-editor/issues/794#issuecomment-688959283
		const contentHeight = this.maxHeight;

		const editorWidth = this.editorRef.value!.clientWidth;
		this.editorRef.value!.style.height = `${ contentHeight }px`;
		this.editor.layout({ width: editorWidth, height: contentHeight });
	}
	//protected updateHeight() {
	//	// Based on: https://github.com/microsoft/monaco-editor/issues/794#issuecomment-688959283
	//	const contentHeight = Math.min(this.maxHeight, this.editor.getContentHeight());

	//	const editorWidth = this.editorRef.value!.clientWidth;
	//	this.editorRef.value!.style.height = `${ contentHeight }px`;
	//	this.editor.layout({ width: editorWidth, height: contentHeight });
	//}

	private async execute(force = false) {
		//const js = unpkgReplace(this.editor.getValue());
		//const encodedJs = encodeURIComponent(js);
		//const dataUri = `data:text/javascript;charset=utf-8,${ encodedJs }`;
		//try {
		//	this.content = (await import(/* @vite-ignore */ dataUri)).default;
		//}
		//catch (error) {
		//	console.warn('Import failed. Reason:', error);
		//	if (force === true)
		//		this.content = html`${ error }`;
		//}

		//const newScript = this.shadowRoot!.querySelector<HTMLScriptElement>('#script')!;
		//newScript.textContent = this.editor.getValue();
		//this.executeScript(newScript);

		this.requestUpdate();
	}


	public override render() {
		return html`
		<link
			rel="stylesheet"
			type="text/css"
			data-name="vs/editor/editor.main"
			href="styles/editor.main.css"
		></link>

		<div class="editor-wrapper">
			<div class="editor" ${ ref(this.editorRef) }></div>
		</div>
		`;
	}

	public static override styles = [
		css`
		div {
			box-sizing: border-box;
			margin: 0;
			padding: 0;
		}
		:host {
			display: grid;
			padding: 8px;
			gap: 8px;
		}
		.editor-wrapper {
			border-radius: 4px;
			display: grid;
			padding: 8px;
			border: 1px solid var(--docs-primary-container);
			box-shadow: 0px 0px 2px var(--docs-primary-container);
		}
		.editor {
			overflow: hidden;
			display: grid;
		}
		.editor .monaco-editor,
		.editor .overflow-guard {
			border-radius: 4px;
		}
		`,
	];

}

declare global {
	interface HTMLElementTagNameMap {
		'ch-source-editor': CHSourceEditorCmp;
	}
}
