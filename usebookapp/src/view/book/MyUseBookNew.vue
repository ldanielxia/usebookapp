<template>
    <div>
        <van-nav-bar
            title="My UseBook Detail"
            left-text="Back"
            left-arrow
            @click-left="onClickLeft"
            class="nav"
        />
        <van-cell-group>
            <van-field
                v-model="obj.bookTitle"
                label="Title"
                placeholder="Title"
            />
            <van-field v-model="obj.isbn" label="ISBN" placeholder="ISBN" />
            <van-field
                v-model="obj.author"
                label="Author"
                placeholder="Author"
            />
            <van-field
                v-model="obj.editor"
                label="Editor"
                placeholder="Editor"
            />
            <van-field
                v-model="obj.publishYear"
                is-link
                readonly
                label="PublishYear"
                placeholder="year"
                @click="onPublishYear"
            />
            <van-popup v-model:show="showPublishYear" round position="bottom">
                <van-picker
                    :columns="years"
                    @cancel="onCancelYear"
                    @confirm="onConfirmYear"
                />
            </van-popup>
            <van-field
                v-model="obj.salePrice"
                label="Price"
                placeholder="Price"
                type="number"
            />
            <van-field
                v-model="obj.readingNotes"
                label="ReadingNote"
                placeholder="ReadingNote"
                @click="onShowReadingNotes"
            />
            <van-popup v-model:show="showReadingNotes" round position="bottom">
                <van-picker
                    :columns="readingNotes"
                    @cancel="onCancelReadingNotes"
                    @confirm="onConfirmReadingNotes"
                />
            </van-popup>
            <van-field
                v-model="obj.categoryName"
                label="Major"
                placeholder="Major"
                @click="onShowMajor"
            />
            <van-popup v-model:show="showMajor" round position="bottom">
                <van-picker
                    :columns="Majors"
                    @cancel="onCancelMajor"
                    @confirm="onConfirmMajor"
                />
            </van-popup>
            <van-field
                v-model="obj.remark"
                label="remark"
                placeholder="remark"
                type="textarea"
            />
        </van-cell-group>
        <van-cell-group class="content">
            <van-uploader
                v-model="fileList"
                preview-size="60px"
                class="uploader"
                :after-read="afterRead"
                multiple
                :max-count="3"
            />
            <span class="uploader">tip:upload 3 picture</span>
        </van-cell-group>
        <van-cell-group>
            <van-button block @click="save()">Save</van-button>
        </van-cell-group>
    </div>
