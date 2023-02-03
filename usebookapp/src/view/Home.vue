<template>
  <div>
    <van-nav-bar :title="aboutMsg" />
    <router-view></router-view>
    <van-tabbar v-model="active"  @change="onChange">
  <van-tabbar-item name="home" icon="home-o">Home</van-tabbar-item>
  <van-tabbar-item name="category" icon="search">Category</van-tabbar-item>
  <van-tabbar-item name="me" icon="setting-o">Me</van-tabbar-item>
</van-tabbar>
  </div>
</template>
<script>
// import { Toast } from "vant";

const home = {
  setup() {
   
  },
  data() {
    return {
      aboutMsg: "UsedBookSytem",
      mytitle: "",
      active: 'search',
    };
  },
  create() {
    
  },
  methods:{
    onChange(index){
       console.log(index)
       switch(index)
       {
         case 'home':
           this.$router.push("/home/index");
           break
           case 'category':
           this.$router.push({path:"/home/category",query:{id:0}});
           break
         case 'me':
           this.$router.push("/home/me");
           break
       }
    } 
  },
  mounted(){

  }

};
export default home;
</script>