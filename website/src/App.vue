<script setup>
import MobileNavBar from './components/MobileNavBar.vue';
import NavBar from './components/NavBar.vue'
import { Howl, Howler} from 'howler';
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
const musics = ['/musics/A Song For Beloved.mp3','/musics/Elysia.mp3', '/musics/Seele.mp3','/musics/Φ².mp3']
shuffle(musics)
var sound = new Howl({
      src: musics,
      autoplay: true,
      loop: true,
      volume: 0.5,
    });
    sound.play();
</script>
<script>
import zhTW from '@arco-design/web-vue/es/locale/lang/zh-tw';

export default {
  data() {
    return {
      zhTW,
    };
  }, components: {
    NavBar,
    MobileNavBar,
  },
  methods: {
    mute(message) {
      if (message) {
        Howler.volume(0);
      } else {
        Howler.volume(0.5);
      }
      console.log(message); // 输出: Hello from child!
    }
  }

}
</script>

<template>
  <a-config-provider :locale="zhTW">
    <div class="layout">
      <header>
        <NavBar class="desktop-nav" @mute="mute"/>
        <MobileNavBar class="mobile-nav" @mute="mute"/>
      </header>
      <div class="content"><router-view /></div>
    </div>
  </a-config-provider>
</template>

<style scoped>
.layout {
  width: 100%;
  overflow-x: hidden;
  padding: 0px;
  position-anchor: left top;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.header {
  position: absolute;
  width: 100%;
}

.content {
  position: relative;
  margin: 0 auto;
  margin-top: 60px;
  width: 100vw;
}

@media (min-width: 801px) {
  .mobile-nav {
    display: none;
  }
}

@media (max-width: 800px) {
  .desktop-nav {
    display: none;
  }
}
</style>
