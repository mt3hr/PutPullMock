import { serializable } from "@/serializable/serializable";
import HTMLTagDataBase, { GenerateHTMLOptions } from "./HTMLTagDataBase";

@serializable
export default class H6TagData extends HTMLTagDataBase {
    text = "見出し6"
    constructor() {
        super()
        this.tagname = "h6"
        this.focus_property_name = "text"
    }
    override generate_html(options: GenerateHTMLOptions, indent: string): string {
        let html = ""
        html += indent
        html += "<h6"
        if (options.export_id) html += " id=\"" + this.tagid + "\""
        if (this.tagclass != "") html += " class=\"" + this.tagclass + "\""
        html += ">" + this.text + "</h6>"
        return html
    }
    override to_string(): string {
        return this.text
    }
    override clone(): H6TagData {
        const c = new H6TagData()
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
        c.text = this.text
        return c
    }
}