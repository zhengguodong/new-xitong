<template>
  <div style="width: 100%;height:100%;">
<!--    <div style="height: 30px">-->
<!--      <el-link type="primary">主要链接</el-link>-->
<!--    </div>-->
    <div style="width: 100%;height: 50px;background-color: white;line-height: 50px;white-space: nowrap;">
      <el-row style="margin-bottom: 2px">
        <el-col :span="1"><div style="line-height:50px; text-align: center">搜索:</div></el-col>
        <el-col :span="2"><el-input v-model="value" placeholder="请输入学生名称" ></el-input></el-col>
        <el-col :span="1" style="line-height:50px; text-align: center;margin-left: 10px"><el-button type="primary"  plain @click="dimSearch">搜索</el-button></el-col>
        <el-col :span="1" style="line-height:50px;margin-left: 10px "><el-button type="primary"  plain @click="close()">重置</el-button></el-col>
              <el-link type="primary" @click="goto">点击查看折线图</el-link>

      </el-row>
    </div>
      <div style="margin: 10px 0">
          <el-table
                  :data="list"
                  stripe
                  style="width: 100%"
                  :row-style="{height: '60px'}"
                  height="710"
          >

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
  import {pageReportCard} from "../../api/reportcard.js"
//  ,pageReportCard
export default {
    data(){
        return{
            list:[],
            score:[],
            value:'',
          totalLength:null,
          currentNo:1,
          pageSize:10

        }
    },
    mounted(){
        this.getCard(1)
    },
    methods:{
      dimSearch(){
        //   getReportCard({name:this.value}).then(res=>{
        //     console.log(res)
        //         this.list=res.data
        //         this.totalLength=res.data.length;
        //     })
        // this.value=''
          let params={
              pageNo:this.currentNo,
              pageCount:this.pageSize,
              name:this.value
          }
          pageReportCard(params).then(res=>{
              console.log(res)
              this.list = res.data.records
              this.totalLength=res.data.total;
          }).catch(error=>{
              console.log(error);
          })

        },
      getCard(index){
        let params={
            pageNo:index||this.currentNo,
            pageCount:this.pageSize,
            name:this.value
        }
          pageReportCard(params).then(res=>{
            console.log(res)
            this.list = res.data.records
            this.totalLength=res.data.total;
          }).catch(error=>{
            console.log(error);
          })
      },
      currentPage(currentPage){
        this.currentNo = currentPage;
        this.getCard(parseInt(this.currentNo))
      },
        goto(){
          this.$router.push('/test')
        },
        close(){
          this.value=''
            this.getCard(1);
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
