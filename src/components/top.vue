<template>
  <div style="height:100%">
      <div id="header">
          <div id="left">
              <img src="../pics/logo.png"/>
              
              </div>
              &nbsp;&nbsp;&nbsp;
              <div id="title">学员培训系统</div>
          <div id="right">
              <div id="head">
                  <img src="../pics/tx.jpeg"/>
                  
              </div>
          <el-dropdown trigger="click">
            <span class="el-dropdown-link">
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
            <el-dropdown-item ><strong>用户：</strong>{{username}}</el-dropdown-item>
            <el-dropdown-item ><el-button type="text" @click="out">退出</el-button></el-dropdown-item>

            </el-dropdown-menu>
            </el-dropdown>
          </div>
      </div>
      <div id="nav"><Nav/></div>
  </div>
</template>

<script>
import Nav from './nav.vue'
export default {
    data(){
        return{
            username:''
        }
    },
       components:{
         Nav
        },
    mounted(){
            this.getname()
    },
    methods:{
        out(){
            localStorage.removeItem('passkey')
            this.$router.push({path:'/login'})
        },
        getname(){
            this.$axios.post('/searchId').then((res)=>{

                   res.data.map((i)=>{
                       if(i.id_person===localStorage.getItem('id_person')){
                           this.username=i.name;
                           localStorage.setItem('name',this.username)
                       }
                   })

            })
        }
    }
}
</script>

<style scoped>
#header{
    width: 100%;
    height: 80px;
    /*background-color: rgb(245, 240, 241);*/
    background-color: rgb(119, 165, 226);
    display: flex;
}
#title{
    font-family: "Courier New", Courier, monospace;
    font-size: 30px;
    color: #fff;
    line-height: 80px;
}
#left{
    margin-left: 30px;
    /* width: 200px; */
    height: 100%;
    /* font-size: 50px;
    line-height: 80px; */
    display: flex;
}
#right{
    margin-left: auto;
    width: 250px;
    height: 100%;
    display: flex;/*开启弹性布局*/
    justify-content: center;/*横轴居中*/
    align-items: center;/*垂直居中*/



    /* background-color: #fff; */

}
#head{
    width: 70px;
    height: 70px;
    border-radius: 134px;
    background: #e0e0e0;
    overflow: hidden;
    /* box-shadow:  6px 6px 12px #c7c7c7,
                -6px -6px 12px #f9f9f9; */
}
img{
    width: 100%;
    height: 100%;
}
#nav{
    height: 100%;
}

</style>
