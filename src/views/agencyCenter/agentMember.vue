<template>
  <view-box ref="viewBox" class="weui-panel-bottom">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" v-bind:title="$route.meta.pageTitle"></x-header>
    <div class="main main-padding-top">
        <!-- 列表 -->
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
          <tr v-for="item in memberList" :key="item.id" @click="hanleCheck(item)">
            <td>{{item.account}}</td>
            <td>{{item.typeView}}</td>
            <td>{{item.loginTime}}</td>
            <td>{{item.people}}</td>
          </tr>
        </tbody>
        </x-table>
        <!-- 列表 -->
        <!-- 弹出层 -->
        <actionsheet v-model="popup" :menus="popupOption" @on-click-menu="hanleSelect" show-cancel>
          <p slot="header" class="popup-blue">
            <i class="iconfont icon-user"></i>
            <span v-text="account"></span>
          </p>
        </actionsheet>
        <!-- 弹出层 -->
        <!-- 查看返点 -->
        <div v-transfer-dom>
          <popup v-model="showRebate" position="bottom" max-height="69%" style="overflow: hidden;">
            <group>
              <cell class="popup-title"><label>查看详情</label><i class="iconfont icon-close" @click="hanleCloseRebate"></i></cell>
              <group v-for="item in rebateList" :key="item.id">
                <cell title="时时彩">{{item.whilstLottery}}</cell>
                <cell title="快3">{{item.fastThree}}</cell>
                <cell title="11选5">{{item.elevenSelectFive}}</cell>
                <cell title="福彩3D">{{item.welfareLottery}}</cell>
                <cell title="排列3">{{item.arrayThree}}</cell>
                <cell title="北京快乐8">{{item.happyBeijing}}</cell>
                <cell title="北京PK10">{{item.beijingPK}}</cell>
                <cell title="六合彩">{{item.markSixLottery}}</cell>
              </group>
            </group>
          </popup>
          </div>
        <!-- 查看返点 -->
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
  XTable,
  Actionsheet,
  Cell,
  TransferDom,
  Popup
} from "vux";

export default {
  name: "agentMember",
  directives: {
    TransferDom
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
      popup:false,           // 控制弹出层
      memberList:[           // 会员列表
        {
          id:1,
          account:'cws',
          typeView:'一级玩家',
          type:'playerOne',          
          loginTime:'2014-05-14',
          people:0
        },
        {
          id:2,
          account:'sas',
          typeView:'二级玩家',
          type:'playerTow',             
          loginTime:'2018-01-12',
          people:2
        },
        {
          id:3,          
          account:'wwe',
          typeView:'一级代理',
          type:'agentOne',              
          loginTime:'2013-01-15',
          people:2
        },
        {
          id:4,         
          account:'wws',
          typeView:'一级代理',
          type:'agentOne',    
          loginTime:'2018-06-14',
          people:0
        },
        {
          id:5,         
          account:'klw',
          typeView:'一级代理',
          type:'agentOne',    
          loginTime:'2018-05-14',
          people:2
        }                                
      ],
      popupOption: {},  // 弹出选项
      account: '',      // 会员名称 
      showRebate:false, // 返点详情是否显示
      rebateList:[      // 返点详情
       {
        id:1,                // ID 
        whilstLottery: 6,    // 时时彩
        fastThree:3,         // 快3
        elevenSelectFive:6,  // 11选5
        welfareLottery:3,    // 福彩3D
        arrayThree:4,        // 排列3
        happyBeijing:3,      // 北京快乐8
        beijingPK:8,         // 北京PK 
        markSixLottery:6     // 六合彩
       }
      ]     
    }
  },
  computed: {},
  created() {},
  methods: {
    /* 数据请求 */
    

    /* 事件操作 */    
    // 弹出层
    hanleCheck(item){
     this.popupOption ={}; // 每次进入清空 
     this.popup = true;   // 弹出框显示
     this.account = item.account;  // 赋值会员名称
     this.popupOption.rebate = '查看返点';     // 赋值查看返点
     if(item.people > 0){
      this.popupOption.people = '查看下级';     // 赋值查看下级 
     }
     console.log(this.popupOption);
    },
    // 查看信息
    hanleSelect (key) {
      console.log(key);
      if(key == 'rebate'){
        this.showRebate = true;
      }
    },  
    // 关闭按钮
    hanleCloseRebate(){
      this.showRebate = false;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
