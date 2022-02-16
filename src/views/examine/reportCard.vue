<template>
  <div style="width: 100%;height:100%">
    <el-table
    :data="list"
    stripe
    style="width: 100%"
    :row-style="{height: '60px'}"
    height="750"
    >
     <el-table-column
     label="序号"
      type="index"
      align="center"
     min-width="20%">
    </el-table-column>
    <el-table-column
      prop="name"
      label="学生"
      align="center"
     min-width="20%">
    </el-table-column>
    <el-table-column
      prop="date"
      label="日期"
      align="center"
     min-width="20%">
    </el-table-column>
    <el-table-column
      prop="grade"
      label="成绩"
      align="center"
     min-width="20%">
    </el-table-column>
  </el-table>
  </div>
</template>

<script>
export default {
    data(){
        return{
            list:[],
            score:[],
        }
    },
    mounted(){
        this.getCard()  
     
        
    },
    methods:{
        getCard(){
            this.$axios.post('/getReportCard',{name:localStorage.getItem('name')}).then(res=>{
                this.list=res.data
            })
            
        },
    }
}
</script>

<style scoped>

</style>