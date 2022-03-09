<template>
  <div style="width:100%;height:100%;">
    <el-card style="width: 1600px;height: 300px;margin: 0 auto">
      <el-carousel :interval="4000" type="card" height="280px">
        <el-carousel-item v-for="item in list" :key="item" style="display: flex;justify-content: center;align-items: center">
          <h3 class="medium">{{ item }}</h3>
        </el-carousel-item>
      </el-carousel>
    </el-card>
      <div id="bottombox" >
        <br>
          <h3>每日笔记：</h3>
        <br><br>
        <div style="width: 95%;margin: 0 auto">
          <mavon-editor v-model="textarea" placeholder="请输入内容" />
        </div>
        <br><br>
        <el-button type="primary" @click="push">提交</el-button>
      </div>
    <div id="dh">
      <div>【人生若只如初见♥何事秋风悲画扇】</div>
      <div>Live For Code</div>
    </div>
  </div>
</template>

<script>
  import "../style/anination.css"
export default {
    data(){
        return{
            list:["1.自习","2.自我学习","3.下班","4.自觉下班"],
          textarea:""
        }
    },
  methods:{
    push(){
      if(this.textarea!=''){
        console.log(this.textarea)
        this.$message({
          message: '提交成功',
          type: 'success'
        });
        this.textarea=''
      }else{
        this.$message({
          message: '请完成日报填写！',
          type: 'warning'
        });
      }


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
  #bottombox{
    width: 40%;
    height: 500px;
    background-color: white;
    margin: 15px auto;
    border: 1px solid #EBEEF5;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
    text-align: center;
  }
  #dh{
    text-align: center;
    font-size: 12px;
    color: #888;
    width: 400px;
    height: 100px;
    position: relative;
    left:100px;
    bottom: 100px;
    animation: face 5s infinite ease-in-out;
  }

</style>
