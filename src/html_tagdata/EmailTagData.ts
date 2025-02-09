import { serializable } from "@/serializable/serializable";
import HTMLTagDataBase, { GenerateHTMLOptions } from "./HTMLTagDataBase";
import { LabelType } from "./LabelType";

@serializable
export default class EmailTagData extends HTMLTagDataBase {
    name = ""
    value = ""
    size = ""
    maxlength = ""
    autocomplete = ""
    multiple = false
    pattern = ""
    placeholder = ""
    readonly = false
    required = false
    label_type: LabelType = LabelType.None
    label = ""
    constructor() {
        super()
        this.tagname = "email"
        this.focus_property_name = "placeholder"
    }
    override generate_html(options: GenerateHTMLOptions, indent: string): string {
        let html = ""
        html += indent
        if (this.label_type != LabelType.None) html += "<label>"
        if (this.label_type == LabelType.Before) html += this.label
        html += "<input type=\"email\""
        if (options.export_id) html += " id=\"" + this.tagid + "\""
        if (this.tagclass != "") html += " class=\"" + this.tagclass + "\""
        if (this.name != "") html += " name=\"" + this.name + "\""
        if (this.value != "") html += " value=\"" + this.value + "\""
        if (this.maxlength != "") html += " maxlength=\"" + this.maxlength + "\""
        if (this.autocomplete) html += " autocomplete=\"" + this.autocomplete + "\""
        if (this.multiple) html += " multiple"
        if (this.pattern) html += " pattern=\"" + this.pattern + "\""
        if (this.placeholder != "") html += " placeholder=\"" + this.placeholder + "\""
        if (this.readonly) html += " readonly"
        if (this.required) html += " required"
        html += ">"
        if (this.label_type == LabelType.After) html += this.label
        if (this.label_type != LabelType.None) html += "</label>"
        return html
    }
    override to_string(): string {
        return this.name
    }
    override clone(): EmailTagData {
        const c = new EmailTagData()
        c.child_tagdatas = new Array<HTMLTagDataBase>()
        this.child_tagdatas.forEach((child_tagdata) => { c.child_tagdatas.push(child_tagdata.clone()) })
        c.has_child_tag = this.has_child_tag
        c.tagname = this.tagname
        c.tagid = this.tagid
        c.tagclass = this.tagclass
        c.position_x = this.position_x
        c.position_y = this.position_y
        c.scale = this.scale
        c.position_style = this.position_style
        c.selected_this_tag = this.selected_this_tag
        c.focus_property_name = this.focus_property_name
        c.name = this.name
        c.value = this.value
        c.size = this.size
        c.maxlength = this.maxlength
        c.autocomplete = this.autocomplete
        c.multiple = this.multiple
        c.pattern = this.pattern
        c.placeholder = this.placeholder
        c.readonly = this.readonly
        c.required = this.required
        c.label = this.label
        c.label_type = this.label_type
        return c
    }
}