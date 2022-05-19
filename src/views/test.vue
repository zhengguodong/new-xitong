<template>
    <div>
        <h5>
            <strong>{{name}}</strong>的成绩状况：
        </h5>
        <div v-loading="loading" element-loading-text="没有数据">
            <div id="main" style="width:600px;height:600px;" ></div>

        </div>
        <div >
            <el-page-header @back="goBack" content="成绩表">
            </el-page-header>
        </div>
    </div>

</template>

<script>
    import {getReportCard} from "../api/reportcard.js"
    import * as echarts from 'echarts';

    export default {
        data() {
            return {
                list: [],
                numlist: [],
                dateList:[],
                sz: '',
                name:'',
                date:new Date()

            }
        },
        mounted() {
            this.getList();
            this.name=sessionStorage.getItem("id_person")
            console.log(this.date)
        },
        computed:{
            loading(){
                if(this.dateList!=""){
                    return false;
                }else{

                    return true;
                }
            }
        },
        methods: {
            async getList() {
                await getReportCard({name: sessionStorage.getItem('id_person')})
                    .then(res => {
                    console.log("res",res)
                    this.list = res.data
                    this.list.map(i => {
                        this.numlist.push(parseInt(i.grade))
                        this.dateList.push(i.date)
                    })
                })
                await this.initChatrs();
            },
            initChatrs() {

                let chartDom = document.getElementById('main');
                let myChart = echarts.init(chartDom);
                let option = {
                    xAxis: {
                        type: 'category',
                        data: this.dateList
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [
                        {
                            data: this.numlist,
                            type: 'line'
                        }
                    ]
                };
                myChart.setOption(option);
            },
            goBack(){
                this.$router.push("/reportCard")
            }
        },

        // watch: {
        //     numlist (newList, oldList) {
        //         console.log(oldList)
        //         this.initChatrs(newList)
        //     }
        // }

    }
</script>

<style>

</style>
