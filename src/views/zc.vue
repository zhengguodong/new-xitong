<template>
    <div class="bj">
        <div id="loginDiv">
            <form >
                <h1 style="text-align: center;color: aliceblue;">注册</h1>
                <p>身份: &nbsp;
                    <select name="" id="sel" v-model="dataform.status">
                        <option value="teacher" style="color:#66ffff">导师</option>
                        <option value="student" style="color:#66ffff">学生</option>
                    </select>
                </p>
                <p>账号: &nbsp;<input id="userNname" type="text" v-model="dataform.username"></p>

                <p>密码: &nbsp;<input id="password" type="password" v-model="dataform.password"></p>


                <div style="text-align: center;margin-top: 30px;">
                    <input type="submit" class="button" value="注册" @click="zc">
                    <input type="submit" class="button" value="返回" @click="back">
                </div>

            </form>
        </div>


    </div>
</template>

<script>
    import {register} from "../api/test.js"
    export default {
        name: "zc",
        data(){
            return{
                dataform:{
                    status:"",
                    username:'',
                    password:'',

                }
            }
        },
        methods:{
            zc(){
                let params={
                    status:this.dataform.status,
                    username:this.dataform.username,
                    password:this.dataform.password
                }
                console.log(params)
                if(this.dataform.username  && this.dataform.password && this.dataform.status ){
                    console.log("11111")
                    register(params).then((res)=>{
                        console.log(res)
                        console.log("22222")
                        if(res.data.code==200){
                            this.$message({
                                message: '注册成功',
                                type: 'success'
                            });
                            this.$router.push('/login')
                        }else{
                            this.$message({
                                message: '注册失败',
                                type: 'warning'
                            });
                        }



                    })

                }else {
                    this.$message({
                        message: '请完整填写！',
                        type: 'warning'
                    });
                }
            },
            back(){
                this.$router.push({path:'/login'})
            }
        }
    }
</script>

<style scoped>
    .bj{
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        background-image: url("../pics/bj.png");
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
    #loginDiv {
        width: 20%;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 500px;
        background-color: rgba(75, 81, 95, 0.3);
        box-shadow: 7px 7px 17px rgba(52, 56, 66, 0.5);
        border-radius: 15px;
    }

    #name_trip {
        margin-left: 50px;
        color: red;
    }

    p {
        margin-top: 30px;
        margin-left: 20px;
        color: azure;
    }

    input ,#sel{
        margin-left: 15px;
        border-radius: 5px;
        border-style: hidden;
        height: 30px;
        width: 140px;
        background-color: rgba(216, 191, 216, 0.5);
        outline: none;
        color: #f0edf3;
        padding-left: 10px;
    }

    .button {
        border-color: cornsilk;
        background-color: rgba(100, 149, 237, .7);
        color: aliceblue;
        border-style: hidden;
        border-radius: 5px;
        width: 100px;
        height: 31px;
        font-size: 16px;
    }

</style>
