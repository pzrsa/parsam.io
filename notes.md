---
layout: default
title: Book Notes
---

# Book Notes

After reading a book, I export all the highlights I've made from my Kindle and write them in my own words. Hopefully it can give you a rough idea of what the books main takeaways are.

<ul class="no-bullets">
    {% for post in site.posts %}
    {% if post.category == "notes" %}
    <li>
        <h2 class="post-title">
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