</template>
<script >
import api from '@/api/book/book.js'
import categoryapi from '@/api/category/category.js'
import Storage from '../../storage.js'
const MyUseBookEdit = {
    data() {
        return {
            id: -1,
            baseUrl: '',
            obj: {},
            user: {},
            images: [],
            years: [],
            currentYear: '',
            showPublishYear: false,
            showReadingNotes: false,
            readingNotes: ['has', 'no'],
            fileList: [],
            pictureIdsBeforeChange: [],
            imgHasChange: false,
            Majors: [],
            category: [],
            showMajor: false
        }
    },
    created: function () {
        this.id = this.$route.query.id
        this.baseUrl = process.env.VUE_APP_BASE_API + 'upload/'
        this.initData(this.id)
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        initData() {
            for (let i = 1980; i < 2023; i++) {
                this.years.push(i)
            }
            let storage = Storage.get('key')
            if (storage != null) {
                this.obj.userId = storage.id
                this.obj.categoryFatherId = storage.programeId
            }
            let that = this
            let data = {}
            // console.log(this.$route.query.id)
            categoryapi
                .categorybyid(that.obj.categoryFatherId, data)
                .then((res) => {
                    console.log(res)
                    if (res.data.code == 1) {
                        that.category = res.data.data
                        for (let i = 0; i < res.data.data.length; i++) {
                            that.Majors.push(res.data.data[i].categoryName)
                        }
                        console.log(that.Majors)
                    }
                })
                .catch((e) => {
                    console.log('false' + e)
                })

            if (that.id != -1) {
                let data = {}
                api.bookdetail(that.id, data)
                    .then((res) => {
                        console.log(res)
                        if (res.data.code == 1) {
                            that.obj = res.data.data.book
                            that.user = res.data.data.user
                            that.images = res.data.data.bookimageList

                            that.images.forEach(function (item) {
                                item.imageUrl =
                                    that.baseUrl + '' + item.imageUrl
                            })
                            console.log(that.images)
                            for (let i = 0; i < that.images.length; i++) {
                                let x = {
                                    url: that.images[i].imageUrl,
                                    pictureId: that.images[i].id
                                }
                                that.fileList.push(x)
                                that.pictureIdsBeforeChange.push(
                                    that.images[i].id
                                )
                            }
                            console.log(that.fileList)
                            console.log(that.pictureIdsBeforeChange)
                        }
                    })
                    .catch((e) => {
                        console.log('false' + e)
                    })
            } else {
                this.obj.id = -1
            }
        },
        onPublishYear() {
            this.showPublishYear = true
        },
        onCancelYear() {
            this.showPublishYear = false
        },
        onConfirmYear(value) {
            this.obj.publishYear = value

            this.showPublishYear = false
        },
        onShowReadingNotes() {
            this.showReadingNotes = true
        },
        onCancelReadingNotes() {
            this.showReadingNotes = false
        },
        onConfirmReadingNotes(value) {
            this.obj.readingNotes = value
            this.showReadingNotes = false
        },
        onShowMajor() {
            this.showMajor = true
        },
        onCancelMajor() {
            this.showMajor = false
        },
        onConfirmMajor(value) {
            this.obj.categoryName = value
            for (let i = 0; i < this.category.length; i++) {
                if (this.category[i].categoryName == value) {
                    this.obj.categoryId = this.category[i].id
                    break
                }
            }
            this.showMajor = false
        },

        save() {
            if (this.obj.bookTitle == null || this.obj.bookTitle == '') {
                this.$toast.fail('title is  null')
                return
            }
            if (this.obj.isbn == null || this.obj.isbn == '') {
                this.$toast.fail('ISBN is  null')
                return
            }
            if (this.obj.author == null || this.obj.author == '') {
                this.$toast.fail('author is  null')
                return
            }
            if (this.obj.editor == null || this.obj.editor == '') {
                this.$toast.fail('editor is  null')
                return
            }
            if (this.obj.publishYear == null || this.obj.publishYear == '') {
                this.$toast.fail('publishYear is  null')
                return
            }
            if (this.obj.salePrice == null || this.obj.salePrice == '') {
                this.$toast.fail('salePrice is  null')
                return
            }
            if (this.obj.readingNotes == null || this.obj.readingNotes == '') {
                this.$toast.fail('readingNotes is  null')
                return
            }
            if (this.fileList.length <= 0) {
                this.$toast.fail('picture is  null')
            }
            // console.log(this.obj.bookTitle)
            // return
            let storage = Storage.get('key')
            if (storage != null) {
                this.obj.userId = storage.id
            }
            this.obj.price = this.obj.salePrice
            let data = this.obj

            const formData = new FormData()

            //new
            formData.append('data', JSON.stringify(data))
            console.log(this.fileList)
            if (this.fileList.length > 0) {
                this.fileList.forEach((file) => {
                    formData.append('fileList', file.file)
                })
            } else {
                formData.append('fileList', new File([], 'file'))
            }
            console.log(formData.get('fileList'))
            api.newusebooks(formData)
                .then((res) => {
                    console.log(res)
                    if (res.data.code == 1) {
                        console.log('redirect')
                        //redirect to list

                        this.$router.push({
                            path: '/myusebook'
                        })
                    }
                })
                .catch((e) => {
                    console.log('false' + e)
                })
        }
    }
}
export default MyUseBookEdit
</script>
<style scoped>
</style>
