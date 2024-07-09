<template>
    <section>
        <div class="SearchBarElement">
            <div>
                  <input v-model="searchData" @click="searchBarInteraction" class="SearchBar" type="text" placeholder="  Pesquisar">
            </div>
            <div :style="{opacity: dropDownOpacity, maxHeight: DropDownListHeigh}" class="SearchDropDownList">
                <div class="DropDownListElements" v-for="(item, index) in filterData" :key="index">
                   <div class="searchContent">
                    
                            <div class="alignContent">
                                <div>
                                    <img class="imageDisplayed" :src="item.origemTag" alt="">
                                </div>
                                <div>
                                    {{ item.origemName }}  --   {{ item.OrigemLogin }}
                                </div>
                              
                            </div>
                            <div>
                                    <button class="copyButtonInSearchBar" @click="copySelectedData(index)" >{{copy}}</button>
                                </div>
                        
                    </div>

                </div>
             
            </div>
        </div>
    </section>
</template>

<script>

import { mapMutations, mapState } from 'vuex';

export default {

    computed: {
            ...mapState(['searchBarData', 'selecteData']),

            filterData() {
                if (!this.searchData) {
                    return this.searchBarData;
                }
                const lowerCaseSearchData = this.searchData.toLowerCase();
                return this.searchBarData.filter(item => 
                    item.origemName.toLowerCase().includes(lowerCaseSearchData) ||
                    item.OrigemLogin.toLowerCase().includes(lowerCaseSearchData)
                );
            }
         
    },

    data(){
        return{
              dropDownOpacity: '',
              DropDownListHeigh: '',
              dropDownIsActive: false,
              featchedData: [],
              searchData: '',
              copy: 'copiar'
        }
      
    },

    watch: {
        searchBarData: {
            handler(newVal){
                this.featchedData = newVal;
            },
            immediate: true,
            deep: true
        }
    },

    methods:{

        ...mapMutations(['setSearchBarData', 'setSelectedData']),

        searchBarInteraction(){
            this.dropDownIsActive = true;

            if(this.dropDownIsActive === true){
                 this.dropDownOpacity ='100%';
                 this.DropDownListHeigh = '500px';
                console.log(this.dropDownIsActive);
            }
               

                let SearchBar = document.querySelector(".SearchBar");
                document.addEventListener('click', (event) =>{
                    if(!SearchBar.contains(event.target)){
                        this.dropDownIsActive = false;

                       if(this.dropDownIsActive === false){
                            console.log(this.dropDownIsActive);
                            this.dropDownOpacity ='';
                            this.DropDownListHeigh = '';
                       }
                    }
                });
        },

        copySelectedData(index){
         const copyText = this.featchedData[index].EncryptedPassword;

         navigator.clipboard.writeText(copyText);
        }
      
    },

    mounted(){

    },

    components: {
        
    }
}
</script>