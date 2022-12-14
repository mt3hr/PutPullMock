import { serializable } from "@/serializable/serializable";
import HTMLTagDataBase, { GenerateHTMLOptions } from "./HTMLTagDataBase";

@serializable
export default class SubmitTagData extends HTMLTagDataBase {
    name = ""
    value = ""
    formaction = ""
    formenctype = ""
    formmethod = ""
    formnovalidate = false
    formtarget = ""
    constructor() {
        super()
        this.tagname = "submit"
    }
    override generate_html(options: GenerateHTMLOptions, indent: string): string {
        let html = ""
        html += indent
        html += "<input type=\"submit\""
        if (options.export_id) html += " id=\"" + this.tagid + "\""
        if (this.tagclass != "") html += " class=\"" + this.tagclass + "\""
        if (this.name != "") html += " name=\"" + this.name + "\""
        if (this.value != "") html += " value=\"" + this.value + "\""
        if (this.formaction != "") html += " formaction=\"" + this.formaction + "\""
        if (this.formenctype != "") html += " formenctype=\"" + this.formenctype + "\""
        if (this.formmethod != "") html += " formmethod=\"" + this.formmethod + "\""
        if (this.formnovalidate) html += " formnovalidate=\"" + this.formnovalidate + "\""
        if (this.formtarget != "") html += " formtarget=\"" + this.formtarget + "\""
        html += ">"
        return html
    }
override to_string(): string {
        return this.value
    }}