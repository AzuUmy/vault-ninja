<template>
  <section>
    <div class="NotificationContainer">
      <div class="NotificationElement">
        <div class="notiFYall">
          

          <div class="NotificationTrayElements">
            <div class="IconElement" @click="iconTrigger">
              <notificationIcon></notificationIcon>
              <div class="BagdeTemplate" :style="{display: displayNotifyIcon}">
                <div class="BadgeIcon">
                  {{ NotificationCounter }}
                </div>
              </div>
            </div>
          </div>

              <div class="notificationContent" :style="{ display: notificationBox }">
                <div class="BaseElement">

                  <p class="base">Notificaçoes</p>

                  <!-- notification element -->
                  <div class="FlowComponenet">
                    <div class="NotificationTemplate" v-for="(notification, index) in uniqueNotifications" :key="index">


                      <div class="Grouped">
                          <div class="NotificationAgrouped"
                     
                          :style="{display:displayGroupedCounter[index]}"  >
                            {{ groupedCounter[index] }}
                          </div>
                      </div>



                      <div class="NotificationContent">
                        <div class="ContentInside">
                              <div class="ContentNotification">
                                <p>{{ notification.text }}</p>
                              </div>
                        </div>
                    
                      </div>

                    

                      <div>
                        <div class="DissmisTemplate">
                          <div class="DissmisButtom">
                          <!-- in here is nescessasry to pass the notification.id into the button so when
                          triggred the parameter its already passed -->

                          <div class="notificationButtons">
                            <div class="Button">
                              <closeButton
                              class="dismissButton"
                              :notificationId="notification.id"
                              :style="{display: DisplayDismissButton[index]}"
                              @click="dismissNotification(notification.id)">
                              </closeButton>

                             <button 
                              class="cleanButton"
                             :style="{display: cleanButton[index]}" @click="CleanGroupedNotification(index)">Limpar
                           </button>
                          </div>
                         </div>
                        </div>
                       </div>
                      <div>                        
                     </div>
                    </div>
                   </div>
                  </div>
                </div>
               </div>
        </div>
       </div>
      </div>
  </section>
</template>

<script>
import notificationIcon from '../icons/notificationsTrayIcon.vue'
import closeButton from '../icons/x.vue';
import { mapState } from 'vuex';
import trashCanIco from '../icons/trascash.vue';

export default {
  computed: {
    ...mapState(['notificationsMenager']),


    uniqueNotifications() {
      // Filter out duplicate notifications based on the 'text' property
      return this.Notifications.filter((notification, index, self) => {
        return self.findIndex((n) => n.text === notification.text) === index;
      });
    },

  },

  data() {
    return {
      Notifications: [],
      notificationBox: 'none',
      NotificationCounter: 0,
      displayNotifyIcon: 'none',
      cleanButton: [],   
      groupedNotifications: {}, 
      groupedCounter: [],
      displayGroupedCounter: [],
      DisplayDismissButton: []
    }
  },
  
  watch: {
    notificationsMenager: {
      handler(newValue) {
        this.Notifications = newValue
        this.NotifyCounter();
        this.GroupedNotification();
      },
      deep: true,
    },
  },

  methods: {

    iconTrigger(){
      if(this.notificationBox === 'block'){
        this.notificationBox = 'none';
      } else {
        this.notificationBox = 'block';
      }
    },

  dismissNotification(targetId) {
    const selectedtId = this.Notifications.findIndex((notification) => notification.id === targetId);
     if(selectedtId !== -1){
      this.Notifications.splice( selectedtId, 1);
     }else{
      console.log('not founded');
     }
    

  },

     NotifyCounter(){
        this.NotificationCounter = this.Notifications.length;

        if(this.NotificationCounter !== 0){
          this.displayNotifyIcon = 'block';
        } else {
          this.displayNotifyIcon = 'none';
        } 
       
      },

      GroupedNotification() {
        this.groupedCounter = new Array(this.uniqueNotifications.length).fill(0);
        this.displayGroupedCounter = new Array(this.uniqueNotifications.length).fill('none');

        this.Notifications.forEach((notification) => {
          const trackNotification = notification.text;
          const index = this.uniqueNotifications.findIndex((n) => n.text === trackNotification);

          if (index !== -1) {
            this.groupedCounter[index]++;
            if (this.groupedCounter[index] > 1) {
              this.displayGroupedCounter[index] = 'block';
              this.cleanButton[index] = 'block';
              this.DisplayDismissButton[index] =  'none';
            } else {
              this.displayGroupedCounter[index] = 'none';
              this.cleanButton[index] = 'none';
            }
          }
        });
      },
  

      CleanGroupedNotification(index) {
        if (index >= 0 && index < this.uniqueNotifications.length) {
        const notificationToRemove = this.uniqueNotifications[index];

        const notificationsToRemove = this.Notifications.filter(notification => notification.text === notificationToRemove.text);

        notificationsToRemove.forEach(notification => {
        const notificationIndex = this.Notifications.findIndex(n => n.id === notification.id);

        if (notificationIndex !== -1) {
          this.Notifications.splice(notificationIndex, 1);
        } else {
          console.error("Notification not found in the array");
        }
      });

        // Clear related data
        this.groupedCounter.splice(index, 1);
        this.displayGroupedCounter.splice(index, 1);
        this.cleanButton.splice(index, 1);
        this.DisplayDismissButton.splice(index, 1);
      } else {
        console.error("Invalid index provided");
  }
},


  },

  mounted() {

  },

  beforeUnmount() {
  
  },

  components: {
    notificationIcon,
    closeButton,
    trashCanIco
  }
}


// =============== // dipslay element for unique id // =============//
// has to pass thge variable to the element in this case  selectedtId.DisplayDismissButton
//to change the property of this element using this wont work because you will be acessign 
// the element direcly
 //dismissNotification(targetId,) {
      
    //  const selectedtId = this.Notifications.find((notification) => notification.id === targetId);

    // if(selectedtId){
    // this.Notifications.splice(selectedtId, 1);
   //     selectedtId.DisplayDismissButton = 'none'
    // }else{
      //console.log('not founded');
     //}
    

  //},
      
      
</script>

