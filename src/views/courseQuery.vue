<template>
<div style="width: 100%;height:100%">
    <div style="width: 100%;height: 50px;background-color: white;line-height: 50px;white-space: nowrap;">
        <el-row style="margin-bottom: 2px">
        <el-col :span="1"><div style="line-height:50px; text-align: center">搜索:</div></el-col>
        <el-col :span="2"><el-input v-model="value" placeholder="请输入老师名称" ></el-input></el-col>
        <el-col :span="1" style="line-height:50px; text-align: center;margin-left: 10px"><el-button type="primary" plain @click="dimSearch" >搜索</el-button></el-col>
        <el-col :span="1" style="line-height:50px; margin-left: 10px"><el-button type="primary" plain @click="closeData" >重置</el-button></el-col>
    </el-row>
    </div>
        <div style="margin: 10px 0">
            <el-table
                    ref="table_sort"
                    :data="tableData"
                    style="width: 100%"
                    :row-style="{height: '60px'}"
                    height="710">
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
                    <template slot-scope="scope" v-if="flag=='teacher'">
                        <el-button
                                @click.native.prevent="edit(scope.row)"
                                type="primary" plain
                                :disabled="scope.row.video==='1'"
                                size="small">
                            编辑
                        </el-button>
                        <el-button
                                @click.native.prevent="publish(scope.row,scope.row,scope.row)"
                                type="primary" plain
                                :disabled="scope.row.video==='1'"
                                size="small">
                            发布作业
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
    <Edit ref="edit" v-if="isShow" @refresh="getData"  @close="close"></Edit>
    <Publish ref="publish" v-if="show" @refresh="getData"></Publish>
    </div>
</template>

<script>
    import Edit from './courseQuery/edit'
    import Publish from "./courseQuery/publish";
    import {getCourse,page} from "../api/course.js"
    import Sortable from 'sortablejs'
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
                flag:''
            }
        },
        mounted() {
            this.getData(1)
            this.getCourse();
            let table_dom=this.$refs.table_sort
            console.log("dom",table_dom)
            console.log("dom1",table_dom.$el.querySelector('.el-table__body-wrapper .el-table__body tbody'))
            let tsort=new Sortable(table_dom.$el.querySelector('.el-table__body-wrapper .el-table__body tbody'),{
                group:'sorttable',
                sort:true,
                animation: 180,
            })
            this.flag=sessionStorage.getItem("id_person")
        },
        methods:{
            getCourse(){
                getCourse().then((res)=>{
                    this.totalLength=res.data.data.length
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

                this.getData(parseInt(this.currentNo))
            },
            //获取前10条数据
            getData(index){
                console.log("zhixing")
                this.pageNo = index || this.pageNo
                page({pageNo:this.pageNo,pageCount:this.pageSize,value:this.value}).then(res=>{

                    this.tableData = res.data.records
                }).catch(error=>{
                    console.log(error);
                })
                this.getCourse();
            },
            dimSearch(){
                let params={
                    pageNo:this.pageNo,
                    pageCount:this.pageSize,
                    value:this.value
                }
                page(params).then((res)=>{
                    console.log(res)
                    this.tableData=res.data.records;
                    this.totalLength=this.tableData.length
                })
            },
            close(){
                this.isShow=false;
            },
            closeData(){
                this.value=''
                this.getData(1);
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
