<template>
    <v-container>
        <v-row class="ppmk_row">
            <v-col cols="auto">
                <h1>PutPullMock</h1>
            </v-col>
            <v-spacer />
            <v-col cols="auto">
                <v-checkbox class="checkbox mx-3" v-model="show_border" :label="'境界を表示'" />
            </v-col>
            <v-btn icon @click="show_options_dialog">
                <v-icon>mdi-cog</v-icon>
            </v-btn>
            <v-col cols="auto">
                <v-btn :style="{ display: 'none' }">ログイン</v-btn>
            </v-col>
        </v-row>
        <v-row class="ppmk_row ppmk_main_pane">
            <!--サイドバー-->
            <v-col cols="auto" class="sidebar">
                <v-container>
                    <v-row>
                        <!--ページリストビュー。ここをクリックしてページを選択する-->
                        <PageListView class="component page_list_view" ref="page_list_view"
                            :auto_save_pagedatas_to_localstorage="auto_save_pagedatas_to_localstorage"
                            @delete_page="delete_page"
                            @update_auto_save_pagedatas_to_localstorage="update_auto_save_pagedatas_to_localstorage"
                            @clicked_page="clicked_page" />
                    </v-row>
                    <v-row>
                        <!--タグリストビュー。ここからタグをドラッグしてドロップゾーンに貼り付ける-->
                        <TagListView class="component html_tag_list_view" />
                    </v-row>
                </v-container>
            </v-col>

            <!--ドロップゾーン-->
            <v-col cols="auto" class="dropzone_wrap">
                <DropZone :show_border="show_border" class="component dropzone" ref="dropzone"
                    @updated_tagdatas_root="updated_htmltagdatas" @updated_htmltagdatas="updated_htmltagdatas"
                    :copied_tagdata="copied_tagdata" @copy_tag="copy_tag" @onclick_tag="onclick_tag"
                    :dropzone_style="dropzone_style" />
                <!--TODO-->
            </v-col>

            <!--プロパティビュー-->
            <v-col cols="auto" class="propertyview">
                <v-container>
                    <v-row>
                        <v-col cols="auto">
                            <!--ページプロパティビュー-->
                            <PagePropertyView class="component page_property_view" ref="page_property_view"
                                @updated_page_property="updated_page_property" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="auto">
                            <!--プロパティビュー-->
                            <HTMLTagPropertyView class="component property_view" ref="property_view"
                                @updated_html_tag_property="updated_html_tag_property" />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="auto">
                            <!--構造ビュー-->
                            <HTMLTagStructView @onclick_tag="onclick_tag" class="component struct_view"
                                @copy_tag="copy_tag" ref="struct_view" @delete_tagdata="delete_tagdata"
                                @updated_html_tagdatas="(html_tagdatas) => updated_htmltagdatas(html_tagdatas, null)" />
                        </v-col>
                    </v-row>
                </v-container>
            </v-col>
        </v-row>
        <v-row class="ppmk_row">
            <v-col cols="auto">
                <v-btn @click="is_show_css_dialog = true">CSS</v-btn>
                <v-btn @click="is_show_webfont_dialog = true">WebFont</v-btn>
            </v-col>
            <v-spacer />
            <v-col cols="auto">
                <v-btn @click="show_readin_dialog">読み込み</v-btn>
                <v-btn @click="show_writeout_dialog">書き出し</v-btn>
            </v-col>
        </v-row>
    </v-container>

    <v-dialog v-model="is_show_css_dialog">
        <v-card class="pa-5" :style="page_css_view_style">
            <v-card-title>
                <v-row>
                    <v-col cols="auto">
                        ページCSS
                    </v-col>
                    <v-spacer />
                    <v-col cols="auto">
                        <v-checkbox class="checkbox" v-model="transparent_page_css_view" :label="'透過'"></v-checkbox>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-textarea id="css_text_area" v-model="css" @keydown="updated_css" :rows="20" placeholder="img {
  width: 200px;
  height: auto;
}"></v-textarea>
            <v-row>
                <v-col cols="auto">
                    <v-btn @click="is_show_css_dialog = false">閉じる</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
    <v-dialog v-model="is_show_readin_dialog">
        <v-card class="pa-5">
            <input type="file" @change="read_ppmk_project" />
            <v-row>
                <v-col cols="auto">
                    <v-btn @click="is_show_readin_dialog = false">閉じる</v-btn>
                </v-col>
                <v-spacer />
            </v-row>
        </v-card>
    </v-dialog>
    <v-dialog v-model="is_show_webfont_dialog">
        <v-card class="pa-5">
            <v-card-title>ページウェブフォント</v-card-title>
            <v-card-text>使用するウェブフォントのリンクを改行区切りで記述してください</v-card-text>
            <v-textarea v-model="page_webfont" :rows="20" placeholder="https://fonts.googleapis.com/css?family=M+PLUS+1p
