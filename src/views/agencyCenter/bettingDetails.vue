<template>
	<view-box ref="viewBox" class="weui-panel-bottom bg-wite">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" :title="$route.meta.pageTitle">
    </x-header>
		<!-- main -->
		<div class="main main-padding-top" v-for="item in detailsList" :key="item.id">
			   <!-- 详情 -->
				 <group class="betting-cells">
					 <cell-box class="betting-items">
						  <img class="item-left img" :src="item.lotteryLogo"/>
							<div class="item-left">
                <label>{{item.lotteryName}}</label>
								<span>第{{item.phase}}期</span>
							</div>
							<div  class="item-right">
                 <span>{{item.bettingResults}}</span>
							</div>
					 </cell-box>
					 <cell>
						 <span slot="title"><span>投注时间</span><span class="pd-twenty">{{item.timeOfBetting}}</span> </span>
					 </cell>						 
					 <cell>
						 <span slot="title"><span>投注单号</span><span class="pd-twenty">{{item.oddNumbers}}</span> </span>
					 </cell>					 	
					 <cell>
						 <span slot="title"><span>投注金额</span><span class="pd-twenty">¥{{item.investment}}元</span> </span>
					 </cell>					 
					 <cell>
						 <span slot="title"><span>派送奖金</span><span class="pd-twenty">¥{{item.bonus}}元</span> </span>
					 </cell>		
					 <cell>
						 <span slot="title"><span>开奖号码</span><span class="pd-twenty">{{item.awardNumber}}</span> </span>
					 </cell>
				 </group>
				 <!-- 详情 -->
				 <!-- 我的投注 -->
						<section class="section-detail">
							  <h3>我的投注</h3>
								<ul>
									 <li style="padding-top:20px;">{{item.BettingInfo}}</li>
									 <li>{{item.laws}}</li>
								</ul>
						</section>				 
				 <!-- 我的投注 -->
		</div>
		<!-- main -->		
	</view-box>		
</template>

<script>
import { ViewBox, XHeader, Group, CellBox, Cell } from "vux";
import {bettingDetails} from "@/api/index.js";
export default {
  data() {
    return {
			req:{
				hasLoading: 1,  // 控制是否有loading
				id: "" || this.$route.query.id, // id
			},
			detailsList:[]  // 详情列表
		};
  },
  components: {
    ViewBox,
    XHeader,
    Group,
    CellBox,
    Cell
  },
  created() {
		// 注单详情
		this.getData()		
	},
  methods: {
		// 数据请求
		// 注单详情
		getData(){
      bettingDetails(this.req).then(response => {
				console.log(response)
				this.detailsList = response;

			})
		}
		// 事件操作
	}
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
