<template>
  <div id="app">
    <Dropzone @read="copyAction" auto-read />
    <!-- Context menu dynamically changes -->
    <Menus refresh debug :context="dynamicContextMenu" />

    <!-- 
      New component that reports the scripting value of app.selection.length every 200ms 
    -->
    <Watcher
      v-model="selectionLength"
      property="app.selection.length"
      :interval="200"
    />
    <Panel
      @mouseenter="inside = true"
      @mouseleave="inside = false"
      @resize="(val) => (size.width = val.width)"
    >
      <Wrapper>
        <Anno
          v-if="notMini"
          style="height: 16px;"
          size="10px"
          :color="
            `var(--color-${this.hasAnno ? 'default' : 'scrollbar-arrow'})`
          "
          >{{ anno }}</Anno
        >
        <!-- If panel is thin, become CSS grid so buttons expand in size -->
        <Grid v-if="isGridDisplay" :template="dynamicGridTemplate">
          <Button
            v-for="(item, i) in list"
            :key="i"
            :disabled="!canUsePathfinder"
            @clickevt="clickHandler(item.icon, $event)"
            @mouseenter="currentTool = item.icon"
            @mouseleave="currentTool = null"
            ><Icons :name="item.icon"
          /></Button>
        </Grid>
        <!-- If panel is wide, use flexbox -->
        <Button-Group v-else>
          <Button
            width="30px"
            flat
            v-for="(item, i) in list"
            :key="i"
            :disabled="!canUsePathfinder"
            @mouseenter="currentTool = item.icon"
            @mouseleave="currentTool = null"
            ><Icons :name="item.icon"
          /></Button>
        </Button-Group>
        <div v-show="notMini" v-if="enablePreview">
          <Divider />
          <Anno size="10px">{{ selectionLength }}</Anno>
          <Preview :mode="currentTool" />
        </div>
      </Wrapper>
    </Panel>
  </div>
</template>

<script>
import { evalScript, copy } from "brutalism";
import actionlist from "@/assets/actions.js";
import actions from "@/assets/actionList.js";
export default {
  components: {
    Icons: require("./components/Icons.vue").default,
    Preview: require("./components/Preview.vue").default,
  },
  computed: {
    hasAnno() {
      return this.currentTool && this.currentTool.length;
    },
    anno() {
      return this.currentTool
        ? this.capitalizePhrase(this.currentTool)
        : "None";
    },
    canUsePathfinder() {
      return this.selectionLength > 1 || !this.useResponsiveToolbar;
    },
    notMini() {
      return this.size.width > 70;
    },
    dynamicGridTemplate() {
      return this.size.width < 90
        ? `1fr`
        : this.size.width < 140
        ? "1fr 1fr"
        : "1fr 1fr 1fr";
    },
    dynamicContextMenu() {
      return [
        {
          label: "Responsive UI",
          checkable: true,
          checked: this.useResponsiveToolbar,
          callback: this.assignResponsiveUI,
        },
      ];
    },
    prefs() {
      return {
        useResponsiveToolbar: this.useResponsiveToolbar,
        enablePreview: this.enablePreview,
      };
    },
  },
  mounted() {
    this.reset();
    this.getPrefs();
  },
  data: () => ({
    currentTool: "",
    useResponsiveToolbar: true,
    selectionLength: 0,
    isGridDisplay: null,
    enablePreview: true,
    isAlt: false,
    inside: false,
    size: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    list: [
      {
        icon: "unite",
      },
      {
        icon: "minus front",
      },
      {
        icon: "intersect",
      },
      {
        icon: "exclude",
      },
      {
        icon: "divide",
      },
      {
        icon: "trim",
      },
      {
        icon: "merge",
      },
      {
        icon: "crop",
      },
      {
        icon: "outline",
      },
      {
        icon: "minus back",
      },
    ],
  }),
  watch: {
    "size.width"(val) {
      this.isGridDisplay = val < 180;
    },
    prefs: {
      handler(val) {
        this.setPrefs(val);
      },
      deep: true,
    },
  },
  methods: {
    copyAction(evt) {
      let temp = evt[0].split("\r\n");
      let copyString = "";
      temp.forEach((line, i) => {
        copyString += `"${line}"${i < temp.length - 1 ? " +\r\n" : ""}`;
      });
      copy(copyString);
    },
    reset() {
      this.currentTool = null;
      this.isGridDisplay = window.innerWidth < 150;
    },
    assignResponsiveUI(v, i, a) {
      this.useResponsiveToolbar = a;
    },
    async clickHandler(item, evt) {
      if (/(minus\sfront|unite|intersect|exclude)/i.test(item))
        if (evt.altKey) item += "-alt";
      // console.log(item);
      // console.log(evt);
      if (this.selectionLength > 1) {
        let result = await evalScript(`executeAction('${item}')`);
        console.log(result);
      } else {
        console.log(`Can't do it`);
      }
    },
    setPrefs(value = null) {
      if (!value) value = this.prefs;
      window.localStorage.setItem("pathfinder", JSON.stringify(value));
    },
    getPrefs() {
      let data = window.localStorage.getItem("pathfinder");
      data = !data ? this.prefs : JSON.parse(data);
      Object.keys(data).forEach((key) => {
        this[key] = data[key];
      });
    },
    capitalizePhrase(phrase) {
      function capitalize(string) {
        return string[0].toUpperCase() + string.substring(1);
      }
      return !phrase.length
        ? ""
        : !/\s/.test(phrase)
        ? capitalize(phrase)
        : phrase
            .split(" ")
            .map((item) => {
              return capitalize(item);
            })
            .join(" ");
    },
  },
};
</script>

<style>
@media screen and (max-width: 56px) {
  .panel {
    padding: 8px 2px;
  }
  .row > * {
    margin-right: 0px;
  }
}

.button.flat {
  box-sizing: border-box;
  padding: 4px 2px;
}

.button {
  background: transparent !important;
}

.button:hover {
  background: var(--button-flat-hover) !important;
  border-color: var(--button-flat-hover-border);
}

.button:active {
  background: var(--button-flat-active) !important;
  border-color: var(--button-flat-active-border);
}
</style>
