<template>
    <H1TagView v-if="tagdata.tagname == 'h1'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" :tagdatas_root="tagdatas_root"
        @updated_tagdata="updated_tagdata" />
    <H2TagView v-if="tagdata.tagname == 'h2'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <H3TagView v-if="tagdata.tagname == 'h3'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <H4TagView v-if="tagdata.tagname == 'h4'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <H5TagView v-if="tagdata.tagname == 'h5'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <H6TagView v-if="tagdata.tagname == 'h6'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <PTagView v-if="tagdata.tagname == 'p'" :tagdata="tagdata" :draggable="editor_mode" @dragstart.stop="on_drag_start"
        :editor_mode="editor_mode" @delete_tag="delete_tag" :copied_tagdata="copied_tagdata"
        :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <ATagView v-if="tagdata.tagname == 'a'" :tagdata="tagdata" :draggable="editor_mode" @dragstart.stop="on_drag_start"
        :editor_mode="editor_mode" @delete_tag="delete_tag" :copied_tagdata="copied_tagdata"
        :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <ULTagView v-if="tagdata.tagname == 'ul'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <OLTagView v-if="tagdata.tagname == 'ol'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <LITagView v-if="tagdata.tagname == 'li'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <IMGTagView v-if="tagdata.tagname == 'img'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <TableTagView v-if="tagdata.tagname == 'table'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <THTagView v-if="tagdata.tagname == 'th'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <TRTagView v-if="tagdata.tagname == 'tr'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <TDTagView v-if="tagdata.tagname == 'td'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <FormTagView v-if="tagdata.tagname == 'form'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <ButtonTagView v-if="tagdata.tagname == 'button'" :tagdata="tagdata" :draggable="editor_mode"
        :show_border="show_border" :editor_mode="editor_mode" @delete_tag="delete_tag" :copied_tagdata="copied_tagdata"
        :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" @dragstart.stop="on_drag_start"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <CheckBoxTagView v-if="tagdata.tagname == 'checkbox'" :tagdata="tagdata" :draggable="editor_mode"
        :show_border="show_border" :editor_mode="editor_mode" @delete_tag="delete_tag" :copied_tagdata="copied_tagdata"
        :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" @dragstart.stop="on_drag_start"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <ColorTagView v-if="tagdata.tagname == 'color'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <DateTagView v-if="tagdata.tagname == 'date'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <DateTimeLocalTagView v-if="tagdata.tagname == 'datetimelocal'" :tagdata="tagdata" :draggable="editor_mode"
        @click="onclick" :editor_mode="editor_mode" @delete_tag="delete_tag" :copied_tagdata="copied_tagdata"
        :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @updated_tagdatas_root="updated_tagdatas_root"
        :tagdatas_root="tagdatas_root" :show_border="show_border" @dragstart.stop="on_drag_start"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <EMailTagView v-if="tagdata.tagname == 'email'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <FileTagView v-if="tagdata.tagname == 'file'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <ImageTagView v-if="tagdata.tagname == 'image'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <MonthTagView v-if="tagdata.tagname == 'month'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <NumberTagView v-if="tagdata.tagname == 'number'" :tagdata="tagdata" :draggable="editor_mode"
        :show_border="show_border" :editor_mode="editor_mode" @delete_tag="delete_tag" :copied_tagdata="copied_tagdata"
        :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" @dragstart.stop="on_drag_start"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <PasswordTagView v-if="tagdata.tagname == 'password'" :tagdata="tagdata" :draggable="editor_mode"
        :show_border="show_border" :editor_mode="editor_mode" @delete_tag="delete_tag" :copied_tagdata="copied_tagdata"
        :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" @dragstart.stop="on_drag_start"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <RadioTagView v-if="tagdata.tagname == 'radio'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <RangeTagView v-if="tagdata.tagname == 'range'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <ResetTagView v-if="tagdata.tagname == 'reset'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <SearchTagView v-if="tagdata.tagname == 'search'" :tagdata="tagdata" :draggable="editor_mode"
        :show_border="show_border" :editor_mode="editor_mode" @delete_tag="delete_tag" :copied_tagdata="copied_tagdata"
        :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" @dragstart.stop="on_drag_start"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <SubmitTagView v-if="tagdata.tagname == 'submit'" :tagdata="tagdata" :draggable="editor_mode"
        :show_border="show_border" :editor_mode="editor_mode" @delete_tag="delete_tag" :copied_tagdata="copied_tagdata"
        :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" @dragstart.stop="on_drag_start"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <TelTagView v-if="tagdata.tagname == 'tel'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <TextTagView v-if="tagdata.tagname == 'text'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <TimeTagView v-if="tagdata.tagname == 'time'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <URLTagView v-if="tagdata.tagname == 'url'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <WeekTagView v-if="tagdata.tagname == 'week'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <TextAreaTagView v-if="tagdata.tagname == 'textarea'" :tagdata="tagdata" :draggable="editor_mode"
        :show_border="show_border" :editor_mode="editor_mode" @delete_tag="delete_tag" :copied_tagdata="copied_tagdata"
        :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" @dragstart.stop="on_drag_start"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <SelectTagView v-if="tagdata.tagname == 'select'" :tagdata="tagdata" :draggable="editor_mode"
        :show_border="show_border" :editor_mode="editor_mode" @delete_tag="delete_tag" :copied_tagdata="copied_tagdata"
        :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" @dragstart.stop="on_drag_start"
        @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <OptionTagView v-if="tagdata.tagname == 'option'" :tagdata="tagdata" :draggable="editor_mode"
        :show_border="show_border" :editor_mode="editor_mode" @delete_tag="delete_tag" :copied_tagdata="copied_tagdata"
        :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" @dragstart.stop="on_drag_start"
        @contextmenu.stop.prevent="show_contextmenu" @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <LabelTagView v-if="tagdata.tagname == 'label'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        :tagdatas_root="tagdatas_root" :show_border="show_border" @contextmenu.stop.prevent="show_contextmenu"
        @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <DivTagView v-if="tagdata.tagname == 'div'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />
    <SpanTagView v-if="tagdata.tagname == 'span'" :tagdata="tagdata" :draggable="editor_mode"
        @dragstart.stop="on_drag_start" :editor_mode="editor_mode" @delete_tag="delete_tag"
        :copied_tagdata="copied_tagdata" :clicked_tagdata="clicked_tagdata" @copy_tag="copy_tag" @click="onclick"
        @updated_tagdatas_root="updated_tagdatas_root" :tagdatas_root="tagdatas_root" :show_border="show_border"
        @onclick_tag="onclick_tag" @updated_tagdata="updated_tagdata" />

    <v-menu v-if="is_show_contextmenu" v-model="is_show_contextmenu" :style="contextmenu_style">
        <v-list>
            <v-list-item @click="copy_tag(tagdata)">コピー</v-list-item>
            <v-list-item @click="cut_tag(tagdata)">切り取り</v-list-item>
            <v-list-item @click="delete_tag(tagdata)">削除</v-list-item>
        </v-list>
    </v-menu>
