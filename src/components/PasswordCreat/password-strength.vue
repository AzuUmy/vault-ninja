<template>
    <section>
      <div class="MeeterComponenets">
        <div>
          <p class="TituleIndicator">Força da Senha</p>
        </div>
  
        <div class="PasswordStrengthMeeter">
          <div class="cirles">
            <svg class="Svegement" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
              <!-- Define a clipping path to cut the bottom half -->
              <defs>
                <clipPath id="halfCircleClip">
                  <rect width="300" height="150" />
                </clipPath>
              </defs>
  
              <!-- Apply the clipping path to the outer circle -->
              <circle @click="teste" class="outCirclee" cx="150" cy="150" r="150" fill="url(#multiColorGradient)" clip-path="url(#halfCircleClip)"></circle>
  
              <!-- Apply the clipping path to the inner circle -->
              <circle class="innerCirclee" cx="150" cy="150" r="100" fill="#ffffff" clip-path="url(#halfCircleClip)"></circle>
  
              <!-- Gradient Definition -->
              <linearGradient id="multiColorGradient" x1="30%" y1="75%" x2="100%" y2="50%" >
                <stop :offset="stopOffsets[0]" :style="'stop-color: ' + gradientColors[0]" />
                <stop :offset="stopOffsets[1]" :style="'stop-color: ' + gradientColors[1]" />
                <stop :offset="stopOffsets[2]" :style="'stop-color: ' + gradientColors[2]" />
                <stop :offset="stopOffsets[3]" :style="'stop-color: ' + gradientColors[3]" />
                <stop :offset="stopOffsets[4]" :style="'stop-color: ' + gradientColors[3]" />
                <stop :offset="stopOffsets[5]" :style="'stop-color: ' + gradientColors[3]" />
              </linearGradient>
            </svg>
          </div>

          <div class="HideInperfection"></div>
        </div>
  

            <div>
                <div :style="{top: IndicatorTop, left: IndicatorLeft, rotate: IndicatorRotation}" class="IndicatorElement">
                    <div class="Indicator">
                        <p :style="{color: fontColor}">{{ indicator }}</p>
                    </div>

                </div>
            </div>
        <div class="Desc">
          <div class="Description-Element">
            <div>
              <p>Fraco</p>
            </div>
            <div>
              <p>Forte</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    computed: {
      passwordFromStore() {
        return this.$store.state.passwordMenager;
      },

      hasLowerCase() {
        return /[a-z]/.test(this.passwordFromStore);
      },

      hasUperCase(){
        return /[A-Z]/.test(this.passwordFromStore);
      },

      hasNumber(){
        return /[0-9]/.test(this.passwordFromStore);
      },

      hasEspecialCharacteres(){
        return /[!-*]/.test(this.passwordFromStore);
      }
    },

    data() {
      return {
        gradientColors: [
          'rgb(221, 221, 221)',
          'rgb(221, 221, 221)',
          'rgb(221, 221, 221)',
          'rgb(221, 221, 221)',
          'rgb(221, 221, 221)',
          'rgb(221, 221, 221)',
        ],
        stopOffsets: ['0%', '20%', '70%', '70%', '100%', '20%'],
        newStrength: '',
        indicator: '',
        IndicatorTop: '',
        IndicatorLeft: '',
        IndicatorRotation: '',
        fontColor: '',
      };
    },

    watch: {
      passwordFromStore(newValue) {
        this.passowrdStrenthMeter();
      },
    },

    methods: {


      passowrdStrenthMeter() {
        this.newStrength = this.passwordFromStore;

        if(this.newStrength === ''){
          this.gradientColors = [
            'rgb(221, 221, 221)',
            'rgb(221, 221, 221)',
            'rgb(221, 221, 221)',
            'rgb(221, 221, 221)',
            'rgb(221, 221, 221)',
            'rgb(221, 221, 221)',
          ];
          this.IndicatorTop = '';
          this.IndicatorLeft = '';
          this.IndicatorRotation = '';
          this.fontColor = '';
          this.indicator = 'Fraco'
        }


        if((this.hasUperCase || this.hasLowerCase || this.hasNumber || this.hasEspecialCharacteres) && this.newStrength.length <= 30){
          this.gradientColors = 
                  ['rgb(255, 0, 68)',
                  'rgb(221, 221, 221)',
                  'rgb(221, 221, 221)',
                  'rgb(221, 221, 221)',
                  'rgb(221, 221, 221)',
                  'rgb(221, 221, 221)',
                ];
                this.IndicatorTop = '-140px';
                this.IndicatorLeft = '15px'
                this.IndicatorRotation = '55deg'
                this.fontColor = 'rgb(255, 0, 81)';
                this.indicator = 'Fraco'
      }

        if(this.hasUperCase && this.hasLowerCase && this.newStrength.length >= 15){
          this.gradientColors = 
                  ['rgb(255, 213, 0)', 
                  'rgb(255, 213, 0)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)' 
                ]; 

                this.IndicatorTop = '-135px';
                this.IndicatorLeft = '31px'
                this.IndicatorRotation = '90deg'
                this.fontColor = 'rgb(255, 153, 0)';
                this.indicator = 'Medio'
      }

        if(this.hasUperCase && this.hasNumber && this.newStrength.length >=15){
          this.gradientColors = 
                  ['rgb(255, 213, 0)', 
                  'rgb(255, 213, 0)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)' 
                ]; 
                
                this.IndicatorTop = '-135px';
                this.IndicatorLeft = '31px'
                this.IndicatorRotation = '90deg'
                this.fontColor = 'rgb(255, 153, 0)';
                this.indicator = 'Medio'
        }

        if(this.hasLowerCase && this.hasNumber && this.newStrength.length >=15){
              this.gradientColors = 
                  ['rgb(255, 213, 0)', 
                  'rgb(255, 213, 0)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)' 
                ]; 
                
                this.IndicatorTop = '-135px';
                this.IndicatorLeft = '31px'
                this.IndicatorRotation = '90deg'
                this.fontColor = 'rgb(255, 153, 0)';
                this.indicator = 'Medio'
        }



        if(this.hasEspecialCharacteres && this.hasNumber && this.newStrength.length >= 15){
          this.gradientColors = 
                  ['rgb(255, 213, 0)', 
                  'rgb(255, 213, 0)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)' 
                ]; 
                
                this.IndicatorTop = '-135px';
                this.IndicatorLeft = '31px'
                this.IndicatorRotation = '90deg'
                this.fontColor = 'rgb(255, 153, 0)';
                this.indicator = 'Medio'
        }

        if(this.hasLowerCase && this.hasEspecialCharacteres && this.newStrength.length >= 15){
          this.gradientColors = 
                  ['rgb(255, 213, 0)', 
                  'rgb(255, 213, 0)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)' 
                ]; 
                
                this.IndicatorTop = '-135px';
                this.IndicatorLeft = '31px'
                this.IndicatorRotation = '90deg'
                this.fontColor = 'rgb(255, 153, 0)';
                this.indicator = 'Medio'
        }

        if(this.hasUperCase && this.hasEspecialCharacteres && this.newStrength.length >=15){
          this.gradientColors = 
                  ['rgb(255, 213, 0)', 
                  'rgb(255, 213, 0)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)', 
                  'rgb(221, 221, 221)' 
                ]; 
                
                this.IndicatorTop = '-135px';
                this.IndicatorLeft = '31px'
                this.IndicatorRotation = '90deg'
                this.fontColor = 'rgb(255, 153, 0)';
                this.indicator = 'Medio'
        }

         if(this.hasUperCase && this.hasLowerCase  && this.hasEspecialCharacteres && this.newStrength.length >=15){
          
          this.gradientColors = [
                    'rgb(0, 195, 255)',
                    'rgb(0, 195, 255)',
                    'rgb(0, 195, 255)',
                    'rgb(0, 195, 255)',
                    'rgb(1, 255, 86)',
                    'rgb(1, 255, 86)',
                  ];

                  this.IndicatorTop = '';
                  this.IndicatorLeft = '230px'
                  this.IndicatorRotation = ''
                  this.fontColor = 'rgb(0, 132, 255)';
                  this.indicator = 'Forte'
             }

             if(this.hasUperCase && this.hasEspecialCharacteres && this.hasNumber && this.newStrength.length >= 15){
              this.gradientColors = [
                    'rgb(0, 195, 255)',
                    'rgb(0, 195, 255)',
                    'rgb(0, 195, 255)',
                    'rgb(0, 195, 255)',
                    'rgb(1, 255, 86)',
                    'rgb(1, 255, 86)',
                  ];

                  this.IndicatorTop = '';
                  this.IndicatorLeft = '230px'
                  this.IndicatorRotation = ''
                  this.fontColor = 'rgb(0, 132, 255)';
                  this.indicator = 'Forte'
             }
        

             if(this.hasLowerCase && this.hasEspecialCharacteres && this.hasNumber && this.newStrength.length >= 15){
              this.gradientColors = [
                    'rgb(0, 195, 255)',
                    'rgb(0, 195, 255)',
                    'rgb(0, 195, 255)',
                    'rgb(0, 195, 255)',
                    'rgb(1, 255, 86)',
                    'rgb(1, 255, 86)',
                  ];

                  this.IndicatorTop = '';
                  this.IndicatorLeft = '230px'
                  this.IndicatorRotation = ''
                  this.fontColor = 'rgb(0, 132, 255)';
                  this.indicator = 'Forte'
             }
        

        if(this.hasUperCase && this.hasLowerCase && this.hasNumber && this.newStrength.length >= 15){
        this.gradientColors = [
                    'rgb(0, 195, 255)',
                    'rgb(0, 195, 255)',
                    'rgb(0, 195, 255)',
                    'rgb(0, 195, 255)',
                    'rgb(1, 255, 86)',
                    'rgb(1, 255, 86)',
                  ];

                  this.IndicatorTop = '';
                  this.IndicatorLeft = '230px'
                  this.IndicatorRotation = ''
                  this.fontColor = 'rgb(0, 132, 255)';
                  this.indicator = 'Forte'
              }

      },


    },

    mounted() {
      this.passowrdStrenthMeter();
    },

    components: {},
  };
</script>

