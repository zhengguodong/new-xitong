<template>
  
      <div style="width: 100%;height:100%">
          <el-row style="margin-bottom: 2px">
            <el-col :span="1"><div style="line-height:40px; text-align: center">搜索:</div></el-col>
            <el-col :span="2"><el-input v-model="value" placeholder="请输入课程名称" ></el-input></el-col>
            <el-col :span="1" style="line-height:40px; text-align: center"><el-button type="primary" size="small" round @click="dimSearch">搜索</el-button></el-col>
            <el-col :span="1" style="line-height:40px; "><el-button type="primary" size="small" round @click="getData">重置</el-button></el-col>
            <el-col :span="1" style="line-height:40px; "><el-button type="primary" size="small" round @click="add">新增</el-button></el-col>
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
                    fixed="right"
                    label="操作"
                    v-if="true"
                    align="center"
                    min-width="15%">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="edit(scope.row)"
                            type="text"
                              :disabled="scope.row.status==='1'"
                            size="small">
                        编辑
                    </el-button>
                    <el-button
                            @click.native.prevent="publish(scope.row)"
                            type="text"
                            :disabled="scope.row.status==='1'"
                            size="small">
                        发布
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
        <Eoa v-if='isShow' ref="eoa" @refresh='getData' @close="close"></Eoa>  
  </div>
 
</template>

<script>
import  Eoa from '../examine/checkPub/edit.vue'
export default {
    components:{
        Eoa
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
            add(row){
                this.isShow=true;
                this.$nextTick(()=>{
                    this.$refs.eoa.init(row.id,'0')
                })
            },
            edit(row){
                this.isShow=true;
                this.$nextTick(()=>{
                    this.$refs.eoa.init(row.id,'1')
                })
            },
            //发布
            publish(row){
                if(row.date!==''&&row.teacher!==''&&row.name!==''&&row.title!==''){
                    this.$confirm('是否发布, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/changeCheck',{id:row.id}).then(()=>{
                         this.$message({
                        message: '发布成功',
                        type: 'success'
                    });
                })
                this.getData()
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          });          
        });
                }else{
                    this.$message({
            type: 'error',
            message: '内容未填写完毕，请填写~'
          }); 
                }
                  
               
            },
            close(){
                this.isShow=false
            }
        }
    }

</script>

<style scoped>
    #fenye{
        float: right;

    }
</style>