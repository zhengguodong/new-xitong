<template>
    <div id="box">
       <div id="left">
           <br>
           <h1>导师：</h1>
           <div style="height: 300px;margin-left: 20px;margin-top: 80px">
               <el-steps direction="vertical" :active="3">
                   <el-step title="操作 1" description="可通过“课程新增”增加课程,“课程查询”可以编辑和发布作业"></el-step>
                   <el-step title="操作 2" description="可通过“考核发布”对考试内容进行发布和修改，通过“考核详情”对考核进行评分"></el-step>
                   <el-step title="操作 3" description="可通过“每日任务”对学员进行每日任务的发布"></el-step>
               </el-steps>
           </div>
       </div>
        <div id="right">
            <br>
            <h1>学员：</h1>
            <div style="height: 300px;margin-left: 20px;margin-top: 80px">
                <el-steps direction="vertical" :active="3">
                    <el-step title="操作 1" description="可通过“课程查询”对课程进行查询，“课程作业”可以查询作业和提交，“作业详情”可以查看作业完成情况"></el-step>
                    <el-step title="操作 2" description="可通过“成绩表”，查看考核成绩，通过“考核详情”对考核进行答题"></el-step>
                    <el-step title="操作 3" description="可通过“每日任务”获取每日任务"></el-step>
                </el-steps>
            </div>
        </div>
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
    background-image: url("../imgs/test.png");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    display: flex;/*开启弹性布局*/
    /*justify-content: center;!*横轴居中*!*/
    /*align-items: center;!*垂直居中*!*/
}
    #left{
        text-align: center;
        position: relative;
        top: 50px;
        left: 40px;
        width: 20%;
        height: 60%;
        border: 1px solid #eee
        /*background-color: pink;*/
    }
    #right{
        text-align: center;
        position: relative;
        top: 50px;
        right: 40px;
        width: 20%;
        height: 60%;
        /*background-color: pink;*/
        margin-left: auto;
        border: 1px solid #eee
    }
</style>
