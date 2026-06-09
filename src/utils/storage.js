const CART_KEY = 'meal_planner_cart'
const FAVORITE_KEY = 'meal_planner_favorites'

export function getCart() {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY) || '[]')
  } catch {
    return []
  }
}

export function setCart(list) {
  localStorage.setItem(CART_KEY, JSON.stringify(list))
  window.dispatchEvent(new Event('cart-updated'))
}

export function addCart(item) {
  const list = getCart()
  list.push(item)
  setCart(list)
}

export function clearCart() {
  setCart([])
}

export function getFavorites() {
  try {
    return JSON.parse(localStorage.getItem(FAVORITE_KEY) || '[]')
  } catch {
    return []
  }
}

export function setFavorites(ids) {
  localStorage.setItem(FAVORITE_KEY, JSON.stringify(ids))
  window.dispatchEvent(new Event('favorite-updated'))
}

export function toggleFavorite(id) {
  const ids = getFavorites()
  const next = ids.includes(id) ? ids.filter(item => item !== id) : [...ids, id]
  setFavorites(next)
  return next.includes(id)
}
