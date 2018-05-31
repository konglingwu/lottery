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
								  <div :style="{width:this.breadth + 'px'}">
                  <ul class="rebate-content-item" v-for="items in rateList" :key="items.id">
                       <li>{{items.rebate}}</li>
											 <li v-for="item in items.interestRate" :key="item.id">赔率{{item}}</li>								 
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
import { rebateDes,lotteryList } from "@/api/index.js";
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
import { log } from 'util';

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
      req: {
        lotteryType: "快3" // 选择类型
      },
      lotteryName: "", // 当前彩票名称
      rebateDesLaws: [], // 赋值彩票玩法
			rateList: [], //赔率表
			breadth:100,    // 汇率表宽度
      lotteryList: [], // 彩票选项列表
      selectLottery: [], // 彩票选项
      req: {
        switchingLottery: 1 // 传到后端的英文类型
      }
    };
  },
  computed: {},
  created() {
		// 彩票列表
		this.getLottery()		
    // 返点赔率
    this.getData();
  },
  methods: {
		/* 数据请求 */

		// 彩票列表
		getLottery(){
     lotteryList().then(({data}) =>{
       this.lotteryList.push(data);
       this.selectLottery.push(data[0].name);
     });
		},

    // 返点赔率
    getData() {
			this.rateList = []
      rebateDes(this.req).then(Response => {
        let contents = Response.data.content; // 赋值彩票玩法
        let sysPoint = Response.data.sysPoint; // 赋值总代理返点
				let selfReturn = sysPoint * 10;
				this.breadth = selfReturn * 132; // 计算列表总宽度
        this.lotteryName = Response.data.lotteryType; // 赋值彩票类型
        // 循环计算利率表
        for (let i = selfReturn; i >= 0; i--) {
          let sumSysPoint = [];
          contents.forEach(element => {
            let points =
              parseFloat(element.substr(element.indexOf("|") + 1)) * 100; // 过滤返点数
            let sum =
							(points - points * ((sysPoint * 10 - i) / 10) / 100) / 100;
              sumSysPoint.push(sum.toFixed(3)); // 过滤点集合
					});
						let sqlItem = {};
        	  sqlItem.rebate = i / 10; // 返点
        		sqlItem.interestRate = sumSysPoint; // 返点利率
            this.rateList.push(sqlItem);
        }
        // 循环计算利率表
        // 过滤列表计算值
        contents.forEach(element => {
          let content = element.substr(0,element.indexOf("|")); // 左侧列表数据（过滤计算值）
          this.rebateDesLaws.push(content)
        })
        // 过滤列表计算值
      });
    },

    /* 事件操作 */
    // 彩票匹配
    lotteryMatching() {
      console.log("val change", this.selectLottery[0]);
      switch (this.selectLottery[0]) {
        case "快3":
          this.req.switchingLottery = "fast3";
          break;
        case "时时彩":
          this.req.switchingLottery = "ssc";
          break;
        case "11选5":
          this.req.switchingLottery = "11Selection5";
          break;
        case "福彩3D":
          this.req.switchingLottery = "welfareLottery3D";
          break;
        case "排列3":
          this.req.switchingLottery = "arrange3";
          break;
        case "北京快乐8":
          this.req.switchingLottery = "happyBeijing";
          break;
        case "PK10":
          this.req.switchingLottery = "pk10";
          break;
        case "六合彩":
          this.req.switchingLottery = "markSixLottery";
          break;
      }
      console.log("date", this.req.switchingLottery);
    },
    // 彩票切换
    hanleChangeLottery(value) {
      let key = value[0]
      let obj = this.lotteryList[0].find(item => item.value == key)
      if (obj) {
        this.selectLottery.splice(0)
        this.selectLottery.push(obj.name)
        this.req.switchingLottery = obj.value
        // 获取列表数据
        this.getData();
      } 

    }
  }
};
</script>

<style lang="scss" scoped>
</style>
