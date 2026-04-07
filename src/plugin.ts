import type { IComponent } from "@univerjs/ui";
import Vue from "vue";
import { DependentOn, Inject, Injector, Plugin, UniverInstanceType } from "@univerjs/core";
import { ComponentManager, UniverUIPlugin } from "@univerjs/ui";

@DependentOn(UniverUIPlugin)
export class UniverVue2AdapterPlugin extends Plugin {
  static override pluginName = "UNIVER_UI_ADAPTER_VUE2_PLUGIN";
  static override packageName = "@univer-community/ui-adapter-vue2";
  static override type = UniverInstanceType.UNIVER_UNKNOWN;

  constructor(
    private readonly _config = {},
    @Inject(Injector) protected readonly _injector: Injector,
    @Inject(ComponentManager) protected readonly _componentManager: ComponentManager,
  ) {
    super();
  }

  override onStarting(): void {
    const { createElement, useEffect, useRef } = this._componentManager.reactUtils;

    this._componentManager.setHandler("vue2", (component: IComponent["component"]) => {
      return (props: Record<string, unknown>) =>
        createElement(VueComponentWrapper, {
          component,
          props: Object.keys(props).reduce<Record<string, unknown>>((acc, key) => {
            if (key !== "key") {
              acc[key] = props[key];
            }
            return acc;
          }, {}),
          reactUtils: { createElement, useEffect, useRef },
        });
    });
  }
}

interface IVueComponentWrapperOptions {
  component: IComponent["component"];
  props: Record<string, unknown>;
  reactUtils: typeof ComponentManager.prototype.reactUtils;
}

export function VueComponentWrapper(options: IVueComponentWrapperOptions) {
  const { component, props, reactUtils } = options;
  const { createElement, useEffect, useRef } = reactUtils;

  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!domRef.current) {
      return;
    }

    const VueComponent = Vue.extend(component as typeof Vue);
    const instance = new VueComponent({
      propsData: props,
    }).$mount(domRef.current);

    return () => {
      instance.$destroy();
      if (domRef.current) {
        domRef.current.innerHTML = "";
      }
    };
  }, [component, props]);

  return createElement("div", { ref: domRef });
}
