<template>
	<view-box ref="viewBox" class="weui-panel-bottom bg-wite">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :title="$route.meta.pageTitle">
    </x-header>
		<!-- main -->
		<div class="main main-padding-top">
			   <!-- 详情 -->
				 <group class="betting-cells">
					 <cell-box class="betting-items">
						  <img class="item-left img" src=""/>
							<div class="item-left">
                <label>大发快3</label>
								<span>第201805241043期</span>
							</div>
							<div  class="item-right">
                 <span>未中奖</span>
							</div>
					 </cell-box>
					 <cell>
						 <span slot="title"><span>投注时间</span><span class="pd-twenty">2018-05-24 17:22:44</span> </span>
					 </cell>						 
					 <cell>
						 <span slot="title"><span>投注单号</span><span class="pd-twenty">TZ0524172244963684</span> </span>
					 </cell>					 	
					 <cell>
						 <span slot="title"><span>投注金额</span><span class="pd-twenty">¥1000.00元</span> </span>
					 </cell>					 
					 <cell>
						 <span slot="title"><span>派送奖金</span><span class="pd-twenty">¥0.00元</span> </span>
					 </cell>		
					 <cell>
						 <span slot="title"><span>开奖号码</span><span class="pd-twenty">1,1,4</span> </span>
					 </cell>
				 </group>
				 <!-- 详情 -->
				 <!-- 我的投注 -->
						<section class="section-detail">
							  <h3>我的投注</h3>
								<ul>
									 <li style="padding-top:20px;">单</li>
									 <li>和值</li>
								</ul>
						</section>				 
				 <!-- 我的投注 -->
		</div>
		<!-- main -->		
	</view-box>		
</template>

<script>
import { ViewBox, XHeader, Group, CellBox, Cell } from "vux";
export default {
  data() {
    return {};
  },
  components: {
    ViewBox,
    XHeader,
    Group,
    CellBox,
    Cell
  },
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.betting-cells {
  .item-right {
    font-size: 20px; /*px*/
  }
  .vux-cell-bd {
    .pd-twenty {
      padding-left: 20px;
    }
  }
}

// 我的投注
.section-detail {
	h3{
		margin: 0 20px;
		font-size: 18px;
		color: #333;
		font-weight: 400;
	}
  ul {
    background-image: url("../../assets/images/agentCenter/paper.png");
    background-repeat: no-repeat;
		background-size: 100% 100%;
		height: 120px;
		li{
			margin: 0 30px;
			color: #bbb;
      border-bottom: 1px solid #d0d0d0;/*px*/
			line-height: 30px;
		}
  }
}
</style>
