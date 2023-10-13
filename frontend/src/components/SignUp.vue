<template>
<div class="register">
<div class="header">
    <img class="logo" src="../assets/logo.svg" />
    <h1 class="title">Log in</h1>
</div>

<input type="text" v-model="email" placeholder="Enter Email" />
<input type="password" v-model="password" placeholder="Enter Password" />
<button v-on:click="signUp">Login</button>
</div>



</template>

<script>
import axios from 'axios';
export default {
    name : 'SignUp',
    data(){
        return {
            email: '',
            password: ''
        }
        
    },
    methods:{
        async signUp(){
            console.log("signup",this.name,this.email,this.password)
            let result = await axios.post("http://localhost:3000/login",{
                email:this.email,
                password: this.password,
            });
            if(result.status==200){
                console.log(result);
                alert("login success")
                localStorage.setItem("user-info",JSON.stringify(result.data))
                this.$router.push({name:'Home'})
            }else{
                console.log(result);
                alert("invalid credentials")
            }
        },
        mounted(){
            let user = localStorage.getItem('user-info');
            if(user){
                this.$router.push({name:'Home'})
            }
        }
    }
}
</script>

<style scoped>
.header {
    text-align: center;
}
.title {
    text-align: left;
}
.logo{
    width: 100px;
    display: block;
}
.register button{
    width: 350px;
    height: 40px;
    margin: 10px;
}
.register input{
    width: 350px;
    height: 40px;
    margin: 10px;
}
</style>
