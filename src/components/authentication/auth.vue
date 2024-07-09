<template>
<section>
    <div class="LoginCoponenets">
        <div class="Elements">
            <div class="LoginContet">
                
              <div class="Logo">
                <img class="logoInPage" src="../../img/LockClick sem fundo.png" alt="">
              </div>

              <div class="Message" v-if="!showCreratedAccount"> 
                <div>
                    <h1>Bem Vindo</h1>
                    <h3>Por favor Ensira seus dados de login ou crie uma conta</h3>
                </div>
              </div>

              <div class="InteractiveButtons">
                <div class="ButtonInLogin">
                    <button @click="LoginPage" :style="{backgroundColor: loginButton, color: loginButtonColor}" class="ButtonsLogin">Login</button>
                    <button @click="signInPage() ":style="{backgroundColor: signInButton, color: sigInButtonColor }" class="ButtonsLogin">Criar Conta</button>
                </div>
              </div>


              <div v-if="!showCreratedAccount">


                
                <div class="emailInput">
                <div class="EmailContent">

                <div class="ELEMENTSiNSIDEeMAILfIELD">
                  <div class="EmailIconClass">
                    <emailIcon v-if="setEmailIcon"  class="IconEmail"></emailIcon>
                    <img class="UserImage":src="userImage" v-if="userImage"  alt="not founded">
                </div>

           <hr>

                <div class="Email-field">
                    <div>
                        <p>Endreco de email</p>
                    </div>

                    <div>
                        <input v-model="emailInput" @input="validateEmail" class="EmailElementField" type="Email" placeholder="Seu_email@email.com">
                        <div class="emailIndicator" :style="{backgroundColor: indicatorBackground}"></div>
                    </div>

                    <div v-if="showPasswordField">
                        <div>
                            <p>Senha</p>
                        </div>
                        <div>
                            <input v-model="passwordInput" @input="validatePassword" class="EmailElementField" type="password" placeholder="**********">
                        </div>
                    </div>
                   
                </div>


                <div class="DisplayingCOrrectElement">
                    
                </div>


           </div>
              
                </div>
               
              </div>



<div class="ButtonElementInLogin">
    <div>
        <button class="LoginButton" :style="{backgroundColor: loginButtonRealease}" @click="loginInto" >Logar</button>
    </div>
              </div>

            
              </div>


<div v-if="showCreratedAccount">
        <creatAccountView></creatAccountView>
    </div>




<footer>
  
</footer>

</div>
            <div class="slider">
              <img class="marketingImage" src="../../../../Source/src/img/LockClick sem fundo.png" alt="image not founded">
            </div>
        </div>
    </div>
</section>


</template>


<script>


import emailIcon from '../icons/emialIcon.vue';
import creatAccountView from '../authentication/CreatAcount.vue';
import axios from 'axios';
import { setToken } from '../services/authPass';
import { removeToken } from '../services/authPass';
import {validateToken} from '../services/validateAuth';
import {keepUserEmail} from '../services/keepUserEmail';

export default {


    data() {
        return {
            loginButton: 'rgb(0, 195, 255)',
            loginButtonColor: 'white',
            signInButton: '',
            sigInButtonColor: '',
            emailInput: '',
            passwordInput: '',
            showPasswordField: false,
            setEmailIcon: true,
            userImage: null,
            loginButtonRealease: '',
            indicatorBackground: ''
        }
    },




    methods: {


        signInPage(){
            this.loginButton = 'white';
            this.loginButtonColor = 'grey';
            this.signInButton = 'rgb(0, 195, 255)';
            this.sigInButtonColor = 'white'
            this.showCreratedAccount = true;
          
        },

        LoginPage(){
            this.loginButton = 'rgb(0, 195, 255)';
            this.loginButtonColor = 'white';
            this.signInButton = 'white';
            this.sigInButtonColor = 'grey'
            this.showCreratedAccount = false;
        },



        async validateEmail() {

                let emailData = this.emailInput;

                try {
                    const response = await axios.get('http://192.168.1.103:3000/checkEmail', {
                        params: {
                            email: emailData
                        }
                    });

                const emailDelivered = response.data.userEmail;

                setTimeout(() =>{
                if(emailDelivered === this.emailInput){
                    this.indicatorBackground ='rgb(0, 199, 0)'
                    this.showPasswordField = true;
                    this.userImage = response.data.userImage;
                    this.setEmailIcon = false
                    console.log(this.showPasswordField);
                } 
            }, 200)
                } catch (error) {
                    console.log(error);
                    this.showPasswordField = false;
                    console.log(this.showPasswordField);
                    this.setEmailIcon = true;
                    this.userImage = null;
                    this.indicatorBackground = 'red'
                }
            },

            validatePassword(){
                if(this.passwordInput != ''){
                    this.loginButtonRealease = 'rgb(0, 195, 255)';
                }else{
                    this.loginButtonRealease = '';
                }
            },

        async loginInto(){
            if(this.passwordInput != ''){
                try {
                    const response = await axios.post('http://192.168.1.103:3000/login', {
                    email:  this.emailInput,
                    password: this.passwordInput
                });

                const token = response.data.token;

                const router = this.$router;

                if(token){
                    setToken(token);
                    
                    const isValid = await validateToken(token);

                    if(isValid){
                        const userEmail = await keepUserEmail(this.emailInput);
                        router.push('/hub')
                    }
                    ; 
                }else{
                    removeToken();
                }
             
                } catch (error){
                        console.log(error);
                }
            }
         
        },
    },

    mounted(){
       
    },



components: {
    emailIcon,
    creatAccountView,
}

}

</script>