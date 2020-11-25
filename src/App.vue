<template>
  <div id="app">
    <!-- 头标签 -->
    <div class="fixed fixTop"></div>
    <!-- 展示部分 -->
    <div class="view">
      <router-view v-if="isRouterAlive"></router-view>
    </div>
    <!-- 底部标签 -->
    <div class="fixBottom">
      <van-tabbar v-model="active" fixed>
        <van-tabbar-item to="/list" icon="todo-list-o"
          >任务列表</van-tabbar-item
        >
        <van-tabbar-item to="/" icon="friends">个人中心</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>

<script>
//导入各个界面
import Login from "./components/User/login.vue";
import Register from "./components/User/register.vue";
import Personal from "./components/User/personal.vue";
import failed from "./components/Other/404.vue";
import list from "./components/User/list.vue";



export default {
  name: "app",
  components: {
    Login,
    Register,
    Personal,
    failed,
    list,
  },
  provide() {
    return {
      reload: this.reload,
    };
  },

  data() {
    return {
      //规定初始界面为个人中心
      active: 1,
      isRouterAlive: true,
    };
  },
  // mounted() {
  //   var token = localStorage.getItem("token");
  //   console.log(Boolean(token))
  //   if (Boolean(token)) {
  //     setInterval(this.upToken, 3000);
  //   }
  // },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },

  },
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
html,
body {
  height: 100%;
}
body {
  font-family: 微软雅黑;
  /* background-color: #f4f4f4; */
}
#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.fixed {
  width: 100%;
  line-height: 45px;
  font-size: 16px;
  color: black;
  text-align: center;
  position: fixed;
}
.fixTop {
  top: 0px;
  background-color: #f4f4f4;
}
.fixBottom {
  bottom: 0px;
}
.view {
  flex: 1;
  margin: 0 10px;
  background-color: #fff;
  overflow: scroll;
}
</style>
