<template>
    <section>
         <div class="passwordGeneratorElement">
        <CaracterGnenrator></CaracterGnenrator>
        </div>
    </section>


   
<section>
    <div class="ElementSave" :style="{ display: saveElementDisplay }">
        <div class="SaveContainer">
            <div class="SaveComponent">
            <savePass></savePass>
            </div>
        </div>
        
    </div>
    
</section>

</template>

<script>
import CaracterGnenrator from '../components/PasswordCreat/caracter-generator.vue';
import savePass from '../components/PasswordCreat/passwordSave.vue';
import { mapState } from 'vuex';

export default {

    computed: {
        ...mapState(['displaySaveElement'])
    },

    data() {
        return{
            saveElementDisplay: 'none',
            SaveElement: false
        }
    },

    watch: {
        displaySaveElement(newVal){
            this.SaveElement = newVal;
            this.displaSaveContainer();
        }
    },

    methods: {

        displaSaveContainer(){
           if(this.SaveElement === true){
            this.saveElementDisplay = 'block';
           }else{
            this.saveElementDisplay = 'none';
           }
        }
    },

    components:{
        CaracterGnenrator,
        savePass,
    }
}
</script>