import HTMLTagDataBase, { PositionStyle } from "@/html_tagdata/HTMLTagDataBase";
import { Vue } from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator"

export default class HTMLTagViewBase extends Vue {
    @Prop({ require: true }) tagdata: HTMLTagDataBase
    @Prop({ require: true }) tagdatas_root: Array<HTMLTagDataBase>
    @Prop() show_border: boolean
    position_css: string
    overlay_style: any = {}
    wrap_style: any = {}

    @Watch('tagdata')
    update_wrap_style() {
        this.$nextTick(() => {
            const wrap_style: any = {
                position: "relative",
                display: "inline-block",
                width: document.getElementById(this.tagdata.tagid).getBoundingClientRect().width,
                height: document.getElementById(this.tagdata.tagid).getBoundingClientRect().height,
            }
            this.wrap_style = wrap_style
            this.$emit("updated_wrap_style", this.wrap_style)
        })
    }

    created() {
        this.update_position()
        this.$nextTick(() => {
            this.update_overlay_style()
        })
    }

    @Watch('tagdata')
    update_overlay_style() {
        const element = document.getElementById(this.tagdata.tagid)
        let tagx = 0
        let tagy = 0
        let tagheight = 0
        let tagwidth = 0
        let borderleftwidth: any
        let borderrightwidth: any
        let bordertopwidth: any
        let borderbottomwidth: any
        let marginleft: any
        let marginright: any
        let margintop: any
        let marginbottom: any
        let paddingleft: any
        let paddingright: any
        let paddingtop: any
        let paddingbottom: any

        if (element) {
            tagwidth = element.getBoundingClientRect().width
            tagheight = element.getBoundingClientRect().height
            tagy = -tagheight
            tagx = 0
            borderleftwidth = element.style.borderLeftWidth
            borderrightwidth = element.style.borderRightWidth
            bordertopwidth = element.style.borderTopWidth
            borderbottomwidth = element.style.borderBottomWidth
            marginleft = element.style.marginLeft
            marginright = element.style.marginRight
            margintop = element.style.marginTop
            marginbottom = element.style.marginBottom
            paddingleft = element.style.paddingLeft
            paddingright = element.style.paddingRight
            paddingtop = element.style.paddingTop
            paddingbottom = element.style.paddingBottom
        }

        const overlay_style: any = {}
        overlay_style.display = "block"
        if (this.tagdata.position_style == PositionStyle.Absolute) {
            overlay_style.position = "relative"
            overlay_style.left = this.tagdata.position_x + "px"
            overlay_style.top = this.tagdata.position_y + "px"
            overlay_style.width = tagwidth + "px"
            overlay_style.height = tagheight + "px"
            overlay_style.borderLeftWidth = borderleftwidth
            overlay_style.borderRightWidth = borderrightwidth
            overlay_style.borderTopWidth = bordertopwidth
            overlay_style.borderBottomWidth = borderbottomwidth
            overlay_style.marginLeft = marginleft
            overlay_style.marginRight = marginright
            overlay_style.marginTop = margintop
            overlay_style.marginBottom = marginbottom
            overlay_style.paddingLeft = paddingleft
            overlay_style.paddingRight = paddingright
            overlay_style.paddingTop = paddingtop
            overlay_style.paddingBottom = paddingbottom
            overlay_style["z-index"] = element.style.zIndex + 1
            overlay_style["background-color"] = "rgba(0, 0, 0, 0)"
        } else {
            overlay_style.position = "relative"
            overlay_style.left = tagx + "px"
            overlay_style.top = tagy + "px"
            overlay_style.width = tagwidth + "px"
            overlay_style.height = tagheight + "px"
            overlay_style.borderLeftWidth = borderleftwidth
            overlay_style.borderRightWidth = borderrightwidth
            overlay_style.borderTopWidth = bordertopwidth
            overlay_style.borderBottomWidth = borderbottomwidth
            overlay_style.marginLeft = marginleft
            overlay_style.marginRight = marginright
            overlay_style.marginTop = margintop
            overlay_style.marginBottom = marginbottom
            overlay_style.paddingLeft = paddingleft
            overlay_style.paddingRight = paddingright
            overlay_style.paddingTop = paddingtop
            overlay_style.paddingBottom = paddingbottom
            overlay_style["z-index"] = element.style.zIndex + 1
            overlay_style["background-color"] = "rgba(0, 0, 0, 0)"
        }
        this.overlay_style = overlay_style
    }

    @Watch('show_border')
    @Watch('tagdata')
    update_position() {
        const style: any = {}
        if (this.tagdata.position_style == PositionStyle.Absolute) {
            style.position = "absolute"
            style.left = this.tagdata.position_x + "px"
            style.top = this.tagdata.position_y + "px"
            style.scale = this.tagdata.scale
        }
        if (this.show_border) {
            style.border = "solid 2px black"
            style["background-color"] = "snow"
        }
        this.position_css = style
    }

    can_drop(move_tagid: string, target_tagdata: HTMLTagDataBase): boolean {
        //TODO なんかおかしい
        if (move_tagid == target_tagdata.tagid) {
            return false
        }

        let walk_tagdatas = function (tagdatas: Array<HTMLTagDataBase>): boolean { return false }
        walk_tagdatas = function (tagdatas: Array<HTMLTagDataBase>): boolean {
            for (let i = 0; i < tagdatas.length; i++) {
                if (move_tagid == tagdatas[i].tagid) {
                    return true
                }
                if (walk_tagdatas(tagdatas[i].child_tagdatas)) {
                    return true
                }
            }
            return false
        }
        const exists_in_children = walk_tagdatas(target_tagdata.child_tagdatas)
        return !exists_in_children
    }
}