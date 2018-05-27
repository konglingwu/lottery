export default{
	data() {
		return {
      dataList: [['今天', '昨天', '本月', '上月']], // 日期选项列表
      selectDate: ['今天'], // 日期选项
		}
	},
	methods:{
    /* 数据请求 */
    // 获取

    /* 事件操作 */

    // 日期匹配
    dateMatching(){
      console.log("val change",this.selectDate[0]);
      switch(this.selectDate[0]){
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
    }   
	}
}