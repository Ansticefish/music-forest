# Music Forest 音樂森林
## 專案緣起與介紹

![畫面render demo](./src/assets/README/screenshot-main.PNG)
<br>

此專案是我為了替親友慶生所製作的生日系列網站之一。在思考主題時想到了「音符」、「種植物」這兩個元素，將它們結合之後做出了能透過召喚雲朵種植植物、音樂會隨著種植物的次數產生變化的互動網站。

### [***點這裡看網站！](https://ansticefish.github.io/music-forest/#/)
<br>

## 技術與環境
這個專案使用Vue2製作而成，主要以資料的變動去帶動畫面的改變、音樂的播放等。<br>
RWD部分則採用相對單位設定元素的大小、定位，使畫面能隨著螢幕寬度彈性變化。

## 開發重點與設計
### 1. 透過事件帶動畫面更新
為了讓使用者感受到畫面的層層遞進，選擇將畫面與事件綁定，透過使用者主動點擊按鈕，一步一步render出最終畫面。聲音的部分也以同樣的邏輯設計，一次播放一部分樂曲，並搭配pop up中音符內容的變化，希望帶給使用者驚喜感。

![畫面render demo](./src/assets/README/demo.gif)

此外，為了讓網站更有互動性且更客製化，也設計顏色選擇面版。使用者可以依照喜歡的順序挑選顏色，網頁也會依照使用者所選的顏色渲染畫面。

![按鈕demo](./src/assets/README/color-demo.gif)
<br>

### 2. 音樂播放時機控制
為了讓音樂隨著事件觸發而播放，且每次播放不同曲目，選擇運用vue的資料帶動畫面特性，將audio的v-if和src與資料綁定，透過改變資料去控制音樂播放的時機點。舉例來說，當playMusic是true的時候，音樂會播放，當playMusic是false時，音樂則會停止。

```
<audio autoplay v-if="playMusic">
  <source :src="music" type="audio/mp3">
</audio>
```

此外，考量到行動端裝置對於audio延遲播放時間的限制，將最後一首歌曲的延遲播放時間限制在10秒之內，因此即使使用行動裝置，音樂也能正常播放。

```
setTimeout(() => {
  this.music = require('../assets/song-final.mp3')
  this.playMusic = true
  this.processing = true
}, 500) 
```

