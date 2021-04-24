---
layout: default
title: Articles
---

# Articles

<ul>
    {% for post in site.posts %}
    {% if post.category == "articles" %}
    <li>
        <h2><a href="{{ post.url }}">{{ post.title }}</a></h2>
        {{ post.excerpt }}
    </li>
    {% endif %}
    {% endfor %}
</ul>