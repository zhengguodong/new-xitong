<template>
    <el-dialog
            title="作业"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="课程名">
                <el-input v-model="form.material" disabled></el-input>
            </el-form-item>
            <el-form-item label="发布人">
                <el-input v-model="form.headman" disabled></el-input>
            </el-form-item>
            <el-form-item label="发布时间" prop="startTime" :rules="{
      required: true, message: '发布时间不能为空', trigger: 'blur'
    }">
                <el-time-select
                        v-model="form.startTime"
                        :picker-options="{
                            start: '08:30',
                            step: '00:15',
                            end: '18:30'
                          }"
                        placeholder="选择时间">
                </el-time-select>
            </el-form-item>
            <el-form-item label="截止时间"  prop="endTime" :rules="{
      required: true, message: '截止时间不能为空', trigger: 'blur'
    }">
                <el-time-select
                        v-model="form.endTime"
                        :picker-options="{
                            start: '08:30',
                            step: '00:15',
                            end: '18:30'
                          }"
                        placeholder="选择时间">
                </el-time-select>
            </el-form-item>
            <el-form-item label="作业内容" prop="content" :rules="{
      required: true, message: '作业内容不能为空', trigger: 'blur'
    }">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item align="center">
                <el-button type="primary" @click="onSubmit">发布</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
    import {addHome} from "../../api/course.js"
    export default {
        data(){
            return{
                form:{
                    startTime:'',
                    endTime:'',
                    content:'',
                    headman:'',
                    material:'',

                },
                centerDialogVisible: false,
                courseid:''
            }
        },
        methods:{
            onSubmit(){
                if(this.form.startTime!=''&&this.form.endTime!=''&&this.form.content!=''){
                    let params={
                        courseid:this.courseid,
                        starttime:this.form.startTime,
                        endtime: this.form.endTime,
                        content:this.form.content,
                        headman:this.form.headman,
                        status:'0',
                        material:this.form.material,
                        date:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`
                    }
                    addHome(params).then((res)=>{
                        console.log(res)
                        this.$message({
                            message: '发布成功！',
                            type: 'success'
                        });
                        this.$emit('refresh')
                        this.centerDialogVisible=false
                    }).catch(()=>{
                        this.$message.error('发布失败！');
                    })
                    this.form={
                        startTime:'',
                        endTime:'',
                        content:'',

                    }
                }else{
                    this.$message({
                        message: '请填写完整信息！',
                        type: 'warning'
                    });
                }

            },
            inits(row,teacher,material){
                this.courseid=row
                this.form.headman=teacher
                this.form.material=material
                this.centerDialogVisible=true
            }
        }
    }
</script>

<style scoped>
    .box-card{
        width: 600px;
        height: 800px;
    }

</style>
