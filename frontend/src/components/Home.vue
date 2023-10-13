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
    <div v-if="userRole === 'admin'" >
        <button @click="exportToExcel">Exportar a Excel</button>
        <ul>
  <li v-for="(item, index) in items" :key="index">
    <ul>
      <li>User: {{ item.user }}</li>
      <li>Activity Date: {{ item.activityDate }}</li>
      <li>Origin Amount: {{ item.originAmount }}</li>
      <li>Conversion Date: {{ item.convertionDate }}</li>
      <li>Coin Value: {{ item.coinValue }}</li>
      <li>Conversion Amount: {{ item.convertionAmount }}</li>
    </ul>
  </li>
</ul>

</div>
</div>

</template>


<script>
import axios from 'axios';
import * as XLSX from 'xlsx';
export default {
    name:'Home',
    data(){
        return {
            date: '',
            value: '',
            result: 'resultado',
            loading: null,
            userRole: '',
            history: '',
            userName: '',
            items: ''
        }
        
    },
    methods:{
         async find(){
            this.loading = true;
            console.log("find",this.date,this.value)
            let result = await axios.post("http://localhost:3000/convert",{
                date:this.date,
                value: this.value,
                user: this.userName
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
                //alert("login success")
                this.loading = null;
                this.history= result.data;
                this.items = result.data;
            }else{
                console.log(result);
                alert("invalid credentials")
                this.loading = null
            }
        },
        exportToExcel() {
        const ws = XLSX.utils.json_to_sheet(this.items);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Datos');
        XLSX.writeFile(wb, 'datos.xlsx');
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
            this.userName = userData[0].name;
        }
        if(!user){
            this.$router.push({name:'SignUp'})
        }
        }
}
</script>
