<template>
    <div  class="userimagecomponent">
        <div class="imageSeletor">
            <div>
                <p>Selecione uma image</p>
            </div>

            <div class="image">
                <div class="userimg">
                    <div class="imagemockup" :style="{display: mockupDisplay }" ></div>
                    <img class="imagecompound" v-if="selectedImage" :src="selectedImage" alt="Selected Image">
                </div>
            </div>
            <div class="userName">
                <p>{{ AccountData.name }}</p>
            </div>

            <div>
                <input type="file" ref="fileInput" style="display: none" @change="handleFileInputChange">
                <button @click="filePicker" :style="{display: hideImagePicker}" class="buttonImage">Upload imagem</button>
                <button class="creatAcc" @auxclick="creatAccount" :style="{display: displayCreatAccount}"  @click="creatAccount">Criar conta</button>
            </div>
        </div>
       
    </div>
    


</template>

<script>
import { mapState } from 'vuex';
import usermockImage from '../icons/userImg.vue';
import axios from 'axios';

export default {

    computed: {
        ...mapState(['AccountData'])
    },

    data(){
        return {
            selectedImage: null,
            mockupDisplay: '',
            hideImagePicker: '',
            displayCreatAccount: 'none',
            UserName: ''
        }
    },

    watch: {
        
    },

    methods: {
        filePicker(){
            this.$refs.fileInput.click();
        },


        handleFileInputChange(event) {
        const file = event.target.files[0];
            this.selectedImage = file;
        const reader = new FileReader();
        reader.onload = () => {
            this.selectedImage = reader.result;
            if(this.selectedImage != null){
                this.mockupDisplay = 'none';
                this.hideImagePicker = 'none';
                this.displayCreatAccount = 'block';
            }else{
                this.mockupDisplay = 'block';
            }
        };
         reader.readAsDataURL(file);
        },

        async creatAccount() {
            if(this.selectedImage){
                const formData = new FormData();
              
                formData.append('file', this.$refs.fileInput.files[0]);
                try {
                  const uploadResponse = await axios.post('http://192.168.1.103:3000/uploadImage', formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                   });

                const imageUrl = uploadResponse.data.url;

                    const newAcc = {
                        name: this.AccountData.name,
                        email: this.AccountData.email,
                        birthDate: this.AccountData.birthDate,
                        telNumber: this.AccountData.telNumber,
                        password: this.AccountData.password,
                        userImage: imageUrl
                    };

                    try {
                        const response = await axios.post('http://192.168.1.103:3000/creatAcc', newAcc) 
                    } catch (error){
                        consolelog(error);
                    }


                } catch (error){
                    console.log("Error", error);
                }
            }
        }
  },

    components: {
        usermockImage
    }

}

</script>