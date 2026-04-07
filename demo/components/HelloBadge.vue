<template>
  <div class="hello-badge">
    <strong>Vue2 Adapter</strong>
    <span>{{ text }}</span>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "HelloBadge",
  props: {
    text: {
      type: String,
      default: "Rendered by @univer-community/ui-adapter-vue2",
    },
  },
});
</script>

<style scoped>
.hello-badge {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
  background: #f7f8fa;
  border: 1px solid #e5e6eb;
  border-radius: 8px;
  color: #1f2329;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
}
</style>
