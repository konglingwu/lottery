<template>
 <div class="weui-panel-bottom">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" v-bind:title="$route.meta.pageTitle">
      <span>{{$route.meta.pageTitle}}</span>
			<!-- 彩票选择 -->
      <group slot="right" class="group-select-data">
        <popup-picker :data="lotteryList" v-model="selectLottery" @on-change="hanleChangeLottery"></popup-picker>
      </group>
      <!-- 彩票选择 -->
		</x-header>
    <div class="main main-padding-top">
				<!-- 表格 -->
				<div class="rebate-tabel">
          <!-- <h3 class="title">① {{this.lotteryName}}是基数2元1注的奖金模式，奖金+2换算成赔率。</h3> -->
          <h3 class="title">{{this.lotteryName}}返点赔率表</h3>
   <div class="con">
        <div class="rebate-left">
            <div class="left-item">
						  <span>
								<i>玩法</i>
								<em>返点</em>
							</span>
							<span v-for="item in rebateDesLaws" :key="item.id">{{item}}</span>
            </div>
        </div>	 
        <div class="rebate-right">
				  <div class="right-width">
            <div class="right-item" v-for="items in rateList" :key="items.id">
                <span>{{items.rebate}}</span>
                <span v-for="item in items.interestRate" :key="item.id">赔率{{item}}</span>
            </div>
				  </div>	
        </div>
    </div>
				</div>
				<!-- 表格 -->
    </div>
  </div>   
</template>

<script>
// 接口请求
import { rebateDes, lotteryList } from '@/api/index.js';
// common 通用模版
import common from './mixin/common.mixin.js';
import { ViewBox, XHeader, Group, PopupPicker } from 'vux';

export default {
  name: 'rebateTable',
  mixins: [common],
  components: {
    ViewBox,
    XHeader,
    Group,
    PopupPicker
  },
  data() {
    return {
      lotteryName: '', // 当前彩票名称
      rebateDesLaws: [], // 赋值彩票玩法
      rateList: [], //赔率表
      breadth: 100, // 汇率表宽度
      lotteryList: [], // 彩票选项列表
      selectLottery: [], // 彩票选项
      req: {
        switchingLottery: 1 // 选择类型
      }
    };
  },
  computed: {},
  created() {
    // // 彩票列表
    this.getLottery();
    // 返点赔率
    this.getData();
  },
  methods: {
    /* 数据请求 */

    // 彩票列表
    getLottery() {
      lotteryList().then(({ data }) => {
        this.lotteryList.push(data);
        this.selectLottery.push(data[0].name);
      });
    },

    // 返点赔率
    getData() {
      this.rebateDesLaws = [];
      this.rateList = [];
      rebateDes(this.req).then(Response => {
        let contents = Response.data.content; // 赋值彩票玩法
        let sysPoint = Response.data.sysPoint; // 赋值总代理返点
        let selfReturn = sysPoint * 10;
        this.breadth = selfReturn * 132; // 计算列表总宽度
        this.lotteryName = Response.data.title; // 赋值彩票类型
        // 循环计算利率表
        for (let i = selfReturn; i >= 0; i--) {
          let sumSysPoint = [];
          contents.forEach(element => {
            let points = parseFloat(element.substr(element.indexOf('|') + 1)) * 100; // 过滤返点数
            let sum = (points - points * ((sysPoint * 10 - i) / 10) / 100) / 100;
            sumSysPoint.push(sum.toFixed(3)); // 过滤点集合
          });
          let sqlItem = {};
          sqlItem.rebate = (i / 10).toFixed(1); // 返点
          sqlItem.interestRate = sumSysPoint; // 返点利率
          this.rateList.push(sqlItem);
        }
        // 循环计算利率表
        // 过滤列表计算值
        contents.forEach(element => {
          let content = element.substr(0, element.indexOf('|')); // 左侧列表数据（过滤计算值）
          this.rebateDesLaws.push(content);
        });
        // 过滤列表计算值
      });
    },

    /* 事件操作 */
    // 彩票切换
    hanleChangeLottery(value) {
      let key = value[0];
      let obj = this.lotteryList[0].find(item => item.value == key);
      if (obj) {
        this.selectLottery.splice(0);
        this.selectLottery.push(obj.name);
        this.req.switchingLottery = obj.value;
        // 获取列表数据
        this.getData();
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.con {
  overflow: auto;
}
.rebate-left {
  width: 35%;
  float: left;
  .left-item {
    position: relative;
    z-index: 1;
    box-shadow: 0.5em 0 0.5em #d5d5d5;
    span {
      i {
        position: absolute;
        left: 5px;
        bottom: -1px;
        z-index: 2;
      }
      em {
        position: absolute;
        right: 5px;
        top: -px;
        z-index: 2;
      }
    }
    span:nth-child(2n + 1) {
      background: #eee;
    }
  }
}
.rebate-right {
  width: 65%;
  float: left;
  overflow: auto;
  -webkit-overflow-scrolling: touch; /*这个属性可以使滚动更流畅有左右弹动*/
  .right-item {
    float: left;
    span:nth-child(2n + 1) {
      background: #eee;
    }
  }
}
.left-item,
.right-item {
  background: white;
  span {
    display: block;
    height: 70px;
    width: 250px;
    line-height: 70px;
    text-align: center;
    position: relative;
    color: #333;
    white-space: normal;
    text-overflow: ellipsis;
  }
}
.right-width {
  width: 200000px;
}
</style>
