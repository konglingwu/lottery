<template>
  <view-box ref="viewBox" class="weui-panel-bottom">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" v-bind:title="$route.meta.pageTitle"></x-header>
    <div class="main main-padding-top">
        <div class="top-slide">
            <img src="../../assets/images/agentCenter/proxySlide.jpg" alt="banner"/>
        </div>
        <group class="agency-group">
          <cell-box is-link><router-link to="/agentIntro">代理说明</router-link></cell-box>
          <cell-box is-link><router-link to="/agentReport">代理报表</router-link></cell-box>
          <cell-box is-link><router-link to="/lowerReport">下级报表</router-link></cell-box>
          <cell-box is-link><router-link to="/manageInvite">下级开户</router-link></cell-box>
          <cell-box is-link><router-link to="/agentMember">会员管理</router-link></cell-box>
          <cell-box is-link><router-link to="/agentBetRecord">投注明细</router-link></cell-box>
          <cell-box is-link><router-link to="/agentBillRecord">交易明细</router-link></cell-box>
        </group>
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
  Confirm
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
    Confirm
  },
  data() {
    return {};
  },
  computed: {},
  created() {},
  methods: {
    /* 数据请求 */
    

    /* 事件操作 */    
  }
};
</script>

<style lang="scss" scoped>
.agency-group{
  .weui-cells{
    .weui-cell{
      a{
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
