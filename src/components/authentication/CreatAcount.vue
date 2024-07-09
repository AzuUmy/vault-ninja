<template>
  
  <div class="RegisterForm" :style="{display: hideCreatAccount}">
    <h1>Registrar uma Conta</h1>
        <div class="creatAccountInputs">
            <p>Nome/Sobrenome</p>
            <input v-model="nameField" class="creastAccountInput" type="text" placeholder="Jhon doe" required>
            <p>Email</p>
            <input v-model="inputEmail" class="creastAccountInput" type="email" placeholder="email_email@email.com" required>
            <p>Data de Nascimento</p>
            <input v-model="birthInput" class="creastAccountInput" type="number" required>
            <p>Numero de Telefone</p>
            <input v-model="telInput" class="creastAccountInput" type="tel" placeholder="(41) 9047-8374" required>
            <p>Senha</p>
            <input v-model="passwordInput" class="creastAccountInput" type="password" placeholder="************" required>
        </div>  


        <div class="radioAgreement">
          <div @click="agree">
            <div class="radioButton" :style="{backgroundColor: agreeButton}">

            </div>
          </div>

          <div>
            <p>Concordo com o termo de Segunca</p>
          </div>
        </div>

        <div>
            <button class="CreatAccount" @click="creatAccount" :style="{backgroundColor: creatButton}">Prosseguir</button>
        </div>
  </div>

  <div v-if="displayImagePicker">
    <pickImage></pickImage>
  </div>

</template>


<script>
import { mapState, mapMutations } from 'vuex';
import pickImage from '../authentication/pickUserImg.vue';



export default {

    computed: {
        ...mapState(['AccountData'])
    },

    data(){
        return{
            agreeButton: "",
            activateButton: false,
            creatButton: "",
            nameField: '',
            inputEmail: '', 
            birthInput: '',
            telInput: '',
            passwordInput: '',
            displayImagePicker: false,
            hideCreatAccount: ''
        }
    },

    methods: {
        agree(){
            if(this.agreeButton == ""){
                this.agreeButton = "rgb(0, 195, 255)";
                this.activateButton = true;
                this.creatButton = "rgb(0, 195, 255)"
            }else{
                this.activateButton = false;
                this.agreeButton = "";
                this.creatAccount = "";
                this.creatButton = "";
            }
        },

        ...mapMutations(['setnewAccountData']),
        creatAccount(){
            if(this.activateButton != false){
                const newAcc = {
                    name: this.nameField,
                    email: this.inputEmail,
                    birthDate: this.birthInput,
                    telNumber: this.telInput,
                    password: this.passwordInput

                } 



                if(newAcc.name != "" && newAcc.email != "" && newAcc.birthDate != "" && newAcc.telNumber != "" && newAcc.password != ""){
                    this.displayImagePicker = true;

                    this.$store.commit('setnewAccountData', newAcc);
                    console.log(newAcc);

                    if(this.displayImagePicker != false){
                        this.hideCreatAccount = 'none';
                    }else{
                        this.hideCreatAccount = 'block';
                    }
                }
            }
        }

       
    },

    mounted(){
      
        },

        components: {
            pickImage
        }


}

</script>