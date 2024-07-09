<template>
<section>
    <div class="PasswordElement">
       
        <div class="PassworDivision">
            
            <div class="InputPswdf">
                <h1 class="TitlePs">Senha {{ message }}</h1>
                <div class="PasswordIndicator">
                  <div class="PassowrdDETelem">
                    <input v-model="Password" class="PasswordIput" placeholder="ASKJH$%%$fwer686Fasd" @input="manualPasswordLengthUpdater" maxlength="30" type="text">
                    <autoTransmission :style="{fill: manualPass}" @click=ManualPassword></autoTransmission>
                  </div>
                     
                </div>
                <div class=DotIndicator>
                    <div class="DotWraper">
                        <div class="DIVdOT">
                            <div  :style="{backgroundColor: dotBackGround[0] }" class="PsswordIndicatroDots"></div><p>Caixa Alta</p>
                        </div>
                        <div class="DIVdOT">
                            <div :style="{backgroundColor: dotBackGround[1] }"  class="PsswordIndicatroDots"></div><p>Caixa Baixa</p>
                        </div>
                        <div class="DIVdOT">
                            <div :style="{backgroundColor: dotBackGround[2] }"  class="PsswordIndicatroDots"></div><p>Numeros</p>
                        </div>
                        <div class="DIVdOT">
                            <div  :style="{backgroundColor: dotBackGround[3] }"  class="PsswordIndicatroDots"></div><p>Caractere Especial</p>
                        </div>
                        <div  class="CoppyButtonDivision">
                        <button :style="{background: clipBoardButton, color: clipBoardButtonColor}"  @click="copyToClipboard" class="copyButton">{{ copy }}</button>
                        </div>
                    </div>
                    
                </div>
            </div>


            <div class="passwordMeeter">
            <PasswordStrengthMeter></PasswordStrengthMeter>
            </div>
        </div>
    </div>
</section>
</template>


<script>
import { mapState, mapMutations } from 'vuex';
import autoTransmission from '../icons/auto-Transmission.vue';
import PasswordStrengthMeter from '../PasswordCreat/password-strength.vue';

export default {
  computed: {
    ...mapState(['number', 'options']),
    reactiveNumber() {
      return this.number;
    },
    selectedCharacterSets() {
        const sets = [];
        if (this.options.uperCase) {
          sets.push(this.characterSets.UperCase);
        }
        if (this.options.lowerCase) {
          sets.push(this.characterSets.LowerCase);
        }
        if (this.options.Number) {
          sets.push(this.characterSets.Numbers);
        }
        if (this.options.specialCharacters) {
          sets.push(this.characterSets.SpecialCharacters);
        }

        // Only join sets if there is at least one set selected
        return sets.length > 0 ? sets.join('') : '';
      },
  },

  data() {
    return {
      message: 'Automatica',
      Password: '',
      passwordType: false,
      PasswordLength: this.reactiveNumber,
      characterSets: {
        UperCase: 'ABCDEFGHIJKLMNOPQRSTUVW',
        LowerCase: 'abcdefghijklmnopqrstuvwxyz',
        Numbers: '1234567890',
        SpecialCharacters: '!@#$%^&*():"><{}|\/?<>+=_-[].,"',
        manualPass: '',
        
      },
      dotBackGround: ['','','',''],
      copy: 'copiar',
      clipBoardButton: '',
      clipBoardButtonColor:  '',
    };
  },

  watch: {
  reactiveNumber(newVal) {
    this.PasswordLength = newVal;
    this.GenerateRamdomPassword();
    this.inputValue = newVal;
    this.passwordDotIdentifier();
  },
  selectedCharacterSets() {
    this.GenerateRamdomPassword();
    this.passwordDotIdentifier();
  },

},

  methods: {
    ...mapMutations(['setNumber', 'setPasswordControler']),

    GenerateRamdomPassword() {
      this.copy = 'copiar'
      this.passwordType = false;

      if (this.passwordType === false) {
        this.message = 'Automatica';
        this.manualPass = '';
      }


      const selectedCharacterSets = this.selectedCharacterSets;
      let passwordLength = this.PasswordLength;
      let randomString = '';

      if (selectedCharacterSets) {
        for (let i = 0; i < passwordLength; i++) {
          const randomIndex = Math.floor(Math.random() * selectedCharacterSets.length);
          randomString += selectedCharacterSets.charAt(randomIndex);
        }
      }

        this.Password = randomString;
        this.$store.commit('setPasswordMenager', this.Password);
    },
    

            ManualPassword() {
              this.passwordType = true;

              if (this.passwordType === true) {
                this.message = 'Manual';
                this.Password = '';
                this.manualPass = 'rgb(0, 195, 255)';
              }
            },



            passwordDotIdentifier(dotIndexElement, activeDotColor) {
                const sets = this.selectedCharacterSets.split('');
                const hasUpperCase = sets.some(set => /[A-Z]/.test(set));
                const hasLowerCase = sets.some(set => /[a-z]/.test(set));
                const hasSpecialCharactres = sets.some(set =>/[!-*]/.test(set));
                const hasNumbers = sets.some(set => /[0-9]/.test(set));

                if (this.dotBackGround[dotIndexElement] === activeDotColor) {
                    this.dotBackGround[dotIndexElement] = '';
                } else {
                    if (hasUpperCase) {
                        this.dotBackGround[0] = 'rgb(0, 195, 255)';
                    } else {
                        this.dotBackGround[0] = ''; 
                    }

                    
                    if (hasLowerCase) {
                        this.dotBackGround[1] = 'rgb(0, 195, 255)';
                    } else {
                        this.dotBackGround[1] = ''; 
                    }


                    if(hasNumbers){
                      this.dotBackGround[2] = 'rgb(0, 195, 255)';
                    } else{
                      this.dotBackGround[2] = '';
                    }


                    if(hasSpecialCharactres){
                      this.dotBackGround[3] = 'rgb(0, 195, 255)';
                    } else{
                      this.dotBackGround[3] = '';
                    }
                }
            },


            copyToClipboard() {
                  const textCopy = this.Password;

                  // Check if the password field is not empty
                  if (textCopy.trim() !== '') {
                    const blob = new Blob([textCopy], { type: 'text/plain' });

                    const clipboardItem = new ClipboardItem({ 'text/plain': blob });

                    navigator.clipboard.write([clipboardItem]).then(
                      () => {
                        this.copy = 'Copiado para transferencia';

                       
                      },

                      (error) => {
                        this.copy = 'Erro ao copiar' + error;
                      }
                    );
                  } else {
                    this.copy = 'Nenhuma senha gerada';

                    setTimeout(() => {
                      this.copy = 'Copiar'
                    }, 2000)
                  }
                }
                  },

  mounted() {
    this.GenerateRamdomPassword();
  },

  components: {
    autoTransmission,
    PasswordStrengthMeter,
  },
};
</script>