</template>
<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { Prop, Watch } from "vue-property-decorator"
import H1TagView from '@/view/html_tag_view/H1TagView.vue'
import H2TagView from '@/view/html_tag_view/H2TagView.vue'
import H3TagView from '@/view/html_tag_view/H3TagView.vue'
import H4TagView from '@/view/html_tag_view/H4TagView.vue'
import H5TagView from '@/view/html_tag_view/H5TagView.vue'
import H6TagView from '@/view/html_tag_view/H6TagView.vue'
import PTagView from '@/view/html_tag_view/PTagView.vue'
import ATagView from '@/view/html_tag_view/ATagView.vue'
import ULTagView from '@/view/html_tag_view/ULTagView.vue'
import OLTagView from '@/view/html_tag_view/OLTagView.vue'
import LITagView from '@/view/html_tag_view/LITagView.vue'
import IMGTagView from '@/view/html_tag_view/IMGTagView.vue'
import TableTagView from '@/view/html_tag_view/TableTagView.vue'
import TRTagView from '@/view/html_tag_view/TRTagView.vue'
import TDTagView from '@/view/html_tag_view/TDTagView.vue'
import FormTagView from '@/view/html_tag_view/FormTagView.vue'
import ButtonTagView from '@/view/html_tag_view/ButtonTagView.vue'
import CheckBoxTagView from '@/view/html_tag_view/CheckBoxTagView.vue'
import ColorTagView from '@/view/html_tag_view/ColorTagView.vue'
import DateTagView from '@/view/html_tag_view/DateTagView.vue'
import DateTimeLocalTagView from '@/view/html_tag_view/DateTimeLocalTagView.vue'
import EMailTagView from '@/view/html_tag_view/EmailTagView.vue'
import FileTagView from '@/view/html_tag_view/FileTagView.vue'
import ImageTagView from '@/view/html_tag_view/ImageTagView.vue'
import MonthTagView from '@/view/html_tag_view/MonthTagView.vue'
import NumberTagView from '@/view/html_tag_view/NumberTagView.vue'
import PasswordTagView from '@/view/html_tag_view/PasswordTagView.vue'
import RadioTagView from '@/view/html_tag_view/RadioTagView.vue'
import RangeTagView from '@/view/html_tag_view/RangeTagView.vue'
import ResetTagView from '@/view/html_tag_view/ResetTagView.vue'
import SearchTagView from '@/view/html_tag_view/SearchTagView.vue'
import SubmitTagView from '@/view/html_tag_view/SubmitTagView.vue'
import TelTagView from '@/view/html_tag_view/TelTagView.vue'
import TextTagView from '@/view/html_tag_view/TextTagView.vue'
import TimeTagView from '@/view/html_tag_view/TimeTagView.vue'
import URLTagView from '@/view/html_tag_view/URLTagView.vue'
import WeekTagView from '@/view/html_tag_view/WeekTagView.vue'
import TextAreaTagView from '@/view/html_tag_view/TextAreaTagView.vue'
import SelectTagView from '@/view/html_tag_view/SelectTagView.vue'
import OptionTagView from '@/view/html_tag_view/OptionTagView.vue'
import LabelTagView from '@/view/html_tag_view/LabelTagView.vue'
import DivTagView from '@/view/html_tag_view/DivTagView.vue'
import SpanTagView from '@/view/html_tag_view/SpanTagView.vue'
import HTMLTagDataBase from '@/html_tagdata/HTMLTagDataBase';
import THTagView from '@/view/html_tag_view/THTagView.vue';

