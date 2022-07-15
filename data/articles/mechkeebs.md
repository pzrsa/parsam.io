---
title: "MechKeebs"
date: "2022-07-15"
---

After [many months](https://github.com/pzrsa/mechkeebs/graphs/code-frequency), I finally managed to launch a personal project that helped me learn a bunch of [technologies](https://github.com/pzrsa/mechkeebs#technologies) I was interested in.

[MechKeebs](https://mechkeebs.com/) is (in short) a clone of [r/mk](https://www.reddit.com/r/MechanicalKeyboards) where users can post their mechanical keyboard.

![MechKeebs Home Page](/images/articles/mechkeebs/index.png)
It wasn't intended to solve any problems, but I've learnt from a few great engineers that solving problems at my stage shouldn't be the focus. I should still obviously solve a problem when needed, but that will just come with time as I expose myself to more projects.

## Technologies

### Next.js

One of the most popular React frameworks is [Next.js](https://nextjs.org/), created by [Vercel](https://vercel.com).
The site you're on right now was also of course built with Next.js, using [static generation](https://nextjs.org/docs/basic-features/pages#static-generation-recommended).

However the [`next/image`](https://nextjs.org/docs/basic-features/image-optimization) component could be better. I couldn't get a [masonry layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Masonry_Layout) working without doing some dodgy tricks unfortunately.

I do know that [they're aware of the feedback](https://twitter.com/leeerob/status/1545480513846185984?s=20&t=Sz5ATLanuOhtZKm9I1JGVQ), so I'm hoping to see some more improvements on it soon.

### Chakra UI

This was my first time using a component library like [Chakra UI](https://chakra-ui.com/) or [MUI](https://mui.com/).
It was fun slapping components together and making them just work for someone who hates styling. I felt very spoiled.

But my issue with component libraries is that they tend to feel bloated. I simply enjoy making websites with the most barebones look.
Plus it's not really the library's fault as I don't think performance is their major selling point. A lot of great work gets put into these projects as they give accessibility support right out of the box.

After switching away from the default [CSS Modules](https://github.com/css-modules/css-modules) Next.js provides, I took a look at using [Tailwind CSS](https://tailwindcss.com/) for this site. I'm quite happy with it so far, so will most likely use it in future projects.

### SWR

For keeping the data fresh, I used [SWR](https://swr.vercel.app/), which is also created by Vercel.
I found it enjoyable to use, mostly because of how minimal it feels. It just works.

For pagination, I used the [`useSWRInfinite`](https://swr.vercel.app/docs/pagination#useswrinfinite) hook. It feels like magic but it certainly does its job. Took me a while to figure out how to implement it, but the provided [example](https://swr.vercel.app/examples/ssr) certainly helped a lot.
SWR also has a handy [integration with Next.js](https://swr.vercel.app/docs/with-nextjs#pre-rendering-with-default-data) where you could SSR the page, and later on have the data dynamically update on the client side.

The SSR + client side fetching combo was perfect, and I look forward to using it more.

### Google Cloud Storage

Using [Cloud Storage](https://cloud.google.com/storage) was quite easy to get up and running with the [Node.js library](https://github.com/googleapis/nodejs-storage).

I made the mistake of sending the image back to the server, then compressing it using [sharp](https://github.com/lovell/sharp). It did not work well at all when I went to production, so I used some [random library](https://www.npmjs.com/package/browser-image-compression) which turned out to work well.

Plus I definitely did not pick GCP because of obvious reasons.

### DigitalOcean + Dokku

The most dev ops stuff I had done was doing a quick `git push` to Heroku to launch my crappy [Python web app](https://github.com/pzrsa/flaskify) back in the day.
But this time, I was looking forward to finally getting my hands dirty with dev ops work. I had $100 in credits provided by the [GitHub Student Developer Pack](https://education.github.com/pack), so I was ready to use the [DigitalOcean](https://www.digitalocean.com/) + [Dokku](https://dokku.com/) combo.

I also took the opportunity to learn Docker, which has been incredible. At the beginning I was paranoid about how how Docker images actually work, mostly for security reasons. There were many instances where I nearly pushed some secrets up to [Docker Hub](https://hub.docker.com/), but I refactored my code to accomodate for that.

You could check out the [MechKeebs repo](https://hub.docker.com/repository/docker/pzrsa/mechkeebs) that contains all the images if you want.

DigitalOcean provides computing services, similar to platforms like Google Cloud and AWS but at a bearable scale. I created a $6 VPS (could last me over a year with the free credits), and slapped Dokku onto it which is now my own mini Heroku.

I can now use the same VPS to deploy other projects in the future without breaking the bank. I want to see how far I could go before my 1GB Memory 25GB SSD could no longer handle it. But if we're going to be real, I don't think I would gain that sort of traffic.

## Some things I learned

- **Spend no more than a couple weeks on a project**.
  I took way too long to get this out the door. I started in Nov 2021, and deployed it in Jul 2022. Obviously I didn't work on it daily during that period, it was more of a 1-2 month break and working in bursts. If I had instead abandoned the project I could've built other stuff in that time, which would help me identify patterns for a great project idea.

- **Skip the domain purchase**.
  Before MechKeebs, the original project was SetupScope. As you could guess, it was a similar idea, but for desk setups. Users would've been able to pinpoint on an image the items on their desk, making it more interactive.

  I had bought two domains, `setupscope.com` and `mechkeebs.com`, which totalled me £32. Yes, £32 because NameCheap decided to not make it clear that the `mechkeebs.com` domain was on their marketplace. Meaning I had bought a domain that had expired a few weeks in. Unfortunately I purchased it again like a fool.

  Next time I will just hog a `.vercel.app` domain for free, up until I am certain to launch. I wasted so much time and brainpower on a domain that barely had any benefits. Still, having `api.mechkeebs.com` is pretty cool though.
