<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar left-text="返回" title="工程师注册" left-arrow @click-left='tologin()' />
    <div class='personal_header'><br>
      <!-- 图标 -->
      <van-image round width="8rem" height="8rem"
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588092648159&di=9ac269e0cdd7938f23caad3a5202c844&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F18%2F03%2F09%2Fce9767aa47984c97ea64eb12f3b73b68.jpg%2521%2Ffwfh%2F804x804%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue" />
    </div><br><br>
    <!-- 注册信息输入 -->
    <!-- 真实姓名 -->
    <van-field v-model="userInfo.username" label="真实姓名" clearable required placeholder="请输入真实姓名" right-icon="question-o"
      @click-right-icon="$toast('必须是您的真实姓名')" />
    <!-- 电话号码 -->
    <van-field v-model="userInfo.wechatUserPhoneNumber" label="电话号码" clearable required placeholder="请输入电话号码"
      right-icon="question-o" @click-right-icon="$toast('必须是您的真实电话号码')" />
    <!-- 密码 -->
    <van-field v-model="userInfo.password" label="密码" type="password" clearable required placeholder="请输入密码"
      right-icon="question-o" @click-right-icon="$toast('密码必须是6-20位字母、数字以及下划线')" />
    <!-- 再次输入密码 -->
    <van-field v-model="userInfo.repassword" type="password" label="再次输入" placeholder="再次输入密码" clearable required
      right-icon="question-o" @click-right-icon="$toast('必须和第一次输入的密码相同')" /><br><br>
    <!-- 注册按钮 -->
    <van-button class="login_button" color="linear-gradient(to right, #4bb0ff, #6149f6)" size="large"
      @click="register()">注册
    </van-button>
  </div>
</template>

<script>
import { userInfo } from 'os';
export default {
  data () {
    return {
      //输入时的用户信息
      userInfo: {
        username: '',
        password: '',
        repassword: '',
        wechatUserPhoneNumber: '',

      },
      //提交表单
      from: {
        wechatUserName: '',
        staffPassword: '',
        wechatUserPhoneNumber: '',
        staffPosition: "工程师",
        roleId: 4
      }
    }
  },
  methods: {
    // 跳转到登录界面
    tologin () {
      this.$router.push('/personal/login')
    },
    //注册功能
    register () {
      //完善提交表 
      this.from.wechatUserName = this.userInfo.username
      this.from.staffPassword = this.userInfo.password
      this.from.wechatUserPhoneNumber = this.userInfo.wechatUserPhoneNumber
      //用户名不能为空
      if (this.userInfo.username == '') {
        this.$toast("用户名不能为空");
        return false;
      }
      //密码不能为空
      if (this.userInfo.password == '') {
        this.$toast("密码不能为空");
        return false;
      }
      //再次输入的密码不能为空
      if (this.userInfo.repassword == '') {
        this.$toast("请再次输入密码");
        return false;
      }
      //真实姓名不能为空
      if (this.userInfo.wechatUserPhoneNumber == '') {
        this.$toast("电话不能为空");
        return false;
      }
      else {
        //注册请求
        this.$api.userRegister(this.from).then(res => {
          if (res.status == 200) {
            this.$toast(res.message)
            this.$router.push('/personal/login')
          }
          else {
            this.userInfo = {
              username: null,
              password: null,
              repassword: null,
              wechatUserPhoneNumber: null            }
            this.$toast('注册失败')

          }
        }).catch(response => {
          this.$toast(response.response.data.message)
        })
      }
    }
  }
}


</script>

<style>
</style>