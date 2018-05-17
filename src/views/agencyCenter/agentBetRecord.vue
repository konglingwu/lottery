<template>
  <view-box ref="viewBox">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" v-bind:title="$route.meta.pageTitle"></x-header>
    <div class="main main-padding-top">
        <group class="group-search">
            <x-input v-model="search" placeholder="下级报表查询">
              <x-button slot="right" type="warn" mini>搜索</x-button>
            </x-input>
       </group>
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
  XInput,
  Tab,
  TabItem,
  Swiper,
  SwiperItem
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
    XInput,
    Tab,
    TabItem,
    Swiper,
    SwiperItem
  },
  data() {
    return {
      search: "", // 搜索内容
      select: "", // 选中
      prizeState: 0,
      list: ["全部", "已中奖", "未中奖", "等待开奖"]
    };
  },
  computed: {},
  created() {},
  methods: {
    hanleSelect(index) {
      index = this.prizeState;
      console.log(index);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
