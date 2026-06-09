<template>
  <main v-if="dish" class="detail">
    <button class="back" @click="$router.back()">‹</button>
    <img class="cover" :src="dish.image" :alt="dish.name" />

    <section class="main card">
      <div class="title-row">
        <div>
          <h1>{{ dish.name }}</h1>
          <p>{{ dish.cuisine }} · {{ dish.category }} · {{ dish.taste }}</p>
        </div>
        <button class="fav" :class="{ active: isFav }" @click="handleFavorite">{{ isFav ? '♥' : '♡' }}</button>
      </div>

      <p class="desc">{{ dish.description }}</p>

      <div class="meta-grid">
        <div><strong>{{ dish.cookingTime }}</strong><span>制作时间</span></div>
        <div><strong>{{ dish.difficulty }}</strong><span>难度</span></div>
        <div><strong>{{ selectedSpec.people }}人</strong><span>规格</span></div>
      </div>

      <h2>菜品规格</h2>
      <div class="specs">
        <button v-for="item in dish.specs" :key="item.label" :class="{ active: selectedSpec.label === item.label }" @click="selectedSpec = item">
          {{ item.label }}
        </button>
      </div>
    </section>

    <section class="card block">
      <h2>所需食材</h2>
      <div class="ingredients">
        <span v-for="item in dish.ingredients" :key="item">{{ item }}</span>
      </div>
    </section>

    <section class="card block">
      <h2>制作方法</h2>
      <div v-for="(step, index) in dish.steps" :key="index" class="step">
        <i>{{ index + 1 }}</i>
        <p>{{ step }}</p>
      </div>
    </section>

    <div class="bottom safe-bottom">
      <button class="ios-button" @click="handleAdd">加入今日菜单</button>
    </div>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { dishes } from '../data/dishes'
import { addCart, getFavorites, toggleFavorite } from '../utils/storage'

const route = useRoute()
const router = useRouter()
const dish = computed(() => dishes.find(item => item.id === Number(route.params.id)))

if (!dish.value) {
  router.replace('/home')
}

const selectedSpec = ref(dish.value?.specs?.[0] || {})
const isFav = ref(getFavorites().includes(Number(route.params.id)))

function handleAdd() {
  addCart({
    ...dish.value,
    selectedSpec: selectedSpec.value,
    cartId: Date.now()
  })
  alert('已加入今日菜单')
}

function handleFavorite() {
  isFav.value = toggleFavorite(dish.value.id)
}
</script>

<style scoped>
.detail {
  min-height: 100vh;
  padding-bottom: 104px;
  background: var(--bg);
}

.back {
  position: fixed;
  top: 18px;
  left: calc(50% - min(50vw, 215px) + 14px);
  width: 42px;
  height: 42px;
  border: 0;
  border-radius: 50%;
  background: rgba(255,255,255,.82);
  backdrop-filter: blur(20px);
  color: var(--text);
  font-size: 34px;
  line-height: 38px;
  z-index: 5;
  box-shadow: 0 8px 24px rgba(0,0,0,.12);
}

.cover {
  width: 100%;
  height: 360px;
  object-fit: cover;
  display: block;
}

.main {
  position: relative;
  z-index: 2;
  margin: -42px 16px 16px;
  padding: 22px;
}

.title-row {
  display: flex;
  justify-content: space-between;
  gap: 14px;
}

h1 {
  margin: 0;
  font-size: 29px;
  letter-spacing: -0.5px;
}

.title-row p {
  margin: 7px 0 0;
  color: var(--sub);
  font-size: 14px;
}

.fav {
  width: 46px;
  height: 46px;
  border: 0;
  border-radius: 50%;
  background: #f2f2f7;
  color: var(--red);
  font-size: 28px;
}

.fav.active {
  background: #fff0f0;
}

.desc {
  margin: 18px 0;
  color: #3a3a3c;
  font-size: 15px;
  line-height: 1.65;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
}

.meta-grid div {
  padding: 14px 8px;
  border-radius: 18px;
  background: #f5f5f7;
  text-align: center;
}

.meta-grid strong {
  display: block;
  font-size: 15px;
}

.meta-grid span {
  display: block;
  margin-top: 5px;
  color: var(--sub);
  font-size: 12px;
}

h2 {
  margin: 22px 0 12px;
  font-size: 19px;
}

.specs {
  display: flex;
  gap: 10px;
}

.specs button {
  border: 0;
  padding: 12px 16px;
  border-radius: 999px;
  background: #f2f2f7;
  font-weight: 800;
  color: var(--text);
}

.specs button.active {
  background: var(--blue);
  color: #fff;
}

.block {
  margin: 16px;
  padding: 22px;
}

.ingredients {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
}

.ingredients span {
  padding: 9px 13px;
  border-radius: 999px;
  background: #f2f2f7;
  color: #3a3a3c;
  font-size: 13px;
  font-weight: 700;
}

.step {
  display: flex;
  gap: 12px;
  margin-bottom: 15px;
}

.step i {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background: var(--blue);
  color: #fff;
  flex-shrink: 0;
  text-align: center;
  line-height: 30px;
  font-style: normal;
  font-weight: 800;
  font-size: 13px;
}

.step p {
  margin: 3px 0 0;
  color: #3a3a3c;
  line-height: 1.6;
  font-size: 15px;
}

.bottom {
  position: fixed;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: min(100%, 430px);
  padding: 14px 16px 28px;
  background: rgba(255,255,255,.82);
  backdrop-filter: blur(22px);
  border-top: 1px solid rgba(0,0,0,.06);
  z-index: 10;
}

.bottom button {
  width: 100%;
}
</style>
