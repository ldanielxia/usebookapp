<template>
    <div>
        <van-nav-bar
            title="My Use Book"
            left-text="Back"
            left-arrow
            @click-left="onClickLeft"
            class="nav"
            right-text="Add"
            @click-right="onClickAdd"
        />
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
                            <van-image :src="this.baseUrl + item.imageUrl" />
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
        <div style="text-align: center" v-if="list.length <= 0">no data</div>
    </div>
</template>
        
<script>
import Storage from '../../storage.js'
import api from '@/api/book/book.js'
const MyUseBooks = {
    data() {
        return {
            baseUrl: '',
            list: []
        }
    },
    created: function () {
        this.baseUrl = process.env.VUE_APP_BASE_API + 'upload/'
        let storage = Storage.get('key')
        if (storage != null) {
            this.id = storage.id
            let data = { id: this.id }
            api.myusebooks(data)
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
    },
    methods: {
        onClickLeft() {
            this.$router.push({
                path: '/home/me'
            })
        },
        onclick(item) {
            this.$router.push({
                path: '/myusebookedit',
                query: { id: item.id }
            })
        },
        onClickAdd() {
            this.$router.push({
                path: '/myusebooknew',
                query: { id: -1 }
            })
        }
    }
}
export default MyUseBooks
</script>
