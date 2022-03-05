<template>
    <el-dialog
            :title="isOr=='1'?'编辑':'新增'"
            :visible.sync="centerDialogVisible"
            width="30%"
            center
            :before-close="close">

            <el-form ref="form" :model="form" label-width="80px">
                <el-form-item label="发布时间">
                    <el-date-picker
                    style="width:50%"

                        v-model="form.date"
                        type="month"
                        value-format='yyyy-MM'
                        placeholder="选择月">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="考核老师">
                    <el-select v-model="form.teacher" placeholder="请选择课程讲师" style="width:50%"
                    >
                        <el-option v-for="item in teachers" :key="item" :label='item' :value='item'></el-option>
                    </el-select>
                </el-form-item>
                <br>
                <el-form-item label="考核内容">
                    <el-input type="textarea" v-model="form.title" style="width:80%"
                    ></el-input>
                </el-form-item>
                <el-form-item label="考核对象">
                    <el-select v-model="form.name" placeholder="请选择考核对象" style="width:50%"
                >
                        <el-option v-for="item in students" :key="item.id" :label='item.username' :value='item.username'></el-option>
                    </el-select>
                </el-form-item>
                <br>

                <br>
                <el-form-item align="center">
                    <el-button type="primary" @click="onSubmit" v-if="isOr=='1'">编辑</el-button>
                    <el-button type="primary" @click="onSubmit" v-if="isOr=='0'">新增</el-button>
                </el-form-item>
            </el-form>
    </el-dialog>
</template>

<script>
    import {editCheck,addChecK,getOne} from "../../../api/examine.js"
    import {searchPerson} from "../../../api/test.js"
    export default {
        name: "timetable",
        data(){
            return{
                teachers:['hello','java','script'],
                students:[],
                form:{
                    date:'',
                    teacher:'',
                    name:'',
                    title:''
                },
                centerDialogVisible: false,
                courseid:'',
                isOr:''
            }
        },
        mounted(){
            this.getStudent()
            this.$nextTick(()=>{
                this.getdata();
            })

        },
        methods:{
            onSubmit(){
                let params={
                    date:this.form.date,
                    teacher:this.form.teacher,
                    name:this.form.name,
                    title:this.form.title,
                    id:this.courseid,
                    status:'0',
                    status_answer:'0'
                }
                if(this.isOr=='1'){
                    if(this.form.date!==''&&this.form.teacher!==''&&this.form.name!==''&&this.form.title!==''){
                        editCheck(params).then((res)=>{
                    console.log(res)
                    this.$message({
                        message: '编辑成功！',
                        type: 'success'
                    });
                    this.centerDialogVisible=false
                    this.$emit('refresh')
                    this.$emit('close')
                }).catch(()=>{
                    this.$message.error('编辑失败！');
                })
                    }else{
                        this.$message.error('所有内容必填！！！');
                    }

                }else if(this.isOr=='0'){
                    addChecK(params).then((res)=>{
                    console.log(res)
                    this.$message({
                        message: '新增成功！',
                        type: 'success'
                    });
                    this.centerDialogVisible=false
                    this.$emit('refresh')
                     this.form={
                    date:'',
                    teacher:'',
                    name:'',
                    title:''

                }
                }).catch(()=>{
                    this.$message.error('新增失败！');
                })
                }

                // this.form={
                //     date:'',
                //     teacher:'',
                //     name:'',
                //     title:''

                // }
            },
            init(row,id){
                this.courseid=row
                this.isOr=id
                console.log("row",this.courseid,this.isOr)
                this.centerDialogVisible=true
            },
            getStudent(){
                searchPerson().then((res)=>{
                    console.log("tttt",res)
                    this.students=res.data.data

                })
            },
            close(){
                this.$emit('close')
            },
            getdata(){
                console.log("1111",this.courseid)
                if(this.courseid!=""&&this.courseid!=undefined){
                    getOne({id:this.courseid}).then((res)=>{
                        console.log('res',res);
                        this.form=res.data;
                    })
                }

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
