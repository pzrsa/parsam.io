---
date: "2024-10-31"
title: "Monthly Favourites - October 2024"
---

I'm starting a new series on my blog where I share some of the interesting things I've come across. It's kinda a bookmark dump, but you might find some value in it :)

# Brave Browser (and vertical tabs)

I've toyed with the idea of switching to vertical tabs before, but it's not natively supported in Chrome. I'm fully aware of the benefits of using vertical anything, like I've always used a vertical dock (it's hidden so rly no benefit). I finally made the switch to [Brave](https://brave.com/) since it supports it [natively](https://brave.com/blog/vertical-tabs/), and so far it's been great. At the office I have a wide screen monitor, so it's been nice to have a static sidebar of tabs where I can actually read the title of the page, and scroll if needed. The issue with horizontal tabs is that as your tabs scale, it just gets reduced down to a favicon.
![brave-tabs.heic](../../assets/blog/brave-tabs.jpeg)

# Fish Shell

I used to [fish shell](https://fishshell.com/), but recently I went back to using it as part of my long term plan to be minimal/intentional with everything. I like having this mentality of using the defaults of things, and fish fits that criteria. This is all I need in my `~/.config/fish/config.fish`:

```
eval (/opt/homebrew/bin/brew shellenv)

alias c="clear"
alias vi="nvim"
fish_vi_key_bindings

source "/opt/homebrew/opt/fzf/shell/key-bindings.fish"
fzf_key_bindings

export BUN_INSTALL="$HOME/.bun"
export PATH="$BUN_INSTALL/bin:$PATH"

fnm env --use-on-cd --shell fish | source
```

# Solovair Boots

I've never had a quality pair of leather boots, so I decided to buy the brown [Solovair](https://solovair.com/) Horween Leather Derby Boots. Alongside the boots, the [history](https://solovair.com/pages/history) of Solovair is pretty cool.

So you know Dr Martens, right? Well, Dr Martens used to be manufactured by NPS (parent company of Solovair) boots in a factory in Northamptonshire, England. But in 1990 Dr Martens was about to go bankrupt, so they had to cut costs and decided to move their manufacturing overseas. As a result, Dr Martens' quality degraded a lot, which has been [documented](https://www.youtube.com/results?search_query=dr+martens+quality) countless times online. However, Solovair continued to manufacture their shoes the old fashioned way, which is something I find so fascinating.

If you value craftsmanship and history, Solovair is a great choice for leather shoes/boots. Many people buy Dr Martens just for the yellow stitches, which is not a status game I want to play. I'm so happy with my purchase, and what makes it even more satisfying is that I bought this from their outlet where I got a ~60% discount on them.

Photo of me wearing them as part of my halloween costume:
![solovair-boots.heic](../../assets/blog/solovair-boots.jpeg)

# Wrangler 31MWZ Cowboy Cut Jeans

For someone who squats, I have pretty big thighs, which means it's hard to find a good pair of trousers/jeans that fit the way I want. I was doing some research, and found the Wrangler 31MWZ fits my criteria perfectly. High rise, straight leg, 100% cotton, relaxed, and rich with Western American history. I bought these online for £20. Yes, £20 for a pair jeans that fit me the way I want. Can't wait to see how it patinas over time.

Happy Halloween 🎃
