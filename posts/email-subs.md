---
date: "2025-01-01"
title: "I added email subscriptions"
---

Great news for the 2 other people who read my blog – you can now read my posts via email!

I tried using [Substack](https://parsam.substack.com/) as a way to just get my posts in peoples inboxes, but I didn't like how decoupled it was from my personal website.

I don't like the idea of my posts lazily being posted around the internet, I want them to be in one canonical place.

But thanks to [Buttondown](https://buttondown.com/), I have a solution that should hopefully be less friction to send and easier to maintain.

This is all it took:

```html
<form
	action="https://buttondown.email/api/emails/embed-subscribe/parsam"
	method="post"
	target="_blank"
>
  <input
	type="email"
	name="email"
	required
  />
  <button type="submit">
   Subscribe
  </button>
</form>
```

If you'd like to be one of the first subscribers, then please do share your email at the bottom of this post. It would truly mean a lot to me, and I hope to provide value for your time.

However if you're like me and also enjoy using an RSS reader (I use [NetNewsWire](https://netnewswire.com/)), then you can stay updated by following my [ATOM feed](/feed.atom).