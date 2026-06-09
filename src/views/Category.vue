<template>
  <main class="page">
    <header class="page-header">
      <h1 class="page-title">菜品分类</h1>
      <p class="page-subtitle">按菜系、菜品类型和口味快速筛选。</p>
    </header>

    <section class="filters">
      <button v-for="item in cuisineList" :key="item" :class="{ active: currentCuisine === item }" @click="currentCuisine = item">
        {{ item }}
      </button>
    </section>

    <section class="type-scroll">
      <button v-for="item in categories" :key="item" :class="{ active: currentCategory === item }" @click="currentCategory = item">
        {{ item }}
      </button>
    </section>

    <DishCard v-for="dish in filteredDishes" :key="dish.id" :dish="dish" />

    <div v-if="!filteredDishes.length" class="empty">
      <span class="empty-icon">🍽️</span>
      <strong class="empty-title">没有找到菜品</strong>
      <p>换一个分类试试。</p>
    </div>
  </main>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import DishCard from '../components/DishCard.vue'
import { dishes } from '../data/dishes'

const route = useRoute()
const cuisineList = ['粤菜', '湘菜', '川菜']
const currentCuisine = ref(route.query.cuisine || '粤菜')
const currentCategory = ref('全部')

watchEffect(() => {
  if (route.query.cuisine && cuisineList.includes(route.query.cuisine)) {
    currentCuisine.value = route.query.cuisine
    currentCategory.value = '全部'
  }
})

const categories = computed(() => {
  const list = dishes.filter(item => item.cuisine === currentCuisine.value).map(item => item.category)
  return ['全部', ...new Set(list)]
})

const filteredDishes = computed(() => {
  return dishes.filter(item => {
    const cuisineOk = item.cuisine === currentCuisine.value
    const categoryOk = currentCategory.value === '全部' || item.category === currentCategory.value
    return cuisineOk && categoryOk
  })
})
</script>

<style scoped>
.filters {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 11px;
  margin-bottom: 14px;
}

.filters button,
.type-scroll button {
  border: 0;
  border-radius: 18px;
  height: 48px;
  background: #fff;
  color: var(--sub);
  font-weight: 800;
  box-shadow: 0 8px 25px rgba(0,0,0,.04);
}

.filters button.active,
.type-scroll button.active {
  background: var(--blue);
  color: #fff;
}

.type-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding: 4px 2px 16px;
  margin-bottom: 4px;
}

.type-scroll button {
  flex: 0 0 auto;
  padding: 0 18px;
}
</style>
