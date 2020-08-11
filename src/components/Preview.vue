<template>
  <div class="preview-wrapper">
    <runtime-template-compiler v-if="inside" :template="tempSVG" />
  </div>
</template>

<script>
import spy from "cep-spy";
const fs = require("fs");
import { evalScript } from "brutalism";
import { RuntimeTemplateCompiler } from "vue-runtime-template-compiler";

export default {
  props: {
    mode: {
      type: String,
      default: "",
    },
    inside: {
      type: Boolean,
      default: false,
    },
  },
  data: () => ({
    tempSVG: "",
  }),
  components: {
    RuntimeTemplateCompiler,
  },
  computed: {
    hasPreview() {
      return this.mode.length;
    },
  },
  methods: {
    test() {
      console.log(this.mode);
    },
    async grabSelection() {
      await evalScript("createNewDocAndExport()");
      // if (!fs.existsSync(`${spy.path.userData}/live-pathfinder`)) {
      //   fs.mkdirSync(`${spy.path.userData}/live-pathfinder`);
      // }
      // let path = `${spy.path.userData}/live-pathfinder/temp.svg`.replace(
      //   /\\/gm,
      //   "/"
      // );
      // let result = await evalScript(`test('${path}')`);
      // this.tempSVG = fs.readFileSync(
      //   `${spy.path.userData}/live-pathfinder/temp.svg`,
      //   "utf-8"
      // );
      // console.log(this.tempSVG);
    },
  },
};
</script>

<style>
svg {
  width: 100%;
}

.preview-wrapper {
  width: 100%;
  min-height: 60px;
  background: var(--divider-light);
}
</style>
