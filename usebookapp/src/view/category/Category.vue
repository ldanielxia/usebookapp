<template>
    <div>
        <div v-if="list.length > 0">
            <van-cell-group v-for="item in list" :key="item.id">
                <van-cell
                    class="grey-bg"
                    is-link
                    @click="onclick(item)"
                    :id="item.id"
                >
                    <van-row type="flex">
                        <van-col span="16"
                            ><span class="blue-color">{{
                                item.categoryName
                            }}</span></van-col
                        >
                    </van-row>
                </van-cell>
            </van-cell-group>
        </div>
        <div style="text-align: center" v-if="list.length <= 0">No Data</div>
        <div class="content" style="height: 45px" />
    </div>
</template>
        
<script>
import api from '@/api/category/category.js'
const about = {
    created: function () {
        this.getdata()
    },
    data() {
        return {
            loading: false,
            finished: false,
            list: [],
            id: this.$route.query.id == null ? 0 : this.$route.query.id
        }
    },
    watch: {
        $route(to, from) {
            if (to.query.id != null) {
                if (to.query.id != from.query.id) {
                    this.id = to.query.id
                    this.getdata() //refresh reload data
                }
            }
        }
    },
    methods: {
        onclick(item) {
            //  console.log(item);
            if (item.layer < 4) {
                this.$router.push({
                    path: '/home/category',
                    query: { id: item.id }
                })
            } else {
                this.$router.push({
                    path: '/bookListbycategory',
                    query: { id: item.id, fatherid: this.id }
                })
            }
        },
        getdata() {
            let data = {}
            console.log(this.$route.query.id)
            api.categorybyid(this.id, data)
                .then((res) => {
                    console.log(res)
                    if (res.data.code == 1) {
                        this.list = res.data.data
                    }
                })
                .catch((e) => {
                    console.log('false' + e)
                })
        }
    }
}
export default about
</script>
        
<style>
</style>