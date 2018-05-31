import axios from "axios";
import Vue from "vue";
import { LoadingPlugin } from "vux";
import { AlertPlugin } from "vux";
import { ToastPlugin } from "vux";
Vue.use(LoadingPlugin);
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);
// const CancelToken = axios.CancelToken
// request拦截器
axios.interceptors.request.use(
  config => {
    console.log(config);

    Vue.$vux.loading.show({
      text: "Loading"
    });

    return config;
  },
  error => {
    // Do something with request error
    console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
axios.interceptors.response.use(
  response => {
    const code = response.data.code;
    const msg = response.data.msg;
    const res = response.data;
    // 全屏Loading结束
    Vue.$vux.loading.hide();
    // const res = response.data;
    if (code == -1) {
      // 失败
      Vue.$vux.toast.text(msg, "top");
      return Promise.reject(msg);
    } else if (code == 401) {
      // 无权限
      Vue.$vux.toast.text(msg, "top");
      return Promise.reject(msg);
    }else if (code == 500) {
      // 服务器异常
      Vue.$vux.toast.text(msg, "top");
      return Promise.reject(msg);
    } else {
      // 处理 lang
      if (typeof res === "undefined") {
        // 传送2进制文件
        res.blob = res;
        res.filename = decodeURI(
          response.headers["content-disposition"].split("=")[1]
        );
        return res;
      } else {
        return res;
      }
    }
  },
  error => {
    // 全屏Loading结束
    Vue.$vux.loading.hide();
    // console.log(error.indexOf("timeout") > -1)
    // if(cuo.indexOf("timeout") > -1){
    //   Vue.$vux.toast.text("请求超时！", "top"); 
    // }
    return Promise.reject(error);
  }
);
// 自定义 处理 返回信息
export function custom(config) {
  return axios({
    method: config.method,
    url: config.url,
    data: params,
    responseType: "arraybuffer",
    baseURL: "/api/", // api的base_url  //需要修改的
    timeout: 30000,
    headers: {
      accept: "application/json"
    }
  });
}

// 统一请教模版
export function fetch(config) {
  //   if (typeof config.cancelToken === 'undefined') {
  //     config.cancelToken = new CancelToken(function (cancel) {
  //       console.log('取消')
  //     })
  //   }
  return axios({
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
  });
}
