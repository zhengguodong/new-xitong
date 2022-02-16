<template>
<div >
    <div id="left"><Navigation/></div>
    <div id="right"><router-view></router-view></div>
</div>
</template>

<script>
    import Navigation from '../components/top'
    export default {
        name: "home",
        components:{
            Navigation
        },
        methods:{
            a(){
                this.$axios.get('/a').then((res)=>{
                    console.log(res)
                })
            }

        }
    }
</script>

<style scoped>
#right{
    width: calc(100% - 205px);
    height:calc(100% - 85px);
    position: absolute;
    left:200px;
    top:80px;
    background-color: rgb(245, 240, 241);
    padding-left: 5px;
    padding-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
