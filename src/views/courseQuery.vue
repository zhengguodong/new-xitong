<template>
<div style="width: 100%;height:100%">
    <el-row style="margin-bottom: 2px">
        <el-col :span="1"><div style="line-height:40px; text-align: center">搜索:</div></el-col>
        <el-col :span="2"><el-input v-model="value" placeholder="请输入老师名称" ></el-input></el-col>
        <el-col :span="1" style="line-height:40px; text-align: center"><el-button type="primary" size="small" round @click="dimSearch">搜索</el-button></el-col>
        <el-col :span="1" style="line-height:40px; "><el-button type="primary" size="small" round @click="getData">重置</el-button></el-col>
    </el-row>
        <el-table
                :data="tableData"
                style="width: 100%"
                :row-style="{height: '60px'}"
                height="750">
            <el-table-column
                    prop="material"
                    align="center"
                    label="课程名"
                    min-width="12.5%">
            </el-table-column>
            <el-table-column
                    prop="date"
                    align="center"
                    label="上课时间"
                    min-width="12.5%">
            </el-table-column>
            <el-table-column
                    prop="teacher"
                    align="center"
                    label="老师"
                    min-width="12.5%">
            </el-table-column>
            <el-table-column
                    prop="time"
                    align="center"
                    label="时长"
                    min-width="12.5%">
            </el-table-column>
            <el-table-column
                    prop="study"
                    align="center"
                    label="学习内容"
                    min-width="12.5%">
            </el-table-column>
            <el-table-column
                    prop="type"
                    align="center"
                    label="课程类型"
                    min-width="12.5%">
            </el-table-column>
            <el-table-column
                    prop="address"
                    align="center"
                    label="上课地址"
                    min-width="12.5%">
            </el-table-column>

            <el-table-column
                    fixed="right"
                    label="操作"
                    v-if="true"
                    align="center"
                    min-width="12.5%">
                <template slot-scope="scope">
                    <el-button
                            @click.native.prevent="edit(scope.row)"
                            type="text"
                              :disabled="scope.row.video==='1'"
                            size="small">
                        编辑
                    </el-button>
                    <el-button
                            @click.native.prevent="publish(scope.row,scope.row,scope.row)"
                            type="text"
                            :disabled="scope.row.video==='1'"
                            size="small">
                        发布作业
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
    <Edit ref="edit" v-if="isShow" @refresh="getData"  @close="close"></Edit>
    <Publish ref="publish" v-if="show" @refresh="getData"></Publish>
    </div>
</template>

<script>
    import Edit from './courseQuery/edit'
    import Publish from "./courseQuery/publish";
    export default {
        name: "courseQuery",
        components:{
            Edit,Publish
        },
        data(){
            return{
                tableData:[], //当前页面数据
                totalLength:0,
                isShow:false,
                pageSize:10,   //每页数据
                currentNo:1,   //当前页码
                pageNo:1,     // 表格页码
                alldata:[],    //总数据
                value:'',
                show:false,
            }
        },
        mounted() {
            this.getData()
            this.getCourse();
        },
        methods:{
            getCourse(){
                this.$axios.post('/getCourse').then((res)=>{

                    this.totalLength=res.data.length
                })
            },
            //编辑
            edit(row){
                this.isShow=true;
                this.$nextTick(()=>{
                    this.$refs.edit.init(row.courseid)
                })
            },
            //发布作业
            publish(row,x,y){
                this.show=true;
                this.$nextTick(()=>{
                this.$refs.publish.inits(row.courseid,x.teacher,y.material)})
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
                this.$axios.post('/page',{page:this.pageNo,pageSize:this.pageSize}).then(res=>{

                    this.tableData = res.data.data
                }).catch(error=>{
                    console.log(error);
                })
                this.getCourse();
            },
            dimSearch(){
                this.$axios.post('/dimCourse',{value:this.value}).then((res)=>{
                    this.tableData=res.data;
                    this.totalLength=res.data.length
                })
                this.value=''
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

}
</style>
