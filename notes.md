---
layout: default
title: Notes
---

# Book Notes

<ul>
    {% for post in site.posts %}
    {% if post.category == "notes" %}
    <li>
        <h2>
        <a href="{{ post.url }}">
        {{ post.title }} - {{ post.author }}
        </a>
        </h2>
        {{ post.description }}
    </li>
    {% endif %}
    {% endfor %}
</ul>