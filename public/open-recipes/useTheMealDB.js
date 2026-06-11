// src/composables/useTheMealDB.js
// 这个文件可直接放进你的 Vue/Vite 项目，动态读取 TheMealDB 真实菜品和图片。
const API = 'https://www.themealdb.com/api/json/v1/1';

export async function fetchChineseMeals() {
  const res = await fetch(`${API}/filter.php?a=Chinese`);
  const data = await res.json();
  return data.meals || [];
}

export async function fetchMealDetail(id) {
  const res = await fetch(`${API}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals?.[0] || null;
}

export function convertMealDBToAppDish(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (name && name.trim()) ingredients.push(`${measure || ''} ${name}`.trim());
  }
  const rawSteps = (meal.strInstructions || '').split(/\r?\n|\.\s+/).map(s => s.trim()).filter(Boolean);
  return {
    id: Number(meal.idMeal),
    name: meal.strMeal,
    cuisine: meal.strArea === 'Chinese' ? '中餐' : (meal.strArea || '其他'),
    category: meal.strCategory || '菜品',
    taste: meal.strTags || '家常',
    image: meal.strMealThumb,
    specs: [{ label: '1-2人份', people: 2 }, { label: '3-4人份', people: 4 }],
    ingredients,
    cookingTime: '30-45分钟',
    difficulty: '中等',
    description: meal.strMeal,
    steps: rawSteps.map((text, index) => ({
      title: `步骤 ${index + 1}`,
      text,
      image: meal.strMealThumb,
      duration: '3-8分钟',
      tip: 'TheMealDB 提供成品真实图；步骤图可后续替换为实拍流程图。'
    })),
    source: { provider: 'TheMealDB', url: meal.strSource, youtube: meal.strYoutube }
  };
}
