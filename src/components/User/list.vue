<template>
  <div>
    <!-- 头部导航 -->
    <van-sticky>
      <van-nav-bar title="任务清单" right-text="刷新" @click-right="again" />
      <van-dropdown-menu>
        <van-dropdown-item
          v-model="value"
          :options="option"
          @change="change(value)"
        />
      </van-dropdown-menu>
    </van-sticky>
    <!-- 订单查看 -->
    <!-- 还未维修的订单 -->
    <!-- 根据下拉框的值showvalue选择选择渲染部分 -->
    <!-- showvalue==0渲染serviceOrderStatus=0和serviceOrderStatus=1 -->
    <div v-if="showvalue == 0">
      <!-- 遍历获取到的订单列表 -->
      <div v-for="item in arry" :key="item.serviceOrderId">
        <!-- 根据订单状态选择渲染 -->
        <!-- vant的card -->
        <van-card
          v-if="item.serviceOrderStatus == 0 || item.serviceOrderStatus == 1"
          :desc="item.wechatUserInfo.wechatUserPhoneNumber"
          :tag="item.serviceType.serviceTypeName"
          :title="item.wechatUserInfo.wechatUserName"
          thumb="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3713533569,1557791358&fm=26&gp=0.jpg"
        >
          <!-- 标签内容 -->
          <template #tags>
            <van-tag
              plain
              type="danger"
              size="medium"
              v-if="item.serviceOrderStatus == 0"
              >已创建维修单</van-tag
            >
            <van-tag
              plain
              type="danger"
              size="medium"
              v-if="item.serviceOrderStatus == 1"
              >正在前往维修地点</van-tag
            >
          </template>
          <!-- 展示信息 -->
          <template #desc>
            <p>{{ item.wechatUserInfo.wechatUserPhoneNumber }}</p>
            <p>工单号：{{ item.serviceOrderId }}</p>
            <p>任务号：{{ item.serviceTaskId }}</p>
            <p>时间：{{ item.serviceOrderCreateTime | formatDate1 }}</p>
          </template>
          <!-- 按钮 -->
          <template #footer>
            <van-button
              size="small"
              type="primary"
              :disabled="item.serviceOrderStatus == 1"
              @click="start(item.serviceOrderId, item.serviceOrderStatus)"
              >开始维修任务
            </van-button>
            <van-button
              size="small"
              type="primary"
              :disabled="item.serviceOrderStatus == 2"
              @click="arrive(item.serviceOrderId, item.serviceOrderStatus)"
              >开始维修
            </van-button>
          </template>
        </van-card>
      </div>
    </div>
    <!-- 正在维修的订单 -->
    <!-- showvalue==1渲染serviceOrderStatus=2和serviceOrderStatus=3 -->
    <div v-if="showvalue == 1">
      <!-- 遍历获取到的订单列表 -->
      <div v-for="item in arry" :key="item.serviceOrderId">
        <!-- 根据订单状态选择渲染 -->
        <!-- vant的card -->
        <van-card
          v-if="item.serviceOrderStatus == 2 || item.serviceOrderStatus == 3"
          :tag="item.serviceType.serviceTypeName"
          :desc="item.wechatUserInfo.wechatUserPhoneNumber"
          :title="item.wechatUserInfo.wechatUserName"
          thumb="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3713533569,1557791358&fm=26&gp=0.jpg"
        >
          <!-- 标签内容 -->
          <template #tags>
            <van-tag
              plain
              type="danger"
              size="medium"
              v-if="item.serviceOrderStatus == 2"
              >正在维修</van-tag
            >
            <van-tag
              plain
              type="danger"
              size="medium"
              v-if="item.serviceOrderStatus == 3"
              >维修完成，未评论</van-tag
            >
          </template>

          <template #desc>
            <p>{{ item.wechatUserInfo.wechatUserPhoneNumber }}</p>
            <p>工单号：{{ item.serviceOrderId }}</p>
            <p>任务号：{{ item.serviceTaskId }}</p>
            <p>时间：{{ item.serviceOrderCreateTime | formatDate1 }}</p>
          </template>
          <!-- 按钮 -->
          <template #footer>
            <van-button
              size="small"
              type="info"
              :disabled="item.serviceOrderStatus == 3"
              @click="over(item.serviceOrderId, item.serviceOrderStatus)"
              >结束维修
            </van-button>
          </template>
        </van-card>
      </div>
    </div>

    <!-- 维修结束的订单 -->
    <!-- showvalue==2渲染serviceOrderStatus=4 -->
    <div v-if="showvalue == 2">
      <!-- 遍历获取到的订单列表 -->
      <div v-for="item in arry" :key="item.serviceOrderId">
        <!-- 根据订单状态选择渲染 -->
        <!-- vant的card -->
        <van-card
          v-if="item.serviceOrderStatus == 4"
          :tag="item.serviceType.serviceTypeName"
          :desc="item.wechatUserInfo.wechatUserPhoneNumber"
          :title="item.wechatUserInfo.wechatUserName"
          thumb="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3713533569,1557791358&fm=26&gp=0.jpg"
        >
          <!-- 标签内容 -->
          <template #tags>
            <van-tag plain type="danger" size="medium">订单已结束</van-tag>
          </template>
          <!-- 展示信息 -->
          <template #desc>
            <p>{{ item.wechatUserInfo.wechatUserPhoneNumber }}</p>
            <p>工单号：{{ item.serviceOrderId }}</p>
            <p>任务号：{{ item.serviceTaskId }}</p>
            <p>时间：{{ item.serviceOrderCreateTime | formatDate1 }}</p>
          </template>
          <!-- 按钮 -->
          <template #footer>
            <van-button size="small" disabled type="info"
              >订单已结束</van-button
            >
          </template>
        </van-card>
      </div>
    </div>
    <br /><br />
  </div>
