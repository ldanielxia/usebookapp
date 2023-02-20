<template>
    <div>
        <van-nav-bar
            title="Infomation"
            left-text="Back"
            left-arrow
            @click-left="onClickLeft"
        />
        <div style="margin: 0 auto; text-align: center">
            <h3>{{ obj.fir }}</h3>
        </div>
        <van-cell-group>
            <van-cell title="Email" :value="obj.email" />

            <van-field
                v-model="obj.studentID"
                label="StudentID"
                placeholder="StudentID"
            />
            <van-field
                v-model="obj.gender"
                is-link
                readonly
                label="Gender"
                placeholder="Choice Gender"
                @click="onShowGender"
            />
            <van-popup v-model:show="showGender" round position="bottom">
                <van-picker
                    :columns="genders"
                    @cancel="onCancelGender"
                    @confirm="onConfirmGender"
                    @change="onChangeGender"
                />
            </van-popup>

            <van-field
                v-model="obj.dateOfBirth"
                is-link
                readonly
                label="Birthday"
                @click="onShowBirthday"
            />
            <van-popup v-model:show="showBirthday" round position="bottom">
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

            <van-field v-model="obj.phone" label="Phone" placeholder="Phone" />
            <van-field
                v-model="obj.area"
                is-link
                readonly
                label="Area"
                @click="onShowArea"
            />
            <van-popup
                :lazy-render="true"
                v-model:show="showArea"
                round
                position="bottom"
            >
                <van-picker
                    :columns="areas"
                    @cancel="onCancelArea"
                    @confirm="onConfirmArea"
                />
            </van-popup>

            <van-field
                v-model="obj.school"
                is-link
                readonly
                label="School"
                @click="onShowSchool"
            />
            <van-popup v-model:show="showSchool" round position="bottom">
                <van-picker
                    :columns="schools"
                    @cancel="onCancelSchools"
                    @confirm="onConfirmSchools"
                />
            </van-popup>
            <van-field
                v-model="obj.programe"
                is-link
                readonly
                label="Programe"
                @click="onShowPrograme"
            />
            <van-popup v-model:show="showPrograme" round position="bottom">
                <van-picker
                    :columns="programes"
                    @cancel="onCancelPrograme"
                    @confirm="onConfirmPrograme"
                />
            </van-popup>
        </van-cell-group>
        <van-cell-group>
            <van-button type="primary" block @click="save()">Save</van-button>
        </van-cell-group>
    </div>
</template>
<script>
import api from '@/api/users/users.js'
import categoryApi from '@/api/category/category.js'
import Storage from '../../storage.js'
const infomation = {
    data() {
        return {
            id: 0,
            obj: {},
            showGender: false,
            genders: ['male', 'female'],
            showBirthday: false,
            showArea: false,
            showSchool: false,
            showPrograme: false,
            minDate: new Date(1900, 0, 1),
            maxDate: new Date(2025, 10, 1),
            currentDate: new Date(2020, 0, 1),

            arealist: {},
            currentArea: '',

            areas: [],
            schools: [],
            currentSchool: '',

            schoollist: {},
            programes: [],
            programelist: {}
        }
    },
    methods: {
        onClickLeft() {
            this.$router.go(-1)
        },
        onShowGender() {
            this.showGender = true
        },
        onCancelGender() {
            this.showGender = false
        },
        onShowSchool() {
            this.showSchool = true
        },
        onConfirmGender(value) {
            this.obj.gender = value
            console.log(this.obj.gender)
            this.showGender = false
        },
        onChangeGender() {},
        onShowBirthday() {
            this.showBirthday = true
        },
        onCancelDatePicker() {
            this.showBirthday = false
        },
        onConfirmDatePicker() {
            this.obj.dateOfBirth = this.timeFormat(this.currentDate)
            this.showBirthday = false
        },
        timeFormat(time) {
            let year = time.getFullYear()
            let month = time.getMonth() + 1
            let day = time.getDate()
            return year + '-' + month + '-' + day
        },
        onShowArea() {
            this.showArea = true
        },
        onCancelArea() {
            this.showArea = false
        },
        onConfirmArea(value, index) {
            this.obj.area = value
            this.obj.areaId = this.arealist[index].id
            this.showArea = false
            //request school
            let data = {}
            categoryApi
                .categorybyid(this.obj.areaId, data)
                .then((res) => {
                    console.log(res)
                    this.schools = []
                    if (res.data.code == 1) {
                        this.schoollist = res.data.data
                        for (let i = 0; i < res.data.data.length; i++) {
                            this.schools.push(res.data.data[i].categoryName)
                        }
                    }
                    console.log(this.schools)
                })
                .catch((e) => {
                    console.log('false' + e)
                })
        },
        onCancelSchools() {
            this.showSchool = false
        },
        onConfirmSchools(value, index) {
            this.obj.school = value
            this.obj.schoolId = this.schoollist[index].id
            this.showSchool = false
            categoryApi
                .categorybyid(this.obj.schoolId, {})
                .then((res) => {
                    this.programes = []
                    if (res.data.code == 1) {
                        this.programelist = res.data.data
                        for (let i = 0; i < res.data.data.length; i++) {
                            this.programes.push(res.data.data[i].categoryName)
                        }
                    }
                })
                .catch((e) => {
                    console.log('false' + e)
                })
        },
        onShowPrograme() {
            this.showPrograme = true
        },
        onCancelPrograme() {
            this.showPrograme = false
        },
        onConfirmPrograme(value, index) {
            this.obj.programe = value
            this.obj.programeId = this.programelist[index].id
            this.showPrograme = false
        },
        save() {
            console.log(this.obj)
            //check the text value
            if (this.obj.studentID == '') {
                this.$toast.fail('Student ID  is not null')
                return
            }
            if (
                this.obj.programe == '' ||
                this.obj.school == '' ||
                this.obj.area == ''
            ) {
                this.$toast.fail('area and school and programe  is not null')
                return
            }
            api.update(this.obj)
                .then((res) => {
                    console.log(res)
                })
                .catch((e) => {
                    console.log('false' + e)
                })
        }
    },

    created: function () {
        let storage = Storage.get('key')
        if (storage != null) {
            this.id = storage.id
            let data = {}

            api.getOne(this.id, data)
                .then((res) => {
                    console.log(res)
                    if (res.data.code == 1) {
                        this.obj = res.data.data
                        this.currentDate = new Date(res.data.data.dateOfBirth)
                        console.log(this.currentDate)
                    }
                })
                .catch((e) => {
                    console.log('false' + e)
                })
            //load Area
            categoryApi
                .categorybyid(0, data)
                .then((res) => {
                    console.log(res)
                    if (res.data.code == 1) {
                        this.arealist = res.data.data
                        for (let i = 0; i < res.data.data.length; i++) {
                            this.areas.push(res.data.data[i].categoryName)
                        }
                    }
                })
                .catch((e) => {
                    console.log('false' + e)
                })
        } else {
            console.log('no key')
        }
    }
}
export default infomation
</script>