<template>
    <div>
        <van-nav-bar
            title="Make Order"
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
            <van-field
                v-model="order.transDate"
                is-link
                readonly
                label="transDate"
                placeholder="transDate"
                @click="onTransDate"
            />
            <van-popup v-model:show="showTransDate" round position="bottom">
                <van-datetime-picker
                    v-model="currentDate"
                    type="date"
                    title="Choice Date"
                    :min-date="minDate"
                    :max-date="maxDate"
                    @cancel="onCancelDatePicker"
                    @confirm="onConfirmDatePicker"
                />
            </van-popup>
            <van-field
                v-model="order.meetingAddress"
                label="meetingAddress"
                placeholder="meetingAddress"
                type="textarea"
            />
            <van-field
                v-model="order.contactEmail"
                label="contact Email"
                placeholder="Email"
            />
            <van-cell-group>
                <van-button class="btnLogin" block @click="handleorder()"
                    >Save</van-button
                >
            </van-cell-group>
        </van-cell-group>
    </div>
</template>

<script>
// import router from '@/router/index.js'
import api from '@/api/book/book.js'
import orderapi from '@/api/book/order.js'
import { ImagePreview } from 'vant'
import Storage from '../../storage.js'
const bookdetail = {
    data() {
        return {
            item: {},
            user: {},
            order: {},
            images: [],
            bookcommunicateExtends: [],
            bookfavorites: {},
            id: 0,
            baseUrl: '',
            message: '',
            favourite: false,
            showTransDate: false,
            minDate: new Date(2023, 0, 1),
            maxDate: new Date(2025, 10, 1)
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
            this.baseUrl = process.env.VUE_APP_BASE_API + 'upload/'
            let storage = Storage.get('key')

            let data = {}
            api.bookdetail(this.id, data)
                .then((res) => {
                    console.log(res)
                    if (res.data.code == 1) {
                        this.item = res.data.data.book
                        this.user = res.data.data.user
                        // this.order.contactEmail = this.user.email
                        if (storage != null) {
                            this.order.contactEmail = storage.email
                        }
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

        handleClearMessage() {
            console.log('clear')
            this.message = ''
        },
        onClickLeft() {
            this.$router.go(-1)
        },

        handleorder() {
            let that = this
            if (that.order.transDate == null || that.order.transDate == '') {
                this.$toast.fail('transDate is  null')
                return
            }
            if (
                that.order.meetingAddress == null ||
                that.order.meetingAddress == ''
            ) {
                this.$toast.fail('meetingAddress is  null')
                return
            }
            if (
                that.order.contactEmail == null ||
                that.order.contactEmail == ''
            ) {
                this.$toast.fail('contactEmail is  null')
                return
            }
            this.$dialog
                .confirm({
                    title: 'order',
                    message: 'Are you sure to make order'
                })
                .then(() => {
                    // on confirm
                    that.order.bookId = that.item.id
                    that.order.sellerId = that.item.userId
                    let storage = Storage.get('key')
                    if (storage != null) {
                        that.order.buyerId = storage.id
                    }

                    that.order.transDate = new Date(that.order.transDate)
                    orderapi
                        .orders(that.order)
                        .then((res) => {
                            console.log(res)
                            if (res.data.code == 1) {
                                this.$router.push({
                                    path: '/home/index'
                                })
                            }
                        })
                        .catch((e) => {
                            console.log('false' + e)
                        })
                })
                .catch(() => {
                    // on cancel
                })
        },
        onTransDate() {
            this.showTransDate = true
        },
        onCancelDatePicker() {
            this.showTransDate = false
        },
        onConfirmDatePicker() {
            this.order.transDate = this.timeFormat(this.currentDate)
            this.showTransDate = false
        },
        timeFormat(time) {
            let year = time.getFullYear()
            let month = time.getMonth() + 1
            let day = time.getDate()
            return (
                // year + '-' + month + '-' + day
                year +
                '-' +
                month.toString().padStart(2, 0) +
                '-' +
                day.toString().padStart(2, 0)
            )
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