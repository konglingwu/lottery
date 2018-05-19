<template>
  <view-box ref="viewBox">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" v-bind:title="$route.meta.pageTitle"></x-header>
    <div class="main main-padding-top">
    </div>
  </view-box>
</template>

<script>
import {
  ViewBox,
  XHeader,
  Group,
  CellBox,
  XSwitch,
  XButton,
  Confirm
} from "vux";

export default {
  name: "agencyCenter",
  components: {
    ViewBox,
    XHeader,
    Group,
    CellBox,
    XSwitch,
    XButton,
    Confirm
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {
    /* 数据请求 */
    /* 事件操作 */
  }
};
</script>

<style lang="scss" scoped>
</style>
