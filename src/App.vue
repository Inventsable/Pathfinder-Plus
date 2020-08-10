<template>
  <div id="app">
    <Menus refresh debug />
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
        <Grid v-if="isGridDisplay" :template="dynamicGridTemplate">
          <Button
            v-for="(item, i) in list"
            :key="i"
            :disabled="!canUsePathfinder"
            @mouseenter="currentTool = item.icon"
            @mouseleave="currentTool = null"
            ><Icons :name="item.icon"
          /></Button>
        </Grid>
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
        <div v-show="notMini">
          <Divider />
          <Anno size="10px">{{ selectionLength }}</Anno>
        </div>
        <Anno size="10px">{{ size.width }}</Anno>
        <Anno size="12px">{{ isGridDisplay }}</Anno>
      </Wrapper>
    </Panel>
  </div>
</template>

<script>
import { evalScript } from "brutalism";
export default {
  components: {
    Icons: require("./components/Icons.vue").default,
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
      return this.selectionLength > 1;
    },
    notMini() {
      return this.size.width > 70;
    },
    dynamicGridTemplate() {
      if (this.size.width < 90) return `1fr`;
      else if (this.size.width < 140) return "1fr 1fr";
      else return "1fr 1fr 1fr";
    },
  },
  mounted() {
    this.reset();
  },
  data: () => ({
    currentTool: "",
    selectionLength: 0,
    isGridDisplay: null,
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
    inside(val) {
      // if (!val) this.selectionLength = 0;
    },
    "size.width"(val) {
      console.log(val);
      this.isGridDisplay = val < 180;
    },
    isGridDisplay(val) {
      console.log("GRID DISPLAY:", val);
    },
  },
  methods: {
    reset() {
      this.currentTool = null;
      this.isGridDisplay = window.innerWidth < 150;
      console.log(window.innerWidth < 150, window.innerWidth);
      console.log(this.isGridDisplay);
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
    measurements(evt) {
      console.log(evt);
      this.size.width = evt.width;
      this.size.height = evt.height;
    },
    // Can invoke any function as await evalScript(`functionName('${parameterVar}')`) if script is preloaded
    // Check out the "script-path" prop of <Panel> component above for easy script file load.
    async runTestScript() {
      let result = await evalScript(`
        function test() {
          alert('Hello world!')
          return 'result from JSX file'
        }
        test();
      `);
      console.log(result);
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
  border: red !important;
  width: 30px !important;
  padding: 4px 2px;
}
</style>
