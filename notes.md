---
layout: default
title: Book Notes
---

# Book Notes

<ul class="no-bullets">
    {% for post in site.posts %}
    {% if post.category == "notes" %}
    <li>
        <h2>
        <a href="{{ post.url }}">
        {{ post.title }} - {{ post.author }}
        </a>
        </h2>
        <h4>{{ post.date | date_to_string }}</h4>
        {{ post.description }}
    </li>
    {% endif %}
    {% endfor %}
</ul>