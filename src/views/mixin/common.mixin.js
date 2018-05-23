export default{
	data() {
		return {
      search: "", // 搜索内容
      dataList: [["今天", "昨天", "本月", "上月"]], // 日期选项列表
      selectDate: ["今天"], // 日期选项  			
		}
	},
	methods:{
    /* 数据请求 */
    // 获取

    /* 事件操作 */

    // 日期切换
    onChange(val) {
      console.log("val change", val);
    }   
	}
}