<template>
    <el-dialog
            title="编辑"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
            :before-close="handleClose">

            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="课程名称">
                    <el-input  v-model="form.material" style="width:50%" disabled></el-input>
                </el-form-item>
                <el-form-item label="上课时间">
                    <el-date-picker
                    style="width:50%"
                            v-model="form.date"
                            type="date"
                            disabled
                            value-format='yyyy-MM-dd'
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="课程类型">
                    <el-select v-model="form.type" placeholder="请选择课程类型" disabled>
                        <el-option label="线上" value="线上"></el-option>
                        <el-option label="线下" value="线下"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上课时长" >
                    <el-input disabled v-model="form.time" oninput="if(value>8){value=8}else{value=value.replace(/[^\d]/g,'')}if(value.indexOf(0)==0){value=0}" style="width:50px"></el-input>
                小时
                </el-form-item>
                <el-form-item label="讲课老师">
                    <el-select v-model="form.teacher" placeholder="请选择课程讲师" disabled>
                        <el-option v-for="item in teachers" :key="item" :label='item' :value='item'></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item label="学习内容"  prop="study" :rules="{
      required: true, message: '学习内容不能为空', trigger: 'blur'
    }">
                    <el-input type="textarea" v-model="form.study"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="上课地址" prop="address" :rules="{
      required: true, message: '上课地址不能为空', trigger: 'blur'
    }">
                    <el-input type="textarea" v-model="form.address"></el-input>
                </el-form-item>
                <br>

                <br>

                <br>
                <el-form-item align="center">
                    <el-button type="primary" @click="onSubmit">编辑</el-button>
                </el-form-item>
            </el-form>
    </el-dialog>
</template>

<script>
    import {editCourse,getCourse} from "../../api/course.js"
    export default {
        name: "timetable",
        data(){
            return{
                teachers:['hello','java','script'],
                form:{
                    date:'',
                    teacher:'',
                    time:'',
                    study:'',
                    type:'',
                    address:'',
                    material:'',
                },
                centerDialogVisible: false,
                courseid:''
            }
        },
        mounted(){
            this.getdata()
        },
        methods:{
            onSubmit(){
                if(this.form.study==''||this.form.address==''){
                    this.$message.error('学习内容或上课地址不能为空！');
                }else{
                let params={
                    courseid:this.courseid,
                    date: this.form.date,
                    teacher:this.form.teacher,
                    time:this.form.time,
                    study:this.form.study,
                    type:this.form.type,
                    address:this.form.address,
                    material:this.form.material,
                }
                    editCourse(params).then(()=>{
                    this.$message({
                        message: '编辑成功！',
                        type: 'success'
                    });

                    this.centerDialogVisible=false
                        this.$emit('refresh')

                }).catch(()=>{
                    this.$message.error('编辑失败！');
                })
                this.form={
                    date:'',
                    teacher:'',
                    time:'',
                    study:'',
                    type:'',
                    address:'',
                    material:'',

                }

                }
            },
            init(row){
                this.courseid=row
                console.log("row",this.courseid)
                this.centerDialogVisible=true
            },
            handleClose(){
                this.centerDialogVisible=false
                this.$emit('close')
            },
            getdata(){
                getCourse().then((res)=>{

                    res.data.data.map((i)=>{
                        if(i.courseid== this.courseid){
                            this.form=i
                        }
                    })

                })
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
