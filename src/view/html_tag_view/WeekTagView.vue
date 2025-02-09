<template>
    <input v-if="label_type == LabelType.None" type="week" dropzone="true" @drop="(e) => on_drop(e, tagdata)"
        @dragover="on_dragover" readonly :style="position_css" @click.prevent.stop="onclick_tag" :name="name" :value="value"
        :autocomplete="autocomplete" :list="list" :max="max" :min="min" :required="required" :class="tagclass"
        :id="tagdata.tagid" :step="step">
    <label :style="position_css" v-else-if="label_type == LabelType.Before">
        {{ label }}
        <input type="week" dropzone="true" @drop="(e) => on_drop(e, tagdata)" @dragover="on_dragover" readonly
            @click.prevent.stop="onclick_tag" :name="name" :value="value" :autocomplete="autocomplete" :list="list"
            :max="max" :min="min" :required="required" :class="tagclass" :id="tagdata.tagid" :step="step">
    </label>
    <label :style="position_css" v-else-if="label_type == LabelType.After">
        <input type="week" dropzone="true" @drop="(e) => on_drop(e, tagdata)" @dragover="on_dragover" readonly
            @click.prevent.stop="onclick_tag" :name="name" :value="value" :autocomplete="autocomplete" :list="list"
            :max="max" :min="min" :required="required" :class="tagclass" :id="tagdata.tagid" :step="step">
        {{ label }}
    </label>
</template>

<script lang="ts">
import WeekTagData from '@/html_tagdata/WeekTagData';
import { LabelType } from '@/html_tagdata/LabelType';
import { Watch } from 'vue-property-decorator';
import HTMLTagViewBase from './HTMLTagViewBase';

export default class WeekTagView extends HTMLTagViewBase {
    LabelType = LabelType
    name: string
    value: string
    autocomplete: string
    list: string
    max: string
    min: string
    readonly: boolean
    required: boolean
    step: string
    tagclass: string
    label_type = LabelType.None
    label = ""

    @Watch('name')
    @Watch('value')
    @Watch('autocomplete')
    @Watch('list')
    @Watch('max')
    @Watch('min')
    @Watch('readonly')
    @Watch('required')
    @Watch('step')
    @Watch('tagclass')
    @Watch('label')
    @Watch('label_type')
    update_tagdata() {
        let tagdata: WeekTagData = new WeekTagData()
        tagdata.tagid = this.tagdata.tagid
        tagdata.tagclass = this.tagclass
        tagdata.name = this.name
        tagdata.value = this.value
        tagdata.autocomplete = this.autocomplete
        tagdata.list = this.list
        tagdata.max = this.max
        tagdata.min = this.min
        tagdata.readonly = this.readonly
        tagdata.required = this.required
        tagdata.step = this.step
        tagdata.label_type = this.label_type
        tagdata.label = this.label
        this.$emit("updated_tagdata", tagdata)
    }

    override get tagdata_typed(): WeekTagData { return this.tagdata as WeekTagData }

    @Watch('tagdata')
    update_view() {
        this.tagclass = this.tagdata_typed.tagclass
        this.name = this.tagdata_typed.name
        this.value = this.tagdata_typed.value
        this.autocomplete = this.tagdata_typed.autocomplete
        this.list = this.tagdata_typed.list
        this.max = this.tagdata_typed.max
        this.min = this.tagdata_typed.min
        this.readonly = this.tagdata_typed.readonly
        this.required = this.tagdata_typed.required
        this.step = this.tagdata_typed.step
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