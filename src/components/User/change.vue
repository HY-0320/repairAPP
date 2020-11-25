<template>
  <div>
    <!-- 头部导航栏 -->
    <van-nav-bar left-text="返回" left-arrow @click-left='topersonal()' />
    <div class='personal_header'>

      <br>
      <!-- 图标部分 -->
      <van-image round width="8rem" height="8rem" @click="tochange()" src="https://img.yzcdn.cn/vant/cat.jpeg" />
    </div>
    <br>
    <!-- 信息修改部分 -->
    <van-cell-group class="username">
      <van-field v-model="user.userName" label="真实姓名" clearable placeholder="请输入用户名" />
      <van-field readonly clickable label="性别" :value="value" placeholder="选择性别" @click="showPicker = true" />
      <van-popup v-model="showPicker" position="bottom">
        <van-picker show-toolbar :columns="columns" @cancel="showPicker = false" @confirm="onConfirm" />
      </van-popup>

      <van-field v-model="user.userPassword" label="密码" clearable placeholder="请输入密码" />
    </van-cell-group>
    <br>
    <br>
    <van-button color="linear-gradient(to right, #4bb0ff, #6149f6)" @click="change()" size="large">确定修改</van-button>

  </div>
</template>

<script>
export default {
  data () {
    return {
      value: '',
      index: '',
      showPicker: false,
      columns: ['男', '女'],
      user: {
        userName: '',
        userPassword: null,
        userGender: ''
      }
    }
  },
  mounted () {
    //获取信息
    this.$api.getUser().then(res => {
      this.user.userGender = res.data.userGender
      this.user.userName = res.data.userRealName
    })
  },
  methods: {
    onConfirm (value, index) {
      //value为Colums的值，index为索引值，男为0，女为1
      this.index = index;
      this.$set(this.user, 'userGender', this.index);
      this.value = value;
      this.showPicker = false;
    },
    topersonal () {
      this.$router.push('/personal')
    },
    change () {
      //规定性别男为true
      //性别女为false
      if (this.user.userGender == 0)
        this.user.userGender = true
      else
        this.user.userGender = false

      this.$dialog.alert({
        //加上标题
        title: "修改信息",
        //改变弹出框的内容
        message: "确定要修改吗",
        //展示取消按钮
        showCancelButton: true
      })
        .then(() => {
          //点击确认按钮后的调用
          this.$api.changeUser(this.user).then(res => {
            if (res.success == true) {
              this.$dialog.alert({
                message: '修改成功'
              }).then(() => {
                this.$router.push('/personal')
              });
            }
          })
        })
        .catch(() => {
          //点击取消按钮后的调用

        })
    }

  }

}
</script>

<style>
.personal_header {
  text-align: center;
  padding: 20px, auto;
}
</style>