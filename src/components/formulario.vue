<template>
   <div class="dad">
    <header><h1>Formulario</h1></header>
    <Form class="child" @submit="saveForm" :validation-schema="shema" v-slot="{errors}">


      <div class="boxInputId">
       <span>Name:</span> 
       <div class="boxError">
        <Field  type="text" v-model="dataForm.name" :class="{'invalid':errors.name,'full':dataForm.name.length > 3}" name="name"  autocomplete="off"/>
          <span class="messageError">{{errors.name}}</span>
       </div>
       <span class="lastName">lastname:</span>
          <div class="boxError">
            <Field v-model="dataForm.lastName" :class="{'invalid':errors.lastName,'full':dataForm.lastName.length > 3}" name="lastName"  autocomplete="off"/>
            <span class="messageError">{{errors.lastName}}</span>

        </div>
      </div>

      <div class="boxInputMobile">
        <span>Name:</span> 
        <div class="boxError">
          <Field v-model="dataForm.name"  :class="{'invalid':errors.name,'full':dataForm.name.length >= 9 }" name="name"  autocomplete="off"/>
          <span class="messageError">{{errors.name}}</span>
        </div>
      
      </div>

      <div class="boxInputMobile">
        <span>lastname</span> 
        <div class="boxError">
          <Field v-model="dataForm.lastName"  :class="{'invalid':errors.lastName,'full':dataForm.lastName.length > 3}" name="lastName"  autocomplete="off"/>
          <span class="messageError">{{errors.lastName}}</span>
        </div>
      
      </div>

      <div class="boxInput">
        <span>NIEF</span> 
        <div class="boxError">
          <Field v-model.number="dataForm.nief"  :class="{'invalid':errors.nief,'full':dataForm.nief.length > 3}" name="nief"  autocomplete="off"/>
          <span class="messageError">{{errors.nief}}</span>
        </div>
      
      </div>

      <div class="boxInput">
       <span>Business name:</span> 
       <div class="boxError">
        <Field v-model="dataForm.bussinesName" :class="{'invalid':errors.bussinesName,'full':dataForm.bussinesName.length > 3}"  name="bussinesName"  autocomplete="off"/>
        <span class="messageError">{{errors.bussinesName}}</span>
       </div>
      </div>

      <div class="boxInput">
       <span>Direction:</span> 
       <div class="boxError">
        <Field v-model="dataForm.direction" name="direction" :class="{'invalid':errors.direction,'full':dataForm.direction.length > 3}" autocomplete="off"/>
        <span class="messageError">{{errors.direction}}</span>
       </div>
      </div>

      <div class="boxInput">
       <span>Location:</span>

       <div class="boxError">
        <Field v-model="dataForm.location" name="location" :class="{'invalid':errors.location,'full':dataForm.location.length > 3}" autocomplete="off"/>
        <span class="messageError">{{errors.location}}</span>
       </div> 
      </div>

      <div class="boxInput">
       <span>Province:</span> 
       <div class="boxError">
        <Field v-model="dataForm.province" name="province" :class="{'invalid':errors.province,'full':dataForm.province.length > 3}" autocomplete="off"/>
        <span class="messageError">{{errors.province}}</span>
       </div>
      </div>

      <div class="boxInput">
       <span>Email:</span> 
       <div class="boxError">
        <Field v-model="dataForm.email" name="email"  :class="{'invalid':errors.email,'full':dataForm.email.length > 11}" autocomplete="off"/>
        <span class="messageError">{{errors.email}}</span>
       </div>
      </div>

      <div class="boxSignature">
      <span>Signature:</span>
      <div class="contentBox">
        <VueSignaturePad  ref="signaturePad" class="box" /><img @click="deleteSignature" class="imgDelete" src="../assets/borrar.png"/>
      </div>
        <span v-if="signatureEmpty" class="messageError">Signature is required</span>
 </div>

      <button type="submit" class="btnSend" >send</button>

    </Form>

    <div class="footer">
      <div class="help"><p>you need help?</p> <a href="https://wa.me/543516838934" target="_blanck"><img class="helpImg"   src="../assets/help.png"/></a></div>

      <div class="contentSpinner" v-if="spinnerActive"><div class="spinner"></div></div>
      <div :class="{'message2':messageInfo === 'Error' , 'message':messageInfo === 'Exito'}" v-if="messageInfo.length > 1">{{messageInfo}}</div>

    </div>
 
  </div>

</template>

<script>
const axios = require('axios').default;
import { ValidationProvider} from 'vee-validate';
import {ValidationObserver, Form, Field} from 'vee-validate'
import * as yup from 'yup';

