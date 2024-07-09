<template>
        <section class="SideBar">
            <div class="userBgm">
                <div class="userAvatar" v-for="(img, index) in fetchedData" :key="index">
                    <img class="userImage" :src="img.userImage" alt="image not founded">
                </div>
            </div>
            <div class="SideBarInteractions">
                <div v-for="(item, index) in fetchedData" :key="index">
                    <div class="UserNickName">
                        
                        <div>
                            <p class="UserName">{{ item.name }}</p>
                        </div>
                       
                        </div>
                </div>
                       
                        <div class="InteractiveButtons">
                            <div>
                                <HubButtom :style="{ fill: ButtonColors.hub, height: ButtonHeigh.hub, 
                                    width: ButtonWidth.hub, background: AddBackground.hub, filter: addFilter.hub}" @click="selecButton('hub', '/hub')"></HubButtom>
                            </div>
                            <div>
                                
                                <AddButton :style="{ fill: ButtonColors.add, height: ButtonHeigh.add, 
                                    width: ButtonWidth.add, background: AddBackground.add, filter: addFilter.add}" @click="selecButton('add', '/add')"></AddButton>
                            </div>
                            <div>
                            
                            </div>
                            <div>
                                <!--  <Settings :style="{ fill: ButtonColors.settings, height: ButtonHeigh.settings, 
                                width: ButtonWidth.settings, background: AddBackground.settings, filter: addFilter.settings}" @click="selecButton('settings')"></Settings>-->
                               
                            </div>
                            
                        </div>
            </div>
           
        </section>

        
</template>

<script>
import AddButton from '../icons/add-icon.vue';
import HubButtom from '../icons/hub-icon.vue';
import stackView from '../icons/stacked.vue';
import Settings from '../icons/settings.vue';
import { getUserEmail } from '../services/keepUserEmail';


export default{


    data() {
        return{

           ButtonColors: {
            hub: '',
            add: '',
            stack: '',
            settings: ''
           },
           ButtonHeigh: {
            hub: '',
            add: '',
            stack: '',
            settings: ''
           },
           ButtonWidth: {
            hub: '',
            add: '',
            stack: '',
            settings: ''
           },
           AddBackground: {
            hub: '',
            add: '',
            stack: '',
            settings: ''
           },
           addFilter: {
            hub: '',
            add: '',
            stack: '',
            settings: ''
           },

           userEmail: '',

           fetchedData: []
        }
    },

    async created(){
            try {
                this.userEmail = await getUserEmail();
            } catch (error) {
                console.log(error);
            }
        },

        watch: {
            userEmail: {
                immediate: true,
                handler(newVal){
                    if(newVal !== ''){
                        this.featchUserData();
                    }
                }
            }
        },

    methods: {
        selecButton(buttonName, route){
            Object.keys(this.ButtonColors).forEach((name) => {
                this.ButtonColors[name] = '';
                this.ButtonHeigh[name] = '';
                this.ButtonWidth[name] = '';
                this.addFilter[name] = '';
            });

                this.ButtonColors[buttonName] = 'rgb(0, 195, 255)';
                this.ButtonHeigh[buttonName] = '45px';
                this.ButtonWidth[buttonName] = '40px';
                this.addFilter[buttonName] = ' drop-shadow(0 0 0.75rem rgb(128, 240, 119, 0.229))';
                
                const router = this.$router;
                router.push(route);
    
        },


        async featchUserData(){
            if(this.userEmail != ''){
                console.log("email to fetch data", this.userEmail);
            }else{
                console.log("error");
            }
          
            try {
               
                const response = await fetch(`http://192.168.1.103:3000/userData?email=${this.userEmail}`);
                const data = await response.json();
                this.fetchedData = data;
                
            } catch (error){
                console.log(error);
            }
        }
    },

    mounted(){
        this.featchUserData();
    },

    components: {
        AddButton,
        HubButtom,
        stackView,
        Settings
    }
}
</script>