https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c"></v-textarea>
            <v-row>
                <v-col cols="auto">
                    <v-btn @click="is_show_webfont_dialog = false">閉じる</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
    <v-dialog id="writeout_dialog" v-model="is_show_writeout_dialog">
        <v-card class="pa-5">
            <v-card-title>ページHTML</v-card-title>
            <v-row>
                <v-col>
                    <v-checkbox class="checkbox" @change="update_page_html" v-model="export_head" :label="'ヘッダ'" />
                </v-col>
                <v-col>
                    <v-checkbox class="checkbox" @change="update_page_html" v-model="export_base64_image"
                        :label="'埋め込み画像'" />
                </v-col>
                <v-col>
                    <v-checkbox class="checkbox" @change="update_page_html" v-model="export_position_css"
                        :label="'位置情報'" />
                </v-col>
            </v-row>
            <v-textarea v-model="page_html" :readonly="true" :rows="20"></v-textarea>
            <v-row>
                <v-col cols="auto">
                    <v-btn @click="is_show_writeout_dialog = false">閉じる</v-btn>
                </v-col>
                <v-spacer />
                <v-col cols="auto">
                    <v-btn @click="print_this_page">このページを印刷する</v-btn>
                </v-col>
                <v-col cols="auto">
                    <v-btn @click="save_ppmk_html_css_this_page">このページをHTMLファイルに保存</v-btn>
                </v-col>
                <v-col cols="auto">
                    <v-btn @click="save_ppmk_html_css_all_pages">すべてのページをHTMLファイルに保存</v-btn>
                </v-col>
                <v-col cols="auto">
                    <v-btn @click="save_ppmk_project">プロジェクトを保存</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
    <v-dialog v-model="is_show_options_dialog">
        <v-card class="pa-5">
            <v-card-title>設定</v-card-title>
            <v-row>
                <v-col cols="auto">
                    <h3>全般</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="auto">
                    <v-checkbox class="checkbox" v-model="show_border" :label="'境界を表示'" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="auto">
                    <v-checkbox class="checkbox" v-model="auto_save_pagedatas_to_localstorage" :label="'自動保存'" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="auto">
                    <h3>CSS編集画面</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="auto">
                    <v-checkbox class="checkbox" v-model="transparent_page_css_view" :label="'透過'"></v-checkbox>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="auto">
                    <h3>出力画面</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="auto">
                    <v-checkbox class="checkbox" @change="update_page_html" v-model="export_head" :label="'ヘッダ'" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="auto">
                    <v-checkbox class="checkbox" @change="update_page_html" v-model="export_base64_image"
                        :label="'埋め込み画像'" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="auto">
                    <v-checkbox class="checkbox" @change="update_page_html" v-model="export_position_css"
                        :label="'位置情報'" />
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="auto">
                    <v-btn @click="is_show_options_dialog = false">閉じる</v-btn>
                </v-col>
            </v-row>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'
import PageListView from '@/view/PageListView.vue'
import TagListView from '@/view/TagListView.vue'
import DropZone from '@/view/DropZone.vue'
import HTMLTagPropertyView from '@/view/HTMLTagPropertyView.vue'
import PagePropertyView from '@/view/PagePropertyView.vue'
import HTMLTagDataBase, { GenerateHTMLOptions } from '@/html_tagdata/HTMLTagDataBase'
import PageData from '@/page/PageData'
import HTMLTagStructView from './HTMLTagStructView.vue'
import { Watch } from 'vue-property-decorator'
import { deserialize, serializable } from '@/serializable/serializable'
import { head } from '@/main'
import sample_project_json from '@/sample/ppmk_sample_project.json'

