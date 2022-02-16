<template>
  <el-dialog
            :title="isShow?'答题':'评分'"
            :visible.sync="centerDialogVisible"
            width="30%"
            center>
            <Strong>考核：{{title}}</Strong>
            <br><br><br>
            <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-if="isShow"
            v-model="textarea">
            </el-input>
            <el-input
            type="textarea"
            :rows="4"
            placeholder="请输入内容"
            v-if="!isShow"
            disabled
            v-model="value">
            </el-input>
            <br><br><br>
            <div v-if="!isShow">
                <Strong>评分：<el-input v-model="score" placeholder="请输入得分" style="width:20%" oninput="if(value>100){value=100}else{value=value.replace(/[^\d]/g,'')}if(value.indexOf(0)==0){value=0}"></el-input></Strong>
            </div>
            <br>
            <div style="display: flex;
                        justify-content: center;
                        align-items: center;
            ">
            <el-button type="primary" @click="submit" v-if="isShow">提交</el-button>
            <el-button type="primary" @click="pf_submit" v-if="!isShow">提交</el-button>
            </div>
            
  </el-dialog>
</template>

<script>
export default {
    data(){
        return{
            centerDialogVisible: false,
            courseid:'',
            isShow:false,
            title:'',
            name:'',
            date:'',
            teacher:'',
            textarea:'',
            score:'',
            value:''
        }
    },
    methods:{
        init(row,id){
                if(id=='0'){
                    this.isShow=true;
                }else{
                    this.isShow=false;
                }
                this.title=row.title
                this.courseid=row.id
                this.name=row.name;
                this.date=row.date;
                this.teacher=row.teacher;
                this.value=row.value;
                this.centerDialogVisible=true
            },
        submit(){
            let params={
                id:this.courseid,
                value:this.textarea,
                name:this.name,
                title:this.title,
                date:this.date,
                teacher:this.teacher
            }
            console.log(params);
            this.$axios.post('/editCheck',params).then(()=>{
                this.$message({
                        message: '编辑成功！',
                        type: 'success'
                    });
            })
            this.centerDialogVisible=false
            this.textarea=''
            this.$emit('refresh')
        },
        pf_submit(){
            let params={
                name:this.name,
                grade:this.score,
                date:this.date
            }
            this.$axios.post('/score',params).then(()=>{
                 this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
            })
            this.centerDialogVisible=false
            this.$emit('refresh')
            this.score=''
        }
    }
}
</script>

<style>

</style>