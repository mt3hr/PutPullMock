import HTMLTagDataBase from "./HTMLTagDataBase";

export default class TextAreaTagData extends HTMLTagDataBase {
    autofocus = false
    cols = ""
    disabled = false
    form = ""
    maxlength = ""
    name = ""
    placeholder = ""
    readonly = false
    required = false
    rows = ""
    wrap = ""
    constructor() {
        super()
        this.tagname = "textarea"
    }
    override generate_html(print_id_for_css: boolean): string {
        // TODO 
        return ""
    }
}