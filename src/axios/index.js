import Vue from "vue";
import { LoadingPlugin,ToastPlugin } from "vux";
Vue.use(LoadingPlugin);
Vue.use(ToastPlugin);
// const CancelToken = axios.CancelToken
// request拦截器

// 统一请教模版
export function fetch(config) {
  Vue.$vux.loading.show({
    text: "Loading"
  });  
  return Vue.http({
    method: config.method,
    url: config.url,
    data: config.params,
    baseURL: "/api/", // api的base_url //需要修改的
    //baseURL: process.env.BASE_API, // api的  base_url //需要修改的
    timeout: config.timeout ? config.timeout : 10000,
    headers: {
      accept: "application/json"
    }
    // cancelToken: config.cancelToken
  }).then(({data}) => {
    let code = data.code
    let msg = data.msg
    if (code != 0) {
      Vue.$vux.toast.text(msg, "top");
    }
    // 全屏Loading结束
    Vue.$vux.loading.hide();    
    return data   
  })
}
