<template>
    <div id="box">
        <el-card class="box-card">
            <h1>修改信息</h1>
            <div style="margin-top: 100px">
                <el-form  label-width="80px" :model="formdata">
                    <el-form-item label="密码">
                        <el-input v-model="formdata.password" show-password></el-input>
                    </el-form-item>
                    <el-form-item label="身份">
                        <el-radio v-model="formdata.status" label="student">学生</el-radio>
                        <el-radio v-model="formdata.status" label="teacher">老师</el-radio>
                    </el-form-item>
                    <el-form-item label="更换头像">
                        <el-upload
                                class="upload-demo"
                                drag
                                :show-file-list="false"
                                :action="'http://localhost:8082/upadte11?id='+id"
                                :on-success="handleAvatarSuccess"
                                :on-error="handleAvatarError"
                                multiple>
                            <i class="el-icon-upload" ></i>
                            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>

                    </el-form-item>

                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "mine",
        data(){

            return{
                centerDialogVisible: false,
                formdata:{
                    password:'',
                    status:''

                },
                id:0
            }

        },
        methods:{
            handleAvatarSuccess(){
                this.$message.success("头像上传成功，请刷新页面！")
            },
            handleAvatarError(){
                this.$message.error("上传失败，请重新上传！")
            }
        },
        mounted() {
            this.$nextTick(()=>{
                this.id=sessionStorage.getItem("Id");
            })

        }
    }
</script>

<style scoped>
    #box{
        width: 100%;
        height: 100%;
        /*background-image: url("../pics/beijing5.jpeg");*/
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;/*开启弹性布局*/
        justify-content: center;/*横轴居中*/
        align-items: center;/*垂直居中*/
    }
    .box-card{
        width: 35%;
        height: 90%;
        display: flex;
        justify-content: center;
        align-content: center;
    }
</style>
