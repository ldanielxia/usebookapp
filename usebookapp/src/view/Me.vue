<template>
    <div>
        <div style="margin: 0 auto; text-align: center">
            <van-image
                round
                width="5rem"
                height="5rem"
                :src="require('../assets/img/man.png')"
            />
            <h3>{{ firstName }}{{ lastName }}</h3>
        </div>
        <van-cell-group>
            <van-cell title="Email" :value="email" />
            <van-cell title="StudentID" :value="studentID" />
            <van-cell title="Gender" :value="gender" />
            <van-cell title="BirthDay" :value="dateofbirth" />
            <van-cell title="Phone" :value="phone" />
            <van-cell title="School" :value="school" />
            <van-cell title="Programe" :value="programe" />
        </van-cell-group>
        <div class="content">
            <van-cell-group inset>
                <van-cell title="My Favorite" @click="handleFavoriteBook" />
            </van-cell-group>
        </div>
        <div class="content">
            <van-cell-group inset>
                <van-cell
                    title="Modify Infomation  "
                    @click="handleInfomation"
                />
            </van-cell-group>
        </div>
        <div class="content">
            <van-cell-group inset>
                <van-cell title="Logout  " @click="logout" />
            </van-cell-group>
        </div>
        <div class="content" style="height: 50px" />
    </div>
</template>
        
<script>
import Storage from '../storage.js'
const about = {
    created: function () {
        let storage = Storage.get('key')
        if (storage != null) {
            console.log(storage)
            this.email = storage.email
            this.studentID = storage.studentID
            this.gender = storage.gender
            this.phone = storage.phone
            this.school = storage.school
            this.programe = storage.programe
            this.dateofbirth = storage.dateofbirth
            this.firstName = storage.firstName
            ;(this.lastName = storage.lastName), (this.id = storage.id)
        }
    },
    data() {
        return {
            email: '',
            studentID: '',
            gender: '',
            phone: '',
            school: '',
            programe: '',
            dateofbirth: '',
            firstName: '',
            lastName: '',
            id: 0
        }
    },
    methods: {
        logout() {
            this.$dialog
                .confirm({
                    message: 'Are you sure to exit system?'
                })
                .then(() => {
                    //clear
                    Storage.remove('key')
                    this.$router.replace('/')
                })
                .catch((error) => {
                    console.log(error)
                })
        },
        handleInfomation() {
            this.$router.push('/infomation')
        },
        handleFavoriteBook() {
            this.$router.push('/myfavoritebook')
        }
    }
}
export default about
</script>
        
<style>
.content {
    background-color: #fff;
    margin: 5px 0px;
    border-radius: 5px;
    box-shadow: 0 8px 12px #ebedf0;
    /* height: 385px; */
}
</style>