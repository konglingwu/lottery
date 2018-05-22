<template>
  <view-box ref="viewBox" class="weui-panel-bottom">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;">
      <!-- <span>{{$route.meta.pageTitle}}</span> -->
      <!-- tab -->
      <button-tab v-model="switching" class="tab-switching">
        <button-tab-item @on-item-click="hanleTabClick()">下级开户</button-tab-item>
        <button-tab-item @on-item-click="hanleTabClick()">邀请码</button-tab-item>
      </button-tab>
      <!-- tab -->
    </x-header>
    <div class="main main-padding-top">
      <!-- 类型切换 -->
      <div class="radio-switching switching-bottom">
           <group>
            <cell-box>
              <span>开户类型</span>
              <div class="agent">
                  <input type="radio" id="agent" name="type" value="agent" v-model="accountType"/>
                  <label for="agent">代理类型</label>
              </div>
              <div class="player">                
                <input type="radio" id="player" name="type" value="player" v-model="accountType"/>
                <label for="player">玩家类型</label>
              </div>
            </cell-box>        
           </group>
      </div>
      <!-- 类型切换 -->
      <!-- 下级开户 -->
      <div v-if="switchItems" class="">
        <group>
          <cell-box class="router-red">
            请先为下级设置返点，
            <router-link to="/rebateTabel">
            点击查看返点赔率表
            </router-link>
          </cell-box>  
        </group>    
        <!-- 彩票列表 -->
        <group class="lottery-items">
          <x-input title="时时彩" placeholder="自身返点8.0，可设置返点0.0-8.0" placeholder-align="left"></x-input>
          <x-input title="快3" placeholder="自身返点7.5，可设置返点0.0-7.5" placeholder-align="left"></x-input>
          <x-input title="11选5" placeholder="自身返点7.5，可设置返点0.0-7.5"  placeholder-align="left"></x-input>
          <x-input title="福彩3D" placeholder="自身返点7.5，可设置返点0.0-7.5" placeholder-align="left"></x-input>
          <x-input title="排列3" placeholder="自身返点8.0，可设置返点0.0-8.0" placeholder-align="left"></x-input>
          <x-input title="北京快乐8" placeholder="自身返点7.5，可设置返点0.0-7.5" placeholder-align="left"></x-input>
          <x-input title="PK10" placeholder="自身返点8.0，可设置返点0.0-8.0" placeholder-align="left"></x-input>
          <x-input title="六合彩" placeholder="自身返点10.0，可设置返点0.0-10" placeholder-align="left"></x-input>                                                                                    
          <!-- 生成邀请码 -->
            <cell-box>
              <x-button type="warn">生成邀请码</x-button>
            </cell-box>
          <!-- 生成邀请码 -->
        </group>      
        <!-- 彩票列表 -->
      </div>
      <!-- 下级开户 -->
      <!-- 玩家类型 -->
      <div v-else class="">
        <!-- 邀请码列表 -->
        <x-table :cell-bordered="false" style="background-color:#fff;">
          <thead>
            <tr style="background-color: rgb(247, 247, 247);">
              <th>邀请码</th>
              <th>生成时间</th>
              <th>状态</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in invitationsList" :key="item.id" @click="hanleCheck(item)">
              <td style="color: rgb(51, 136, 255);">{{item.invitationCode}}</td>
              <td>{{item.productionTime}}</td>
              <td>注册({{item.invitationState}})</td>
            </tr>                       
          </tbody>
        </x-table> 
        <!-- 邀请码列表 -->
                <!-- 弹出层 -->
        <actionsheet v-model="popup" :menus="popupOption" @on-click-menu="hanleSelect" show-cancel>
        </actionsheet>
        <!-- 弹出层 -->
        <!-- 查看返点 -->
        <div v-transfer-dom>
          <popup v-model="showRebate" position="bottom" max-height="69%" style="overflow: hidden;">
            <group>
              <cell class="popup-title"><label>查看详情</label><i class="iconfont icon-guanbi" @click="hanleCloseRebate"></i></cell>
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
      <!-- 玩家类型 -->
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
  ButtonTab,
  ButtonTabItem,
  XInput,
  Box,
  XTable,
  Actionsheet,
  Cell,
  Popup,
  TransferDom
} from "vux";

export default {
  name: "manageInvite",
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
    ButtonTab,
    ButtonTabItem,
    XInput,
    Box,
    XTable,
    Actionsheet,
    Cell,
    Popup
  },
  data() {
    return {
      popup:false,          // 控制弹出层  
      popupOption: {        // 弹出选项       
        rebate:'查看返点',
        delCode:'删除邀请码'
      },         
      switching: 0,         // tab切换
      showRebate:false,     // 返点详情是否显示      
      switchItems: true,    // 控制显示列表内容
      accountType: "agent", // 开户类型
      invitationsList:[     // 邀请码列表
        {
          invitationCode:49735720,              // 邀请码
          productionTime:'2018-05-21 15:26:30', // 生成时间
          invitationState:0                     // 状态
        }
      ],
      rebateList:[          // 返点详情
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
    };
  },
  computed: {},
  created() {},
  methods: {
    /* 数据请求 */
    /* 事件操作 */

    // 切换tab
    hanleTabClick() {
      if (this.switching == 0) {
        this.accountType = 'agent' // 初始化radio
        this.switchItems = true;   // 控制下级开户显示
      } else {
        this.accountType = 'agent' // 初始化radio
        this.switchItems = false;  // 控制下级开户隐藏
      }
    },
    // 弹出层
    hanleCheck(item){
     this.popup = true;   // 弹出框显示
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
.tab-switching {
  border: 1px solid white; /*px*/
  border-radius: 3px; /*px*/
  margin-top: 5px;
  a {
    color: white;
    background: #cd0006;
  }
  a.vux-button-group-current {
    color: #cd0006;
    background: white;
  }
  a.vux-button-tab-item-first {
    border-top-left-radius: 3px; /*px*/
    border-bottom-left-radius: 3px; /*px*/
  }
  a.vux-button-tab-item-first:after,
  a.vux-button-tab-item-last:after {
    display: none;
  }
  a.vux-button-tab-item-last {
    border-right: 0px solid;
    border-top-right-radius: 3px; /*px*/
    border-bottom-right-radius: 3px; /*px*/
  }
}
//切换
.radio-switching {
  .agent,
  .player {
    display: inline-block;
    width: initial;
    label {
      display: block;
      line-height: 22px;
    }
  }
  .agent {
    margin: 0 30px 0 20px;
  }
  input[type="radio"] + label::before {
    content: "\a0"; /*不换行空格*/
    display: inline-block;
    vertical-align: middle;
    font-size: 18px;
    width: 1em;
    height: 1em;
    margin-right: 0.4em;
    border-radius: 50%;
    border: 1px solid #cd0006;
    text-indent: 0.15em;
    line-height: 1;
  }
  input[type="radio"]:checked + label::before {
    background-color: #cd0006;
    background-clip: content-box;
    padding: 0.2em;
  }
  input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
}
// 调转路由颜色
.router-red{
  a {
    color: #cd0006;
  }
}
</style>
