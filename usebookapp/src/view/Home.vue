<template>
    <div>
        <div id="mine">
            <van-nav-bar :title="aboutMsg" class="nav" />
        </div>
        <router-view></router-view>
        <van-tabbar v-model="active" @change="onChange">
            <van-tabbar-item name="home" icon="home-o">Home</van-tabbar-item>
            <van-tabbar-item name="category" icon="search"
                >Category</van-tabbar-item
            >
            <van-tabbar-item name="me" icon="setting-o">Me</van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script>
const home = {
    setup() {},
    data() {
        return {
            aboutMsg: 'UsedBookSytem',
            mytitle: '',
            active: 'search'
        }
    },
    create() {},
    methods: {
        onChange(index) {
            switch (index) {
                case 'home':
                    this.$router.push('/home/index')
                    break
                case 'category':
                    this.$router.push({
                        path: '/home/category',
                        query: { id: 0 }
                    })
                    break
                case 'me':
                    this.$router.push('/home/me')
                    break
            }
        }
    },
    mounted() {}
}
export default home
</script>
<style  >
.nav {
    background-color: #12c4bb !important;
}
.van-nav-bar__title {
    color: white !important;
}
</style>