<template>
  <view-box ref="viewBox">
    <x-header slot="header" style="width:100%;position:absolute;left:0;top:0;z-index:100;" v-bind:title="$route.meta.pageTitle"></x-header>
    <div class="main main-padding-top">
         <group class="group-search">
            <x-input v-model="search" placeholder="下级报表查询">
              <x-button slot="right" type="warn" mini>搜索</x-button>
            </x-input>
         </group>
        <flexbox :gutter="0" wrap="wrap" class="group-flexbox">
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>0.00</h3>
            <span>投注金额</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>0.00</h3>
            <span>投注金额</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>0.00</h3>
            <span>投注金额</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>0.00</h3>
            <span>投注金额</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>0.00</h3>
            <span>投注金额</span>
            </div>
          </flexbox-item>
          <flexbox-item :span="1/3">
          <div class="flex-item">
            <h3>0.00</h3>
            <span>投注金额</span>
            </div>
          </flexbox-item>                                        
        </flexbox>
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
  XInput,
  XButton,
  Confirm,
  Flexbox,
  FlexboxItem
} from "vux";

export default {
  name: "agencyCenter",
  components: {
    ViewBox,
    XHeader,
    Group,
    CellBox,
    XSwitch,
    XInput,
    XButton,
    Confirm,
    Flexbox,
    FlexboxItem
  },
  data() {
    return {
      search: "" // 搜索内容
    };
  },
  computed: {},
  created() {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.group-flexbox {
  background: white;
  padding: 10px;
  text-align: center;

  .vux-flexbox-item {
    padding:15px 0;
    border-bottom: 1px solid #d0d0d0; /*no*/
    .flex-item {
      h3 {
        color: #ff6818;
      }
      span {
        color: #000;
      }
    }
  }
  .vux-flexbox-item:nth-last-of-type(1){
    border-bottom:none;
  }
  .vux-flexbox-item:nth-last-of-type(2){
    border-bottom:none;
  }
  .vux-flexbox-item:nth-last-of-type(3){
    border-bottom:none;
  }
  .vux-flexbox-item:nth-child(3n + 2) {
    border-left: 1px solid #d0d0d0; /*no*/
    border-right: 1px solid #d0d0d0; /*no*/
  }
}
</style>
