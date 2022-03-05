<template>

      <div style="width: 100%;height:100%">
          <div style="width: 100%;height: 50px;border-bottom: 1px solid #9b9191;line-height: 50px;white-space: nowrap">
          <el-row style="margin-bottom: 2px">
            <el-col :span="1"><div style="line-height:50px; text-align: center">搜索:</div></el-col>
            <el-col :span="2"><el-input v-model="value" placeholder="请输入老师名称" ></el-input></el-col>
            <el-col :span="1" style="line-height:50px; text-align: center"><el-button type="primary" size="small" round @click="dimSearch">搜索</el-button></el-col>
            <el-col :span="1" style="line-height:50px; "><el-button type="primary" size="small" round @click="getData">重置</el-button></el-col>
        </el-row>
          </div>
    <el-table
    :data="tableData"
    stripe
    style="width: 100%"
    :row-style="{height: '60px'}"
    height="710"
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
                    <el-tag type="danger" v-if="scope.row.status==='0'&&scope.row.status!=''">未发布</el-tag>
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
                            :disabled="scope.row.statusAnswer!='0'"
                            type="text"
                            size="small">
                        答题
                    </el-button>
                    <el-button
                            v-if="scope.row.status==='1'"
                            :disabled="scope.row.statusAnswer=='0'||scope.row.statusAnswer=='2'"
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
                    layout="total,prev, pager, next,jumper"
                    :total="totalLength">
            </el-pagination>
        </div>
        <Son v-if='isShow' ref="son" @refresh='getData' @close="close"></Son>
  </div>

</template>

<script>
import  Son from '../examine/Details/index.vue'
import {checkpage,sCheck} from "../../api/examine.js"
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

        },
        methods:{
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
                checkpage({pageNo:this.pageNo,pageCount:this.pageSize}).then(res=>{
                    console.log("555",res)
                    this.tableData = res.data.records;
                    this.totalLength=res.data.total;
                }).catch(error=>{
                    console.log(error);
                })
            },
            dimSearch(){
                sCheck({teacher:this.value}).then((res)=>{
                    console.log("dim",res)
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
            },
            close(){
                this.isShow=false;
            }
        }
    }

</script>

<style scoped>
    #fenye{
        float: right;
        margin-top: 10px;
    }
</style>
