<template>
    <div style="width: 100%;height:100%">
        <div style="width: 100%;height: 50px;background-color: white;line-height: 50px;white-space: nowrap;">
        <el-row style="margin-bottom: 2px">
            <el-col :span="1"><div style="line-height:50px; text-align: center">搜索:</div></el-col>
            <el-col :span="2"><el-input v-model="value" placeholder="请输入课程名称" ></el-input></el-col>
            <el-col :span="1" style="line-height:50px; text-align: center;margin-left: 10px"><el-button type="primary"  plain @click="dimSearch">搜索</el-button></el-col>
            <el-col :span="1" style="line-height:50px; margin-left: 10px"><el-button type="primary" plain  @click="getData(1)">重置</el-button></el-col>
        </el-row>
        </div>
        <div style="margin: 10px 0">
            <el-table
                    :data="tableData"
                    style="width: 100%"
                    :row-style="{height: '60px'}"
                    height="710">
                <el-table-column
                        prop="material"
                        label="课程名"
                        align="center"
                        min-width="14%">
                </el-table-column>
                <el-table-column
                        prop="date"
                        align="center"
                        label="时间"
                        min-width="14%">
                </el-table-column>
                <el-table-column
                        prop="starttime"
                        align="center"
                        label="作业发布时间"
                        min-width="14%">
                </el-table-column>
                <el-table-column
                        prop="endtime"
                        min-width="14%"
                        align="center"
                        label="作业截止时间">
                </el-table-column>
                <el-table-column
                        prop="content"
                        min-width="14%"
                        align="center"
                        label="作业内容">
                </el-table-column>
                <el-table-column
                        prop="headman"
                        min-width="14%"
                        align="center"
                        label="作业发布人">
                </el-table-column>
                <el-table-column
                        min-width="14%"
                        align="center"
                        label="作业状态">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.status==='1'">已提交</el-tag>
                        <el-tag type="danger" v-if="scope.row.status==='0'">未提交</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        v-if="true"
                        align="center"
                        min-width="14%">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="submit(scope.row)"
                                :disabled="scope.row.status==='1'? true:false"
                                type="text"
                                size="small">
                            提交
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div id="fenye">
            <el-pagination
                    @current-change="currentPage"
                    :current-page="currentNo"
                    :page-size="pageSize"
                    layout="total,prev, pager, next,jumper"
                    :total="totalLength">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {selectHomework,pageHomework,submitHomework}from "../api/homework.js"
    export default {
        name: "homework",
        data(){
            return{
                tableData:[],
                totalLength:0,
                pageSize:10,   //每页数据
                currentNo:1,   //当前页码
                pageNo:1,     // 表格页码
                alldata:[],    //总数据
                value:''
            }
        },
        mounted() {
            this.getData()

        },
        methods:{

            submit(row){
                 this.$confirm('是否提交?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
                     submitHomework({courseid:row.courseid}).then(()=>{
                    this.$message({
                        message: '提交成功',
                        type: 'success'
                    });
                         this.getData(this.currentNo);
                })

        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消提交'
          });
        });

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
                console.log("123")
                this.pageNo = index || this.pageNo
                pageHomework({pageNo:this.pageNo,pageCount:this.pageSize}).then(res=>{

                    this.tableData = res.data.records
                    this.totalLength=res.data.total;
                }).catch(error=>{
                    console.log(error);
                })

            },
            //模糊查询
            dimSearch(){
                selectHomework({value:this.value}).then((res)=>{

                    this.tableData=res.data;
                    this.totalLength=res.data.length
                })
                this.value=''
            }
        }
    }
</script>

<style scoped>
    #fenye{
        display: flex;
        align-items: center;
        justify-content: right;
        height: 50px;
        padding-right: 20px;
        background-color: white;
    }
</style>
