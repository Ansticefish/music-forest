<template>
  <div class="home">
    <!-- Cloud & Rain -->
    <img class="home__cloud" v-if="rain" :src="cloud" alt="">
    <img class="home__rain" v-if="rain" :src="rainDrop" alt="">
    <!-- Plants -->
    <div class="home__plants">
      <img class="home__plants__one" v-if="currentStep > 0" :src="plants[0]" alt="">
      <img class="home__plants__two" v-if="currentStep > 1" :src="plants[1]" alt="">
      <div class="home__plants__rabbit">
        <img class="home__plants__rabbit__one" 
        v-if="currentStep > 2" 
        :src="plants[2]" alt="">
        <img class="home__plants__rabbit__two" 
        v-if="currentStep > 3" 
        :src="plants[3]" alt="">
        <div class="home__plants__rabbit__head">
           <img class="home__plants__rabbit__head__face" 
           v-if="currentStep > 4" 
           :src="plants[4]" alt="">
          <img class="home__plants__rabbit__head__expression" 
          v-if="currentStep > 5" 
          :src="plants[5]" alt="">
        </div>  
        <img class="home__plants__rabbit__five" 
        v-if="currentStep > 6" 
        :src="plants[6]" alt="">
      </div>
    </div>
    <!-- Snail & Soil -->
    <img class="home__snail" @dblclick="openButton" v-if="!processing"
    src="../assets/snail.png" alt="">
    <img class="home__soil" src="../assets/soil.png" alt="">
    <!-- Instruction -->
    <div class="home__instruction" v-if="openInstruction">
      連續點擊蝸牛兩下，就可以召喚七彩雲朵囉！
      <div class="home__instruction__btn" @click="closeInstruction"> OK </div>
    </div>
    <div class="home__btn" v-show="showBtn && !processing">
      <div :class="['home__btn__red', {'clicked': colorUsed.red.length} ]" @click.once="callRain('red')"></div>
      <div :class="['home__btn__orange', {'clicked': colorUsed.orange.length} ]" @click.once="callRain('orange')" ></div>
      <div :class="['home__btn__yellow', {'clicked': colorUsed.yellow.length} ]" @click.once="callRain('yellow')" ></div>
      <div :class="['home__btn__green', {'clicked': colorUsed.green.length} ]" @click.once="callRain('green')" ></div>
      <div :class="['home__btn__blue', {'clicked': colorUsed.blue.length} ]" @click.once="callRain('blue')" ></div>
      <div :class="['home__btn__lightb', {'clicked': colorUsed.lightb.length} ]" @click.once="callRain('lightb')" ></div>
      <div :class="['home__btn__purple', {'clicked': colorUsed.purple.length} ]" @click.once="callRain('purple')" ></div>
    </div>
    <PopUp v-if="openPopUp" :step="currentStep" @close="togglePopUp" />
    <audio autoplay v-if="playMusic">
      <source :src="music" type="audio/mp3">
    </audio>
  </div>
</template>

