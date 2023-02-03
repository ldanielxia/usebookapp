<template>
  <div>
    <div  style="margin:0 auto;text-align: center;">
    <van-image
  round
  width="5rem"
  height="5rem"
  :src="require('../assets/img/man.png')"
 
/>
    <h3>{{ firstName }}{{ lastName }}</h3>
</div>
    <van-cell-group >
      
      <van-cell title="Email"  :value="email" />
      <van-cell title="StudentID"   :value="studentID" />
      <van-cell title="Gender"   :value="gender" />
      <van-cell title="BirthDay"   :value="dateofbirth" />
      <van-cell title="Phone"   :value="phone" />
      <van-cell title="School"   :value="school" />
      <van-cell title="Programe"   :value="programe" />
     
    </van-cell-group>
  </div>
</template>
        
<script>
import Storage from "../storage.js";
const about= {
  created: function () {
     let storage=Storage.get("key");
     if (storage!=null) {
      console.log(storage)
       this.email =storage.email 
       this.studentID=storage.studentID
       this.gender=storage.gender
       this.phone=storage.phone
       this.school=storage.school
       this.programe=storage.programe
       this.dateofbirth=storage.dateofbirth
       this.firstName=storage.firstName
       this.lastName=storage.lastName
     }
   },
   data(){
    return {
      email:'',
      studentID:'',
      gender:'',
      phone:'',
      school:'',
      programe:'',
      dateofbirth:'',
      firstName:'',
      lastName:''
    }
   }
};
export default about;
</script>
        
<style>
</style>