<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['notificationsMenager']),
  },
  data() {
    return {
      SendTest: '',
      elementTtestArray: [],
    };
  },
  methods: {
    ...mapMutations(['setNotificationMenager']),
    SenDone() {
      // Push the value of SendTest into elementTtestArray
      this.elementTtestArray.push({ text: this.SendTest });
      // Commit the elementTtestArray to the vuex store
      this.$store.commit('setNotificationMenager', this.elementTtestArray);
    },
  },
};
</script>