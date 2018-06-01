<template>
  <view-box ref="viewBox" class="weui-panel-bottom">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      <span>{{$route.meta.pageTitle}}</span>
      <!-- 日期选择 -->
        <group class="group-select-data" slot="right">
          <popup-picker :data="dataList" v-model="selectDate" @on-change="hanleChangeDate"></popup-picker>
        </group>
      <!-- 日期选择 -->
    </x-header>
    <div class="main main-padding-top">
        <!-- 搜索input -->
         <group class="group-search">
            <x-input v-model="req.search" placeholder="下级报表查询">
              <x-button slot="right" type="warn" mini @click.native="hanleSearch">搜索</x-button>
            </x-input>
         </group>
         <!-- 搜索input -->
         <!-- 搜索列表 -->
        <flexbox :gutter="0" wrap="wrap" class="group-flexbox" v-for="item in agentReportList" :key="item.id">
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>{{item.bettingAmount}}</h3>
            <span>投注金额</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>{{item.winningAmount}}</h3>
            <span>中奖金额</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>{{item.giftsActivities}}</h3>
            <span>活动礼金</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>{{item.teamRebate}}</h3>
            <span>团队返点</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>{{item.teamProfit}}</h3>
            <span>团队盈利</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>{{item.rechargeAmount}}</h3>
            <span>充值金额</span>
            </div>
          </flexbox-item>    
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>{{item.putForwardAmount}}</h3>
            <span>提现金额</span>
            </div>
          </flexbox-item> 
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>{{item.firstPeople}}</h3>
            <span>首冲人数</span>
            </div>
          </flexbox-item>  
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>{{item.registerPeople}}</h3>
            <span>注册人数</span>
            </div>
          </flexbox-item>  
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>{{item.bettingPeople}}</h3>
            <span>投注人数</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>{{item.lowerPeople}}</h3>
            <span>下级人数</span>
            </div>
          </flexbox-item>  
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>{{item.teamBalance}}</h3>
            <span>团队余额</span>
            </div>
          </flexbox-item>  
           <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>{{item.agentRebate}}</h3>
            <span>代理返点</span>
            </div>
          </flexbox-item>  
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>{{item.agencyWages}}</h3>
            <span>代理工资</span>
            </div>
          </flexbox-item>  
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>{{item.proxyBonus}}</h3>
            <span>代理分红</span>
            </div>
          </flexbox-item>                                                                                                                                                    
        </flexbox>
        <!-- 搜索列表 -->
    </div>
  </view-box>
</template>

<script>
// common 通用模版
import common from "../mixin/common.mixin.js";
// 接口请求
import { agentReport } from "@/api/index.js";
import {
  ViewBox,
  XHeader,
  Group,
  CellBox,
  XInput,
  XButton,
  Flexbox,
  FlexboxItem,
  PopupPicker
} from "vux";

export default {
  name: "agentReport",
  mixins: [common],
  components: {
    ViewBox,
    XHeader,
    Group,
    CellBox,
    XInput,
    XButton,
    Flexbox,
    FlexboxItem,
    PopupPicker
  },
  data() {
    return {
      agentReportList: [], // 代理列表
      req: {
        switchingDate: "today", // 日期
        search: "" || this.$route.query.account, // 搜索内容
      }
    };
  },
  computed: {},
  created() {
    // console.log(this.selectDate.push(this.$route.query.selectDate))
    // 重置日期
    this.resetDate();
    // 获取列表数据
    this.getData();
  },
  methods: {
    /* 数据请求 */
    // 获取列表数据
    getData() {
      agentReport(this.req).then(response => {
        console.log(response);
        this.agentReportList = [];
        this.agentReportList.push(response.data);
      });
    },
    /* 事件操作 */

    // 重置日期
    resetDate() {
      console.log(this.$route.query.selectDate);
      console.log(typeof this.$route.query.selectDate);
      if (this.$route.query.selectDate !== undefined) {
        this.selectDate = [this.$route.query.selectDate];
        console.log(this.selectDate[0]);
      }
      // 日期匹配
      this.dateMatching();
    },
    // 日期切换
    hanleChangeDate() {
      // 日期匹配
      this.dateMatching();
      // 获取列表数据
      this.getData();
    },
    // 搜索
    hanleSearch() {
      this.agentReportList = [];
      this.req.page = 0;  
      // 获取列表数据               
      this.getData();
    }
  }
};
</script>

<style lang="scss" scoped>
.group-flexbox {
  background: white;
  padding: 10px;
  text-align: center;

  .vux-flexbox-item {
    padding: 24px 0;
    border-bottom: 1px solid #d0d0d0; /*no*/
    .flex-item {
      h3 {
        font-size: 18px; /*px*/
        color: #ff6818;
      }
      span {
        font-size: 16px; /*px*/
        color: #333;
      }
    }
  }
  .vux-flexbox-item:nth-last-of-type(1) {
    border-bottom: none;
  }
  .vux-flexbox-item:nth-last-of-type(2) {
    border-bottom: none;
  }
  .vux-flexbox-item:nth-last-of-type(3) {
    border-bottom: none;
  }
  .vux-flexbox-item:nth-child(3n + 2) {
    border-left: 1px solid #d0d0d0; /*no*/
    border-right: 1px solid #d0d0d0; /*no*/
  }
}
</style>
