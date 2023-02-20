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
                    <van-switch
                        v-model="favourite"
                        @change="handleChangeFovorites"
                    />
                </van-row>
            </van-cell>
        </van-cell-group>
        <!--communicate list-->

        <div v-if="bookcommunicateExtends.length > 0">
            <div>Message</div>
            <van-cell-group
                v-for="item in bookcommunicateExtends"
                :key="item.id"
            >
                <van-cell class="grey-bg" :id="item.id">
                    <van-row type="flex" v-if="item.isOwner === 0">
                        <van-col span="7">
                            {{ item.firstName }}
                            {{ item.lastName }}</van-col
                        >
                        <van-col span="10">
                            <div>
                                {{ item.createDT }}
                            </div>
                        </van-col>
                        <van-col span="7"> </van-col>
                    </van-row>
                    <van-row type="flex" v-if="item.isOwner === 1">
                        <van-col span="7"> </van-col>
                        <van-col span="10">
                            <div>
                                {{ item.createDT }}
                            </div>
                        </van-col>
                        <van-col span="7">
                            {{ item.firstName }}
                            {{ item.lastName }}</van-col
                        >
                    </van-row>
                    <van-row type="flex">
                        <van-col span="24">
                            {{ item.content }}
                        </van-col>
                    </van-row>
                </van-cell>
            </van-cell-group>
        </div>
        <div class="buttom">
            <van-cell-group inset>
                <van-field
                    v-model="message"
                    center
                    clearable
                    label="Message"
                    placeholder="enter"
                    @clear="handleClearMessage"
                >
                    <template #button>
                        <van-button
                            size="small"
                            type="primary"
                            @click="handleAddCommunicate"
                            >Send</van-button
                        >
                    </template>
                </van-field>
            </van-cell-group>
        </div>
    </div>
</template>

<script>
// import router from '@/router/index.js'
import api from '@/api/book/book.js'
import favoriteapi from '@/api/book/bookfavorites.js'
import { ImagePreview } from 'vant'
const bookdetail = {
    data() {
        return {
            item: {},
            user: {},
            images: [],
            bookcommunicateExtends: [],
            bookfavorites: {},
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
            api.bookdetail(this.id, data)
                .then((res) => {
                    console.log(res)
                    if (res.data.code == 1) {
                        this.item = res.data.data.book
                        this.user = res.data.data.user
                        this.images = res.data.data.bookimageList
                        this.bookcommunicateExtends =
                            res.data.data.bookcommunicateExtends
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
        handleAddCommunicate() {
            let data = {}

            data.content = this.message
            data.bookId = this.item.id
            data.userId = this.user.id
            data.createDT = new Date()
            if (this.item.userId == this.user.id) data.isOwner = 1
            else data.isOwner = 0
            api.addBookcommunicate(data, null)
                .then((res) => {
                    console.log(res)
                    this.initData()
                    this.message = ''
                })
                .catch((e) => {
                    console.log('false' + e)
                })
        },
        handleClearMessage() {
            console.log('clear')
            this.message = ''
        },
        onClickLeft() {
            this.$router.go(-1)
        },
        handleChangeFovorites() {
            let data = {}
            data.bookId = this.item.id
            data.userId = this.user.id
            if (this.favourite) {
                //insert
                favoriteapi
                    .add(data, null)
                    .then((res) => {
                        console.log(res)
                        if (res.data.code == 1) {
                            console.log('insert success')
                        } else {
                            console.log('insert false')
                        }
                    })
                    .catch((e) => {
                        console.log('false' + e)
                    })
            } else {
                //delete
                favoriteapi
                    .delete(data, null)
                    .then((res) => {
                        console.log(res)
                        if (res.data.code == 1) {
                            console.log('delete success')
                        } else {
                            console.log('delete false')
                        }
                    })
                    .catch((e) => {
                        console.log('false' + e)
                    })
            }
        }
    }
}
export default bookdetail
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