<template>
    <div id="box">
        <el-card class="box-card">

        </el-card>
    </div>
</template>

<script>
    export default {
        name: "mine",
        data(){

            return{
                centerDialogVisible: false
            }

        },
        methods:{

        }
    }
</script>

<style scoped>
    #box{
        width: 100%;
        height: 100%;
        background-image: url("../pics/beijing5.jpeg");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;/*开启弹性布局*/
        justify-content: center;/*横轴居中*/
        align-items: center;/*垂直居中*/
    }
    .box-card{
        width: 35%;
        height: 90%;
    }
</style>
