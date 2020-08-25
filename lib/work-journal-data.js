[
  {
    date: "2020-07-27",
    category: "work",
    href: "https://youtu.be/b1uZ4FYHaM8",
    text: 'I published "Buffering new Tweets with SWR" on YouTube.',
  },
  {
    date: "2020-07-27",
    category: "work",
    href:
      "https://frontendfirst.fm/episodes/does-code-splitting-negate-the-benefits-of-building-an-spa",
    text:
      'Published "Does code splitting negate the benefits of building an SPA?", Ep. 106 of Frontend First.',
  },
  {
    date: "2020-07-27",
    category: "work",
    text: "Mirage issues, EmberMap work, and consulting.",
  },
  {
    date: "2020-07-27",
    category: "learning",
    text:
      'One question that came up a few times from my video was whether JavaScript equality (===) could be used to compare two pieces of React state. In all my tests, "setBuffer(data)" made the "buffer" state an actual reference to the same object that "data" referenced, meaning, both pieces of state referred to the same JavaScript object. And therefore the equality check could be used, even across renders. Definitely a useful thing to know!',
  },
  {
    date: "2020-07-27",
    category: "interesting-thing",
    href: "https://nextjs.org/blog/next-9-5",
    text: "Next.js 9.5 was released.",
  },
  {
    date: "2020-07-27",
    category: "interesting-thing",
    href: "https://twitter.com/natfriedman/status/1288155000560967680",
    text: "GitHub publicized their product roadmap.",
  },
  {
    date: "2020-07-27",
    category: "interesting-thing",
    href: "https://www.econtalk.org/nassim-nicholas-taleb-on-the-pandemic/",
    text: "Taleb on the history and statistics of pandemics.",
  },
];

let f = [
  {
    text:
      'I published "Animating Skeleton Screens with Tailwind CSS" on YouTube.',
    date: "2020-08-03",
    href: "https://youtu.be/_OZYvKsn60g",
    category: "work",
  },
  {
    text: "Recorded Ep. 107 of Frontend First. Will publish next week.",
    date: "2020-08-03",
    category: "work",
  },
  {
    text:
      "Bought a light box kit + spent some time with a cinemtographer friend learning about lighting and color. Still have a lot to learn here!",
    date: "2020-08-03",
    href:
      "https://www.bhphotovideo.com/c/product/945063-REG/impact_soft_n_natural_4_sockets.html",
    category: "work",
  },
  {
    text:
      "Helped Darin publish Ep. 5 of Building UI Components with Storybook on EmberMap.",
    date: "2020-08-03",
    href:
      "https://embermap.com/topics/building-ui-components-with-storybook/adding-interactivity-using-the-knobs-addon",
    category: "work",
  },
];

let f2 = [
  {
    category: "learning",
    date: "2020-08-03",
    text: `I learned more about color correction, white balance and exposure. I got some soft boxes that are all 5000K temperature lighting and want to get some blackout curtains next so I have total control over the lighting in my videos. I played around with recording at night and the difference is dramatic when you have total control of the light and the camera's white balance dialed in correctly. The goal here is to get the look and style of all my videos the same. Now that I know a bit more about this, looking at my recent videos is kinda stark! They all look very different from each other. But I suppose continuous improvement is the name of the game.`,
  },
  {
    category: "learning",
    date: "2020-08-03",
    text: `I also learned about shooting in Log format and using a LUT (lookup table) to decompress the image. Shooting in Log prevents the camera from losing data on the brightest and darkest parts of an image. It does this by compressing the data, so that the raw image ends up looking very flat. You then use a LUT to decompress it into a standard (REC 709) format where you can then make your additional tweaks and grades. The goal here is to get my environment set up in such a way that I can record, apply a LUT, and have a similar-looking video every time.`,
  },
  {
    category: "learning",
    date: "2020-08-03",
    text: `While working on my Twitter clone I was asking Adam a question about line height. He noticed I had added a font size of 15px and said it was going to affect many parts of the UI. I said I added it because mobile twitter.com uses 15px, and I wanted to match it. It was an interesting conversation and made me realize that if you do want to add something like a 15px font size to Tailwind's theme, you really should take the time to trace that through and think about the corresponding changes to line height and the spacing scale that it entails, because many of these values are interrelated. For example, with a 15px font size, you can't match icons without also adjusting the spacing scale. The default scale of a 16px base and a 4 unit scale is, in Adam's words, "the hardest to mess up."`,
  },
];

let f3 = [
  {
    href: "https://numinous.productions/timeful/",
    category: "interesting-thing",
    text: `If books were alive.`,
    date: "2020-08-03",
  },

  {
    href: "https://romefrontend.dev/blog/2020/08/08/introducing-rome.html",
    category: "interesting-thing",
    text: `The author of Babel announced Rome, his new JS linting project.`,
    date: "2020-08-03",
  },
  {
    href: "https://youtu.be/5tSTk1083VY",
    category: "interesting-thing",
    text: `Jaw-dropping story of overcoming adversity, the power of the mind, and finding the physical limits of the human body.`,
    date: "2020-08-03",
  },
];
