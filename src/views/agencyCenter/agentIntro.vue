<template>
	<view-box ref="viewBox" class="weui-panel-bottom">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" v-bind:title="$route.meta.pageTitle"></x-header>
    <div class="main main-padding-top">
        <div class="top-slide">
            <img src="../../assets/images/agentCenter/agentIntro.jpg" alt="banner"/>
        </div>
				<div class="agent-intro-des">
            <em>当您能看到这个页面，说明您的账号即是玩家账号也是代理账号，即可以自己投注，也可以发展下级玩家，赚取返点佣金。</em>
				    <!-- 如何赚取返点 -->
						<h3>
							<i class="iconfont icon-money-bag"></i>如何赚取返点？
						</h3>
						<div class="agent-intro-list">
                 <p class="item">
									 可获得的返点，等于自身返点与下级返点的差值，如自身返点5，下级返点3，你将能获得下级投注金额2%的返点，如下级投注100元，你将会获得2元。
								 </p>
								 <p>
									 点击下级开户，可查看自身返点，也可为下级设置返点。
								 </p>
						</div>
						<!-- 如何赚取返点 -->
						<!-- 如何为下级开户 -->
						<h3>
							<i class="iconfont icon-user"></i>如何为下级开户？
						</h3>
						<div class="agent-intro-list">
                 <p class="item">
							点击下级开户，先为您的下级设置返点，设置成功后会生成一条邀请码，将邀请码发送给您的下级注册，注册后他就是您的下级，点击会员管理，就能查看他注册的账号；
								 </p>
								 <p>
如果您为下级设置的是代理类型的账号，那么您的下级就能继续发展下级，如果设置的是玩家类型，那么您的下级只能投注，不能再发展下级，也看不到代理中心；
								 </p>
						</div>
						<!-- 如何为下级开户 -->	
						<!-- 温馨提示 -->
						<h3>
							<i class="iconfont icon-love"></i>温馨提示：
						</h3>
						<div class="agent-intro-list">
                 <p class="item">
							返点不同赔率也不同，点击返点赔率表，可查看返点赔率；
								 </p>
								 <p class="item">返点越低，赔率就越低，建议为下级设置的返点不要过低；
								 </p>
								 <p>建议开设的下级也是代理类型，无论发展了几级，您都能获得返点。</p>
						</div>
						<!-- 温馨提示 -->
				</div>
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
} from 'vux';
export default {
  name: "agentIntro",
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
.agent-intro-des {
  background: white;
  color: #333;
  padding: 20px 10px;
  line-height: 30px;
  font-size: 14px; /*px*/
  h3 {
		font-size: 16px; /*px*/
		overflow: hidden;
    .iconfont {
			float: left;
      font-size: 20px; /*px*/
      margin-right: 5px;
    }
    font-weight: 400;
    color: #dc3b40;
  }
  .agent-intro-list {
    p {
      padding-left: 25px;
      position: relative;
    }
    p:before {
      content: "";
      position: absolute;
      width: 5px;
      height: 5px;
      background: #b9bcc2;
      border-radius: 50%;
      border: 2px solid #fff;
      box-shadow: 0 0 0 1px #b9bcc2;
      left: 9px;
      top: 10px;
      z-index: 1;
    }
    .item:after {
      content: "";
      position: absolute;
      height: 100%;
      // height: calc(100% - 1em);
      border-left: 1px dotted #b9bcc2; /*px*/
      left: 11px;
      top: 10px;
    }
  }
}
</style>