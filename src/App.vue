<template>
  <div id="app">
    <Menus refresh debug />
    <Panel
      @mouseenter="preview = true"
      @mouseleave="preview = false"
      @resize="measurements"
    >
      <Wrapper>
        <Anno
          style="height: 16px;"
          size="10px"
          :color="
            `var(--color-${this.hasAnno ? 'default' : 'scrollbar-arrow'})`
          "
          >{{ anno }}</Anno
        >
        <Button-Group>
          <Button
            width="30px"
            flat
            v-for="(item, i) in list"
            :key="i"
            @mouseenter="currentTool = item.icon"
            @mouseleave="currentTool = null"
            ><Icons :name="item.icon"
          /></Button>
        </Button-Group>
        <Divider />
        <Anno size="10px">{{ size.width }}</Anno>
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
  },
  data: () => ({
    currentTool: "",
    size: {
      width: 20,
      height: 20,
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
  methods: {
    enterTest() {
      console.log("ENTER");
    },
    exitTest() {
      console.log("EXIT");
    },
    capitalizePhrase(phrase) {
      console.log(phrase);
      function capitalize(string) {
        return string[0].toUpperCase() + string.substring(1);
      }
      if (!phrase.length) return "";
      if (!/\s/.test(phrase)) return capitalize(phrase);
      console.log(phrase.split(" "));
      return phrase
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
    padding: 8px auto;
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
