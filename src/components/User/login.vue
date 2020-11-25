<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar left-text="返回" title="欢迎登录" left-arrow @click-left='topersonal()' /><br>
    <!-- 图标 -->
    <div class='personal_header'><br>
      <van-image round width="8rem" height="8rem"
        src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1588092648159&di=9ac269e0cdd7938f23caad3a5202c844&imgtype=0&src=http%3A%2F%2Fku.90sjimg.com%2Felement_origin_min_pic%2F18%2F03%2F09%2Fce9767aa47984c97ea64eb12f3b73b68.jpg%2521%2Ffwfh%2F804x804%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue" />
    </div><br><br>
    <!-- 登录信息输入 -->
    <van-cell-group class="username">
      <van-field v-model="user.userName" label="用户名" clearable placeholder="电话号码" left-icon="contact"
        right-icon="question-o" @click-right-icon="$toast('请输入注册时的电话号码')" />
      <van-field v-model="user.password" label="密码" type="password" clearable placeholder="请输入密码" left-icon="bag-o"
        right-icon="question-o" @click-right-icon="$toast('密码必须是6-20位字母、数字以及下划线')" />
    </van-cell-group><br><br>
    <!-- 登录按钮 -->
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="login()" size="large">登录</van-button><br>
    <!-- 跳转到注册界面 -->
    <van-button to='/personal/login/register' size="large" plain>注册
    </van-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //登录输入信息
      user: {
        userName: '',
        password: ''
      }
    }
  },
  mounted(){
   localStorage.removeItem("token");
  },
  methods: {
    //跳转到个人中心界面
    topersonal () {
      this.$router.push('/')
    },
    //登录
    login () {
      //用户名不能为空
      if (this.user.userName == '') {
        this.$toast("用户名不能为空");
        return false;
      }
      //密码不能为空
      if (this.user.password == '') {
        this.$toast("密码不能为空");
        return false;
      }
      //请求登录
      this.$api.userLogin(this.user.userName, this.user.password).then(res => {
        console.log(res)
        if (res.status == 200) {
          //保存token到本地里面
          localStorage.setItem("token", res.data.token);
          //弹出登录成功信息
          this.$toast(res.message)
          //跳转到个人中心
          this.$router.push('/')
        }
      }).catch(response => {
        console.log(response)
        this.$toast(response.message)
      })
    }
  }

}
</script>

<style>
.username {
  margin: 0 auto;
}
.personal_header {
  text-align: center;
  padding: 20px, auto;
}
</style>