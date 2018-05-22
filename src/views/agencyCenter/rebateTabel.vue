<template>
  <view-box ref="viewBox" class="weui-panel-bottom">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" v-bind:title="$route.meta.pageTitle">
      <span>{{$route.meta.pageTitle}}</span>
			<!-- 彩票选择 -->
        <group class="group-select-data">
        	<popup-picker :data="lotteryList" v-model="selectLottery" @on-change="onChange"></popup-picker>
        </group>
      <!-- 彩票选择 -->			
		</x-header>
    <div class="main main-padding-top">
				<!-- 表格 -->
				<div class="rebate-tabel">
          <h3 class="title">① 时时彩是基数2元1注的奖金模式，奖金+2换算成赔率。</h3>
				  <div class="rebate-items">
						  <!-- 左侧标题 -->
               <ul class="rebate-title">
                  <li>
										  <label>玩法</label>
											<span>返点</span>
									</li>
									<li>大小单双-二星</li> 
									<li>大小单双-二星</li>
									<li>大小单双-二星</li>
									<li>大小单双-二星</li>
									<li>大小单双-二星</li>
									<li>大小单双-二星</li>
									<li>大小单双-二星</li>
									<li>大小单双-二星</li> 
									<li>大小单双-二星</li>
									<li>大小单双-二星</li>
									<li>大小单双-二星</li>
									<li>大小单双-二星</li>
									<li>大小单双-二星</li>
									<li>大小单双-二星</li>
									<li>大小单双-二星</li> 
									<li>大小单双-二星</li>
									<li>大小单双-二星</li>
									<li>大小单双-二星</li>
									<li>大小单双-二星</li>
									<li>大小单双-二星</li>
									<li>大小单双-二星</li>																		
							 </ul>
							 <!-- 左侧标题 -->
							 <!-- 右侧内容 -->
							 <div class="rebate-content">
								  <div style="width:50rem;">
                   <ul class="rebate-content-item">
                       <li>8.0</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>									 
									 </ul>
                   <ul class="rebate-content-item">
                       <li>8.0</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>									 
									 </ul>
                   <ul class="rebate-content-item">
                       <li>8.0</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>									 
									 </ul>
                   <ul class="rebate-content-item">
                       <li>8.0</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>									 
									 </ul>
                  <ul class="rebate-content-item">
                       <li>8.0</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>									 
									 </ul>
                   <ul class="rebate-content-item">
                       <li>8.0</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>									 
									 </ul>
                   <ul class="rebate-content-item">
                       <li>8.0</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>									 
									 </ul>
                   <ul class="rebate-content-item">
                       <li>8.0</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
											 <li>奖金7.840</li>
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
      selectLottery: ["快3"] // 日期选项
    };
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
</style>
