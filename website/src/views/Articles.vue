<template>

  <div class="articles-container" width="100vw">
    <a-layout>
      <a-layout-header class="header">
        <h1 style="padding:24px;">文章列表</h1>
        <a-button type="primary" style="margin-left:24px;" href="/articles/create"><icon-pen
            style="margin-right: 5px;" /> 新增文章</a-button>
      </a-layout-header>
      <a-layout-content class="content">
        <a-row width="100vw" justify="center">
          <a-col flex="3" class="list">
            <a-list class="list-demo-action-layout" :bordered="false" :data="dataSource"
              :pagination-props="paginationProps" >
              <template #header>
                文章
              </template>
              <template #item="{ item }">
                <a-list-item class="list-demo-item" action-layout="vertical">
                  <template #actions>
                    <span><icon-user /> {{ item.author }} </span>
                    <!--<span><icon-heart />83</span>-->
                    <!--<span><icon-star />{{ item.index }}</span>-->
                    <!--<span><icon-message />Reply</span>-->
                  </template>
                  <template #extra>
                    <div class="image-area">
                      <img alt="arco-design" :src="item.imageSrc" />
                    </div>
                  </template>
                  <a-list-item-meta>
                    <template #title>
                      <a-link :href="`/articles/read/${item.id}`">
                        <h2>{{ item.title }}</h2>
                      </a-link>
                    </template>
                  </a-list-item-meta>
                </a-list-item>
              </template>
            </a-list>
          </a-col>
          <a-col class="right-col" flex="1" padding="24px">
            <a-card title="隨機推薦文章">
              <a-card hoverable :style="{ marginBottom: '20px' }">
                <div :style="{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }">
                  <span :style="{ display: 'flex', alignItems: 'center', color: '#1D2129' }">

                    <a-typography-text>{{ randomArticle.title }}</a-typography-text>
                  </span>
                  <a-link :href="`/articles/read/${randomArticle.id}`">More</a-link>
                </div>
              </a-card>
            </a-card>
          </a-col>
        </a-row>
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import { reactive, ref, onMounted, computed } from 'vue'
import axios from 'axios'

const paginationProps = reactive({
  defaultPageSize: 10,
  total: 0 // 初始时设置为 0
});

// 定义一个异步函数以获取数据
const fetchUserData = async (dataSource) => {
  try {
    const postData = {};
    const response = await axios.post('/api/getArticles', postData);

    dataSource.value = response.data;
    console.log(response.data);
    // 更新 paginationProps 的 total 属性
    paginationProps.total = response.data.length;
  } catch (error) {
    console.error('获取文章信息时出错:', error);
  }
};

// 调用函数
export default {
  name: 'Articles',
  setup() {
    const dataSource = ref([]); // 获取随机文章的方法
    const getRandomArticle = (source) => {
      if (source.length === 0) return {}; // 如果没有文章，返回空对象
      const randomIndex = Math.floor(Math.random() * source.length);
      return source[randomIndex];
    };

    const randomArticle = computed(() => {
      return getRandomArticle(dataSource.value);
    });
    //fetchUserData(dataSource);
    onMounted(async () => {
      await fetchUserData(dataSource);
    });
    return {
      dataSource,
      paginationProps,
      randomArticle
    }
  }
};
</script>
<style scoped>
.header {
  margin-top: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px;
  padding-top: 84px;
  height: 50vh;
  background-image: url('/pictures/Elysia1.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
  overflow-x: hidden;
}

.list {
  padding: 48px;
}

.content {
  background-image: url('/pictures/Elysia.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  background-attachment: fixed;
}

.right-col {
  margin-top: 0px;
  padding-right: 48px;
  padding-top: 48px;
}

.list-demo-action-layout .image-area {
  width: 160px;
  height: 100px;
  border-radius: 2px;
  overflow: hidden;

}

.list-demo-action-layout .list-demo-item {
  padding: 20px 0;
  border-bottom: 1px solid var(--color-fill-3);
}

.list-demo-action-layout .image-area img {
  width: 100%;
}

.list-demo-action-layout .arco-list-item-action .arco-icon {
  margin: 0 4px;
}

.articles-container {
  position: relative;
  width: 100%;
  padding: 0px;
  margin-top: -60px;
  overflow: hidden;
}

.list-demo-action-layout {
  background-color: rgb(255, 255, 255);
  border-radius: 2px;
  padding-bottom: 24px;
}

@media (max-width: 800px) {
  .list-demo-action-layout .image-area {
    width: 101px;
    height: 62px;
  }

  .articles-container {
    padding: 0;
  }

  .right-col {
    display: none;
  }
}
</style>