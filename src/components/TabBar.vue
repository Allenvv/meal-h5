<template>
  <nav v-if="showTab" class="tabbar safe-bottom">
    <RouterLink v-for="item in tabs" :key="item.path" :to="item.path" class="tab">
      <span class="icon">{{ item.icon }}</span>
      <span>{{ item.label }}</span>
      <i v-if="item.path === '/cart' && cartCount" class="dot">{{ cartCount }}</i>
    </RouterLink>
  </nav>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { getCart } from '../utils/storage'

const route = useRoute()
const cartCount = ref(getCart().length)

const tabs = [
  { path: '/home', label: '首页', icon: '🏠' },
  { path: '/category', label: '分类', icon: '🍱' },
  { path: '/cart', label: '菜单', icon: '🛒' },
  { path: '/mine', label: '我的', icon: '👤' }
]

const showTab = computed(() => route.meta.tab)

const update = () => {
  cartCount.value = getCart().length
}

onMounted(() => window.addEventListener('cart-updated', update))
onUnmounted(() => window.removeEventListener('cart-updated', update))
</script>

<style scoped>
.tabbar {
  position: fixed;
  left: 50%;
  bottom: 0;
  width: min(100%, 430px);
  transform: translateX(-50%);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  padding: 8px 10px 18px;
  background: rgba(255, 255, 255, .78);
  border-top: 1px solid rgba(0,0,0,.06);
  backdrop-filter: blur(22px);
  z-index: 20;
}

.tab {
  position: relative;
  min-height: 54px;
  border-radius: 18px;
  color: #86868b;
  text-decoration: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  font-size: 11px;
  font-weight: 700;
}

.icon {
  font-size: 22px;
  line-height: 1;
}

.router-link-active {
  background: #eef6ff;
  color: #007aff;
}

.dot {
  position: absolute;
  top: 4px;
  right: 18px;
  min-width: 18px;
  height: 18px;
  padding: 0 5px;
  border-radius: 999px;
  background: #ff3b30;
  color: #fff;
  font-size: 11px;
  line-height: 18px;
  font-style: normal;
}
</style>
