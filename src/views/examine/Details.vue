<template>
  
      <div style="width: 100%;height:100%">
          <el-row style="margin-bottom: 2px">
            <el-col :span="1"><div style="line-height:40px; text-align: center">搜索:</div></el-col>
            <el-col :span="2"><el-input v-model="value" placeholder="请输入课程名称" ></el-input></el-col>
            <el-col :span="1" style="line-height:40px; text-align: center"><el-button type="primary" size="small" round @click="dimSearch">搜索</el-button></el-col>
            <el-col :span="1" style="line-height:40px; "><el-button type="primary" size="small" round @click="getData">重置</el-button></el-col>
        </el-row>
    <el-table
    :data="tableData"
    stripe
    style="width: 100%"
    :row-style="{height: '60px'}"
    height="750"
    >
    <el-table-column
      prop="date"
      label="发布时间"
      align="center"
     min-width="15%">
    </el-table-column>
    <el-table-column
      prop="title"
      label="考核内容"
      align="center"
     min-width="15%">
    </el-table-column>
    <el-table-column
      prop="name"
      label="考核对象"
      align="center"
     min-width="15%">
    </el-table-column>
    <el-table-column
      prop="teacher"
      label="考核老师"
      align="center"
     min-width="15%">
    </el-table-column>
    <el-table-column
                    min-width="14%"
                    align="center"
                    label="状态">
                <template slot-scope="scope">
                    <el-tag type="success" v-if="scope.row.status==='1'">已发布</el-tag>
                    <el-tag type="danger" v-if="scope.row.status==='0'">未发布</el-tag>
                </template>
            </el-table-column>
    <el-table-column
                    fixed="right"
                    label="操作"
                    v-if="true"
                    align="center"
                    min-width="15%">
                <template slot-scope="scope">
                    <el-button
                            v-if="scope.row.status==='1'"
                            @click.native.prevent="edit(scope.row)"
                            :disabled="scope.row.status_answer=='1'"
                            type="text"
                            size="small">
                        答题    
                    </el-button>
                    <el-button
                            v-if="scope.row.status==='1'"
                            :disabled="scope.row.status_answer=='0'"
                            @click.native.prevent="publish(scope.row)"
                            type="text"
                            size="small">
                        评分
                    </el-button>
                </template>
            </el-table-column>
  </el-table>
  <div id="fenye">
            <el-pagination
                    @current-change="currentPage"
                    :current-page="currentNo"
                    :page-size="pageSize"
                    layout="total,prev, pager, next"
                    :total="totalLength">
            </el-pagination>
        </div>
        <Son v-if='isShow' ref="son" @refresh='getData'></Son>  
  </div>
 
</template>

<script>
import  Son from '../examine/Details/index.vue'
export default {
    components:{
        Son
    },
    data(){
        return{
             tableData:[],
                totalLength:0,
                pageSize:10,   //每页数据
                currentNo:1,   //当前页码
                pageNo:1,     // 表格页码
                alldata:[],    //总数据
                value:'',
                isShow:false,
        }
    },
    mounted() {
            this.getData()
            this.getCourse();
        },
        methods:{
            getCourse(){
                this.$axios.post('/sCheck').then((res)=>{

                    this.totalLength=res.data.length
                })
            },
            submit(row){
                this.$axios.post('/submit',{courseid:row.courseid}).then(()=>{
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                })
                this.getData();
            },
            //分页
            //当前页数据
            currentPage(currentPage){
                this.currentNo = currentPage;
                // console.log( this.currentNo)
                this.getData(this.currentNo)
            },
            //获取前10条数据
            getData(index){
                this.pageNo = index || this.pageNo
                this.$axios.post('/checkpage',{page:this.pageNo,pageSize:this.pageSize}).then(res=>{

                    this.tableData = res.data.data
                }).catch(error=>{
                    console.log(error);
                })
                this.getCourse();
            },
            dimSearch(){
                this.$axios.post('/sCheck',{value:this.value}).then((res)=>{
                    this.tableData=res.data;
                    this.totalLength=res.data.length
                })
                this.value=''
            },
            edit(row){
                this.isShow=true;
                this.$nextTick(()=>{
                    this.$refs.son.init(row,'0')
                })
            },
            //发布
            publish(row){
              this.isShow=true;
                this.$nextTick(()=>{
                    this.$refs.son.init(row,'1')
                })
            }
        }
    }

</script>

<style scoped>
    #fenye{
        float: right;

    }
</style>