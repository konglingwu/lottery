<template>
  <view-box ref="viewBox" class="weui-panel-bottom">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      <span>{{$route.meta.pageTitle}}</span>
      <!-- 日期选择 -->
        <group class="group-select-data">
          <popup-picker :data="dataList" v-model="selectDate" @on-change="onChange"></popup-picker>
        </group>
      <!-- 日期选择 -->      
    </x-header>
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
// common 通用模版
import common from '../mixin/common.mixin.js'
import {
  ViewBox,
  XHeader,
  Group,
  CellBox,
  XSwitch,
  XButton,
  Confirm,
  XTable,
  PopupPicker
} from "vux";

export default {
  name: "lowerReport",
  mixins: [common],  
  components: {
    ViewBox,
    XHeader,
    Group,
    CellBox,
    XSwitch,
    XButton,
    Confirm,
    XTable,
    PopupPicker
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
