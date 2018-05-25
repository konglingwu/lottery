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
      <!-- 下级列表 -->
      <div class="scroller" v-infinite-scroll="pullup" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
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
          <tr v-for="item in lowerList" :key="item.id" @click="hanleCheck(item)" class="table-color">
            <td class="blue">{{item.account}}</td>
            <td>{{item.typeView}}</td>
            <td class="red">{{item.lowerPeople}}</td>
            <td class="red">{{item.profit}}</td>
          </tr>
        </tbody>
      </x-table>
      <!-- 没有数据显示 -->
        <div class="tips-table" v-if="!(0 in this.lowerList)">
          <i class="iconfont icon-wry-smile"></i>
          <label>暂无数据</label>
        </div>
      <!-- 没有数据显示 -->
      </div>
      <!-- 下级列表 -->
      <!-- 弹出层 -->
        <actionsheet v-model="popup" :menus="popupOption" @on-click-menu="hanleSelect" show-cancel>
          <p slot="header" class="popup-blue">
            <i class="iconfont icon-user"></i>
            <span v-text="req.account"></span>
          </p>
        </actionsheet>
      <!-- 弹出层 -->
    </div>
  </view-box>
</template>

<script>
// common 通用模版
import common from '../mixin/common.mixin.js'
// 接口请求
import {lowerReport} from '@/api/index.js'
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
  XTable,
  PopupPicker,
  Actionsheet,
  Popup,
  Cell,
  Scroller,
  LoadMore
} from "vux";
export default {
  name: "lowerReport",
  mixins: [common],  
  directives: { infiniteScroll },  
  components: {
    ViewBox,
    XHeader,
    Group,
    CellBox,
    XSwitch,
    XButton,
    Confirm,
    XTable,
    PopupPicker,
    Actionsheet,    
    Popup,
    Cell,
    Scroller,
    LoadMore
  },
  data() {
    return {
      popup:false,      // 控制弹出层      
      lowerList:[],     // 下级报表
      popupOption: {},  // 弹出选项
      busy: false,      // 是否滚动加载
      req:{
        switchingDate:'today', // 日期 
        page: 0,               // 分页
        pageSize:10,           // 条数
        hasLoading: 1,         // 控制是否有loading
        account: ''            // 会员名称
      }             
    };
  },
  computed: {},
  created() {
    // 获取下级列表
    this.getData()
  },
  methods: {
    /* 数据请求 */

    // 获取下级列表
    getData(){
    this.busy = true
    this.req.page = ++this.req.page
    lowerReport(this.req).then(response => {
        this.lowerList = this.lowerList.concat(response)
        // response 空时候不请求
        console.log(response);
        console.log(!(0 in this.lowerList),'en');
        if (!(0 in response)) {
          this.busy = false
          console.log('3',this.busy) 
        }
      }); 
      this.busy = false    
      console.log('1',this.busy) 
    },

    /* 事件操作 */

    // 滚动加载
    pullup() {
      console.log('2',this.busy) 
      if (this.busy) {
        this.getData()
      }
    },
    
    // 日期切换
    hanleChangeDate() {
      // 日期匹配
      this.dateMatching()
      // 初始化数据
      this.lowerList = []
      this.req.page = 0
      // 获取列表数据
      this.getData()
    },
    // 弹出层
    hanleCheck(item){
     this.popupOption ={}; // 每次进入清空 
     this.popup = true;   // 弹出框显示
     this.req.account = item.account;  // 赋值会员名称
     this.popupOption.Report = '查看报表';     // 赋值查看报表
     if(item.type && item.lowerPeople){
      this.popupOption.lower = '查看下级';     // 赋值查看下级 
     }
     if(item.higher){
      this.popupOption.higher = '返回上级';     // 赋值返回上级
     }
    },
    // 查看信息
    hanleSelect (key) {
      console.log(key);
      if(key == 'Report'){
        this.$router.push(
          {path:'/agentReport',query: {account:this.req.account,selectDate:this.selectDate[0]}}
        )
      }else if(key == 'lower') {
        console.log('lower',this.req.account);
        // 初始化数据
        this.lowerList = []
        this.req.page = 0        
        // 获取列表数据
        this.getData()        
      }else if(key == 'higher'){
        
      }
    }
  }
};
</script>

<style lang="scss" scoped>
// .vux-table td, .vux-table th{
//   border-bottom: 1px solid #e0e0e0;/*px*/
// }
</style>