<script>
import PopUp from '../components/PopUp.vue'
const data = [
  {
    red: require('../assets/plant1-red.png'),
    orange: require('../assets/plant1-orange.png'),
    yellow: require('../assets/plant1-yellow.png'),
    green: require('../assets/plant1-green.png'),
    blue: require('../assets/plant1-blue.png'),
    lightb: require('../assets/plant1-lightb.png'),
    purple: require('../assets/plant1-purple.png'),
  },
  {
    red: require('../assets/plant2-red.png'),
    orange: require('../assets/plant2-orange.png'),
    yellow: require('../assets/plant2-yellow.png'),
    green: require('../assets/plant2-green.png'),
    blue: require('../assets/plant2-blue.png'),
    lightb: require('../assets/plant2-lightb.png'),
    purple: require('../assets/plant2-purple.png'),
  },
  {
    red: require('../assets/rabbit1-red.png'),
    orange: require('../assets/rabbit1-orange.png'),
    yellow: require('../assets/rabbit1-yellow.png'),
    green: require('../assets/rabbit1-green.png'),
    blue: require('../assets/rabbit1-blue.png'),
    lightb: require('../assets/rabbit1-lightb.png'),
    purple: require('../assets/rabbit1-purple.png'),
  },
  {
    red: require('../assets/rabbit2-red.png'),
    orange: require('../assets/rabbit2-orange.png'),
    yellow: require('../assets/rabbit2-yellow.png'),
    green: require('../assets/rabbit2-green.png'),
    blue: require('../assets/rabbit2-blue.png'),
    lightb: require('../assets/rabbit2-lightb.png'),
    purple: require('../assets/rabbit2-purple.png'),
  },
  {
    red: require('../assets/rabbit3-red.png'),
    orange: require('../assets/rabbit3-orange.png'),
    yellow: require('../assets/rabbit3-yellow.png'),
    green: require('../assets/rabbit3-green.png'),
    blue: require('../assets/rabbit3-blue.png'),
    lightb: require('../assets/rabbit3-lightb.png'),
    purple: require('../assets/rabbit3-purple.png'),
  },
  {
    red: require('../assets/rabbit4-red.png'),
    orange: require('../assets/rabbit4-orange.png'),
    yellow: require('../assets/rabbit4-yellow.png'),
    green: require('../assets/rabbit4-green.png'),
    blue: require('../assets/rabbit4-blue.png'),
    lightb: require('../assets/rabbit4-lightb.png'),
    purple: require('../assets/rabbit4-purple.png'),
  }, 
  {
    red: require('../assets/rabbit5-red.png'),
    orange: require('../assets/rabbit5-orange.png'),
    yellow: require('../assets/rabbit5-yellow.png'),
    green: require('../assets/rabbit5-green.png'),
    blue: require('../assets/rabbit5-blue.png'),
    lightb: require('../assets/rabbit5-lightb.png'),
    purple: require('../assets/rabbit5-purple.png'),
  },
  {
    red: require('../assets/cloud-red.png'),
    orange: require('../assets/cloud-orange.png'),
    yellow: require('../assets/cloud-yellow.png'),
    green: require('../assets/cloud-green.png'),
    blue: require('../assets/cloud-blue.png'),
    lightb: require('../assets/cloud-lightb.png'),
    purple: require('../assets/cloud-purple.png'),
  },
  {
    red: require('../assets/rain-red.png'),
    orange: require('../assets/rain-orange.png'),
    yellow: require('../assets/rain-yellow.png'),
    green: require('../assets/rain-green.png'),
    blue: require('../assets/rain-blue.png'),
    lightb: require('../assets/rain-lightb.png'),
    purple: require('../assets/rain-purple.png'),
  },
  {
    0: require('../assets/song-do.mp3'),
    1: require('../assets/song-re.mp3'),
    2: require('../assets/song-fa.mp3'),
    3: require('../assets/song-me.mp3'),
    4: require('../assets/song-so.mp3'),
    5: require('../assets/song-la.mp3'),
    6: require('../assets/song-si.mp3'),
  },
]

