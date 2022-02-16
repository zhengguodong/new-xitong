<template>
    <div id="box">
        
        <el-card class="box-card">
            <div ><h3 style="text-align:center">课程新增</h3></div>
            <br><br>
            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="课程名称">
                    <el-input  v-model="form.material" style="width:50%"></el-input>
                </el-form-item>
                <el-form-item label="上课时间">
                    <el-date-picker
                    style="width:50%"
                            v-model="form.date"
                            type="date"
                            value-format='yyyy-MM-dd'
                            placeholder="选择日期">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="课程类型">
                    <el-select v-model="form.type" placeholder="请选择课程类型">
                        <el-option label="线上" value="线上"></el-option>
                        <el-option label="线下" value="线下"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="上课时长">
                    <el-input v-model="form.time" oninput="if(value>8){value=8}else{value=value.replace(/[^\d]/g,'')}if(value.indexOf(0)==0){value=0}" style="width:50px"></el-input>
                小时
                </el-form-item>
                <el-form-item label="讲课老师">
                    <el-select v-model="form.teacher" placeholder="请选择课程讲师" >
                        <el-option v-for="item in teachers" :key="item" :label='item' :value='item'></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item label="学习内容">
                    <el-input type="textarea" v-model="form.study"></el-input>
                </el-form-item>
                <br>
                <el-form-item label="上课地址">
                    <el-input type="textarea" v-model="form.address"></el-input>
                </el-form-item>
                <br>
                
                <br>

                <br>
                <el-form-item align="center">
                    <el-button type="primary" @click="onSubmit">创建</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
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

                }
            }
        },
        methods:{
            onSubmit(){
                if(this.form.material==''){
                    this.$message.error('课程名称为必填项！！');
                }else{
                     let params={
                    date: this.form.date,
                    teacher:this.form.teacher,
                    time:this.form.time,
                    study:this.form.study,
                    type:this.form.type,
                    address:this.form.address,
                    material:this.form.material,

                }
                
                this.$axios.post('/addCourse',params).then((res)=>{
                    console.log(res)
                    this.$message({
                        message: '新增成功！',
                        type: 'success'
                    });
                }).catch(()=>{
                    this.$message.error('新增失败！');
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
        }
    }
</script>

<style scoped>
    .box-card{
        width: 35%;
        height: 90%;
    }
    #box{
        width: 100%;
        height: 100%;
        background-image: url("../pics/beijing5.jpeg");
        background-size: 100% 100%;
        background-repeat: no-repeat;
        display: flex;/*开启弹性布局*/
        justify-content: center;/*横轴居中*/
        align-items: center;/*垂直居中*/
    }
    

</style>
