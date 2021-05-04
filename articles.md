---
layout: default
title: Articles
---

# Articles

<ul class="no-bullets">
    {% for post in site.posts %}
    {% if post.category == "articles" %}
    <li>
        <h2 class="post-title"><a href="{{ post.url }}">{{ post.title }}</a></h2>
        {{ post.excerpt }}
    </li>
    {% endif %}
    {% endfor %}
</ul>
