<template>
  <main class="page">
    <header class="page-header">
      <h1 class="page-title">今日菜单</h1>
      <p class="page-subtitle">已选择的菜品会自动汇总成买菜清单。</p>
    </header>

    <template v-if="cart.length">
      <article v-for="(item, index) in cart" :key="item.cartId || index" class="cart-item card">
        <img :src="item.image" :alt="item.name" />
        <div>
          <h3>{{ item.name }}</h3>
          <p>{{ item.cuisine }} · {{ item.selectedSpec?.label }}</p>
          <span>{{ item.ingredients.join('、') }}</span>
        </div>
        <button @click="remove(index)">删除</button>
      </article>

      <section class="summary card">
        <h2>买菜清单</h2>
        <div class="ingredients">
          <span v-for="item in ingredients" :key="item">{{ item }}</span>
        </div>
      </section>

      <button class="clear" @click="handleClear">清空今日菜单</button>
    </template>

    <div v-else class="empty">
      <span class="empty-icon">🍽️</span>
      <strong class="empty-title">还没有选择菜品</strong>
      <p>去分类里挑几道今天想吃的菜吧。</p>
    </div>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { clearCart, getCart, setCart } from '../utils/storage'

const cart = ref([])

onMounted(() => {
  cart.value = getCart()
})

const ingredients = computed(() => {
  return [...new Set(cart.value.flatMap(item => item.ingredients || []))]
})

function remove(index) {
  cart.value.splice(index, 1)
  setCart(cart.value)
}

function handleClear() {
  clearCart()
  cart.value = []
}
</script>

<style scoped>
.cart-item {
  display: flex;
  gap: 13px;
  padding: 12px;
  margin-bottom: 14px;
  align-items: center;
}

.cart-item img {
  width: 86px;
  height: 86px;
  border-radius: 18px;
  object-fit: cover;
  background: #eee;
}

.cart-item div {
  flex: 1;
  min-width: 0;
}

.cart-item h3 {
  margin: 0;
  font-size: 17px;
}

.cart-item p {
  margin: 6px 0;
  color: var(--blue);
  font-weight: 800;
  font-size: 13px;
}

.cart-item span {
  display: -webkit-box;
  color: var(--sub);
  font-size: 12px;
  line-height: 1.45;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.cart-item button {
  border: 0;
  color: var(--red);
  background: #fff0f0;
  border-radius: 999px;
  padding: 8px 10px;
  font-weight: 800;
}

.summary {
  padding: 22px;
  margin-top: 18px;
}

.summary h2 {
  margin: 0 0 14px;
  font-size: 20px;
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
  font-size: 13px;
  font-weight: 700;
}

.clear {
  width: 100%;
  height: 50px;
  margin-top: 18px;
  border: 0;
  border-radius: 999px;
  background: var(--red);
  color: #fff;
  font-weight: 800;
  font-size: 15px;
}
</style>
