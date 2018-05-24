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
    hanleChangeDate(val) {
      console.log("val change", val[0]);
      switch(val[0]){
        case "今天":
          this.req.switchingDate = "today"
        break;
        case '昨天':
          this.req.switchingDate = "yesterday"
        break;
        case '本月':
          this.req.switchingDate = "thisMonth"
        break; 
        case '上月':
          this.req.switchingDate = "lastMonth"
        break;                         
      }
      console.log('date',this.req.switchingDate);
      this.getData()
    }   
	}
}