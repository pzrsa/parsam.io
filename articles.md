---
layout: default
title: Articles
---

# Articles

<ul class="no-bullets">
    {% for post in site.posts %}
    {% if post.category == "articles" %}
    <li>
        <h2 class="post-title">
        <a href="{{ post.url }}">
        {{ post.title }}
        </a>
        </h2>
        <h4>{{ post.date | date_to_string }}</h4>
        {{ post.description }}
    </li>
    {% endif %}
    {% endfor %}
</ul>
