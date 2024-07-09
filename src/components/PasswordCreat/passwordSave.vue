<template>
    <section>
      <div class="SaveSection" :style="{display: displaySaveElements}">
        <div class="DataContainer" v-for="(newItem, index) in loadedData" :key="index">
        <div class="OrigenPass">
             <div>
                <img class="OrigemImg" :src="newItem.imageUrl" alt="not founded">
            </div>
            <div>
                {{ newItem.name }}
            </div>
        </div>
           <div>
            <closeButton @click="CloseWindow"></closeButton>
           </div>
      </div>

      <div class="contentContainer">
        <div class="inputFields">
            <div class="textFields">
                <p class="P-element">Email/Login</p>
                <input class="EmailField" v-model="emailToSave" type="email">
            </div>
            <div class="textFields">
                <p class="P-element">Senha</p>
                <input class="PasswordField" v-model="passwordContent" 
                :type="showPassword === 'text' ? 'text' : 'password'"
                readonly>
            </div>
            <div class="VisibilityIcon">
                <div class="visibleIcon" @click="changeVisblity">
                    <vissible :style="{display: DisplayVisibleElement}"></vissible>
                    <notVisible :style="{display: DIsplayInvisibleElement}"></notVisible>
                </div>
                
            </div>

            <div>
          </div>
        </div>

        <div class="QRCode">
            <img class="QrCodeImg" :src="qrCodeImg" alt="QR-Code" v-if="qrCodeImg">
        </div>
        

      </div>


      <div class="Interactions">
         <button class="SaveButton" @click="SavePassword">Salvar</button>
         <hr class="Separator">
         <button class="CancelButton" @click="Cancel">Cancelar</button>
         <hr class="Separator">
         <button class="AlterOrigemPass">Alterar Senha Na origem</button>
      </div>


      </div>
   

    </section>
  
     
    <section>
    <div :style="{display: userFeedBackDisplay}">
      <div class="LoadingSaveParameters">
        <div class="circle">
          <div class="innerCircle" :style="{background: LoadingBackGround}">

          </div>
        </div>
      </div>

      <div>
        <div class="userFeedBack">
          <h1>{{ savingMessage }}</h1>
        </div>
      </div>
    </div>
    


    <div class="UserSaveMethodReturn" :style="{display: showEelement}">
      <doneIcon></doneIcon>
      <h1>{{ SaveMethodReturn }}</h1>
      <button  class="OkaySaveButton" @click="endAction">Okay</button>
    </div>

    </section>


  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex';
  import QRCode from 'qrcode';
  import closeButton from '../icons/x.vue';
  import vissible from '../icons/vissible.vue';
  import notVisible from '../icons/notVisible.vue';
  import axios from 'axios';
  import doneIcon from '../icons/done.vue';
  import {getUserEmail} from '../services/keepUserEmail';

  export default {
    computed: {
      ...mapState(['origemData', 'passwordMenager', 'displaySaveElement, logedEmail']),

    },
  
    data() {
      return {
        loadedData: [],
        passwordContent: '',
        qrCodeImg: null,
        DIsplayInvisibleElement: 'none',
        DisplayVisibleElement: 'block',
        showPassword: 'password',
        UserEmail: '',
        emailToSave: '',
        savingMessage: ' ',
        LoadingBackGround: '',
        displaySaveElements: '',
        userFeedBackDisplay: 'none',
        checkSavingPassword: false,
        SaveMethodReturn: '',
        showEelement: 'none'
      };
    },


      watch: {
        setEmailLoged(newVal){
          this.UserEmail = newVal;
        }
      },

     async created(){
      try {
        this.UserEmail = await getUserEmail();
        console.log("user email", this.UserEmail);
      } catch (error){
        console.log('failed to get user email', error)
      }
    },

  
    methods: {

      ...mapMutations(['passwordMenager']),
        async generateQrCode(){
            try{
                const qrCodeDataUrl = await QRCode.toDataURL(this.passwordContent);
                this.qrCodeImg = qrCodeDataUrl;
            }catch (error){
                console.log('Failled to Load QrCode');
            }
        },

        changeVisblity(){
            if(this.DisplayVisibleElement === 'block'){
              this.DisplayVisibleElement = 'none';
              this.DIsplayInvisibleElement = 'block';
              this.showPassword = 'text'
            }else{
              this.DisplayVisibleElement = 'block';
              this.DIsplayInvisibleElement = 'none';
              this.showPassword = 'password'
            }
        },

      CloseWindow(vissibilityNone){
          this.$store.commit('setDisplaySaveElement', vissibilityNone)
        },
        
      Cancel(vissibilityNone){
          this.$store.commit('setDisplaySaveElement', vissibilityNone);
        },





      async SavePassword(){
        console.log("user Email: ", this.UserEmail);
        this.loadingScreen();

        const newItem = this.loadedData[0];

            let dataToBeSaved = {
              origemName: newItem.name,
              LoggedUser: this.UserEmail,
              OrigemLogin: this.emailToSave,
              EncryptedPassword: this.passwordContent,
              origemTag: newItem.imageUrl
            };
      

          try{
            const reponse = await axios.post('http://192.168.1.103:3000/SavedPassword',  dataToBeSaved);
              this.checkSavingPassword = true;
            }catch (error){
              console.log("error ssaving data: ", error);
              this.SaveMethodReturn = 'error retriving data'
              this.checkSavingPassword = false;
          }

       },
      
        

       loadingScreen(){
       this.displaySaveElements = 'none';
       this.userFeedBackDisplay = 'block'

        this.LoadingBackGround = 'linear-gradient(-2deg, rgba(251, 251, 251,1) 0%, rgba(251, 251, 251,1) 20%, rgba(251, 251, 251,1) 40%, rgba(251, 251, 251,1) 60%)';
        this.savingMessage = 'Salvando Senha ...';
        setTimeout(() => {
          this.LoadingBackGround = 'linear-gradient(0deg, rgba(0,195,255,1) 6%, rgba(255,255,255,1) 33%, rgba(255,255,255,1) 61%, rgba(255,255,255,1) 85%)';
        }, 2000);
          
        setTimeout(() => {
          this.LoadingBackGround = 'linear-gradient(0deg, rgba(0,195,255,1) 6%, rgba(0,195,255,1) 33%, rgba(255,255,255,1) 61%, rgba(255,255,255,1) 85%)';
        }, 4000);

        setTimeout(() => {
          this.LoadingBackGround = 'linear-gradient(0deg, rgba(0,195,255,1) 6%, rgba(0,195,255,1) 33%, rgba(0,195,255,1) 61%, rgba(255,255,255,1) 85%)';
          this.savingMessage = 'Aplicando Cricptografia a Senha ...';
        }, 7000);
       
        setTimeout(() => {
          this.LoadingBackGround = 'linear-gradient(0deg, rgba(0,195,255,1) 6%, rgba(0,195,255,1) 39%, rgba(0,195,255,1) 59%, rgba(0,195,255,1) 78%)';
        }, 12000);


        setTimeout(()=>{
          if(this.checkSavingPassword != false){
            this.userFeedBackDisplay = 'none';
            this.showEelement = 'block';
            this.SaveMethodReturn = "Senha salva com sucesso";
          }else{
            this.userFeedBackDisplay = 'block';
            this.showEelement = 'none';
          }
        }, 13000);
          
       },

       endAction(vissibilityNone){
        this.$store.commit('setDisplaySaveElement', vissibilityNone);
        this.displaySaveElements = 'block';
        this.userFeedBackDisplay = 'none';
        this.showEelement = 'none';
        this.emailToSave = '';
       }

        
    },

   
  
    watch: {
        origemData: {
        handler(newValue) {
            this.loadedData = newValue;  
        },
      },

      passwordMenager: {
        handler (newVal) {
            this.passwordContent = newVal;
            this.generateQrCode();
        }
      },
    },
  
    mounted() {
    this.generateQrCode();
    },

    components: {
        closeButton,
        vissible,
        notVisible,
        doneIcon
    }
  };
  </script>