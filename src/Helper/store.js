// store.js
import { createStore } from 'vuex';
import { v4 as uuidv4 } from 'uuid';

export default createStore({
  state: {
    number: 0,
    options: {
      uperCase: false,
      specialCharacters: false,
      Number: false,
      lowerCase: false,
    },

    passwordMenager: '',
    origemData: [],
    displaySaveElement: false,
    notificationsMenager: [],
    itIsAnAlert: false,

    AccountData:{
      name: '',
      email: '',
      birthDate: '', 
      telNumber: '',
      password: ''
    },

    searchBarData: [],

    selectedData: []
    
  },
  mutations: {
    setNumber(state, newNumber) {
      state.number = newNumber;
    },


    setOptions(state, newOptions){
    state.options = newOptions;
  },

  setPasswordMenager(state, newPassword){
    state.passwordMenager = newPassword;
  },

  setOrigemData(state, newOrigemData){
    if(Array.isArray(newOrigemData)){
      state.origemData = newOrigemData;
    }else{
      //console.log('its not an array');
    }
    
  },

  setDisplaySaveElement(state, newDisplaySaveElement){
    state.displaySaveElement = newDisplaySaveElement;
  },

  setNotificationMenager(state, newNotificationMenager) {
  const itsAnObject = newNotificationMenager.every(item => typeof item === 'object')

    if(itsAnObject){
      newNotificationMenager.forEach(notification => {
        notification.id = uuidv4();
      });  
      }else{
        //console.log('not an objetc');
      }

    state.notificationsMenager = newNotificationMenager;
  },

  setItIsAnAlert(state, newItIsAnAlert){
    state.itIsAnAlert = newItIsAnAlert;
  },

  setnewAccountData(state, newAccountData ){
    state.AccountData = newAccountData;
  
  },

  setSearchBarData(state, newSearchBarData){
      state.searchBarData = newSearchBarData;
  },


  setSelectedData(state, newSelectedData){
    state.selectedData = newSelectedData;
  }

  },


  actions: {

  },

  modules:{

  }


});