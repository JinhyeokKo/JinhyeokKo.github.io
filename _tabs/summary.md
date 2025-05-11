---
title: 포스트 목차
icon: fas fa-list
order: 3
---

{% assign all_categories = site.posts | map: "categories" | uniq | sort %}

{% for cat in all_categories %}
{% assign posts_in_cat = site.posts | where_exp: "post", "post.categories contains cat" %}
{% assign tags_in_cat = posts_in_cat | map: "tags" | join: "," | split: "," | uniq | sort %}

{% if cat != "" %}
## 📁 {{ cat }}

{% for tag in tags_in_cat %}
### 🔖 {{ tag }}
  <ul>
    {% assign tag_posts = "" | split: "" %}
    {% for post in posts_in_cat %}
      {% if post.tags contains tag %}
        {% assign tag_posts = tag_posts | push: post %}
      {% endif %}
    {% endfor %}

    {% assign tag_posts = tag_posts | reverse %}

    {% for post in tag_posts %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a> <small>({{ post.date | date: "%Y-%m-%d" }})</small>
      </li>
    {% endfor %}
  </ul>
  {% endfor %}
  {% endif %}
{% endfor %}
