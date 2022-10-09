<template>
  <div class="opening">
    <div class="opening__intro">
      <img class="opening__intro__img" src="../assets/opening.png" alt="">
      <p class="opening__intro__words">
        土壤好乾啊！好心的訪客，快幫我們把七彩雲朵叫來吧！
      </p>
      <div class="opening__intro__btn" @click="toHome">
        <h1>GO!</h1>
      </div>
    </div>
    <img class="opening__snail" src="../assets/snail.png" alt="">
    <img class="opening__soil" src="../assets/soil.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'Opening',
  methods: {
    toHome () {
      this.$router.push('/home')
    }
  }
}
</script>

<style lang="scss" scoped>
.opening {
  position: relative;
  width: 100vw;
  max-width: 1000px;
  height: 89.5vh;
  box-sizing: border-box;
  margin: 0px auto;
  &__intro {
    position: relative;
    box-sizing: border-box;
    margin: 100px auto;
    width: 95%;
    max-width: 500px;
    height: fit-content;
    &__img {
      width: 100%;
    }
    &__words {
      position: absolute;
      top: 35%;
      left: 20%;
      width: 64%;
      color: rgb(147, 83, 83);
      line-height: 35px;
      font-size: 25px;
    }
    &__btn {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 40%;
      height: 35%;
      background-image: url(../assets/opening-btn.png);
      background-size: contain;
      background-repeat: no-repeat;
      background-position-y: bottom;
      background-position-x: right;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      &:hover {
        transform: scale(110%);
        transition: all 1s;
      }
      h1 {
        color: white;
        font-size: 35px;
      }
    }
  }
  &__snail {
    position: absolute;
    bottom: 6%;
    right: 3%;
    width: 30%;
    max-width: 250px;
    z-index: 1;
  }
  &__soil {
    position: absolute;
    bottom: 0;
    width: 100%;
  }
}
</style>