<template>
    <input type="date" readonly :style="position_css" @click.prevent.stop="onclick_tag" :name="name" :value="value" :class="tagclass" :id="tagdata.tagid"
        :autocomplete="autocomplete" :list="list" :max="max" :min="min" :required="required"
        :step="step">
</template>

<script lang="ts">
import DateTagData from '@/html_tagdata/DateTagData';
import { Watch } from 'vue-property-decorator';
import HTMLTagViewBase from './HTMLTagViewBase';

export default class DateTagView extends HTMLTagViewBase {
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
    update_tagdata() {
        let tagdata: DateTagData = new DateTagData()
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
        this.$emit("updated_tagdata", tagdata)
    }

    get tagdata_typed(): DateTagData { return this.tagdata as DateTagData }

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
    }

    created(): void {
        this.update_view()
    }

    onclick_tag() {
        this.$emit("onclick_tag", this.tagdata_typed)
    }
}
</script>