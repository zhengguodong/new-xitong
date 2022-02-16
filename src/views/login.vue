<template>
<div class="bj">
    <div id="loginDiv">
        <form >
            <h1 style="text-align: center;color: aliceblue;">登陆</h1>
            <p>账号: &nbsp;<input id="userNname" type="text" v-model="dataform.username"></p>

            <p>密码: &nbsp;<input id="password" type="password" v-model="dataform.password"></p>

            <div style="text-align: center;margin-top: 30px;">
                <input type="submit" class="button" @click="login" value="登陆">
                <input type="submit" class="button" value="注册" @click="zc">

            </div>

        </form>
    </div>


</div>
</template>

<script>
    export default {
        name: "login",
        data(){
            return{
                dataform:{
                    userNname:'',
                    password:''
                }
            }
        },
        methods:{
            login(){
                if(this.dataform.username !==''&& this.dataform.password !==''){
                    let params={
                        'username':this.dataform.username,
                        'password':this.dataform.password,
                    }
                    this.$axios.post('/login',params).then((res)=>{

                        if(res.data.CO==='pass'){
                            this.$message({
                                message: '登陆成功',
                                type: 'success'
                            });
                            this.$axios.get('/login').then((res)=>{

                                this.$store.commit('setkey',res.data)
                                localStorage.setItem('passkey',res.data)
                            }).then(()=>{
                                    this.$router.push({path:'/home'})
                            })

                            // this.$nextTick(()=>{
                            //     this.$router.push({path:'/home'})
                            // })

                        }else{
                            this.$message({
                                message: '账号密码错误，请重新输入！',
                                type: 'warning'
                            });
                        }

                        localStorage.setItem('id_person',res.data.id_person)
                          this.$store.commit('setid',res.data.id_person)
                    })
                }else{
                    this.$message({
                        message: '账号密码不能为空！',
                        type: 'warning'
                    });
                }
            },
            zc(){
                this.$router.push({path:'/zc'})
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
            height: 300px;
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

        input {
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
