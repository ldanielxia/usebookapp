<template>
  <div>
    <!-- <van-row type="flex">
      <van-col span="24">{{user}}</van-col>
    </van-row> -->
 
    <van-search v-model="searchValue" placeholder="enter search keyword" @search="onSearch"/>
    <div>
      <div v-if="list.length>0">
         <van-cell-group v-for="item in list" :key="item.id" >
            <van-cell class="grey-bg" is-link  @click="onclick(item)"  :id="item.id" > 
             <van-row type="flex" >
              <van-col span="8">
                
    <van-image    :src="this.baseUrl+item.imageUrl"/>
              </van-col>
              <van-col span="16">
              <div>
                {{item.bookTitle}}
              </div>
                <div>
                  Author:{{item.author}}     Price:${{item.salePrice}}  
                  ReadingNote:{{item.readingNotes}} 
                </div>
              </van-col>
             </van-row>
            </van-cell>
          </van-cell-group>
      </div>
      <div style="text-align:center" v-if="list.length<=0">
          no data
      </div>
    </div>
  </div>
</template>
        
<script>
import Storage from "../storage.js";
import api from "@/api/book/book.js";
export default {
  data() {
    return {
      user: "",
      isLimit:false,
      list:[],
      baseUrl:"",
      searchValue: '',
    };
  },
  created: function () {
    this.baseUrl=process.env.VUE_APP_BASEAPP;
    console.log(this.baseUrl);
    let storage=Storage.get("key");
    if (storage!=null) {
      this.user ="User:"+storage.email ;   
    }else{
        this.$router.push("/errorpage?errcode=9999&errmsg=not power to login");
    }
    let data = {};
    api.top10list(data)
        .then(res => {
            console.log(res);
            if(res.data.code==1){
               this.list=res.data.data
            }
        })
        .catch((e) => {
          console.log("false"+e);    
    })
  },
  methods:{
    onSearch(value){
      let data = {"keyword":value};
      api.search(data)
        .then(res => {
            console.log(res);
            this.list=res.data.data
        })
        .catch((e) => {
          console.log("false"+e);    
    })
    },
    onclick(item){
      console.log(item)
        this.$router.push({path:"/bookdetail",query:{id:item.id}});
   }

  }
};
</script>
        
<style>
body {
  background-color: #f7f8fa;
}
.city-search {
    background-color: #F7F8FA;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 2.3rem;
    width: 94vw;
    margin: 2vw 4vw;
    border-radius: 8px;
}
.search-icon {
      margin-left: 5px;
    }
    input {
      margin: 0 1.5vw;
      background-color: #F7F8FA;
      border: 0px;
      font-size: 14px;
      flex: 1
    }
    .clear-icon { color: #999;}

</style>