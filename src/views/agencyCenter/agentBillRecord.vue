<template>
  <view-box ref="viewBox" class="weui-panel-bottom">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      <span>{{$route.meta.pageTitle}}</span>
      <!-- 日期选择 -->
        <group class="group-select-data">
          <popup-picker :data="dataList" v-model="selectDate" @on-change="hanleChangeDate"></popup-picker>
        </group>
      <!-- 日期选择 -->      
    </x-header>
    <div class="main main-padding-top">
        <!-- 搜索input -->
        <group class="group-search">
            <x-input v-model="req.search" placeholder="下级投注查询">
              <x-button slot="right" type="warn" mini @click.native="hanleSearch">搜索</x-button>
            </x-input>
       </group>
       <!-- 搜索input -->      
        <!-- 搜索列表 -->
       <div class="group-bill">
        <tab :line-width=2 active-color='#fc378c' v-model="prizeState">
          <tab-item class="vux-center" :selected="select === item" v-for="(item, index) in list" @on-item-click="hanleSelect(index)" :key="index">{{item}}</tab-item>
        </tab>
          <!-- 列表 -->
          <div class="scroller" v-infinite-scroll="pullup" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <group>
              <cell-box class="betting-items" v-for="item in this.transactionList" :key="item.id" @click.native="hanleClickBetting(item)">
                <div class="item-left">
                     <label>{{item.account}}</label>
                     <p>{{item.tradingTime}}</p>
                </div>
                <div class="item-right">
                     <i class="red" v-if="item.tradingAmount > 0">{{item.tradingAmount}}</i>
                     <i class="green" v-else>{{item.tradingAmount}}</i>
                     <span class="gray">{{item.tradingType}}</span>
                </div>
              </cell-box>
            </group>
          </div>
          <!-- 没有数据显示 -->
          <div class="tips-table" v-if="!(0 in this.transactionList)">
            <i class="iconfont icon-wry-smile"></i>
          <label>暂无数据</label>
        </div>
        <!-- 列表 -->
       </div>
       <!-- 搜索列表 -->        
    </div>
  </view-box>
</template>

<script>
// common 通用模版
import common from "../mixin/common.mixin.js";
// 接口请求
import { agentBillRecord } from "@/api/index.js";
// 滚动加载插件
import infiniteScroll from 'vue-infinite-scroll'
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
  SwiperItem,
  PopupPicker
} from "vux";

export default {
  name: "agentBillRecord",
  mixins: [common],
  directives: {
    infiniteScroll
  },    
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
    SwiperItem,
    PopupPicker
  },
  data() {
    return {
      prizeState: 0, // 状态
      select: "", // 选中
      transactionList: [], // 投注明细
      busy: false,      // 是否滚动加载 
      req: {
        switchingDate: "today", // 日期
        pageNo: 0, // 分页
        pageSize: 10, // 条数
        hasLoading: 1, // 控制是否有loading
        search: "", // 搜索内容
        prizeState: 0 // 状态
      },      
      list: ["所有类型", "提现记录", "充值记录"] // 列表选项
    };
  },
  computed: {},
  created() {
    // 交易明细
    this.getData()
  },
  methods: {
    /* 数据请求 */
    // 交易明细
      getData() {
      this.busy = true
      this.req.pageNo = ++this.req.pageNo          
      agentBillRecord(this.req).then(response => {
        this.transactionList = this.transactionList.concat(response)
        // response 空时候不请求
        console.log(response,'hasLoading');
        if (!(0 in response)) {
          this.busy = false
        }
      });
      this.busy = false
    },  

    /* 事件操作 */ 

    // 滚动加载
    pullup() {
      console.log('滚动加载')
      if (this.busy) {
        this.getData()
      }
    },  

    // 日期切换
    hanleChangeDate() {
      // 日期匹配
      this.dateMatching();
      // 初始化数据
      this.transactionList = [];
      this.req.pageNo = 0;
      // 获取列表数据
      this.getData();
    },
    // 切换奖项状态
    hanleSelect(index) {
      index = this.prizeState;
      console.log(index);
    },
    // 搜索
    hanleSearch() {
      this.transactionList = [];
      this.req.pageNo = 0;      
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
