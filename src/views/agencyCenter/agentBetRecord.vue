<template>
  <view-box ref="viewBox" class="weui-panel-bottom">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      <span>{{$route.meta.pageTitle}}</span>
      <!-- 日期选择 -->
        <group slot="right" class="group-select-data">
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
       <!-- 投注列表 -->
       <div class="group-bill">
          <tab :line-width=2 active-color='#cd0006' v-model="req.prizeState">
            <tab-item class="vux-center" :selected="select === item" v-for="(item, index) in list" @on-item-click="hanleSelect(index)" :key="index">{{item}}</tab-item>
          </tab>
          <!-- 列表 -->
          <div class="scroller" v-infinite-scroll="pullup" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <group>
              <cell-box class="betting-items" v-for="item in this.bettingList" :key="item.id" @click.native="hanleClickBetting(item)">
                <div class="item-left">
                     <label>{{item.account}}<span>￥{{item.investment}}</span></label>
                     <p>{{item.timeOfBetting}}</p>
                </div>
                <div class="item-right">
                     <span>{{item.bettingResults}}</span>
                </div>
              </cell-box>
            </group>
          </div>
          <!-- 数据显示完了 -->
            <div class="load-completion" v-if="this.loadCompletion">
              <i class="iconfont icon-wry-smile"></i>
              <span>数据加载完了</span>
            </div>
          <!-- 数据显示完了 -->
          <!-- 没有数据显示 -->
          <div class="tips-table" v-if="!(0 in this.bettingList)">
            <i class="iconfont icon-wry-smile"></i>
          <label>暂无数据</label>
        </div>
        <!-- 列表 -->
       </div>
       <!-- 投注列表 -->
    </div>
  </view-box>
</template>

<script>
// common 通用模版
import common from '../mixin/common.mixin.js';
// 接口请求
import { agentBetRecord } from '@/api/index.js';
// 滚动加载插件
import infiniteScroll from 'vue-infinite-scroll';
import { ViewBox, XHeader, Group, CellBox, XButton, XInput, Tab, TabItem, PopupPicker } from 'vux';

export default {
  name: 'agentBetRecord',
  mixins: [common],
  directives: {
    infiniteScroll
  },
  components: {
    ViewBox,
    XHeader,
    Group,
    CellBox,
    XButton,
    XInput,
    Tab,
    TabItem,
    PopupPicker
  },
  data() {
    return {
      select: '', // 选中
      list: ['全部', '已中奖', '未中奖', '等待开奖'], // 列表选项
      bettingList: [], // 投注明细
      busy: false, // 是否滚动加载
      total: 0, // 总页数      
      loadCompletion: false, // 显示加载完成
      req: {
        switchingDate: 'today', // 日期
        page: 0, // 分页
        pageSize: 10, // 条数
        hasLoading: 1, // 控制是否有loading
        search: '', // 搜索内容
        prizeState: 0 // 状态
      }
    };
  },
  computed: {},
  created() {
    // 投注明细
    this.getData();
  },
  methods: {
    /* 数据请求 */

    // 投注明细
    getData() {
      this.busy = true;
      this.req.page = ++this.req.page;
      agentBetRecord(this.req).then(response => {
        this.busy = false;
        this.bettingList = this.bettingList.concat(response.data);
        // response 空时候不请求
        // 判断是否已经是最后一页
        this.total = response.total;
        if (this.req.page == this.total && this.total > 0) {
          this.loadCompletion = true;
        }
        if (!(0 in response.data)) {
          this.busy = true;
        }
      });
      //
    },

    /* 事件操作 */

    // 滚动加载
    pullup() {
      if (!this.busy) {
        this.getData();
      }
    },
    // 清空数据方法
    init() {
      this.bettingList = [];
      this.req.page = 0;
    },
    // 日期切换
    hanleChangeDate() {
      // 日期匹配
      this.dateMatching();
      // 清空数据方法
      this.init();
      // 获取列表数据
      this.getData();
    },
    // 切换奖项状态
    hanleSelect(index) {
      // 清空数据方法
      this.init();
      // 获取列表数据
      this.getData();
    },
    // 跳转到详情
    hanleClickBetting(item) {
      console.log(item.id);
      this.$router.push({ path: './bettingDetails', query: { id: item.id } });
    },
    // 搜索
    hanleSearch() {
      // 清空数据方法
      this.init();
      // 获取列表数据
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
.vux-cell-box:not(:first-child):before {
  border-top: none;
}
.vux-cell-box {
  border-bottom: 1px solid #d9d9d9;
}
</style>
