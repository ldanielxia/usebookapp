<template>
    <div>
        <van-nav-bar title="Error Page" />
        <van-cell-group inset>
            <van-cell title="Code" :value="errcode" />
            <van-cell title="Error" value="" :label="errmsg" />
        </van-cell-group>
    </div>
</template>
<script>
export default {
    setup() {
        console.log()
    },
    data() {
        return {
            errcode: this.$route.query.errcode,
            errmsg: this.$route.query.errmsg
        }
    },
    created: function () {}
}
</script>