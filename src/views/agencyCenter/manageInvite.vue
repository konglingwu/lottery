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
          <div v-for="item in rebateList" :key="item.id" class="invitation-list">
            <label>{{item.lotteryType}}</label>
            <input :placeholder="item.point" v-model="item.rebate" @blur.stop="hanleBlur(item)"/>
          </div>                                                                                 
          <!-- 生成邀请码 -->
            <cell-box>
              <x-button type="warn" @click.native="hanleInvitingCode">生成邀请码</x-button>
            </cell-box>
          <!-- 生成邀请码 -->
          <!-- 邀请码确认弹窗 -->
            <div v-transfer-dom>
              <confirm v-model="showPopup"
                title="温馨提示"
                @on-cancel="onCancel"
                @on-confirm="onConfirm">
                <p style="text-align:center;">邀请码已生成，请点击邀请码管理进行查询·，是否查看?</p>
              </confirm>
            </div>        
          <!-- 邀请码确认弹窗 -->
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
        <!-- 没有数据显示 -->
        <div class="tips-table" v-if="!(0 in this.invitationsList)">
          <i class="iconfont icon-wry-smile"></i>
          <label>暂无数据</label>
        </div>
        <!-- 没有数据显示 --> 
        <!-- 邀请码列表 -->
        <!-- 弹出层 -->
        <actionsheet v-model="popup" :menus="popupOption" @on-click-menu="hanleSelect" show-cancel>
        </actionsheet>
        <!-- 弹出层 -->
        <!-- 查看返点 -->
        <div v-transfer-dom>
          <popup v-model="showRebate" position="bottom" max-height="69%" style="overflow: hidden;">
            <group>
              <cell class="popup-title"><label>查看详情</label><i class="iconfont icon-close" @click="hanleCloseRebate"></i></cell>
              <group v-for="item in rebateDetails" :key="item.id">
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
// 接口请求
import { agentRebate, invitingCode } from "@/api/index.js";
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
  TransferDom,
  Toast,
  Alert
} from "vux";
import { logicalExpression } from "babel-types";

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
    Popup,
    Toast,
    Alert
  },
  data() {
    return {
      popup: false, // 控制弹出层
      popupOption: {
        // 弹出选项
        rebate: "查看返点",
        delCode: "删除邀请码"
      },
      req: {
        hasLoading: 1
      },
      showPopup: false, // 显示弹窗-下级开户
      switching: 0, // tab切换
      showRebate: false, // 返点详情是否显示-邀请码
      switchItems: true, // 控制显示列表内容
      accountType: "agent", // 开户类型
      invitationsList: [
        // 邀请码列表
        {
          invitationCode: 49735720, // 邀请码
          productionTime: "2018-05-21 15:26:30", // 生成时间
          invitationState: 0 // 状态
        }
      ],
      rebateDetails: [
        // 返点详情
        {
          id: 1, // ID
          whilstLottery: 6, // 时时彩
          fastThree: 3, // 快3
          elevenSelectFive: 6, // 11选5
          welfareLottery: 3, // 福彩3D
          arrayThree: 4, // 排列3
          happyBeijing: 3, // 北京快乐8
          beijingPK: 8, // 北京PK
          markSixLottery: 6 // 六合彩
        }
      ],
      rebateList: [] // 返点列表
    };
  },
  computed: {},
  created() {
    // 获取返点(第一次进入执行)
    this.getFirst();
  },
  methods: {
    /* 数据请求 */

    // 获取返点
    getRebate() {
      agentRebate(this.req).then(response => {
        response.forEach(element => {
          const spItem = {};
          spItem.id = element.id;
          spItem.lotteryType = element.lotteryType;
          spItem.maxPoint = element.maxPoint;
          spItem.minPoint = element.minPoint;
          spItem.point =
            "自身返点" +
            element.maxPoint +
            "," +
            "可设置返点" +
            element.minPoint +
            "-" +
            element.point;
          this.rebateList.push(spItem);
        });

        const obj = JSON.stringify(this.rebateList); //  转成字符串格式
        localStorage.setItem("rebateList", obj); // 存储到localStorage
      });
    },

    // 提交邀请码
    submitInvitingCode(codeList) {
      invitingCode(codeList).then(response => {
        console.log(codeList, "www");
      });
    },
    /* 事件操作 */

    // 判断是否第一次进入
    getFirst() {
      let res = localStorage.getItem("rebateList");
      if (res == null || res == "") {
        this.getRebate();
      } else {
        this.rebateList = JSON.parse(res); // 读取localStorage数据
        console.log(this.rebateList, "读取localStorage数据");
      }
    },

    // 切换tab
    hanleTabClick() {
      if (this.switching == 0) {
        this.accountType = "agent"; // 初始化radio
        this.switchItems = true; // 控制下级开户显示
      } else {
        this.accountType = "agent"; // 初始化radio
        this.switchItems = false; // 控制下级开户隐藏
      }
    },
    // 弹出层
    hanleCheck(item) {
      this.popup = true; // 弹出框显示
      console.log(this.popupOption);
    },
    // 查看信息
    hanleSelect(key) {
      console.log(key);
      if (key == "rebate") {
        this.showRebate = true;
      }
    },
    // 关闭按钮
    hanleCloseRebate() {
      this.showRebate = false;
    },

    // 验证
    hanleBlur(item) {
      let lotteryType = item.lotteryType;
      let rebate = parseFloat(item.rebate);
      let maxPoint = parseFloat(item.maxPoint);
      let minPoint = parseFloat(item.minPoint);
      const reg = /^[0-9]*$/; // 数字验证
      const title =
        lotteryType + "：请输入" + minPoint + "-" + maxPoint + "之间数字"; // 提示语
      if (!reg.test(rebate) || rebate > maxPoint || rebate < minPoint) {
        item.rebate = "";
        this.$vux.toast.text(title, "middle");
      }
    },
    
    // 生成邀请码
    hanleInvitingCode() {
      this.rebateList.forEach(item => {
        this.hanleBlur(item);
      });
      const codeList = []; //过滤后的数据
      this.rebateList.forEach(item => {
        const spItem = {};
        spItem.id = item.id;
        spItem.rebate = item.rebate;
        codeList.push(spItem);
      });
      this.submitInvitingCode(codeList);
    },
    // 关闭温馨提示
    onCancel() {
      console.log("关闭！");
    },
    // 跳转到邀请码列表
    onConfirm() {}
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
.router-red {
  a {
    color: #cd0006;
  }
}
// 邀请列表
.invitation-list {
  border-bottom: 1px solid #ccc;
  padding: 5px 10px;
  label {
    width: 75px;
    display: inline-block;
    font-size: 14px; /*px*/
  }
  input {
    border: none;
    border-radius: 2px; /*px*/
    height: 30px;
    line-height: 30px;
    width: 250px;
    padding: 0 10px;
  }
}
</style>
