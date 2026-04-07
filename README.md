# @univer-community/ui-adapter-vue2

`@univer-community/ui-adapter-vue2` is a Univer UI adapter plugin that lets you render Vue 2 components inside Univer's component system.

After registering the plugin, you can declare components with `framework: "vue2"` and render them in sidebars, panels, and other Univer UI slots.

## When to Use It

- Your application is still based on Vue 2.
- You are already using `@univerjs/ui`.
- You want to reuse existing Vue 2 components in Univer UI instead of rewriting them in React.

## Version Compatibility

- vue 2.x

## Installation

```bash
pnpm add @univer-community/ui-adapter-vue2
```

Your project also needs the relevant Univer core and UI packages, such as `@univerjs/core`, `@univerjs/ui`, and `@univerjs/engine-render`.

## Plugin Registration

The key integration point is plugin registration. Based on the demo, register the adapter right after `UniverUIPlugin`:

```ts
import { UniverVue2AdapterPlugin } from "@univer-community/ui-adapter-vue2";

// Should be registered after UniverUIPlugin
univer.registerPlugin(UniverVue2AdapterPlugin);
```

## Register a Vue 2 Component

The demo in this repository uses the Univer facade API, which is also the recommended way to register components:

```ts
import { FUniver } from "@univerjs/core/facade";
import MyBadge from "./MyBadge.vue";

const univerAPI = FUniver.newAPI(univer);

univerAPI.registerComponent("MyBadge", MyBadge, {
  framework: "vue2",
});
```

You can then reference that component in Univer UI configuration:

```ts
univerAPI.openSidebar({
  id: "custom-sidebar",
  width: 320,
  header: {
    label: "Vue2 Component",
  },
  children: {
    content: {
      name: "MyBadge",
      props: {
        text: "Mounted with framework: vue2",
      },
    },
  },
});
```

## How It Works

This plugin registers a `"vue2"` handler on `ComponentManager`:

- Univer UI still renders the outer wrapper through React.
- The adapter instantiates the Vue 2 component inside the mount point.
- Incoming component `props` are passed into the Vue 2 instance through `propsData`.
- The Vue instance is destroyed automatically when the component is unmounted.

## Local Development

Install dependencies:

```bash
pnpm install
```

Start the demo:

```bash
pnpm dev
```

Run type checking:

```bash
pnpm typecheck
```

Build the library:

```bash
pnpm build
```

Build the demo:

```bash
pnpm build:demo
```

## Build Output

Running `pnpm build` generates:

- `lib/es`: ESM output
- `lib/cjs`: CommonJS output
- `lib/types`: TypeScript declaration files

## Demo

The `demo/` directory shows a complete integration flow:

- Initialize a Univer instance with the required plugins
- Register `UniverVue2AdapterPlugin`
- Register the Vue 2 component `HelloBadge.vue`
- Open a sidebar and render that component after the Univer lifecycle reaches the steady stage

## License

MIT
