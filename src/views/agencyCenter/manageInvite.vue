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
      <div class="radio-switching">
           <group>
            <cell-box>
              <span>开户类型</span>
              <!-- <label><input type="radio" name="type" v-model="accountType" value="agent"/>代理类型</label>  
              <label><input type="radio" name="type" v-model="accountType" value="player"/>玩家类型</label>  -->
              <div class="agent">
                  <input type="radio" id="agent" name="type" value="agent" v-model="accountType"/>
                  <label for="agent">代理类型</label>
              </div>
              <div class="player">                
                <input type="radio" id="player" name="type" value="player" v-model="accountType"/>
                <label for="player">玩家类型</label>
              </div>
            </cell-box>
            <cell-box>
              请先为下级设置返点，
              <router-link to="/rebateTabel">
                点击查看返点赔率表
              </router-link>
            </cell-box>            
           </group>
      </div>
      <!-- 类型切换 -->
      <!-- 彩票列表 -->
        <group class="lottery-items">
          <x-input title="时时彩" placeholder="自身返点8.0，可设置返点0.0-8.0" type="number" placeholder-align="left"></x-input>
          <x-input title="快3" placeholder="自身返点7.5，可设置返点0.0-7.5" type="number" placeholder-align="left"></x-input>
          <x-input title="11选5" placeholder="自身返点7.5，可设置返点0.0-7.5" type="number"  placeholder-align="left"></x-input>
          <x-input title="福彩3D" placeholder="自身返点7.5，可设置返点0.0-7.5" type="number"  placeholder-align="left"></x-input>
          <x-input title="排列3" placeholder="自身返点8.0，可设置返点0.0-8.0" type="number" placeholder-align="left"></x-input>
          <x-input title="北京快乐8" placeholder="自身返点7.5，可设置返点0.0-7.5" type="number" placeholder-align="left"></x-input>
          <x-input title="PK10" placeholder="自身返点8.0，可设置返点0.0-8.0" type="number" placeholder-align="left"></x-input>
          <x-input title="六合彩" placeholder="自身返点10.0，可设置返点0.0-10" type="number" placeholder-align="left"></x-input>                                                                                    
          <!-- 生成邀请码 -->
            <cell-box>
              <x-button type="warn">生成邀请码</x-button>
            </cell-box>
          <!-- 生成邀请码 -->
        </group>      
      <!-- 彩票列表 -->

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
  Confirm,
  ButtonTab,
  ButtonTabItem,
  XInput,
  Box
} from "vux";

export default {
  name: "manageInvite",
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
    Box
  },
  data() {
    return {
      switching: 1, // tab切换
      accountType: "agent" // 开户类型
    };
  },
  computed: {},
  created() {},
  methods: {
    /* 数据请求 */
    /* 事件操作 */
    hanleTabClick() {
      console.log("click switching", this.switching);
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
//
.radio-switching {
  .agent,.player{
    display: inline-block;
    width: initial;
    label{
      display: block;
      line-height: 22px;
    }
  }
  .agent{
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
    border: 1px solid #01cd78;
    text-indent: 0.15em;
    line-height: 1;
  }
  input[type="radio"]:checked + label::before {
    background-color: #01cd78;
    background-clip: content-box;
    padding: 0.2em;
  }
  input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
}
</style>
