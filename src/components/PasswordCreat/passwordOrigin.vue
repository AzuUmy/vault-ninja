<template>
  <section>
    <div class="Origin">
      <div>
        <h1 class="PasswordIndicatorTitule">Selecione a origem da Senha</h1>
      </div>
      <div class="OriginLink">
        <div class="Data-container">
          <div  @click="SelectOrigin(item)" class="Data-elments" v-for="(item, index) in fetchedData" :key="index">
              <div class="ImageOrigim">
                  <img class="Image-tag" :src="item.imageUrl" alt="Not Founded" />
              </div>
              <div>
                {{ item.name }}
              </div>
          </div>
        </div>

        <div v-for="i in 10" :key="i" class="UnloadedData" :style="{display: displayUnloadedElement}">
          <div  class="UnloadeDataContainer">
              <div class="UnloadedImgElement"></div>
              <div class="UloadedNameElement"></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section>
    <div class="ArrowContainer">
      <div class="ArrowEelement">
        <ArrowIndicator></ArrowIndicator>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import ArrowIndicator from '../icons/arrow-icon.vue';


export default {

  computed: {
    ...mapState(['origemData', 'displaySaveElement', 'passwordMenager', 'notificationsMenager']),
  },


  data() {
    return {
      fetchedData: [],
      displayUnloadedElement: 'block',
      alertData: []
    };
  },

  methods: {

    ...mapMutations(['setOrigemData', 'setDisplaySaveElement', 'setNotificationMenager']),

    async fetchData() {
      try {
        const response = await fetch('http://192.168.1.103:3000:3000/Origem');
        const data = await response.json();
        this.fetchedData = data;
        this.displayUnloadedElement = 'none';
      } catch (error) {}
    },

    SelectOrigin(selectedItem) {
        try {
          const dataArray = Array.isArray(selectedItem) ? selectedItem : [selectedItem];
          this.$store.commit('setOrigemData', dataArray);
          this.changeSaveElementVisibility(true);
        } catch (error) {
          console.log('Error committing data', error);
        }
      },

      changeSaveElementVisibility(newVisibility) {
        if (this.passwordMenager !== '') {
          this.$store.commit('setDisplaySaveElement', newVisibility);
        }
      }
  },

  mounted() {
    this.fetchData();
  },

  components: {
    ArrowIndicator
  }
};
</script>