<template>
  <div class="instruction-wrapper">
    <div class="instruction-dialog">
      <label class="title">{{ title }}</label>
      <label class="desc">{{ desc }}</label>
      <slot v-bind:htmlElement="htmlElement"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "InstructionDialog",
  props: {
    title: String,
    desc: String,
  },
};
</script>

<style lang="scss" scpoed>
@import "@/style/main.scss";
.instruction-wrapper {
  width: 100%;
  .instruction-dialog {
    padding: 20px;
    background-color: #ffffe1;
    border: 1px solid #f0f0d2;
    border-radius: 6px;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    .title {
      font-size: 14px;
      color: $web-font-color-black;
      font-weight: 700;
      padding-bottom: 6px;
      user-select: text;
      cursor: text;
    }
    .desc,
    ul,
    ol,
    li {
      font-size: 12px;
      color: $web-font-color-black;
      user-select: text;
      cursor: text;
    }
  }
}
</style>