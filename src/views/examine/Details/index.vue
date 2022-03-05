<template>
  <el-dialog
            :title="isShow?'答题':'评分'"
            :visible.sync="centerDialogVisible"
            width="30%"
            :before-close="handleClose"
            center>
      <el-form :model="form">
          <el-form-item label="考核：">
              <Strong>{{title}}</Strong>
          </el-form-item>

          <el-form-item label="解答：" prop="textarea" :rules="{
      required: true, message: '内容不能为空', trigger: 'blur'
    }">
              <el-input
                      type="textarea"
                      :rows="4"
                      placeholder="请输入内容"
                      v-if="isShow"
                      v-model="form.textarea">
              </el-input>
              <!--      <mavon-editor v-model="textarea" placeholder="请输入内容" v-if="isShow"/>-->
              <el-input
                      type="textarea"
                      :rows="4"
                      v-if="!isShow"
                      disabled
                      v-model="value">
              </el-input>
          </el-form-item>

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
      </el-form>


  </el-dialog>
</template>

<script>
    import {editCheck,changeStatus} from "../../../api/examine.js"
    import {score} from "../../../api/reportcard.js"
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
            form:{
                textarea:'',
            },
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
            if(this.textarea!=''){
                let params={
                    id:this.courseid,
                    value:this.form.textarea,
                    name:this.name,
                    title:this.title,
                    date:this.date,
                    teacher:this.teacher,
                    statusAnswer: '1'
                }
                editCheck(params).then(()=>{
                    this.$message({
                        message: '编辑成功！',
                        type: 'success'
                    });
                    this.$emit('refresh')
                    this.$emit("close")
                })
                this.centerDialogVisible=false
                this.form.textarea=''

            }else{
                this.$message({
                    message: '请输入答案！',
                    type: 'warning'
                });
            }


        },
        pf_submit(){
            let params={
                name:this.name,
                grade:this.score,
                date:this.date
            }
            changeStatus({id:this.courseid})
            score(params).then(()=>{
                 this.$message({
                        message: '操作成功！',
                        type: 'success'
                    });
                this.$emit('refresh')
            })
            this.centerDialogVisible=false

            this.score=''
        },
        handleClose(){
            this.$emit("close");
        }
    }
}
</script>

<style>

</style>
