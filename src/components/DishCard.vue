<template>
  <article class="dish card" @click="$router.push(`/dish/${dish.id}`)">
    <img :src="dish.image" :alt="dish.name" />
    <div class="info">
      <div class="topline">
        <h3>{{ dish.name }}</h3>
        <span>{{ dish.cookingTime }}</span>
      </div>
      <p>{{ dish.description }}</p>
      <div class="tags">
        <i>{{ dish.cuisine }}</i>
        <i>{{ dish.category }}</i>
        <i>{{ dish.taste }}</i>
      </div>
    </div>
  </article>
</template>

<script setup>
defineProps({
  dish: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.dish {
  margin-bottom: 14px;
  padding: 12px;
  display: flex;
  gap: 13px;
}

.dish img {
  width: 112px;
  height: 112px;
  border-radius: 20px;
  object-fit: cover;
  background: #eee;
  flex-shrink: 0;
}

.info {
  min-width: 0;
  flex: 1;
}

.topline {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 8px;
}

h3 {
  margin: 3px 0 0;
  font-size: 18px;
  line-height: 1.2;
}

.topline span {
  flex-shrink: 0;
  padding: 5px 8px;
  border-radius: 999px;
  background: #f2f2f7;
  color: var(--blue);
  font-size: 11px;
  font-weight: 800;
}

p {
  display: -webkit-box;
  margin: 8px 0 10px;
  color: var(--sub);
  font-size: 13px;
  line-height: 1.45;
  overflow: hidden;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.tags i {
  padding: 5px 8px;
  border-radius: 999px;
  background: #f5f5f7;
  color: var(--text);
  font-size: 11px;
  font-style: normal;
}
</style>
