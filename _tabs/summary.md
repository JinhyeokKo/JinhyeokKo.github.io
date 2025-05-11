---
title: 포스트 목차
icon: fas fa-list
order: 3
---

# 📚 포스트 목차

{% assign all_categories = site.posts | map: "categories" | uniq | sort %}

{% for cat in all_categories %}
{% assign posts_in_cat = site.posts | where_exp: "post", "post.categories contains cat" %}
{% assign posts_in_cat = posts_in_cat | reverse %}
{% assign seen_urls = "" | split: "" %}

## 📁 {{ cat }}

  <ul>
  {% for post in posts_in_cat %}
    {% unless seen_urls contains post.url %}
      {% assign seen_urls = seen_urls | push: post.url %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <small>({{ post.date | date: "%Y-%m-%d" }})</small><br>
        <span style="font-size: 0.9em; color: gray;">🏷️ {{ post.tags | join: ", " }}</span>
      </li>
    {% endunless %}
  {% endfor %}
  </ul>
{% endfor %}
