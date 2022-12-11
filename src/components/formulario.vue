<template>
   <div class="dad">

    <Form class="child" @submit="save" :validation-schema="shema" v-slot="{errors}">


      <div class="boxInputId">
       <span>Name:</span> 
       <div class="boxError">
        <Field  type="text" v-model="dataForm.name" :class="{'invalid':errors.name}" name="name"/>
          <span class="messageError">{{errors.name}}</span>
       </div>
       <span class="lastName">Business:</span>
          <div class="boxError">
            <Field v-model="dataForm.lastName" :class="{'invalid':errors.lastName}" name="lastName"/>
            <span class="messageError">{{errors.lastName}}</span>

        </div>
      </div>

      <div class="boxInput">
        <span>NIEF</span> 
        <div class="boxError">
          <Field v-model.number="dataForm.nief"  :class="{'invalid':errors.nief}" name="nief"/>
          <span class="messageError">{{errors.nief}}</span>
        </div>
      
      </div>

      <div class="boxInput">
       <span>Business name:</span> 
       <div class="boxError">
        <Field v-model="dataForm.bussinesName" :class="{'invalid':errors.bussinesName}"  name="bussinesName"/>
        <span class="messageError">{{errors.bussinesName}}</span>
       </div>
      </div>

      <div class="boxInput">
       <span>Direction:</span> 
       <div class="boxError">
        <Field v-model="dataForm.direction" name="direction"/>
        <span class="messageError">{{errors.direction}}</span>
       </div>
      </div>

      <div class="boxInput">
       <span>Location:</span>

       <div class="boxError">
        <Field v-model="dataForm.location" name="location"/>
        <span class="messageError">{{errors.location}}</span>
       </div> 
      </div>

      <div class="boxInput">
       <span>Province:</span> 
       <div class="boxError">
        <Field v-model="dataForm.province" name="province"/>
        <span class="messageError">{{errors.province}}</span>
       </div>
      </div>

      <div class="boxInput">
       <span>Email:</span> 
       <div class="boxError">
        <Field v-model="dataForm.email" name="email" />
        <span class="messageError">{{errors.email}}</span>
       </div>
      </div>

      <div class="boxSignature">
      <span>Signature:</span>
        <VueSignaturePad class="box" ref="signaturePad" /><img  class="imgDelete" src="../assets/borrar.png"/>
        <span v-if="signatureEmpty" class="messageError">Signature is required</span>
        <button @click="undo">Delete signature</button>
 </div>

      <button type="submit" :class="{'disabledBtn':errors}" class="btnSend" >send</button>

    </Form>

    <!--<Form @submit="sendForm2" :validation-schema="shema" v-slot="{errors}">
      <Field name="name" id="name"  :class="{'invalid':errors.name}" v-model="dataForm.name"/>
      <span>{{errors.name}}</span>
      <Field  name="email" v-model="dataForm.email"/>
      <span v-if="errors.email">{{errors.email}}</span>

      <button type="submit" >send2</button>
    </Form>-->
 
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
        direction: yup.string().min(3).max(10).required(),
        location:  yup.string().min(3).max(10).required(),
        province: yup.string().min(3).max(10).required(),
        email: yup.string().email().required()
}),

  signatureEmpty : false


    }},

    methods:{
      sendForm(){
        axios.post("https://axios",this.dataForm).then(datos=>{
          console.log(datos)
        }).catch(error =>{
          console.log(error)
        })
        
      },

      undo() {
    this.$refs.signaturePad.undoSignature();
    },

    save() 
    {
    const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
    this.signatureEmpty = false
    if(data){
      this.dataForm.signature = data
      this.sendForm()
    }else{
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
}

input{
  padding: 0.375rem 0.75rem;
  border:none;
  outline: none;
  margin-left: 10px;
  border-bottom: 2px solid #ccc;
  background-color: #fff;
  color: #9e9e9e;
  width: 100%;
}

input:active, input:focus, input:focus-visible{
  border: none;
  border-bottom: 2px solid rgb(59, 213, 241);
  line-height: 0px;
}

input:invalid{
  border-bottom: 2px solid red;
}

.boxError{
  width: 100%;
  height: 0px;
  display: flex;
  flex-direction: column;
}

.messageError{
  width: 100%;
  font-size: 10px;
  text-align: start;
  color: red;
  margin-top: 5px;
  margin-left: 15px;
}


.boxSignature{
  display: flex;
  flex-direction: column;
  width: 100%;
}

.box{
  border: 2px solid black;
  width: 250px !important;
  height: 150px !important;
  margin: auto;
}

.imgDelete{
  width: 50px;
}

.hide{
  display: none;
}

.btnSend{
  border: none;
}

.disabledBtn{
  background-color: blue;
}
</style>
