<template>
  <div>
    <!-- 头部部分 -->
    <div class="personal_header">
      <br />
      <br />
      <van-image
        round
        width="8rem"
        height="8rem"
        @click="tochange()"
        src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3713533569,1557791358&fm=26&gp=0.jpg"
      />
      <br />
      <br />
    </div>
    <!-- 登陆后消失，没登录时跳转到登陆界面 -->
    <van-cell title="登录/注册" v-if="token" to="/personal/login" is-link />
    <!-- 基本信息展示栏 -->
    <van-cell-group title="基本信息">
      <van-cell title="姓名" :value="userInfo.realName" />
      <van-cell title="电话" :value="userInfo.wechatUserPhoneNumber" />
      <van-cell title="状态" :value="userInfo.staffStatus" />
      <van-cell title="职位" :value="userInfo.staffPosition" />
      <van-cell/>
    </van-cell-group>
    <!-- 设置栏 -->
    <van-cell-group title="设置">
      <van-cell title="退出登录" is-link @click="outlogin()" />
    </van-cell-group>
  </div>
</template>

<script>
import { isNumber, log } from "util";
import * as formatDate from "../../libs/date.js";
export default {
  data() {
    return {
      token: true,
      userInfo: {
        wechatUserPhoneNumber: "",
        realName: "",
        staffStatus: "",
        staffPosition: "",
      },
      test: "",
      uptoken: "",
      uplocation: "",
    };
  },
  mounted() {
    //检查token是否存在
    var token = localStorage.getItem("token");
    if (Boolean(token)) {
      this.token = false;
      //获取工程师信息
      this.$api
        .getEngineer()
        .then((res) => {
          if (res.status == 200) {
            this.userInfo.realName = res.data.wechatUserName;
            this.userInfo.wechatUserPhoneNumber =
              res.data.wechatUserPhoneNumber;
            this.userInfo.staffPosition = res.data.staffPosition;
            //判断工程师状态
            if (res.data.staffStatus == 0) {
              this.userInfo.staffStatus = "空闲";
            }
            if (res.data.staffStatus == 1) {
              this.userInfo.staffStatus = "接受任务未执行";
            }
            if (res.data.staffStatus == 2) {
              this.userInfo.staffStatus = "正在执行";
            }
            if (res.data.staffStatus == 3) {
              this.userInfo.staffStatus = "结束任务";
            }
            if (res.data.staffStatus == 4) {
              this.userInfo.staffStatus = "休息";
            }
            //启动位置定时器
            //token存在启动定时器获取工程师位置
            this.uplocation = setInterval(this.upLocation, 5 * 60 * 1000); 
            localStorage.setItem("uplocation",this.uplocation)
          } else {
            clearInterval(this.uplocation);
            console.log(res.message);
          }
        })
        .catch((response) => {
          localStorage.removeItem("token");
          // this.$toast(response, "信息获取失败，请重新登录");
        });
      //token存在启动定时器自动更新token
      this.uptoken = setInterval(this.upToken, 60 * 60 * 1000);
      localStorage.setItem("uptoken", this.uptoken);
    } else {
      this.token = true;
      this.$toast("没有认证信息，请先登录");
    }
  },
  methods: {
    clearall() { 
      clearInterval(this.uptoken);
      clearInterval(this.uplocation);
      this.userInfo = {
        wechatUserPhoneNumber: "",
        realName: "",
        staffStatus: "",
        staffPosition: "",
      };
    },
    upToken() {
      console.log("更新token");
      this.$api.updateToken().then((res) => {
        if (res.status == 200) {
          let token = res.data;
          localStorage.setItem("token", token);
        } else {
          console.log(res.message);
        }
      });
    },
    upLocation() {
      //获取位置信息
      console.log("更新了位置");
      this.$api.upPosition().then((res) => {
        console.log(res);
      });
    },
    outlogin() {
      this.$dialog
        .alert({
          //加上标题
          title: "退出登录",
          //改变弹出框的内容
          message: "确定要退出吗",
          //展示取消按钮
          showCancelButton: true,
        })
        .then(() => {
          //点击确认按钮后的调用
          this.token = true;
          //删除token
          localStorage.removeItem("token");
          //清空定时器
          //清空数据
          this.clearall();  
        })
        .catch(() => {
          //点击取消按钮后的调用
        });
    },
  },
};
</script>

<style scoped>
.personal_header {
  text-align: center;
  padding: 20px, auto;
  background-color: #ffffff;
}
</style>