@serializable
class Settings {
    export_base64_image: boolean
    export_head: boolean
    export_position_css: boolean
    show_border: boolean
    transparent_page_css_view: boolean
    auto_save_pagedatas_to_localstorage: boolean
}

@Options({
    components: {
        PageListView,
        TagListView,
        DropZone,
        HTMLTagPropertyView,
        PagePropertyView,
        HTMLTagStructView,
    }
})

export default class PutPullMockRootPage extends Vue {
    width_dropzone = 100
    height_dropzone = 100
    is_show_css_dialog = false
    is_show_writeout_dialog = false
    is_show_readin_dialog = false
    is_show_webfont_dialog = false
    is_show_options_dialog = false
    css = ""
    page_html = ""
    page_webfont = ""

    export_base64_image = false
    export_head = true
    export_position_css = false

    show_border = false
    transparent_page_css_view = false

    auto_save_pagedatas_to_localstorage = true

    copied_tagdata: HTMLTagDataBase = new HTMLTagDataBase()

    @Watch('export_base64_image')
    @Watch('export_head')
    @Watch('export_position_css')
    @Watch('show_border')
    @Watch('transparent_page_css_view')
    @Watch('auto_save_pagedatas_to_localstorage')
    save_settings_to_cookie() {
        let settings = new Settings()
        settings.export_base64_image = this.export_base64_image
        settings.export_head = this.export_head
        settings.export_position_css = this.export_position_css
        settings.show_border = this.show_border
        settings.transparent_page_css_view = this.transparent_page_css_view
        settings.auto_save_pagedatas_to_localstorage = this.auto_save_pagedatas_to_localstorage
        document.cookie = JSON.stringify(settings)
    }

    load_settings_from_cookie() {
        let settings: Settings
        try {
            settings = JSON.parse(document.cookie, deserialize)
        } catch (e) {
            this.save_settings_to_cookie()
            settings = JSON.parse(document.cookie, deserialize)

            let sample_project: Array<PageData> = JSON.parse(JSON.stringify(sample_project_json), deserialize)
            let about_ppmk_pagedata: PageData
            for (let i = 0; i < sample_project.length; i++) {
                if (sample_project[i].pageid == "d4c84155-99d0-4a95-bfea-66d3e2b173ca") {
                    about_ppmk_pagedata = sample_project[i]
                    break
                }
            }
            let pagedatas: Array<PageData> = new Array<PageData>()
            pagedatas.push(about_ppmk_pagedata)

            this.$nextTick(() => {
                let page_list_view: any = this.$refs['page_list_view']

                page_list_view.pagedatas = pagedatas
                this.updated_htmltagdatas(about_ppmk_pagedata.html_tagdatas, null)
                this.$nextTick(() => {
                    page_list_view.clicked_page(about_ppmk_pagedata)
                })
            })
        }
        this.export_base64_image = settings.export_base64_image
        this.export_head = settings.export_head
        this.export_position_css = settings.export_position_css
        this.show_border = settings.show_border
        this.transparent_page_css_view = settings.transparent_page_css_view
        this.auto_save_pagedatas_to_localstorage = settings.auto_save_pagedatas_to_localstorage
    }

    created(): void {
        this.load_settings_from_cookie()
    }

    get page_css_view_style(): any {
        if (this.transparent_page_css_view) {
            return {
                opacity: 0.85,
            }
        } else {
            return {}
        }
    }

    read_ppmk_project(e) {
        let page_list_view: any = this.$refs['page_list_view']
        let reader = new FileReader()
        reader.addEventListener('load', (e) => {
            let pagedatas = JSON.parse(e.target.result.toString(), deserialize)
            page_list_view.pagedatas = pagedatas
            page_list_view.clicked_page(page_list_view.pagedatas[0])
            this.is_show_readin_dialog = false
        })
        reader.readAsText(e.target.files[0])
        page_list_view.save_pagedatas_to_localstorage()
    }

