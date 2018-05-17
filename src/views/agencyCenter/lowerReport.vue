<template>
  <view-box ref="viewBox">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" v-bind:title="$route.meta.pageTitle"></x-header>
    <div class="main main-padding-top">
        <x-table :cell-bordered="false" style="background-color:#fff;">
        <thead>
          <tr style="background-color: rgb(247, 247, 247);">
            <th>账号</th>
            <th>类型</th>
            <th>报表人数</th>
            <th>盈利</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Apple</td>
            <td>$1.25</td>
            <td> x 1</td>
            <td> x 1</td>
          </tr>
          <tr>
            <td>Banana</td>
            <td>$1.20</td>
            <td> x 2</td>
            <td> x 2</td>
          </tr>
        </tbody>
        </x-table>
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
  Confirm,
  XTable
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
    Confirm,
    XTable
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
</style>
