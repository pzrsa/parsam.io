---
layout: default
title: Book Notes
---

# Book Notes

After reading a book, I export all the highlights I've made from my Kindle and write them in my own words. Hopefully it can give you a rough idea of what the books main takeaways are. I never read books before till late 2020, I can provide some tips to make it stick! Shoot me a message on [Twitter](https://twitter.com/parsamesgarha){:target="\_blank"}! My favourite topics in books are biographies, self-development, entrepreneurship and more recently philosophy.

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