    save_ppmk_project() {
        let page_list_view: any = this.$refs['page_list_view']
        let ppmk_data = JSON.stringify(page_list_view.pagedatas)
        let ppmk_data_blob = new Blob([ppmk_data])
        let url = URL.createObjectURL(ppmk_data_blob)

        const a = document.createElement("a");
        document.body.appendChild(a);
        a.download = 'ppmk_project.json';
        a.href = url;
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    }


    save_ppmk_html_css_this_page() {
        let page_list_view: any = this.$refs['page_list_view']
        let page_index = page_list_view.selected_index
        let pagedata = page_list_view.pagedatas[page_index]
        let export_options = new GenerateHTMLOptions()
        export_options.export_base64_image = this.export_base64_image
        export_options.export_head = this.export_head
        export_options.export_id = this.export_position_css
        export_options.export_position_css = this.export_position_css
        let html = pagedata.generate_html(export_options)
        let css = pagedata.css

        {
            let html_data_blob = new Blob([html])
            let url = URL.createObjectURL(html_data_blob)
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.download = pagedata.pagename + '.html';
            a.href = url;
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        }
        {
            let css_data_blob = new Blob([css])
            let url = URL.createObjectURL(css_data_blob)
            let a = document.createElement("a");
            document.body.appendChild(a);
            a.download = pagedata.pagename + '.css';
            a.href = url;
            a.click();
            a.remove();
            URL.revokeObjectURL(url);
        }
    }

    save_ppmk_html_css_all_pages() {
        let page_list_view: any = this.$refs['page_list_view']
        page_list_view.pagedatas.forEach((pagedata: PageData) => {
            let export_options = new GenerateHTMLOptions()
            export_options.export_base64_image = this.export_base64_image
            export_options.export_head = this.export_head
            export_options.export_id = this.export_position_css
            export_options.export_position_css = this.export_position_css
            let html = pagedata.generate_html(export_options)
            let css = pagedata.css

            {
                let html_data_blob = new Blob([html])
                let url = URL.createObjectURL(html_data_blob)
                let a = document.createElement("a");
                document.body.appendChild(a);
                a.download = pagedata.pagename + '.html';
                a.href = url;
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
            }
            {
                let css_data_blob = new Blob([css])
                let url = URL.createObjectURL(css_data_blob)
                let a = document.createElement("a");
                document.body.appendChild(a);
                a.download = pagedata.pagename + '.css';
                a.href = url;
                a.click();
                a.remove();
                URL.revokeObjectURL(url);
            }
        });
    }

    show_writeout_dialog() {
        this.update_page_html()
        this.is_show_writeout_dialog = true
    }

    show_readin_dialog() {
        this.is_show_readin_dialog = true
    }

    show_options_dialog() {
        this.is_show_options_dialog = true
    }

    update_page_html() {
        let page_list_view: any = this.$refs["page_list_view"]
        let page_index = page_list_view.selected_index
        let pagedata: PageData = page_list_view.pagedatas[page_index]
        let export_options = new GenerateHTMLOptions()
        export_options.export_base64_image = this.export_base64_image
        export_options.export_head = this.export_head
        export_options.export_id = this.export_position_css
        export_options.export_position_css = this.export_position_css
        let html = pagedata.generate_html(export_options)
        this.page_html = html
    }

    updated_htmltagdatas(html_tagdatas: Array<HTMLTagDataBase>, tagdata: HTMLTagDataBase) {
        let page_list_view: any = this.$refs["page_list_view"]
        page_list_view.pagedatas[page_list_view.selected_index].html_tagdatas = html_tagdatas
        if (tagdata) {
            this.onclick_tag(tagdata)
        }
        page_list_view.clicked_page(page_list_view.pagedatas[page_list_view.selected_index])
        this.update_struct_view(page_list_view.pagedatas[page_list_view.selected_index].html_tagdatas)
        page_list_view.save_pagedatas_to_localstorage()
    }

