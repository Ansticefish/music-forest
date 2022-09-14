<template>
  <div class="home">
    <!-- Cloud & Rain -->
    <img class="home__cloud" v-if="rain" :src="cloud" alt="">
    <img class="home__rain" v-if="rain" :src="rainDrop" alt="">
    <!-- Plants -->
    <div class="home__plants">
      <img class="home__plants__one" v-if="currentStep > 0" src="../assets/plant1.png" alt="">
      <img class="home__plants__two" v-if="currentStep > 1" src="../assets/plant2.png" alt="">
      <div class="home__plants__rabbit">
        <img class="home__plants__rabbit__one" 
        v-if="currentStep > 2" 
        src="../assets/rabbit1.png" alt="">
        <img class="home__plants__rabbit__two" 
        v-if="currentStep > 3" 
        src="../assets/rabbit2.png" alt="">
        <div class="home__plants__rabbit__head">
           <img class="home__plants__rabbit__head__face" 
           v-if="currentStep > 4" 
           src="../assets/rabbit3.png" alt="">
          <img class="home__plants__rabbit__head__expression" 
          v-if="currentStep > 5" 
          src="../assets/rabbit4.png" alt="">
        </div>  
        <img class="home__plants__rabbit__five" 
        v-if="currentStep > 6" 
        src="../assets/rabbit5.png" alt="">
      </div>
    </div>
    <img class="home__snail" @dblclick="callClouds" v-if="!processing"
    src="../assets/snail.png" alt="">
    <img class="home__soil" src="../assets/soil.png" alt="">
    <div class="home__instruction" v-if="openInstruction">
      連續點擊蝸牛兩下，就可以召喚七彩雲朵囉！
      <div class="home__instruction__btn" @click="closeInstruction"> OK </div>
    </div>
    <PopUp v-if="openPopUp" :step="currentStep" @close="togglePopUp"/>
    <audio autoplay v-if="playMusic">
      <source :src="music" type="audio/mp3">
    </audio>
  </div>
</template>

<script>
import PopUp from '../components/PopUp.vue'

export default {
  name: 'Home',
  components: {
    PopUp,
  },
  data () {
    return {
      currentStep: 0,
      rain: false,
      cloud: 0,
      rainDrop: 0,
      music: 0,
      openInstruction: true,
      openPopUp: false,
      processing: false,
      playMusic: false,
    }
  },
  methods: {
    callClouds () {
      this.processing = true
      this.rain = true
      setTimeout( () => {
        this.currentStep += 1
      }, 500 )
      switch (this.currentStep) {
        case 0:
          this.cloud = require('../assets/cloud-blue.png')
          this.rainDrop = require('../assets/rain-blue.png')
          this.music = require('../assets/song-do.mp3')
          this.playMusic = true
          this.stopRain()
          break;
        case 1:
          this.cloud = require('../assets/cloud-purple.png')
          this.rainDrop = require('../assets/rain-purple.png')
          this.music = require('../assets/song-re.mp3')
          this.playMusic = true
          this.stopRain()
          break;
        case 2:
          this.cloud = require('../assets/cloud-red.png')
          this.rainDrop = require('../assets/rain-red.png')
          this.music = require('../assets/song-fa.mp3')
          this.playMusic = true
          this.stopRain()
          break;
        case 3:
          this.cloud = require('../assets/cloud-orange.png')
          this.rainDrop = require('../assets/rain-orange.png')
          this.music = require('../assets/song-me.mp3')
          this.playMusic = true
          this.stopRain()
          break;
        case 4:
          this.cloud = require('../assets/cloud-yellow.png')
          this.rainDrop = require('../assets/rain-yellow.png')
          this.music = require('../assets/song-so.mp3')
          this.playMusic = true
          this.stopRain()
          break;
        case 5:
          this.cloud = require('../assets/cloud-green.png')
          this.rainDrop = require('../assets/rain-green.png')
          this.music = require('../assets/song-la.mp3')
          this.playMusic = true
          this.stopRain()
          break;
        case 6:
          this.cloud = require('../assets/cloud-lightb.png')
          this.rainDrop = require('../assets/rain-lightb.png')
          this.music = require('../assets/song-si.mp3')
          this.playMusic = true
          this.stopRain()
          break;
      }
    },
    stopRain () {
      setTimeout(() => {
        this.rain = false
        this.openPopUp = !this.openPopUp
        this.processing = false
      }, 3000)  
    },
    togglePopUp () {
      this.openPopUp = !this.openPopUp
      this.playMusic = false 
      if (this.currentStep === 7) {
        this.rain = true
        this.rain = true
        this.cloud = require('../assets/cloud-final.png')
        setTimeout(() => {
          this.music = require('../assets/song-final.mp3')
          this.playMusic = true
        }, 1500) 
        this.processing = true
      }
    },
    closeInstruction () {
      this.openInstruction = false
    }
  }
}
</script>

<style lang="scss" scoped>
.home {
  position: relative;
  width: 100vw;
  height: 100vh;
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
    left: 15px;
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
    width: 10%;
    z-index: 1;
    cursor: pointer;
  }
  &__soil {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
  &__instruction {
    margin: 55% auto;
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
    }
  }
}
</style>