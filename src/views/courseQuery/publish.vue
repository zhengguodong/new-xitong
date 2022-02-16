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
            <el-form-item label="发布时间">
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
            <el-form-item label="截止时间">
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
            <el-form-item label="作业内容">
                <el-input type="textarea" v-model="form.content"></el-input>
            </el-form-item>
            <el-form-item align="center">
                <el-button type="primary" @click="onSubmit">发布</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
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
                let params={
                    courseid:this.courseid,
                    startTime:this.form.startTime,
                    endTime: this.form.endTime,
                    content:this.form.content,
                    headman:this.form.headman,
                    material:this.form.material,
                }
                this.$axios.post('/addHome',params).then((res)=>{
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
