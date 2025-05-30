<template>
  <div class="example">
    <quill-editor
        class="editor"
        ref="myTextEditor"
        :disabled="false"
        :value="content"
        :options="editorOption"
        @change="onEditorChange"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady"
    />
  </div>
</template>

<script>
  import hljs from "highlight.js";
  import debounce from "lodash/debounce";
  import { quillEditor } from "vue-quill-editor";

  // highlight.js style
  import "highlight.js/styles/tomorrow.css";

  // import theme style
  import "quill/dist/quill.core.css";
  import "quill/dist/quill.snow.css";

  export default {
    name: "quill-example-snow",
    title: "Theme: snow",
    components: {
      quillEditor,
    },
    props: {
      value: {
        type: String,
        default: "",
      },
    },
    watch: {
      value(newValue) {
        if (this.editor) {
          this.editor.clipboard.dangerouslyPasteHTML(newValue || "");
        }
      },
    },
    data() {
      return {
        editorOption: {
          placeholder: "place holder test",
          modules: {
            toolbar: [
              ["bold", "italic", "underline", "strike"], // <strong>, <em>, <u>, <s>
              ["blockquote", "code-block"], // <blockquote>, <pre class="ql-syntax" spellcheck="false">
              [{ header: 1 }, { header: 2 }], // <h1>, <h2>
              [{ list: "ordered" }, { list: "bullet" }],
              [{ script: "sub" }, { script: "super" }], // <sub>, <sup>
              [{ indent: "-1" }, { indent: "+1" }], // class제어
              [{ direction: "rtl" }], //class 제어
              [{ size: ["small", false, "large", "huge"] }], //class 제어 - html로 되도록 확인
              [{ header: [1, 2, 3, 4, 5, 6, false] }], // <h1>, <h2>, <h3>, <h4>, <h5>, <h6>, normal
              [{ font: [] }], // 글꼴 class로 제어
              [{ color: [] }, { background: [] }], //style="color: rgb(230, 0, 0);", style="background-color: rgb(230, 0, 0);"
              [{ align: [] }], // class
              // ["clean"],
              ["link", "image", "video"],
            ],
            syntax: {
              highlight: (text) => hljs.highlightAuto(text).value,
            },
          },
        },
        content: "",
      };
    },
    methods: {
      onEditorChange: debounce(function () {
        this.content = this.editor.root.innerHTML;
        this.$emit("change", { key: "content", html: this.content });
      }, 466),
      onEditorBlur(editor) {
        console.log("editor blur!", editor);
      },
      onEditorFocus(editor) {
        console.log("editor focus!", editor);
      },
      onEditorReady(editor) {
        console.log("Editor is ready:", editor);
        if (this.content) {
          editor.clipboard.dangerouslyPasteHTML(this.content);
        }
      },
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quill;
      },
      contentCode() {
        return hljs.highlightAuto(this.content).value;
      },
    },
    mounted() {
      this.$nextTick(() => {
        if (this.editor) {
          this.editor.clipboard.dangerouslyPasteHTML(this.content || "");
        }
      });
    },
  };
</script>
