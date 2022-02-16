<template>
  <div style="width:90%;height:60%;">
      <div id="title"><h1 >每日目标:</h1> </div>
    <el-carousel :interval="4000" type="card" height="500px">
    <el-carousel-item v-for="item in list" :key="item">
      <h3 class="medium">{{ item }}</h3>
    </el-carousel-item>
  </el-carousel>
  </div>
</template>

<script>
export default {
    data(){
        return{
            list:["1.自习","2.自我学习","3.下班","4.自觉下班"]
        }
    }
}
</script>

<style scoped>
.el-carousel__item h3 {
    text-align: center;
    color: #161616;
    font-size: 40px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #71a7f3;
    border-radius: 35px;
  
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: rgb(119, 165, 226);
    border-radius: 35px;
  }
</style>