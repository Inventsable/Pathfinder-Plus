<template>
  <div id="app">
    <!-- Context menu dynamically changes -->
    <Menus refresh debug :context="dynamicContextMenu" />

    <!-- 
      New component that reports the scripting value of app.selection.length every 200ms 
    -->
    <!-- <Watcher
      v-model="selectionLength"
      property="app.selection.length"
      :interval="200"
    /> -->
    <Panel
      script-path="./host/[appName]"
      @mouseenter="inside = true"
      @mouseleave="inside = false"
      @resize="(val) => (size.width = val.width)"
    >
      <Wrapper>
        <Anno
          v-if="notMini && this.showAnno"
          style="height: 16px; white-space: nowrap;"
          size="10px"
          :color="
            `var(--color-${this.hasAnno ? 'default' : 'scrollbar-arrow'})`
          "
          >{{ anno }}</Anno
        >
        <!-- If panel is thin, become CSS grid so buttons expand in size -->
        <Grid v-if="isGridDisplay" :template="dynamicGridTemplate">
          <Button
            v-for="(item, i) in dynamicButtonList"
            :key="i"
            :disabled="!canUsePathfinder"
            @clickevt="clickHandler(item, $event)"
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
            v-for="(item, i) in dynamicButtonList"
            :key="i"
            @clickevt="clickHandler(item, $event)"
            :disabled="!canUsePathfinder"
            @mouseenter="currentTool = item.icon"
            @mouseleave="currentTool = null"
            ><Icons :name="item.icon"
          /></Button>
        </Button-Group>
        <!-- <Button label="test" @click="testExport" /> -->
        <div v-show="notMini" v-if="false">
          <Divider />
          <Preview ref="preview" :mode="currentTool" :inside="inside" />
        </div>
      </Wrapper>
    </Panel>
  </div>
</template>

<script>
import { evalScript, copy } from "brutalism";
import spy from "cep-spy";
export default {
  components: {
    Icons: require("./components/Icons.vue").default,
    Preview: require("./components/Preview.vue").default,
  },
  computed: {
    hasAnno() {
      return this.showAnno && this.currentTool && this.currentTool.length;
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
      return this.size.width < 88
        ? `1fr`
        : this.size.width < 128
        ? "1fr 1fr"
        : "1fr 1fr 1fr";
    },
    dynamicContextMenu() {
      return [
        {
          label: "Show annotation",
          checkable: true,
          checked: this.showAnno,
          callback: this.assignShowAnno,
        },
        {
          label: "Responsive UI",
          checkable: true,
          enabled: false,
          checked: this.useResponsiveToolbar,
          callback: this.assignResponsiveUI,
        },
        {
          label: "Extra functions",
          checkable: true,
          checked: this.hasExtraFuncs,
          callback: this.assignExtras,
        },
        {
          label: "Retain selection",
          checkable: true,
          checked: this.combSelection,
          callback: this.assignCombSelection,
        },
        {
          label: "Live preview",
          checkable: true,
          enabled: false,
          checked: false,
          callback: this.assignPreview,
        },
      ];
    },
    prefs() {
      return {
        useResponsiveToolbar: this.useResponsiveToolbar,
        enablePreview: this.enablePreview,
        combSelection: this.combSelection,
        hasExtraFuncs: this.hasExtraFuncs,
        showAnno: this.showAnno,
      };
    },
    dynamicButtonList() {
      if (this.hasExtraFuncs) {
        let list = [].concat(this.extraFuncs, this.list);
        return [].concat(list, this.extraList);
      } else {
        return this.list;
      }
    },
  },
  mounted() {
    this.reset();
    this.getPrefs();
    // console.log(this.dynamicButtonList);
  },
  data: () => ({
    currentTool: "",
    useResponsiveToolbar: false,
    selectionLength: 0,
    showAnno: true,
    hasExtraFuncs: true,
    combSelection: true,
    isGridDisplay: null,
    enablePreview: false,
    isAlt: false,
    inside: false,
    size: {
      width: window.innerWidth,
      height: window.innerHeight,
    },
    extraFuncs: [
      {
        icon: "compound path",
        code: 'app.executeMenuCommand("compoundPath")',
      },
      {
        icon: "clipping mask",
      },
    ],
    extraList: [
      {
        icon: "hard mix",
        code: 'app.executeMenuCommand("Live Pathfinder Hard Mix")',
      },
      {
        icon: "soft mix",
        code: 'app.executeMenuCommand("Live Pathfinder Soft Mix")',
      },
    ],
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
      this.isGridDisplay = val < 160;
    },
    prefs: {
      handler(val) {
        this.setPrefs(val);
      },
      deep: true,
    },
    currentTool(val) {
      // console.log(val);
      // if (this.selectionLength > 1) {
      //   if (val && val.length) this.$refs.preview.grabSelection();
      // } else {
      //   console.log("NONE");
      // }
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
    assignShowAnno(v, i, a) {
      this.showAnno = a;
    },
    assignResponsiveUI(v, i, a) {
      this.useResponsiveToolbar = a;
    },
    assignCombSelection(v, i, a) {
      this.combSelection = a;
    },
    assignExtras(v, i, a) {
      this.hasExtraFuncs = a;
    },
    assignPreview(v, i, a) {
      this.enablePreview = a;
    },
    async clickHandler(item, evt) {
      let opts = this.prefs;
      if (!item.code) {
        let str = item.icon;
        if (/(minus\sfront|unite|intersect|exclude)/i.test(str))
          if (evt.altKey) str += "-alt";
        if (this.selectionLength > 1) {
          let result = await evalScript(
            `executeAction('${str}', '${JSON.stringify(opts)}')`
          );
        } else {
          // Error would be thrown
        }
      } else {
        let result = await evalScript(item.code);
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

@media screen and (max-width: 80px) {
  .panel {
    padding: 8px 0px;
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

.button {
  transition: all 100ms var(--quint) 20ms;
}
</style>
