<template>
 

<div class="register">
<div class="header">
    <h1 class="title">UF Convertor</h1>
    <p>rol: {{userRole}}</p>
</div>

<input type="text" v-model="value" placeholder="Enter Value" />
<input type="text" v-model="date" placeholder="Enter Date" />
<button v-on:click="find">Convert</button>
<button v-on:click="logout">Logout</button>
</div><br>
<div>
<p v-if="loading" role="alert">working on your petition...</p>
<h3>Valor UF: {{ result.valor }}</h3>
<h3>Monto: {{ result.responseCLP }} CLP</h3>
</div><br>
<div>
    <button v-on:click="findHistory" v-if="userRole === 'admin'">Conversion History</button>
    <p v-if="userRole === 'admin'" >historial: {{history}}</p>
</div>

</template>


<script>
import axios from 'axios';
export default {
    name:'Home',
    data(){
        return {
            date: '',
            value: '',
            result: 'resultado',
            loading: null,
            userRole: '',
            history: ''
        }
        
    },
    methods:{
         async find(){
            this.loading = true;
            console.log("find",this.date,this.value)
            let result = await axios.post("http://localhost:3000/convert",{
                date:this.date,
                value: this.value,
            });
            if(result.status==200){
                console.log(result);
                //alert("UF converted Successfull");
                this.result = result.data;
                this.loading = null;
            }else{
                console.log(result);
                alert("invalid data");
                this.loading = null;
            }
        },
        async findHistory(){
            console.log("history")
            this.loading = true
            console.log("history",this.date,this.value)
            let result = await axios.get("http://localhost:3000/history");
            if(result.status==200){
                this.result=result.data;
                console.log(result);
                alert("login success")
                this.loading = null
                this.history= result.data
            }else{
                console.log(result);
                alert("invalid credentials")
                this.loading = null
            }
        },
        logout(){
            console.log("logout")
            localStorage.clear();
            this.$router.push({name:'SignUp'})
        }
    },
    mounted(){
        let user = localStorage.getItem('user-info');
        console.log(user)
        if(user){
            let userData = JSON.parse(user);
            this.userRole = userData[0].rol;
        }
        if(!user){
            this.$router.push({name:'SignUp'})
        }
        }
}
</script>
