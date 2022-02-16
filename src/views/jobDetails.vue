<template>
    <div class="box">
        <div id="box1"><br><br><h1 style="color:lightblue">作业遗落量：</h1><br><br><div align="center"><h1 style="font-size:180px;color: lightblue">{{loseNum}}</h1></div></div>
        <div id="box2"><br><br><h1 style="color:lightblue">作业完成量：</h1><br><br><div align="center"><h1 style="font-size:180px;color: lightblue">{{finishNum}}</h1></div></div>
        <div id="box3"><br><br><h1 style="color:lightblue">今日作业量：</h1><br><br><div align="center"><h1 style="font-size:180px;color: lightblue">{{todayNum}}</h1></div></div>
    </div>
</template>

<script>
    export default {
        name: "jobDetails",
        data(){
            return{
                loseNum:0,
                finishNum:0,
                todayNum:0,
                nowdate:`${new Date().getFullYear()}-${new Date().getMonth()+1}-${new Date().getDate()}`,
                list:[],
                
            }
        },
        mounted(){
            this.getNum()
        },
        methods:{
            getNum(){
                this.$axios.post('/getHomework').then((res)=>{
                    this.list=res.data;
                    this.list.map((i)=>{
                        if(this.nowdate===i.date){
                            if(i.status==='0'){
                                this.todayNum++;
                            }else{
                                this.finishNum++;
                            }
                            
                        }else{
                            if(i.status==='1'){
                                this.finishNum++;
                            }
                        }
                    })
                    this.loseNum=this.list.length-this.finishNum;
                })
            }

        }
    }
</script>

<style scoped>
    .box{
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-around;
    }
    #box1{
        width: 25%;
        height: 50%;
        background-color: rgb(119, 165, 226);
        border-radius: 64px;
        box-shadow:  28px 28px 56px #676767,
        -28px -28px 56px #ffffff;
        font-family:'sans-serif';
    }
    #box2{
        width: 25%;
        height: 50%;
        background-color: rgb(119, 165, 226);
        border-radius: 64px;
        box-shadow:  28px 28px 56px #676767,
        -28px -28px 56px #ffffff;
    }
    #box3{
        width: 25%;
        height: 50%;
        background-color: rgb(119, 165, 226);
        border-radius: 64px;
        box-shadow:  28px 28px 56px #676767,
        -28px -28px 56px #ffffff;
    }
</style>
