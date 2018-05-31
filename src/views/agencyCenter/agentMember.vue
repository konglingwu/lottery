<template>
  <view-box ref="viewBox" class="weui-panel-bottom">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" v-bind:title="$route.meta.pageTitle"></x-header>
    <div class="main main-padding-top">
        <!-- 列表 -->
        <div class="scroller" v-infinite-scroll="pullup" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
        <x-table :cell-bordered="false" style="background-color:#fff;">
        <thead>
          <tr style="background-color: rgb(247, 247, 247);">
            <th>账号</th>
            <th>类型</th>
            <th>登录时间</th>
            <th>下级人数</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in memberList" :key="item.id" @click="hanleCheck(item)" class="table-color">
            <td class="blue">{{item.account}}</td>
            <td>{{item.typeView}}</td>
            <td>{{item.loginTime}}</td>
            <td class="red">{{item.lowerPeople}}</td>
          </tr>
        </tbody>
        </x-table>
        <!-- 数据显示完了 -->
          <div class="load-completion" v-if="this.loadCompletion">
            <i class="iconfont icon-wry-smile"></i>
            <span>数据加载完了</span>
           </div>
        <!-- 数据显示完了 -->        
        </div>
        <!-- 没有数据显示 -->
        <div class="tips-table" v-if="!(0 in this.memberList)">
          <i class="iconfont icon-wry-smile"></i>
          <label>暂无数据</label>
        </div>
        <!-- 列表 -->
        <!-- 弹出层 -->
        <actionsheet v-model="popup" :menus="popupOption" @on-click-menu="hanleSelect" show-cancel>
          <p slot="header" class="popup-blue">
            <i class="iconfont icon-user"></i>
            <span v-text="req.account"></span>
          </p>
        </actionsheet>
        <!-- 弹出层 -->
        <!-- 查看返点 -->
        <div v-transfer-dom>
          <popup v-model="showRebate" position="bottom" max-height="69%" style="overflow: hidden;">
            <div class="popup-list">
              <cell class="popup-title"><label>查看详情</label><i class="iconfont icon-close" @click="hanleCloseRebate"></i></cell>
                <div class="item" v-for="item in rebateDetails" :key="item.id">
                  <label class="left">{{item.lotteryType}}</label>
                  <label class="right">{{item.rebate}}</label>
                </div>
            </div>
          </popup>
          </div>
        <!-- 查看返点 -->
    </div>
  </view-box>
</template>

<script>
// 接口请求
import { agentMember, rebateDetails } from "@/api/index.js";
// 滚动加载插件
import infiniteScroll from "vue-infinite-scroll";
import {
  ViewBox,
  XHeader,
  Group,
  CellBox,
  XSwitch,
  XButton,
  Confirm,
  XTable,
  Actionsheet,
  Cell,
  TransferDom,
  Popup
} from "vux";

export default {
  name: "agentMember",
  directives: {
    TransferDom,
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
    XTable,
    Actionsheet,
    Cell,
    Popup
  },
  data() {
    return {
      popup: false, // 控制弹出层
      memberList: [], // 会员列表
      popupOption: {}, // 弹出选项
      busy: false, // 是否滚动加载
      loadCompletion:false, // 显示加载完成      
      req: {
        page: 0, // 分页
        pageSize: 10, // 条数
        account: "", // 会员名称
        userID: "" // 会员ID
      },
      showRebate: false, // 返点详情是否显示
      rebateDetails: [] // 返点详情
    };
  },
  computed: {},
  created() {
    // 获取会员管理
    this.getData();
  },
  methods: {
    /* 数据请求 */

    // 获取会员管理
    getData() {
      this.busy = true;
      this.req.page = ++this.req.page;
      agentMember(this.req).then(response => {
        this.memberList = this.memberList.concat(response.data);
        this.busy = false;
        // 判断是否已经是最后一页
        if(this.req.page == response.total){
          this.loadCompletion = true
        }        
        // response 空时候不请求
        console.log(response);
        if (!(0 in response.data)) {
          this.busy = true;
        }
      });
    },
    // 返点详情
    getRebateDetails() {
      rebateDetails(this.req).then(response => {
        this.rebateDetails = response.data;
      });
    },

    /* 事件操作 */

    // 滚动加载
    pullup() {
      console.log("滚动加载");
      if (!this.busy) {
        this.getData();
      }
    },

    // 弹出层
    hanleCheck(item) {
      this.popupOption = {}; // 每次进入清空
      this.popup = true; // 弹出框显示
      this.req.account = item.account; // 赋值会员名称
      this.req.userID = item.id; // 赋值会员ID
      this.popupOption.rebate = "查看返点"; // 赋值查看返点
      if (item.type && item.lowerPeople) {
        this.popupOption.lower = "查看下级"; // 赋值查看下级
      }
      console.log(this.popupOption);
    },
    // 查看信息
    hanleSelect(key) {
      console.log(key);
      if (key == "rebate") {
        this.showRebate = true;
        // 返点详情
        this.getRebateDetails();
      } else if (key == "lower") {
        console.log("lower", this.req.account);
        // 初始化数据
        this.memberList = [];
        this.req.page = 0;
        // 获取列表数据
        this.getData();
      } else if (key == "higher") {
      }
    },
    // 关闭按钮
    hanleCloseRebate() {
      this.showRebate = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