</template>
<script>
import { Toast } from "vant";
import * as formatDate from "../../libs/date.js";

export default {
  inject: ["reload"],
  filters: {
    formatDate1(time) {
      let date = new Date(time);
      date = formatDate.format(date, "yyyy-MM-dd hh:mm:ss");
      return date;
    },
  },
  data() {
    return {
      //订单列表
      arry: [],
      //下拉框的值
      value: 1,
      //通过下拉框来选择部分渲染
      showvalue: 1,
      //下拉框配置
      option: [
        { text: "还未维修", value: 0 },
        { text: "维修进行中", value: 1 },
        { text: "维修结束", value: 2 },
      ],
    };
  },
  //通过token获取工程师全部订单
  mounted() {
    var token = localStorage.getItem("token");
    if (Boolean(token)) {
      this.$api.getList().then((res) => {
          console.log(res);
          this.arry = res.data;
        })
        .catch((response) => {
          console.log(response)
          this.$toast(response.response.data.data, "请重新登录");
        });
    } else {
      this.$toast("请先登录");
    }
  },
  methods: {
    //点击选项导致 value 变化时触发
    change(value) {
      if (value == 0) {
        this.showvalue = 0;
      } else if (value == 1) {
        this.showvalue = 1;
      } else {
        this.showvalue = 2;
      }
    },
    //刷新函数
    again() {
      var token = localStorage.getItem("token");
      if (Boolean(token)) {
        this.$api.getList().then((res) => {
          this.arry = res.data;
          this.reload();
        });
      } else {
        this.$toast("请先登录");
      }
    },
    //开始维修任务
    start(id, stauts) {
      if (stauts == 0) {
        this.$api.start(id).then((res) => {
          this.$toast("成功，请尽快前往目的地");
          this.disabled1 = true;
          this.reload();
        }).catch(error => {
           console.log("工程师还有订单未完成");
        })
      } else if (stauts == 1) {
        this.$toast("请点击开始维修");
      } else {
        this.$toast("已开始维修，请勿重复点击");
      }
    },
    //到达目的地,维修开始
    arrive(id, stauts) {
      if (stauts == 1) {
        this.$api.arrive(id).then((res) => {
          this.$toast("成功，维修进行中");
          this.reload();
          console.log(res);
        });
      } else if (stauts == 0) {
        this.$toast("请先点击开始维修任务");
      } else {
        this.$toast("已开始维修，请勿重复点击");
      }
    },
    // 完成维修
    over(id, stauts) {
      if (stauts == 2) {
        this.$api.over(id).then((res) => {
          this.$toast("成功，维修已结束");
          this.reload();
        });
      } else if (stauts == 0) {
        this.$toast("请先点击开始维修任务");
      } else if (stauts == 1) {
        this.$toast("请先点击开始维修");
      } else {
        this.$toast("维修已结束，请勿重复点击");
      }
    },
  },
};
</script>

<style>
</style>