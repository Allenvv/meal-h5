# 我的厨房点菜 H5

一款自用苹果风点菜 H5 小程序，适合部署到 Vercel。

## 功能

- 首页推荐
- 菜品分类：粤菜、湘菜、川菜
- 菜品详情：规格、食材、做法、介绍
- 今日菜单 / 购物车
- 我的页面
- 本地收藏与购物车缓存

## 本地运行

```bash
npm install
npm run dev
```

## 构建

```bash
npm run build
```

构建输出目录：

```bash
dist
```

## Vercel 部署配置

Vercel 后台配置：

- Framework Preset：Vite
- Build Command：npm run build
- Output Directory：dist
- Install Command：npm install

也可以直接把本项目上传到 GitHub，然后在 Vercel 导入仓库部署。