    clicked_page(pagedata: PageData) {
        let dropzone: any = this.$refs["dropzone"]
        let html_tagdatas = pagedata.html_tagdatas
        dropzone.html_tagdatas = html_tagdatas
        dropzone.html_tagdatas_root = html_tagdatas

        let page_property_view: any = this.$refs["page_property_view"]
        page_property_view.page_data = pagedata
        this.width_dropzone = pagedata.width
        this.height_dropzone = pagedata.height
        this.onclick_tag(null)

        let page_list_view: any = this.$refs["page_list_view"]
        this.update_struct_view(page_list_view.pagedatas[page_list_view.selected_index].html_tagdatas)
        this.css = page_list_view.pagedatas[page_list_view.selected_index].css
        this.page_webfont = page_list_view.pagedatas[page_list_view.selected_index].webfonts.join("\n")
        this.update_page_webfont()
        page_list_view.save_pagedatas_to_localstorage()
    }

    onclick_tag(tagdata: HTMLTagDataBase) {
        let property_view: any = this.$refs["property_view"]
        property_view.html_tagdata = new HTMLTagDataBase()
        this.$nextTick(() => {
            property_view.html_tagdata = tagdata
        })
    }

    updated_html_tag_property(html_tagdata: HTMLTagDataBase) {
        let page_list_view: any = this.$refs["page_list_view"]
        let property_view: any = this.$refs["property_view"]
        let tagdatas: Array<HTMLTagDataBase> = page_list_view.pagedatas[page_list_view.selected_index].html_tagdatas

        let updated_tagdata: HTMLTagDataBase

        let walk_tagdatas = function (tagdatas: Array<HTMLTagDataBase>): boolean { return false }
        walk_tagdatas = function (tagdatas: Array<HTMLTagDataBase>): boolean {
            for (let i = 0; i < tagdatas.length; i++) {
                if (html_tagdata.tagid == tagdatas[i].tagid) {
                    tagdatas.splice(i, 1, html_tagdata)
                    updated_tagdata = html_tagdata
                    return true
                }
                if (walk_tagdatas(tagdatas[i].child_tagdatas)) {
                    return true
                }
            }
            return false
        }
        walk_tagdatas(tagdatas)
        this.update_struct_view(page_list_view.pagedatas[page_list_view.selected_index].html_tagdatas)
        property_view.html_tagdata = updated_tagdata
        page_list_view.save_pagedatas_to_localstorage()
    }
    updated_page_property(page_data: PageData) {
        let page_list_view: any = this.$refs["page_list_view"]
        for (let i = 0; i < page_list_view.pagedatas.length; i++) {
            if (page_list_view.pagedatas[i].pageid == page_data.pageid) {
                page_list_view.pagedatas.splice(i, 1, page_data)
                break
            }
        }
        page_list_view.clicked_page(page_list_view.pagedatas[page_list_view.selected_index])
        this.update_struct_view(page_list_view.pagedatas[page_list_view.selected_index].html_tagdatas)
        page_list_view.save_pagedatas_to_localstorage()
    }

    update_struct_view(tagdatas: Array<HTMLTagDataBase>) {
        let struct_view: any = this.$refs["struct_view"]
        struct_view.html_tagdatas = tagdatas
        struct_view.html_tagdatas_root = tagdatas
    }

    get dropzone_style(): any {
        return {
            "width": this.width_dropzone + "px",
            "height": this.height_dropzone + "px",
        }
    }

    @Watch('css')
    updated_css(e) {
        if (e) {
            if (e.key == "Tab") {
                e.preventDefault()
                let css_text_area: any = document.getElementById("css_text_area")
                let selectionStart = css_text_area.selectionStart
                css_text_area.value =
                    css_text_area.value.substr(0, css_text_area.selectionStart) +
                    "    " +
                    css_text_area.value.substr(css_text_area.selectionStart)
                this.$nextTick(() => {
                    css_text_area.selectionStart = selectionStart + 4
                    css_text_area.selectionEnd = selectionStart + 4
                })
                return
            }
        }

        let page_list_view: any = this.$refs["page_list_view"]
        page_list_view.pagedatas[page_list_view.selected_index].css = this.css
        let dropzone: any = this.$refs["dropzone"]
        dropzone.style_user_edited = this.css
    }
    @Watch('page_webfont')
    updated_page_webfont() {
        let page_list_view: any = this.$refs["page_list_view"]
        page_list_view.pagedatas[page_list_view.selected_index].webfonts = this.page_webfont.split("\n")
        this.update_page_webfont()
        page_list_view.save_pagedatas_to_localstorage()
    }

