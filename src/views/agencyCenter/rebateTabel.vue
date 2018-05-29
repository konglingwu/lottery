<template>
  <view-box ref="viewBox" class="weui-panel-bottom">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" v-bind:title="$route.meta.pageTitle">
      <span>{{$route.meta.pageTitle}}</span>
			<!-- 彩票选择 -->
        <group class="group-select-data">
        	<popup-picker :data="lotteryList" v-model="selectLottery" @on-change="hanleChangeLottery"></popup-picker>
        </group>
      <!-- 彩票选择 -->			
		</x-header>
    <div class="main main-padding-top">
				<!-- 表格 -->
				<div class="rebate-tabel">
          <h3 class="title">① {{this.lotteryName}}是基数2元1注的奖金模式，奖金+2换算成赔率。</h3>
				  <div class="rebate-items">
						  <!-- 左侧标题 -->
               <ul class="rebate-title">
                  <li>
										  <label>玩法</label>
											<span>返点</span>
									</li>
									<li v-for="item in rebateDesLaws" :key="item.id">{{item}}</li> 																	
							 </ul>
							 <!-- 左侧标题 -->
							 <!-- 右侧内容 -->
							 <div class="rebate-content">
								  <div style="width:50rem;">
                  <ul class="rebate-content-item" v-for="i in 75" :key="i">
                       <li>8.0</li>
											 <li>奖金7.840</li>								 
									 </ul>									 
									</div>
									 									 									 
							 </div>
							 <!-- 右侧内容 -->
					</div>
				</div>
				<!-- 表格 -->
    </div>
  </view-box>
</template>

<script>
// 接口请求
import {rebateDes} from '@/api/index.js'
// common 通用模版
import common from "../mixin/common.mixin.js";
import {
  ViewBox,
  XHeader,
  Group,
  CellBox,
  XSwitch,
  XButton,
  Confirm,
  XTable,
  PopupPicker
} from "vux";

export default {
  name: "rebateTabel",
  mixins: [common],
  components: {
    ViewBox,
    XHeader,
    Group,
    CellBox,
    XSwitch,
    XButton,
    Confirm,
    XTable,
    PopupPicker
  },
  data() {
    return {
			req:{
				lotteryType:'快3' // 选择类型
			},
      lotteryName:'', // 当前彩票名称
			rebateDesLaws:[],
      lotteryList: [
        [
          "快3",
          "时时彩",
          "11选5",
          "福彩3D",
          "排列3",
          "北京快乐8",
          "PK10",
          "六合彩"
        ]
      ], // 日期选项列表
			selectLottery: ["快3"], // 彩票选项
			req:{
				switchingLottery:"fast3" // 传到后端的英文类型
			}

    };
  },
  computed: {},
  created() {
		// 返点赔率
		this.getData()		
	},
  methods: {
		/* 数据请求 */
		// 返点赔率
		getData(){
			rebateDes(this.req).then(Response =>{
				this.rebateDesLaws = Response.content // 赋值彩票玩法
				this.lotteryName = Response.lotteryType // 赋值彩票类型
			})
		},
		/* 事件操作 */
    // 彩票匹配
    lotteryMatching(){
      console.log("val change",this.selectLottery[0]);
      switch(this.selectLottery[0]){
        case "快3":
          this.req.switchingLottery = "fast3"
        break;
        case '时时彩':
          this.req.switchingLottery = "ssc"
        break;
        case '11选5':
          this.req.switchingLottery = "11Selection5"
        break; 
        case '福彩3D':
					this.req.switchingLottery = "welfareLottery3D"
				break; 
        case '排列3':
					this.req.switchingLottery = "arrange3"
				break; 
				case '北京快乐8':
					this.req.switchingLottery = "happyBeijing"	
				break; 
				case 'PK10':
					this.req.switchingLottery = "pk10"			
				break; 
				case '六合彩':
          this.req.switchingLottery = "markSixLottery"																			
        break;                         
      }
      console.log('date',this.req.switchingLottery);
    }, 		
		// 彩票切换
    hanleChangeLottery() {
      // 彩票匹配
      this.lotteryMatching();
      // 获取列表数据
      this.getData();
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
