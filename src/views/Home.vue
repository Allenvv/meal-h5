<template>
  <main class="page">
    <header class="page-header">
      <p class="hello">🍳 我的厨房</p>
      <h1 class="page-title">今天想吃什么？</h1>
      <p class="page-subtitle">从粤菜、湘菜、川菜里挑几道家常菜，自动生成今日菜单和买菜清单。</p>
    </header>

    <section class="search card">
      <span>🔍</span>
      <input v-model="keyword" placeholder="搜索菜品、口味、食材" />
    </section>

    <section class="hero">
      <div>
        <span class="badge white">今日推荐</span>
        <h2>三菜一汤，轻松安排</h2>
        <p>不知道吃什么时，一键随机生成晚餐灵感。</p>
      </div>
      <button class="ghost-button" @click="randomPick">换一批</button>
    </section>

    <section class="section">
      <h2 class="section-title">热门菜系</h2>
      <div class="cuisine-grid">
        <button v-for="item in cuisines" :key="item.name" class="cuisine card" @click="goCuisine(item.name)">
          <span>{{ item.icon }}</span>
          <strong>{{ item.name }}</strong>
          <em>{{ item.desc }}</em>
        </button>
      </div>
    </section>

    <section class="section">
      <h2 class="section-title">{{ keyword ? '搜索结果' : '推荐菜品' }}</h2>
      <DishCard v-for="dish in shownDishes" :key="dish.id" :dish="dish" />
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import DishCard from '../components/DishCard.vue'
import { cuisines, dishes } from '../data/dishes'

const router = useRouter()
const keyword = ref('')
const randomIds = ref([1, 5, 9, 4])

const shownDishes = computed(() => {
  const key = keyword.value.trim()
  if (key) {
    return dishes.filter(dish => {
      return [dish.name, dish.cuisine, dish.category, dish.taste, dish.description, ...dish.ingredients].join('').includes(key)
    })
  }
  return randomIds.value.map(id => dishes.find(dish => dish.id === id)).filter(Boolean)
})

function goCuisine(name) {
  router.push({ path: '/category', query: { cuisine: name } })
}

function randomPick() {
  const copied = [...dishes].sort(() => Math.random() - 0.5)
  randomIds.value = copied.slice(0, 4).map(item => item.id)
}
</script>

<style scoped>
.hello {
  margin: 0 0 8px;
  color: var(--blue);
  font-size: 15px;
  font-weight: 800;
}

.search {
  height: 54px;
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 0 18px;
}

.search input {
  flex: 1;
  border: 0;
  outline: 0;
  background: transparent;
  font-size: 15px;
  color: var(--text);
}

.hero {
  margin-top: 18px;
  padding: 24px;
  border-radius: 28px;
  background: linear-gradient(135deg, #007aff, #5ac8fa);
  color: #fff;
  display: flex;
  justify-content: space-between;
  gap: 16px;
  box-shadow: 0 20px 50px rgba(0, 122, 255, .28);
}

.hero h2 {
  margin: 14px 0 8px;
  font-size: 24px;
}

.hero p {
  margin: 0;
  color: rgba(255,255,255,.84);
  font-size: 14px;
  line-height: 1.5;
}

.white {
  background: rgba(255,255,255,.18);
  color: #fff;
}

.cuisine-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 11px;
}

.cuisine {
  border: 0;
  padding: 18px 8px;
  text-align: center;
  min-height: 128px;
}

.cuisine span {
  display: block;
  font-size: 33px;
}

.cuisine strong {
  display: block;
  margin-top: 10px;
  font-size: 16px;
}

.cuisine em {
  display: block;
  margin-top: 6px;
  font-style: normal;
  color: var(--sub);
  font-size: 11px;
  line-height: 1.35;
}
</style>
