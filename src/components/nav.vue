<template>
  <div id="box">
<!--      <hr>-->

      <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
               active-text-color="#ffd04b">
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
                  <el-menu-item index="1-1" v-if="status!='student'||status=='admin'" name="dh1">
                      <router-link to="/timetable" style=" text-decoration: none;" id="dh1">课程新增</router-link>
                  </el-menu-item>
                  <el-menu-item index="1-2" name="dh2">
                      <router-link to="/courseQuery" style=" text-decoration: none;" id="dh2">课程查询</router-link>
                  </el-menu-item>
                  <el-menu-item index="1-3" v-if="status=='student'||status=='admin'">
                      <router-link to="/homework" style=" text-decoration: none;">课程作业</router-link>
                  </el-menu-item>

              <el-menu-item index="1-4" v-if="status=='student'||status=='admin'">
                  <router-link to="/jobDetails" style=" text-decoration: none;">作业详情</router-link>
              </el-menu-item>


          <el-menu-item disabled>
              <template slot="title">
                  <i class="el-icon-location"></i>
                  <span slot="title">考核</span>
              </template>
          </el-menu-item>
                  <el-menu-item index="2-1" v-if="status=='student'||status=='admin'">
                      <router-link to="/reportCard" style=" text-decoration: none;">成绩表</router-link>
                  </el-menu-item>
                  <el-menu-item index="2-2" v-if="status!='student'||status=='admin'">
                      <router-link to="/checkPub" style=" text-decoration: none;">考核发布</router-link>
                  </el-menu-item>
              <el-menu-item index="2-4">
                  <span slot="title">
                      <router-link to="/Details" style=" text-decoration: none;">考核详情</router-link>
                  </span>
              </el-menu-item>


          <el-menu-item index="4" >
              <i class="el-icon-setting"></i>
              <span slot="title">
                  <router-link to="/dailyTask" style=" text-decoration: none;">每日任务</router-link>
              </span>
          </el-menu-item>
      </el-menu>
  </div>
</template>

<script>
    import {searchPerson} from "../api/test.js"
export default {
    data(){
        return{
            status:''
        }
    },
    mounted() {
        this.getStatus();
    },
    methods:{
        getStatus(){
            searchPerson().then((res)=>{
                res.data.data.map((x)=>{
                    if(x.username==sessionStorage.getItem("id_person")){
                        this.status=x.status;
                    }
                })
                console.log("yonghu",this.status)
            })
        },
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
