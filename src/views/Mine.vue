<template>
  <main class="page">
    <section class="profile card">
      <div class="avatar">🍳</div>
      <div>
        <h1>我的厨房</h1>
        <p>每天认真吃饭</p>
      </div>
    </section>

    <section class="stats">
      <div class="card">
        <strong>{{ total }}</strong>
        <span>菜品库</span>
      </div>
      <div class="card">
        <strong>{{ favoriteCount }}</strong>
        <span>收藏菜</span>
      </div>
      <div class="card">
        <strong>3</strong>
        <span>主打菜系</span>
      </div>
    </section>

    <section class="menu card">
      <button @click="goFavorites"><span>❤️ 我的收藏</span><i>›</i></button>
      <button @click="$router.push('/cart')"><span>🛒 今日菜单</span><i>›</i></button>
      <button><span>🥗 饮食偏好</span><i>清淡 / 香辣 / 麻辣</i></button>
      <button><span>📅 本周菜单</span><i>开发中</i></button>
    </section>

    <section v-if="favoriteList.length" class="section">
      <h2 class="section-title">收藏菜品</h2>
      <DishCard v-for="dish in favoriteList" :key="dish.id" :dish="dish" />
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import DishCard from '../components/DishCard.vue'
import { dishes } from '../data/dishes'
import { getFavorites } from '../utils/storage'

const ids = ref(getFavorites())
const total = dishes.length

const favoriteCount = computed(() => ids.value.length)
const favoriteList = computed(() => dishes.filter(item => ids.value.includes(item.id)))

function refresh() {
  ids.value = getFavorites()
}

function goFavorites() {
  const first = favoriteList.value[0]
  if (first) {
    location.hash = ''
  }
}

onMounted(() => window.addEventListener('favorite-updated', refresh))
onUnmounted(() => window.removeEventListener('favorite-updated', refresh))
</script>

<style scoped>
.profile {
  margin-top: 24px;
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.avatar {
  width: 72px;
  height: 72px;
  border-radius: 24px;
  background: #f2f2f7;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 38px;
}

.profile h1 {
  margin: 0;
  font-size: 28px;
}

.profile p {
  margin: 7px 0 0;
  color: var(--sub);
}

.stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 11px;
  margin: 18px 0;
}

.stats div {
  padding: 18px 8px;
  text-align: center;
}

.stats strong {
  display: block;
  font-size: 24px;
  color: var(--blue);
}

.stats span {
  display: block;
  margin-top: 5px;
  color: var(--sub);
  font-size: 12px;
  font-weight: 800;
}

.menu {
  overflow: hidden;
}

.menu button {
  width: 100%;
  min-height: 58px;
  border: 0;
  border-bottom: 1px solid var(--line);
  padding: 0 18px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 15px;
  font-weight: 800;
  color: var(--text);
}

.menu button:last-child {
  border-bottom: 0;
}

.menu i {
  font-style: normal;
  color: var(--sub);
  font-size: 13px;
  font-weight: 700;
}
</style>
