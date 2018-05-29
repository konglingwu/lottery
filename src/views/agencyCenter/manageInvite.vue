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
                  <input type="radio" id="agent" name="type" value="agent" v-model="req.accountType" @click="hanleTypeClick()"/>
                  <label for="agent">代理类型</label>
              </div>
              <div class="player">                
                <input type="radio" id="player" name="type" value="player" v-model="req.accountType" @click="hanleTypeClick()"/>
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
        <!-- 删除邀请码弹窗 -->
          <div v-transfer-dom>
              <confirm v-model="delInvitation "
                title="您确定要删除邀请码吗？"
                @on-cancel="delCancel"
                @on-confirm="delConfirm">
              </confirm>
          </div>        
        <!-- 删除邀请码弹窗 -->
      </div>
      <!-- 玩家类型 -->
    </div>
  </view-box>
</template>

<script>
// 接口请求
import {
  agentRebate,
  invitingCode,
  InvitingCodeList,
  rebateDetails,
  deleteInvitationCode
} from "@/api/index.js";
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
        hasLoading: 1, // 是否有loading
        accountType: "agent", // 开户类型
        codeId: "" // 邀请码ID
      },
      switching: 0, // tab切换
      sumError: 0, // 错误累计总和
      showPopup: false, // 显示弹窗-下级开户
      delInvitation:false, // 显示删除弹窗 
      showRebate: false, // 返点详情是否显示-邀请码
      switchItems: true, // 控制显示列表内容
      invitationsList: [], // 邀请码列表
      rebateDetails: [], // 返点详情
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

    // 下级用户-获取返点
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

    // 下级用户-提交邀请码
    submitInvitingCode(resItem) {
      invitingCode(resItem).then(response => {
        // 清空rebate
        this.rebateList.forEach(item => {
          item.rebate = "";
        });
      });
    },

    // 邀请码列表
    getCodeList() {
      InvitingCodeList(this.req).then(response => {
        this.invitationsList = response;
      });
    },

    // 返点详情
    getRebateDetails() {
      rebateDetails(this.req).then(response => {
        this.rebateDetails = response;
      });
    },

    // 删除邀请码
    delInvitationCode() {
      deleteInvitationCode(this.req).then(response => {
        // 邀请码列表
        this.getCodeList()
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
      console.log(this.switching);
      if (this.switching == 0) {
        this.accountType = "agent"; // 初始化radio
        this.switchItems = true; // 控制下级开户显示
      } else {
        this.accountType = "agent"; // 初始化radio
        this.switchItems = false; // 控制下级开户隐藏
        // 邀请码列表
        this.getCodeList();
      }
    },
    // 弹出层
    hanleCheck(item) {
      this.req.codeId = item.id;
      this.popup = true; // 弹出框显示
    },
    // 查看信息
    hanleSelect(key) {
      console.log(key);
      if (key == "rebate") {
        this.showRebate = true;
        // 返点详情
        this.getRebateDetails();
      } else if (key == "delCode") {
        this.delInvitation = true // 删除弹出框显示
      }
    },
    // 关闭按钮
    hanleCloseRebate() {
      this.showRebate = false;
    },
    // 验证方法
    verification(item) {
      let lotteryType = item.lotteryType;
      let rebate = parseFloat(item.rebate);
      let maxPoint = parseFloat(item.maxPoint);
      let minPoint = parseFloat(item.minPoint);
      const reg = /^[0-9]*$/; // 数字验证
      if (!reg.test(rebate) || rebate > maxPoint || rebate < minPoint) {
        const title =
          lotteryType + "：请输入" + minPoint + "-" + maxPoint + "之间数字"; // 提示语
        this.$vux.toast.text(title, "middle");
        this.sumError += 1;
      }
    },
    // 验证
    hanleBlur(item) {
      // 验证方法
      this.verification(item);
    },

    // 生成邀请码
    hanleInvitingCode() {
      const codeList = []; // 过滤后的数据
      this.sumError = 0;
      this.rebateList.forEach(item => {
        // 验证方法
        this.verification(item);

        // 赋值
        const spItem = {}; // 重新赋值数据
        spItem.id = item.id;
        spItem.rebate = item.rebate;
        codeList.push(spItem);
      });
      console.log(this.sumError, "NBA");
      if (this.sumError == 0) {
        const resItem = {}
        resItem.list = codeList // 列表
        resItem.accountType = this.req.accountType // 代理类型
        this.submitInvitingCode(resItem); // 生成邀请码
        this.showPopup = true; // 打开弹出框
      }
    },
    // 关闭温馨提示
    onCancel() {
      console.log("关闭！");
    },
    // 跳转到邀请码列表
    onConfirm() {
      this.switching = 1; // 切换到邀请码页面
      this.hanleTabClick(); // 切换事件
      this.showPopup = false; // 关闭弹出框
      // 邀请码列表
      this.getCodeList();
    },
    // 关闭删除弹窗
    delCancel() {
      console.log("关闭删除弹窗!");
    },
    // 确认删除邀请码
    delConfirm() {
      // 删除邀请码
      this.delInvitationCode();
    },    
    // 代理类型切换
    hanleTypeClick() {
      if (this.switching == 1) {
        // 邀请码列表
        this.getCodeList();
      }
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
.router-red {
  a {
    color: #cd0006;
  }
}
// 邀请列表
.invitation-list {
  // border-bottom: 1px solid #ccc;
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

.v-transfer-dom {
  .vux-no-group-title {
    margin-bottom: 0;
  }
}

</style>