export default {
  name: 'Home',
  components: {
    PopUp,
  },
  data () {
    return {
      currentStep: 0,
      rain: false,
      plants: [ '', '', '', '', '', '', ''],
      cloud: 0,
      rainDrop: 0,
      music: 0,
      showBtn: false,
      openInstruction: true,
      openPopUp: false,
      processing: false,
      playMusic: false,
      colorUsed: {
        'red': '', 'orange': '', 'yellow': '',
        'green': '', 'blue': '', 'lightb': '', 'purple': ''
      }
    }
  },
  methods: {
    closeInstruction() {
      this.openInstruction = false
    },
    openButton () {
      this.showBtn = !this.showBtn
    },
    togglePopUp () {
      this.openPopUp = !this.openPopUp
      this.playMusic = false 
      this.processing = false
      if (this.currentStep === 7) {
        this.rain = true
        this.rainDrop = ''
        this.cloud = require('../assets/cloud-final.png')
        setTimeout(() => {
          this.music = require('../assets/song-final.mp3')
          this.playMusic = true
        }, 500) 
        this.processing = true
      }
    },
    callRain(color) {
      this.processing = true
      this.rain = true
      setTimeout(() => {
        this.currentStep += 1
      }, 500)
      this.cloud = data[7][color]
      this.rainDrop = data[8][color]
      this.colorUsed[color] = 'true'
      this.plants[this.currentStep] = data[this.currentStep][color]
      this.music = data[9][this.currentStep]
      this.playMusic = true
      this.stopRain()
    },
    stopRain() {
      setTimeout(() => {
        this.rain = false
        this.openPopUp = !this.openPopUp
      }, 3000)
    },
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100vw;
  max-width: 1000px;
  height: 100vh;
  margin: 0 auto;
  overflow: hidden;
  &__cloud {
    position: absolute;
    top: 0;
    width: 100%;
  }
  &__rain {
    position: absolute;
    width: 100%;
  }
  &__plants {
    position: absolute;
    bottom: 15px;
    left: 12%;
    width: 100%;
    display: flex;
    align-items: flex-end;
    &__one {
      margin-bottom: 10%;
      width: 20%;
    }
    &__two {
      margin-bottom: 10%;
      width: 10%;
    }
    &__rabbit {
      margin-bottom: 5%;
      width: 50%;
      max-width: 300px;
      &__one {
        width: 45%;
      }
      &__two {
        margin-left: -5%;
        width: 25%;
      }
      &__head {
        position: relative;
        margin-top: -15%;
        width: 70%;
        &__face {
          width: 100%;
        }
        &__expression {
          position: absolute;
          left: 25%;
          top: 25%;
          width: 60%;
        }
      }
      &__five {
        margin-top: -15%;
        width: 100%;
      }
    }
  }
  &__snail {
    position: absolute;
    bottom: 10%;
    right: 3%;
    width: 15%;
    max-width: 150px;
    z-index: 1;
    cursor: pointer;
  }
  &__soil {
    position: absolute;
    bottom: 0;
    width: 100%;
    max-height: 230px;
  }
  &__instruction {
    margin: 250px auto;
    background-color: rgba(230, 153, 112, 0.7);
    border-radius: 14px;
    padding: 20px;
    width: 300px;
    color: rgb(248, 245, 245);
    line-height: 30px;
    font-size: 20px;
    &__btn {
      margin-left: 75%;
      margin-top: 15px;
      width: fit-content;
      padding: 8px 15px;
      background-color: rgb(205, 102, 102);
      border-radius: 25px;
      cursor: pointer;
      color: white;
      font-size: 25px;
      &:hover {
        opacity: 0.5;
        transition: opacity 1s;
      }
    }
  }
  &__btn {
    position: absolute;
    bottom: 20%;
    right: 3%;
    border: 3px solid rgb(224, 158, 158);
    border-radius: 15px;
    background-color: rgb(240, 220, 220);
    display: grid;
    grid-template-columns: repeat(2, auto);
    grid-template-rows: repeat(4, auto);
    grid-gap: 8px; 
    padding: 8px;
    & div {
      width: 10vw;
      height: 10vw;
      max-width: 100px;
      max-height: 100px;
      background-color: rgba(204, 170, 170, 0.2);
      border-radius: 15px;
      background-size: cover;
      cursor: pointer;
      &:hover {
        opacity: 0.2;
        transition: opacity 0.5s;
      }
      &.clicked {
        opacity: 0.15;
        cursor: default;
      }
    }
    &__red {
      background-image: url('../assets/btn-red.png');
    }
    &__orange {
      background-image: url('../assets/btn-orange.png');
    }
    &__yellow {
      background-image: url('../assets/btn-yellow.png');
    }
    &__green {
      background-image: url('../assets/btn-green.png');
    }
    &__blue {
      background-image: url('../assets/btn-blue.png');
    }
    &__lightb {
      background-image: url('../assets/btn-lightb.png');
    }
    &__purple {
      background-image: url('../assets/btn-purple.png');
    }
  }
}
</style>