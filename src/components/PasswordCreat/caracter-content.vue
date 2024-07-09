<template>
    <div class="CaracterSelectorElement">
      <div class="CaractereSelector">
        <p>Selecionar Tipos de Caracteres</p>
      </div>
      <div>
        <div class="DotSelector">
          <div class="PlacementDotselector">
            <p class="textIndicator">CC</p>
            <div class="DotBorder" :style="{border: DotBorder[0]}">
               <div :style="{ background: DotBackground[0] }" @click="toggleColor(0, 'rgb(0, 195, 255)')" class="DotElementSelector"></div>
            </div>
          </div>
  
          <div class="PlacementDotselector">
            <div class="DotBorder" :style="{border: DotBorder[1]}">
               <div :style="{ background: DotBackground[1] }" @click="toggleColor(1, 'rgb(0, 195, 255)')" class="DotElementSelector"></div>
            </div>
            <p class="textIndicator">%$</p>
          </div>
        </div>
  
        <div class="DotSelector">
          <div class="PlacementDotselector">
            <p class="textIndicator">12</p>
            <div class="DotBorder" :style="{border: DotBorder[2]}">
               <div :style="{ background: DotBackground[2] }" @click="toggleColor(2, 'rgb(0, 195, 255)')" class="DotElementSelector"></div>
            </div>
           
          </div>
          <div class="PlacementDotselector">
            <div class="DotBorder" :style="{border: DotBorder[3]}">
               <div :style="{ background: DotBackground[3] }" @click="toggleColor(3, 'rgb(0, 195, 255)')" class="DotElementSelector"></div>
            </div>
           
            <p class="textIndicator">Cc</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { mapState, mapMutations } from 'vuex';

  export default {
    computed: {
      ...mapState(['options']),
    },

    data() {
      return {
        DotBackground: ['', '', '', ''],
        DotBorder: ['', '', '', ''],
      };
    },

    methods: {
      ...mapMutations(['setOptions']), // Update the mutation name

          toggleColor(dotIndex, activeColor) {
            const updatedOptions = { ...this.options }; // Copy options object

            if (this.DotBackground[dotIndex] === activeColor) {
              this.DotBackground[dotIndex] = '';
              // Set only the specific option to false
              switch (dotIndex) {
                case 0:
                  updatedOptions.uperCase = false;
                  this.DotBorder[0] = '';
                  break;
                case 1:
                  updatedOptions.specialCharacters = false;
                  this.DotBorder[1] = '';
                  break;
                case 2:
                  updatedOptions.Number = false;
                  this.DotBorder[2] = '';
                  break;
                case 3:
                  updatedOptions.lowerCase = false;
                  this.DotBorder[3] = '';
                  break;
              }
                } else {
                  this.DotBackground[dotIndex] = activeColor;
                  // Set only the specific option to true
                  switch (dotIndex) {
                    case 0:
                      updatedOptions.uperCase = true;
                      this.DotBorder[0] = '2px solid rgb(0, 195, 255)';
                      break;
                    case 1:
                      updatedOptions.specialCharacters = true;
                      this.DotBorder[1] = '2px solid rgb(0, 195, 255)';
                      break;
                    case 2:
                      updatedOptions.Number = true;
                      this.DotBorder[2] = '2px solid rgb(0, 195, 255)';
                      break;
                    case 3:
                      updatedOptions.lowerCase = true;
                      this.DotBorder[3] = '2px solid rgb(0, 195, 255)';
                      break;
                  }
                }

            this.setOptions(updatedOptions);
            //console.log('Options after toggle:', this.options);
          },
    },
  };
</script>