    update_page_webfont() {
        let page_list_view: any = this.$refs["page_list_view"]
        let page_web_font_links = []
        for (let i = 0; i < page_list_view.pagedatas[page_list_view.selected_index].webfonts.length; i++) {
            let page_web_font = page_list_view.pagedatas[page_list_view.selected_index].webfonts[i]
            page_web_font_links.push({
                href: page_web_font,
                rel: "stylesheet",
            })
        }
        head.push({
            link: page_web_font_links
        })
    }

    print_this_page() {
        // https://beelabo.com/web/1423
        let area = document.getElementById("dropzone_body").outerHTML
        let head = ""
        let cmd = '<' + 'script' + '>' + 'window.print(); window.close()' + '<' + '/script' + '>'
        let links = document.getElementsByTagName("link")
        for (let i = 0; i < links.length; i++) {
            head = head + links[i].outerHTML
        }
        let styles = document.getElementsByTagName("style")
        for (let i = 0; i < styles.length; i++) {
            head = head + styles[i].outerHTML
        }
        head += "<style>" + this.css + "</style>"
        let sub = window.open()
        sub.document.write("<html><head>" + head + "</head>" + area + cmd + "</html>")
    }

    delete_tagdata(tagdata: HTMLTagDataBase) {
        let page_list_view: any = this.$refs['page_list_view']
        let tagdatas: Array<HTMLTagDataBase> = page_list_view.pagedatas[page_list_view.selected_index].html_tagdatas

        let walk_tagdatas = function (tagdatas: Array<HTMLTagDataBase>): boolean { return false }
        walk_tagdatas = function (tagdatas: Array<HTMLTagDataBase>): boolean {
            for (let i = 0; i < tagdatas.length; i++) {
                let html_tagdata = tagdatas[i]
                if (tagdata.tagid == tagdatas[i].tagid) {
                    tagdatas.splice(i, 1)
                    return true
                }
                if (walk_tagdatas(tagdatas[i].child_tagdatas)) {
                    return true
                }
            }
        }
        walk_tagdatas(tagdatas)
        page_list_view.pagedatas[page_list_view.selected_index].html_tagdatas = tagdatas
        this.clicked_page(page_list_view.pagedatas[page_list_view.selected_index])
        page_list_view.save_pagedatas_to_localstorage()
    }

    copy_tag(tagdata: HTMLTagDataBase) {
        this.copied_tagdata = tagdata
    }

    update_auto_save_pagedatas_to_localstorage(auto_save_pagedatas_to_localstorage) {
        this.auto_save_pagedatas_to_localstorage = auto_save_pagedatas_to_localstorage
    }

    delete_page() {
        let page_list_view: any = this.$refs['page_list_view']
        page_list_view.save_pagedatas_to_localstorage()
    }
}
</script>
<style scoped>
.component {
    border: 1px black solid;
    overflow: hidden;
    width: 300px;
}

.dropzone_wrap {
    white-space: pre-line;
    height: calc(100vh - 105px);
    width: fit-content;
    overflow: scroll;
}

.dropzone {
    width: fit-content;
}

.v-container,
.v-row,
.v-col {
    padding: 0px;
    margin: 0px;
}



.page_list_view {
    height: 150px;
    overflow-y: scroll;
}

.html_tag_list_view {
    height: calc(100vh - 255px);
    overflow-y: scroll;
}

.page_property_view {
    height: 170px;
    overflow: scroll;
}

.property_view {
    height: calc(100vh - 575px);
    overflow: scroll;
}

.struct_view {
    height: 300px;
    overflow: scroll;
}

.v-container {
    width: fit-content;
}

.ppmk_row {
    width: 100vw;
    flex-wrap: nowrap;
}

.ppmk_main_pane {
    overflow-x: scroll;
}

.v-input__details {
    display: none;
}

.checkbox {
    position: relative;
    height: 50px;
    top: -7px;
}
</style>
<style>
input,
textarea {
    border: solid 1px silver !important;
}

body {
    overflow: scroll !important;
}
</style>