<template>
  <div class="background">
    <div class="container">
      <p class="container__words">
        {{ content }}
      </p>
      <img class="container__img" :src="image" alt="">
      <div class="container__btn" @click="close" v-if="step !== 7"> SAVE </div>
      <div class="container__btn" @click="close" v-else> OK </div>
    </div>
  </div>
</template>

<script>
const data = [
  {
    content: '太謝謝你了！你知道嗎？每場雨都有不同音調，還能變成一首歌呢~好奇的話，就再多幫我們一點吧！',
    img: require('../assets/do.png'),
  },
  {
    content: '哇！這次下的是Re雨呢！難道這會是傳說中的DoReMe之歌嗎？',
    img: require('../assets/re.png'),
  },
  {
    content: '這次來的是Fa雨呢~聽出來這是什麼歌了嗎？偷偷告訴你這首歌跟今天有點關係呢！',
    img: require('../assets/fa.png'),
  },
  {
    content: '聽說這首歌是唱給珍貴的人聽的，你猜到是什麼歌了嗎？沒猜到也沒關係~森林還需要你幫忙多下一點雨呢！',
    img: require('../assets/me.png'),
  },
  {
    content: '哇！好大的地瓜啊！偷偷告訴你，這不是顆普通的地瓜~把下一種雲朵叫來之後，你就知道了！',
    img: require('../assets/so.png'),
  },
  {
    content: '嘿嘿~~是不是嚇到了啊！這可是這座森林裡才會出現的喔！想知道他的全貌的話，就再把最後的雲朵召來吧！',
    img: require('../assets/la.png'),
  },
  {
    content: '哇！真的太謝謝你了！最後最後，我們送了一首歌給你，也希望你能像今天的我們一樣，每天都遇到善良的人，每天幸福！',
    img: require('../assets/si.png'),
  }
]


export default {
  name: 'PopUp',
  props: {
    step: {
      type: Number,
    }
  },
  data () {
    return {
      content: data[this.step -1].content,
      image: data[this.step - 1].img,
      orange: true,
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
.background {
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: rgba(172, 138, 138, 0.6);
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .container {
    width: fit-content;
    background-color: rgb(198, 201, 192);
    border-radius: 14px;
    padding: 20px;
    &__words {
      width: 300px;
      color: rgb(248, 245, 245);
      line-height: 30px;
      font-size: 20px;
    }
    &__img {
      width: 100%;
      margin-top: 10px;
    }
    &__btn {
      margin-left: 70%;
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
</style>