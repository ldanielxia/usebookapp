<template>
    <div>
        <van-nav-bar
            title="Book Order's Detail"
            left-text="Back"
            left-arrow
            @click-left="onClickLeft"
            class="nav"
        />
        <van-cell-group>
            <van-cell>
                <van-row type="flex">
                    <van-col span="24">
                        <h3>{{ item.bookTitle }}</h3>
                        <p></p>
                    </van-col>
                </van-row>
            </van-cell>
            <van-row style="height: 50px !important; line-height: 50px">
                <van-col span="19" style="height: 50px">
                    <span v-for="temp in images" :key="temp.id">
                        <van-image
                            :v-lazy="temp.imageUrl"
                            style="margin-left: 10px"
                            :src="this.baseUrl + temp.imageUrl"
                            width="50"
                            height="50"
                            @click="
                                picturePreview(this.baseUrl + temp.imageUrl)
                            "
                        />
                    </span>
                </van-col>
            </van-row>
            <van-cell>
                <van-row type="flex">
                    <van-col span="24"> Author:{{ item.author }} </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex">
                    <van-col span="24">
                        Publish:{{ item.publishYear }}
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex">
                    <van-col span="24"> Price:{{ item.salePrice }} </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex">
                    <van-col span="24"
                        >Name {{ user.firstName }} {{ user.lastName }}
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex">
                    <van-col span="24">Email {{ user.email }} </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex">
                    Favorites
                    <van-switch v-model="favourite" />
                </van-row>
            </van-cell>
        </van-cell-group>
        <van-cell-group>
            <van-cell>
                <van-row type="flex">
                    <van-col span="24">Order infomation </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex">
                    <van-col span="24"
                        >TransDte: {{ orders.transDate }}
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex">
                    <van-col span="24"
                        >meetingAddress: {{ orders.meetingAddress }}
                    </van-col>
                </van-row>
            </van-cell>
            <van-cell>
                <van-row type="flex">
                    <van-col span="24"
                        >contactEmail : {{ orders.contactEmail }}
                    </van-col>
                </van-row>
            </van-cell>
        </van-cell-group>
    </div>
</template>

<script>
import api from '@/api/book/book.js'
import { ImagePreview } from 'vant'
const bookdetail = {
    data() {
        return {
            item: {},
            user: {},
            images: [],

            bookfavorites: {},
            orders: {},
            id: 0,
            baseUrl: '',
            message: '',
            favourite: false
        }
    },
    created: function () {
        this.id = this.$route.query.id
        this.baseUrl = process.env.VUE_APP_BASE_API + 'upload/'
        console.log(this.baseUrl)
        this.initData(this.id)
    },

    methods: {
        initData() {
            let data = {}
            api.bookorderdetail(this.id, data)
                .then((res) => {
                    console.log(res)
                    if (res.data.code == 1) {
                        this.item = res.data.data.book
                        this.user = res.data.data.user
                        this.images = res.data.data.bookimageList
                        this.orders = res.data.data.orders
                        this.bookfavorites = res.data.data.bookfavorites
                        if (this.bookfavorites != null) {
                            this.favourite = true
                        }
                    }
                })
                .catch((e) => {
                    console.log('false' + e)
                })
        },
        picturePreview(url) {
            ImagePreview({
                images: [url],
                closeable: true
            })
        },

        onClickLeft() {
            this.$router.go(-1)
        }
    }
}
export default bookdetail
</script>
<style scoped>
.buttom {
    height: 45px;
    line-height: 45px;
    position: absolute;
    bottom: 15px;
    left: 0;
    width: 100%;
}
.btnLogin {
    background-color: #12c4bb;
    color: white;
    width: 100%;
    margin-top: 30px;
}
</style>