@Options({
    components: {
        H1TagView,
        H2TagView,
        H3TagView,
        H4TagView,
        H5TagView,
        H6TagView,
        PTagView,
        ATagView,
        ULTagView,
        OLTagView,
        LITagView,
        IMGTagView,
        TableTagView,
        TRTagView,
        TDTagView,
        THTagView,
        FormTagView,
        ButtonTagView,
        CheckBoxTagView,
        ColorTagView,
        DateTagView,
        DateTimeLocalTagView,
        EMailTagView,
        FileTagView,
        ImageTagView,
        MonthTagView,
        NumberTagView,
        PasswordTagView,
        RadioTagView,
        RangeTagView,
        ResetTagView,
        SearchTagView,
        SubmitTagView,
        TelTagView,
        TextTagView,
        TimeTagView,
        URLTagView,
        WeekTagView,
        TextAreaTagView,
        SelectTagView,
        OptionTagView,
        LabelTagView,
        DivTagView,
        SpanTagView,
    }
})
export default class HTMLTagView extends Vue {
    @Prop({ require: true }) tagdata: HTMLTagDataBase
    @Prop({ require: true }) tagdatas_root: Array<HTMLTagDataBase>
    @Prop() clicked_tagdata: HTMLTagDataBase
    @Prop() show_border: boolean
    @Prop() copied_tagdata: HTMLTagDataBase
    @Prop() editor_mode: boolean
    is_show_contextmenu = false
    x_contextmenu = 0
    y_contextmenu = 0

    get contextmenu_style(): any {
        return {
            display: "inline",
            position: "absolute",
            left: this.x_contextmenu + "px",
            top: this.y_contextmenu + "px",
        }
    }

    show_contextmenu(e: MouseEvent) {
        if (!this.editor_mode) return
        this.$emit('onclick_tag', this.tagdata)
        e.preventDefault()
        this.x_contextmenu = e.clientX
        this.y_contextmenu = e.clientY
        this.is_show_contextmenu = true
    }

    on_drag_start(e: DragEvent) {
        e.dataTransfer.setData("ppmk/move_tag_id", this.tagdata.tagid)
        e.dataTransfer.setData("ppmk/move_tag_offset_x", e.offsetX.toString())
        e.dataTransfer.setData("ppmk/move_tag_offset_y", e.offsetY.toString())
    }

    onclick_tag(tagdata: HTMLTagDataBase) {
        this.$emit('onclick_tag', tagdata)
    }

    updated_tagdata(tagdata: HTMLTagDataBase) {
        this.$emit("updated_tagdata", tagdata)
    }

    updated_tagdatas_root(tagdatas: Array<HTMLTagDataBase>) {
        this.$emit("updated_tagdatas_root", tagdatas)
    }

    delete_tag(tagdata: HTMLTagDataBase) {
        this.$emit("delete_tagdata", tagdata)
    }

    onclick(e: MouseEvent) {
        return
    }

    copy_tag(tagdata: HTMLTagDataBase) {
        this.$emit("copy_tag", tagdata)
    }

    beforeCreate(): void {
        this.$options.components.HTMLTagView = HTMLTagView
    }

    cut_tag(tagdata: HTMLTagDataBase) {
        this.copy_tag(tagdata)
        this.delete_tag(tagdata)
    }

    @Watch('clicked_tagdata')
    update_show_contextmenu_state() {
        if (this.clicked_tagdata && this.clicked_tagdata.tagid != this.tagdata.tagid) {
            this.is_show_contextmenu = false
        }
    }
}
</script>
<style scoped>
.tagwrap {
    position: relative;
}
</style>