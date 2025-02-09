<template>
    <input v-if="label_type == LabelType.None" type="tel" dropzone="true" @drop="(e) => on_drop(e, tagdata)"
        @dragover="on_dragover" :style="position_css" @click.prevent.stop="onclick_tag" :name="name" :value="value"
        :size="size" :maxlength="maxlength" :autocomplete="autocomplete" :pattern="pattern" :placeholder="placeholder"
        :class="tagclass" :id="tagdata.tagid" :readonly="readonly" :required="required" :list="list">
    <label :style="position_css" v-else-if="label_type == LabelType.Before">
        {{ label }}
        <input type="tel" dropzone="true" @drop="(e) => on_drop(e, tagdata)" @dragover="on_dragover"
            @click.prevent.stop="onclick_tag" :name="name" :value="value" :size="size" :maxlength="maxlength"
            :autocomplete="autocomplete" :pattern="pattern" :placeholder="placeholder" :class="tagclass" :id="tagdata.tagid"
            :readonly="readonly" :required="required" :list="list">
    </label>
    <label :style="position_css" v-else-if="label_type == LabelType.After">
        <input type="tel" dropzone="true" @drop="(e) => on_drop(e, tagdata)" @dragover="on_dragover"
            @click.prevent.stop="onclick_tag" :name="name" :value="value" :size="size" :maxlength="maxlength"
            :autocomplete="autocomplete" :pattern="pattern" :placeholder="placeholder" :class="tagclass" :id="tagdata.tagid"
            :readonly="readonly" :required="required" :list="list">
        {{ label }}
    </label>
</template>

<script lang="ts">
import TelTagData from '@/html_tagdata/TelTagData';
import { LabelType } from '@/html_tagdata/LabelType';
import { Watch } from 'vue-property-decorator';
import HTMLTagViewBase from './HTMLTagViewBase';

export default class TelTagView extends HTMLTagViewBase {
    LabelType = LabelType
    name: string
    value: string
    size: string
    maxlength: string
    autocomplete: string
    pattern: string
    placeholder: string
    readonly: boolean
    required: boolean
    list: string
    tagclass: string
    label_type = LabelType.None
    label = ""

    @Watch('name')
    @Watch('value')
    @Watch('size')
    @Watch('maxlength')
    @Watch('autocomplete')
    @Watch('pattern')
    @Watch('placeholder')
    @Watch('readonly')
    @Watch('required')
    @Watch('list')
    @Watch('tagclass')
    @Watch('label')
    @Watch('label_type')
    update_tagdata() {
        let tagdata: TelTagData = new TelTagData()
        tagdata.tagid = this.tagdata.tagid
        tagdata.tagclass = this.tagclass
        tagdata.name = this.name
        tagdata.value = this.value
        tagdata.size = this.size
        tagdata.maxlength = this.maxlength
        tagdata.autocomplete = this.autocomplete
        tagdata.pattern = this.pattern
        tagdata.placeholder = this.placeholder
        tagdata.readonly = this.readonly
        tagdata.required = this.required
        tagdata.list = this.list
        tagdata.label_type = this.label_type
        tagdata.label = this.label
        this.$emit("updated_tagdata", tagdata)
    }

    override get tagdata_typed(): TelTagData { return this.tagdata as TelTagData }

    @Watch('tagdata')
    update_view() {
        this.tagclass = this.tagdata_typed.tagclass
        this.name = this.tagdata_typed.name
        this.value = this.tagdata_typed.value
        this.size = this.tagdata_typed.size
        this.maxlength = this.tagdata_typed.maxlength
        this.autocomplete = this.tagdata_typed.autocomplete
        this.pattern = this.tagdata_typed.pattern
        this.placeholder = this.tagdata_typed.placeholder
        this.readonly = this.tagdata_typed.readonly
        this.required = this.tagdata_typed.required
        this.list = this.tagdata_typed.list
        this.label = this.tagdata_typed.label
        this.label_type = this.tagdata_typed.label_type
    }

    created(): void {
        this.update_view()
    }

    onclick_tag() {
        this.$emit("onclick_tag", this.tagdata_typed)
    }
}
</script>