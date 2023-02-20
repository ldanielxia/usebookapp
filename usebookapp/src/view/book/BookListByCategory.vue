<template>
    <div>
        <van-nav-bar
            title="Book Detail"
            left-text="Back"
            left-arrow
            @click-left="onClickLeft"
        />
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
                            <van-col span="8">
                                <van-image
                                    :src="this.baseUrl + item.imageUrl"
                                />
                            </van-col>
                            <van-col span="16">
                                <div>
                                    {{ item.bookTitle }}
                                </div>
                                <div>
                                    Author:{{ item.author }} Price:${{
                                        item.salePrice
                                    }}
                                    ReadingNote:{{ item.readingNotes }}
                                </div>
                            </van-col>
                        </van-row>
                    </van-cell>
                </van-cell-group>
            </div>
            <div style="text-align: center" v-if="list.length <= 0">
                no data
            </div>
        </div>
    </div>
</template>

<script>
// import router from '@/router/index.js'
import api from '@/api/book/book.js'

const booklistbycategory = {
    data() {
        return {
            list: [],
            id: 0,
            fatherid: 0,
            baseUrl: ''
        }
    },
    created: function () {
        this.baseUrl = process.env.VUE_APP_BASE_API + 'upload/'
        this.id = this.$route.query.id
        this.fatherid = this.$route.query.fatherid
        console.log('ID' + this.id)
        let data = {}
        api.booklistbycategory(this.id, data)
            .then((res) => {
                console.log(res)
                if (res.data.code == 1) {
                    this.list = res.data.data
                }
            })
            .catch((e) => {
                console.log('false' + e)
            })
    },

    methods: {
        onClickLeft() {
            this.$router.push({
                path: '/home/category',
                query: { id: this.fatherid }
            })
        },
        onclick(item) {
            this.$router.push({ path: '/bookdetail', query: { id: item.id } })
        }
    }
}
export default booklistbycategory
</script>
<style>
.buttom {
    height: 45px;
    line-height: 45px;
    position: absolute;
    bottom: 15px;
    left: 0;
    width: 100%;
}
</style>