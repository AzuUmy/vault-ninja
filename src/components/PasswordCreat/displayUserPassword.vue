<template>
  <section>
    <div class="ViewPassContent">
    <div class="Content">
        <div v-for="(item, index) in fetchedData" :key="index">
            <div class="UserData" @mouseover="show = index" @mouseleave="show = null">
                <div class="OrigemElements">
                    <div class="NEWoRIGINeLEMETS">
                    <div>
                        <img class="Image-tag" :src="item.origemTag" alt="Not Founded" />
                    </div>
                        <div>
                            {{ item.origemName }}
                        </div>
                    </div>
                </div>

                <div class="passwordData">
                     <div class="userEmail">
                     {{ item.OrigemLogin }}
                    </div>
                    <div class="alignElements">
                        <input class="UserPass" :value="item.EncryptedPassword"
                        :type="showPassword[index] === 'text' ? 'text' : 'password'" readonly>
                        <vissible class="buttonsInHub" @click="displayPassword(index)" :style="{display: visibleye[index]}"></vissible>
                        <notVisible class="buttonsInHub" @click="hidPassword(index)" :style="{display: notvisibleye[index]}"></notVisible>
                    </div>
                </div>

                <div>
                   
                    <div v-if="show === index" class="MyInteractiveElements">
                        <div class="moreInteractions">
                            <button @click="editPassword" class="interactionTemplatButton">Editar</button> 
                            <button @click="copyPass(index)" class="interactionTemplatButton">{{Copiar}}</button>
                            <moreIcon class="ActionButton" @click="displayMoreOtions(index)" ></moreIcon>
                        </div>
                    </div>
                </div>
            </div>
         </div>
     </div>
</div>

    <div class="loadingContent">
        <div v-for="i in 10" :key="i" class="loadingData" :style="{display: displayUnloadContent}">
            <div class="UnloadedData">
                <div class="unloadElements">
                    
                </div>
            </div>
        </div>
    </div>
  </section>
</template>



<script>
  import vissible from '../icons/vissible.vue';
  import notVisible from '../icons/notVisible.vue';
  import moreIcon from '../icons/more.vue';
  import { getUserEmail } from '../services/keepUserEmail';
  import { mapState } from 'vuex';

export default {

    computed: {
        ...mapState(['searchBarData', 'selectedData']),
    },

    data(){
        return{
            fetchedData: [],
            notvisibleye: [],
            visibleye: [],
            showPassword: [],
            show:false,
            Copiar: 'Copiar',
            displayUnloadContent: 'block',
            qrCodeImg:  null,
            displayQRcode: [],
            UserEmail: ''
        }
    },

    async created(){
        try {
            this.UserEmail = await getUserEmail();
        } catch(error) {
            console.log(error)
        }
    },

    watch: {
        UserEmail: {
            immediate: true,
            handler(newVal){
                if(newVal !== ''){
                    this.featchUserData();
                }
            }
        }
    },


    methods: {
    async featchUserData(){
            try {
                const response = await fetch(`http://192.168.1.103:3000/SavedPassword?LoggedUser=${this.UserEmail}`);
                const data = await response.json();
                this.fetchedData = data;
                this.displayUnloadedElement = 'none';
                this.visibleye = data.map(() => 'block');
                this.notvisibleye = data.map(() => 'none');
                this.displayUnloadContent = 'none';
                this.$store.commit('setSearchBarData', this.fetchedData);

            } catch (error) {
                console.log('data not loaded');
            }
        },


        displayPassword(index){
        this.notvisibleye[index] = 'block';
        this.visibleye[index] = 'none';
        this.showPassword[index] = 'text';
       },

       hidPassword(index){
        this.notvisibleye[index] = 'none';
        this.visibleye[index] = 'block';
        this.showPassword[index] = 'password';
       },



       editPassword(){
        //console.log("teste");
       },

       deletPassword(){
       // console.log("novo teste");
       },

       copyPass(index){
        const textCopy = this.fetchedData[index].EncryptedPassword;

            navigator.clipboard.writeText(textCopy) 
            .then(() => {
                this.Copiar = 'Copiado para transferencia';
                setTimeout(() =>{
                    this.Copiar = 'Copiar';
                }, 1000);

             
            })
            
            .catch(error=> {
                console.error('failled to copy text: ', error);
            })
       },



    },

   

    mounted(){
        this.featchUserData();
       
    },


    components: {
        vissible,
        notVisible,
        moreIcon
    }
}



</script>