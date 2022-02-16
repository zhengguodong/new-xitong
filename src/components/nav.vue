<template>
  <div id="box">
<!--      <hr>-->
<br>
      <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" >
          <el-menu-item index="5">
              <i class="el-icon-menu"></i>
              <span slot="title"><router-link to="/firstPage" style=" text-decoration: none;">首页</router-link></span>
          </el-menu-item>
       <el-menu-item disabled>
              <template slot="title">
                  <i class="el-icon-reading"></i>
                  <span slot="title">课程</span>
              </template>
       </el-menu-item>
<!--                  <span slot="title">分组1</span>-->
                  <el-menu-item index="1-1"><router-link to="/timetable" style=" text-decoration: none;">课程新增</router-link></el-menu-item>
                  <el-menu-item index="1-2"><router-link to="/courseQuery" style=" text-decoration: none;">课程查询</router-link></el-menu-item>
              
             
                  <el-menu-item index="1-3"><router-link to="/homework" style=" text-decoration: none;">课程作业</router-link></el-menu-item>
              
              <el-menu-item index="1-4">
                  <router-link to="/jobDetails" style=" text-decoration: none;">作业详情</router-link>
              </el-menu-item>
         

          <el-menu-item disabled>
              <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">考核</span>
              </template>
          </el-menu-item>
                  <el-menu-item index="2-1"><router-link to="/reportCard" style=" text-decoration: none;">成绩表</router-link></el-menu-item>
                  <el-menu-item index="2-2"><router-link to="/checkPub" style=" text-decoration: none;">考核发布</router-link></el-menu-item>
              <el-menu-item index="2-4">
                  <span slot="title"><router-link to="/Details" style=" text-decoration: none;">考核详情</router-link></span>
              </el-menu-item>
         

          <el-menu-item index="4">
              <i class="el-icon-setting"></i>
              <span slot="title"><router-link to="/dailyTask" style=" text-decoration: none;">每日任务</router-link></span>
          </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        }
    }
}
</script>

<style scoped>
    .el-menu-vertical-demo:not(.el-menu--collapse) {
        width: 200px;
        min-height: 100%;
        margin-top: 0;
       
    }
    #box{
        background-color: rgb(250, 249, 240);
        width: 200px;
        height:100%;
    }
    .el-menu {
        background-color: white;
    }
    .el-menu-item{
        background-color: white;
        border-bottom: 1px rgb(235, 235, 235) solid;
        /* text-align: center; */
    }
</style>
