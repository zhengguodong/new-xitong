<template>
    <div id="box">
        <!-- :loop 是否循环  :typeSpeed 输入速度 -->
        <vue-typed-js :strings="['这是一个系统', '条理培训学员','提升自身实力']" :cursorChar="'_'" :typeSpeed="100" :loop="true">
        <h1 class="typing"></h1>
        </vue-typed-js>
    </div>
</template>

<script>
    export default {
        name: "firstPage",
        data(){
            return{

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
</style>
