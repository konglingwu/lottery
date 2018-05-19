<template>
  <view-box ref="viewBox">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" v-bind:title="$route.meta.pageTitle"></x-header>
    <div class="main main-padding-top">
        <!-- 日期选择 -->
        <group class="group-select-data">
        <popup-picker :data="dataList" v-model="selectDate" @on-change="onChange"></popup-picker>
        </group>
        <!-- 日期选择 -->
        <!-- 搜索列表 -->
       <div class="group-bill">
        <tab :line-width=2 active-color='#fc378c' v-model="prizeState">
          <tab-item class="vux-center" :selected="select === item" v-for="(item, index) in list" @on-item-click="hanleSelect(index)" :key="index">{{item}}</tab-item>
        </tab>
        <swiper v-model="prizeState" height="100px" :show-dots="false">
        <swiper-item v-for="(item, index) in list" :key="index">
          <div class="tab-swiper vux-center">{{item}}{{index}} Container</div>
        </swiper-item>
       </swiper>
       </div>
       <!-- 搜索列表 -->        
    </div>
  </view-box>
</template>

<script>
// common 通用模版
import common from "../mixin/common.mixin.js";
import {
  ViewBox,
  XHeader,
  Group,
  CellBox,
  XSwitch,
  XButton,
  Confirm,
  Tab,
  TabItem,
  Swiper,
  SwiperItem,
  PopupPicker
} from "vux";

export default {
  name: "agencyCenter",
  mixins: [common],
  components: {
    ViewBox,
    XHeader,
    Group,
    CellBox,
    XSwitch,
    XButton,
    Confirm,
    Tab,
    TabItem,
    Swiper,
    SwiperItem,
    PopupPicker
  },
  data() {
    return {
      prizeState: 0, // 状态
      select: "", // 选中
      list: ["所有类型", "提现记录", "充值记录"] // 列表选项
    };
  },
  computed: {},
  created() {},
  methods: {
    /* 数据请求 */
    

    /* 事件操作 */   

    // 切换奖项状态
    hanleSelect(index) {
      index = this.prizeState;
      console.log(index);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
