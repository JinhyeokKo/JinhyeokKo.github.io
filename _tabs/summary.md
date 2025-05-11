---
title: 포스트 목차
icon: fas fa-list
order: 3
---

# 📚 포스트 목차

## 📂 카테고리별 목록

{% assign all_categories = site.categories | sort %}

{% for category_pair in all_categories %}
{% assign category = category_pair[0] %}
{% assign posts = category_pair[1] | sort: 'date' | reverse %}

### 📁 {{ category }}

  <ul>
  {% for post in posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <small>({{ post.date | date: "%Y-%m-%d" }})</small><br>
      <span style="font-size: 0.9em; color: gray;">🏷️ {{ post.tag }}</span>
    </li>
  {% endfor %}
  </ul>
{% endfor %}

## 🏷️ 태그별 목록

{% assign all_tags = site.tags | sort %}

{% for tag_pair in all_tags %}
{% assign tag = tag_pair[0] %}
{% assign posts = tag_pair[1] | sort: 'date' | reverse %}

### 🔖 {{ tag }}

  <ul>
  {% for post in posts %}
    <li>
      <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
      <small>({{ post.date | date: "%Y-%m-%d" }})</small><br>
      <span style="font-size: 0.9em; color: gray;">📂 {{ post.category }}</span>
    </li>
  {% endfor %}
  </ul>
{% endfor %}
