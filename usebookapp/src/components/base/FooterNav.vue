<template>
  <van-tabbar v-model="active" route>
    <van-tabbar-item name="home" icon="home-o" to="/home">้ฆ้กต</van-tabbar-item>
 
    <van-tabbar-item name="setting" icon="user-o"  to="/home/about">ๆ็</van-tabbar-item>
  </van-tabbar>
</template>

<script>
import { ref } from "vue";
const nav = {
  setup() {
    const active = ref(0);
    return { active };
  },
  data() {
    return {
      aboutMsg: "Home"
    };
  }
};
export default nav;
</script>