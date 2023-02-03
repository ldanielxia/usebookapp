<template>
    <div>
         <van-nav-bar
      title="Book Detail"
      left-text="Back"
      left-arrow
     @click-left="onClickLeft"
    />
    <van-cell-group>
         <van-cell>
        <van-row type="flex" >
              <van-col span="24">
                dd 
              </van-col>
                 </van-row>
 </van-cell>
               <van-cell>

                  <van-row type="flex" >
                <van-col span="24">
                dd 
              </van-col>
          
        </van-row>
        
         </van-cell>
    </van-cell-group>
    </div>
</template>

<script>
import router from "@/router/index.js";
const bookdetail = {
    setup(){

    const onClickLeft = () => {
      router.push("/home");
    };
     return {
      onClickLeft,
    };
    },
    data() {
      return{
         item:null,
         id:0
      }
    },
     created: function () {
           this.id = this.$route.query.id
           console.log(this.id)
     }
 }
export default bookdetail;
</script>
<style>

</style>