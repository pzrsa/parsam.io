---
layout: page
title: Articles
---

<section class="posts">
<ul>
{% for post in site.posts %}
    {% if post.category == "articles" %}
<li>
<a href="{{ post.url }}">{{ post.title }}</a>
<time datetime="{{ post.date | date_to_string }}">{{ post.date | date_to_string }}</time>
</li>
    {% endif %}
{% endfor %}
</ul>
</section>
