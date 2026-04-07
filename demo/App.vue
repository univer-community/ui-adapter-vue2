<template>
  <div class="page">
    <div ref="container" class="container"></div>
  </div>
</template>

<script lang="ts">
import { LocaleType, mergeLocales, Univer, UniverInstanceType } from "@univerjs/core";
import { FUniver } from "@univerjs/core/facade";
import DesignEnUS from "@univerjs/design/locale/en-US";
import { UniverDocsPlugin } from "@univerjs/docs";
import { UniverDocsUIPlugin } from "@univerjs/docs-ui";
import DocsUIEnUS from "@univerjs/docs-ui/locale/en-US";
import { UniverFormulaEnginePlugin } from "@univerjs/engine-formula";
import { UniverRenderEnginePlugin } from "@univerjs/engine-render";
import { UniverSheetsPlugin } from "@univerjs/sheets";
import { UniverSheetsFormulaPlugin } from "@univerjs/sheets-formula";
import { UniverSheetsFormulaUIPlugin } from "@univerjs/sheets-formula-ui";
import SheetsFormulaUIEnUS from "@univerjs/sheets-formula-ui/locale/en-US";
import { UniverSheetsNumfmtPlugin } from "@univerjs/sheets-numfmt";
import { UniverSheetsNumfmtUIPlugin } from "@univerjs/sheets-numfmt-ui";
import SheetsNumfmtUIEnUS from "@univerjs/sheets-numfmt-ui/locale/en-US";
import { UniverSheetsUIPlugin } from "@univerjs/sheets-ui";
import SheetsUIEnUS from "@univerjs/sheets-ui/locale/en-US";
import SheetsEnUS from "@univerjs/sheets/locale/en-US";
import { UniverUIPlugin } from "@univerjs/ui";
import UIEnUS from "@univerjs/ui/locale/en-US";
import Vue from "vue";
import { UniverVue2AdapterPlugin } from "../src";
import HelloBadge from "./components/HelloBadge.vue";

import "@univerjs/design/lib/index.css";
import "@univerjs/ui/lib/index.css";
import "@univerjs/docs-ui/lib/index.css";
import "@univerjs/sheets-ui/lib/index.css";
import "@univerjs/sheets-formula-ui/lib/index.css";
import "@univerjs/sheets-numfmt-ui/lib/index.css";

import "@univerjs/engine-formula/facade";
import "@univerjs/ui/facade";
import "@univerjs/docs-ui/facade";
import "@univerjs/sheets/facade";
import "@univerjs/sheets-ui/facade";
import "@univerjs/sheets-formula/facade";
import "@univerjs/sheets-numfmt/facade";

export default Vue.extend({
  name: "App",
  data() {
    return {
      univer: null as Univer | null,
      lifecycleListener: null as (() => void) | null,
    };
  },
  mounted() {
    const univer = new Univer({
      locale: LocaleType.EN_US,
      locales: {
        [LocaleType.EN_US]: mergeLocales(
          DesignEnUS,
          UIEnUS,
          DocsUIEnUS,
          SheetsEnUS,
          SheetsUIEnUS,
          SheetsFormulaUIEnUS,
          SheetsNumfmtUIEnUS,
        ),
      },
    });

    univer.registerPlugin(UniverRenderEnginePlugin);
    univer.registerPlugin(UniverFormulaEnginePlugin);
    univer.registerPlugin(UniverUIPlugin, {
      container: this.$refs.container as HTMLDivElement,
    });
    univer.registerPlugin(UniverVue2AdapterPlugin);
    univer.registerPlugin(UniverDocsPlugin);
    univer.registerPlugin(UniverDocsUIPlugin);
    univer.registerPlugin(UniverSheetsPlugin);
    univer.registerPlugin(UniverSheetsUIPlugin);
    univer.registerPlugin(UniverSheetsFormulaPlugin);
    univer.registerPlugin(UniverSheetsFormulaUIPlugin);
    univer.registerPlugin(UniverSheetsNumfmtPlugin);
    univer.registerPlugin(UniverSheetsNumfmtUIPlugin);

    univer.createUnit(UniverInstanceType.UNIVER_SHEET, {});

    const univerAPI = FUniver.newAPI(univer);
    univerAPI.registerComponent("Vue2HelloBadge", HelloBadge, {
      framework: "vue2",
    });

    this.lifecycleListener = univerAPI.addEvent(univerAPI.Event.LifeCycleChanged, ({ stage }) => {
      if (stage === univerAPI.Enum.LifecycleStages.Steady) {
        univerAPI.openSidebar({
          id: "vue2-adapter-demo-sidebar",
          width: 320,
          header: {
            label: "Vue2 Component",
          },
          children: {
            label: {
              name: "Vue2HelloBadge",
              props: {
                text: "Mounted with framework: vue2",
              },
            },
          },
        });
      }
    });

    this.univer = univer;
  },
  beforeDestroy() {
    if (this.univer) {
      this.lifecycleListener?.();
      this.lifecycleListener = null;

      this.univer?.dispose();
      this.univer = null;
    }
  },
});
</script>

<style>
html,
body,
#app {
  height: 100%;
  margin: 0;
}

.page {
  height: 100%;
}

.container {
  height: 100%;
}
</style>