export default {
  name: 'formulario',

  components: {
    ValidationProvider,
    ValidationObserver,
    Form,
    Field
  },

   
  data(){
    return {
      messageInfo:"",
      spinnerActive:false,
      formu1:false,
      
        dataForm:{
          name:"",
          lastName:"",
          nief:"",
          bussinesName:"",
          direction:"",
          location:"",
          province:"",
          email:"",
          signature:"",
        },

  shema : yup.object({
        name: yup.string().min(3).required(),
        lastName: yup.string().min(3).required(),
        nief: yup.string().min(9).max(10).required(),
        bussinesName: yup.string().min(3).required(),
        direction: yup.string().min(3).max(40).required(),
        location:  yup.string().min(3).max(40).required(),
        province: yup.string().min(3).max(40).required(),
        email: yup.string().email().required()
}),

  signatureEmpty : false


    }},

    methods:{
      sendForm(){
        axios.post("https://back-pre.vercel.app/formularioVue",this.dataForm).then(datos=>{
          console.log(datos)
         
        }).catch(error =>{s
          console.log(error)
          this.messageInfo = "Error"
          this.spinnerActive = false
        })
        
      },

      deleteSignature() {
    this.$refs.signaturePad.undoSignature();
    },

    saveForm() 
    {
    const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
    this.spinnerActive = true
    this.signatureEmpty = false
    this.messageInfo = ""
    if(data){
      
      this.dataForm.signature = data
      this.sendForm()
    }else if(isEmpty){
     
      this.signatureEmpty = true
    }
    },

    validacion(){
      this.arrayValidations[1].valido = true
    },

    sendForm2(){
      console.log(this.dataForm)
    }
    
    }
  
}
</script>

<style >

header{
  width: 100%;
  height: 40px;
  background-color: #3899b7;
  box-shadow:0px 3px 5px #060322;
}

h1{
  width: 200px;
  font-size: 17px;
  margin: auto;
  transform: translate(10px, 10px);
  color: white;
}

.boxInputMobile{
  display: none;
}
.dad{
  width: 100%;
}

.invalid{
  border-bottom:2px solid red;
}

.child{
  width: 500px;
  height: 750px;
  margin: auto;
  margin-top: 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.boxInput{
  width: 100%;
  display: flex;
  justify-content: center;
  
}

.boxInputId{
  width: 100%;
  display: flex;
  flex-direction: row;
  
}

.lastName{
  margin-left: 50px;
}

span{
  width: 30%;
  font-weight: bold;
  text-align: end;
  margin-top: 10px;
  color:#9e9e9e ;
}

input{
  padding: 0.375rem 0.75rem;
  border:none;
  outline: none;
  margin-left: 10px;
  border-bottom: 2px solid #ccc;
  background-color: #fff;
  color: black;
  width: 100%;
  text-align: center;
  font-size: 17px;
}

input:active, input:focus, input:focus-visible {
  border: none;
  border-bottom: 2px solid rgb(59, 213, 241);
  line-height: 0px;
}

input:invalid{
  border-bottom: 2px solid red;
}

.full{
  border-bottom:  2px solid rgb(59, 213, 241);
}

.boxError{
  width: 100%;
  height: 0px;
  display: flex;
  flex-direction: column;
}

.messageError{
  width: 100%;
  font-size: 12px;
  text-align: start;
  color: red;
  margin-top: 5px;
  margin-left: 15px;
  text-align: center;
}


.boxSignature{
  display: flex;
  flex-direction: column;
  width: 100%;
}

.box{
  display: flex;
  border: 2px solid black;
  width: 250px !important ;
  height: 150px !important;
  margin-left: 40% ;
}

.contentBox{
  display: flex;
  width: 100%;
}

.imgDelete{
    width: 25px;
    height: 25px;
    margin-left: 2px;
}

.imgDelete:hover{
  width: 30px;
  height: 30px;
  cursor: pointer;
}

.hide{
  display: none;
}

.btnSend{
    border: none;
    padding: 5px;
    font-size: 15px;
    border-radius: 20px;
    box-shadow: 2px 2px 2px black, 0px -1px 2px black;
    width: 150px;
    margin-left: auto;
}

.btnSend:hover{
  box-shadow: 1px 1px 1px black, 1px 1px 1px black;
  cursor: pointer;
}

.footer{
  display: flex;
    justify-content: flex-start;
    text-align: center;
    font-family: sans-serif;
    width: 100%;
    height: 50px;
    bottom: 0;
    position:fixed;
    background-color: #3899b7;
    box-shadow: 0px -1px 5px #060322;
}

.help{
  display: flex;
  width: 30%;
  justify-content: start;
  margin-top: auto;
  margin-bottom: auto;
  color: #fff;
}

p{
  margin-left: 10px;
}

.helpImg{
  width: 32px;
  height: 32px;
  margin:10px;
}

.helpImg:hover{cursor: pointer;}

.message{
  text-align: center;
  width: 100%;
  margin: auto;
  color: green;
  font-size: 15px;
}

.message2{
  text-align: center;
  width: 100%;
  margin: auto;
  color: rgb(128, 0, 0);
  font-size: 15px;
}

.contentSpinner{display: flex;justify-content: center;width: 100%;margin-top: 20px;}
.spinner {border: 4px solid rgb(255, 254, 254);border-left-color: transparent;width: 36px;height: 36px;border-radius: 50%;animation: spin 1s linear infinite;}
  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
  
    100% {
      transform: rotate(360deg);
    }
  }



@media(max-width:600px){
  .boxInputId{
    display: none;
  }
  .boxInputMobile{
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .child{
    width: 90%;
    margin: 0px;
    height: 100%;
  }

  .boxError{
    height: 100px;
    margin-top: 5px;
  }

  span{
    margin-top: 20px;
  }

  .input{
    width: 80%;
  }

  .box{
    margin-left:auto;
  }



  .btnSend{
    margin-right: auto;
    margin-bottom: 80px;
    margin-top: 10px;
  }

  .help{
    width: 100%;
  }

  .helpImg{
    margin: 10px;
  }
}
</style>
