<template>
  <div>
      test
      <div id="main" style="width:600px;height:600px;"></div>

  </div>
</template>

<script>
import * as echarts from 'echarts';
export default {
    data(){
        return{
            list:[],
            numlist:[],
        }
    },
    mounted(){
        this.getCard()
        this.gettu()
        console.log(this.numlist);
        
    },
    methods:{
        getCard(){
            this.$axios.post('/getReportCard',{name:localStorage.getItem('name')}).then(res=>{
                this.list=res.data
                
                this.list.map(i=>{
                    this.numlist.push(parseInt(i.grade))
                })
                this.numlist=JSON.parse(JSON.stringify(this.numlist))
                
            })
            
        },
        gettu(){
            let chartDom = document.getElementById('main');
            let myChart = echarts.init(chartDom);
            let option;

            option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                data: this.mmm,
                type: 'line'
                }
            ] 
            };

             myChart.setOption(option);
        }
    }
}
</script>

<style>

</style>