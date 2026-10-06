// Little "open when..." letters. Scripture quotes are KJV.

export type Letter = {
  id: string;
  when: string; // "open when ..."
  seal: string; // emoji on the wax seal
  color: string; // envelope tint
  body: string; // paragraphs separated by blank lines
  verse: { reference: string; text: string };
};

export const letters: Letter[] = [
  {
    id: "cant-sleep",
    when: "you can't sleep",
    seal: "🌙",
    color: "#c7d2fe",
    body: `hi, you.

it's late, isn't it? your body is tired but your mind keeps replaying things. conversations, worries, tomorrow's to-do list.

here's something I keep reminding myself: you don't have to stay awake to keep the world running. God never clocks out. He's not tired, and He's not worried.

so you can put it down. all of it. just for tonight.

breathe in slowly. breathe out even slower. tell Him the one thing that's heaviest, and then let Him hold it while you sleep.

you're safe. goodnight 🤍`,
    verse: {
      reference: "Psalm 4:8",
      text: "I will both lay me down in peace, and sleep: for thou, LORD, only makest me dwell in safety.",
    },
  },
  {
    id: "behind",
    when: "you feel behind everyone",
    seal: "🐢",
    color: "#bbf7d0",
    body: `hey.

I know the feeling. scrolling and seeing everyone graduating, getting married, getting the job, moving forward, while you feel stuck in the same chapter.

but remember Abraham waited 25 years for a promise. Joseph spent 13 years in a pit and a prison before the palace. Moses was 80 when his real calling started.

God isn't running late on your story. He's not comparing your page 12 to someone else's page 200.

you're not behind. you're right where He's still working.

be gentle with yourself today 🌱`,
    verse: {
      reference: "Philippians 1:6",
      text: "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.",
    },
  },
  {
    id: "messed-up",
    when: "you messed up",
    seal: "🩹",
    color: "#fecdd3",
    body: `oh, friend.

first, breathe. it's okay.

I know you're probably replaying it over and over, thinking "how could I do that again?"

but here's the thing. Peter denied Jesus three times, and Jesus made him breakfast. David failed in a huge way, and God still called him a man after His own heart.

you're not the first person to fall, and you're not too far to come back.

say sorry where you need to. make it right if you can. then let grace actually be grace.

today is a new morning. literally 🤍`,
    verse: {
      reference: "Lamentations 3:22-23",
      text: "It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
    },
  },
  {
    id: "invisible",
    when: "you feel invisible",
    seal: "👀",
    color: "#fde68a",
    body: `hi, I see you.

and more importantly, He does.

remember Hagar? alone in the desert, running away, no one on her side. and God came looking for her. she ended up giving Him a name: the God who sees me.

maybe no one noticed how hard you tried today. maybe nobody asked how you're really doing.

but God knows the number of hairs on your head. He notices the small things you do when no one's watching.

you are not background. you are not forgotten. you are seen 🌸`,
    verse: {
      reference: "Genesis 16:13",
      text: "And she called the name of the LORD that spake unto her, Thou God seest me.",
    },
  },
  {
    id: "overthinking",
    when: "you're overthinking",
    seal: "🌀",
    color: "#ddd6fe",
    body: `okay, pause.

your mind is doing that thing again, isn't it? running through every "what if," rereading that text, imagining every way it could go wrong.

let's try something. what's actually true right now? not what might happen. what's true.

God is still good. you are still loved. this moment is still okay.

you don't have to solve all of it tonight. you just have to take the next small step.

and maybe drink some water. and maybe put your phone down for a bit 😌`,
    verse: {
      reference: "Philippians 4:8",
      text: "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things.",
    },
  },
  {
    id: "happy",
    when: "you're really happy",
    seal: "🎈",
    color: "#fbcfe8",
    body: `yay!! 🎉

I love this for you. really.

sometimes we only remember to talk to God when things are hard. but He loves being part of your happy days too.

so enjoy it fully. don't wait for something to go wrong. don't feel guilty for being glad.

take a second and say thank you. for the thing that made you smile, for the people in it, for the little details.

every good thing came from Him. this one too ☀️`,
    verse: {
      reference: "James 1:17",
      text: "Every good gift and every perfect gift is from above, and cometh down from the Father of lights.",
    },
  },
  {
    id: "miss-someone",
    when: "you miss someone",
    seal: "🤍",
    color: "#bae6fd",
    body: `hey, it's okay to miss them.

missing someone just means they mattered. it means love had somewhere to go, and now it doesn't know where to land.

Jesus wept at His friend's grave, even though He knew He was about to bring him back. He didn't rush the sadness. He sat in it with them.

so you don't have to rush either.

cry if you need to. look at the photos. tell God about them. He's close to the brokenhearted, not far from them.

you're not alone in this ache 🤍`,
    verse: {
      reference: "Psalm 147:3",
      text: "He healeth the broken in heart, and bindeth up their wounds.",
    },
  },
  {
    id: "future",
    when: "you're scared of the future",
    seal: "☁️",
    color: "#e2e8f0",
    body: `hi.

the future feels foggy right now, huh? so many questions. what if it doesn't work out? what if I choose wrong?

here's what helps me: I don't know what's coming, but I know who's already there.

the Israelites didn't get a map. they got a pillar of cloud by day and fire by night. just enough light for the next step.

you don't need to see the whole road. you just need to follow the One who does.

whatever's ahead, you won't walk through it alone 🕯️`,
    verse: {
      reference: "Isaiah 43:2",
      text: "When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee.",
    },
  },
  {
    id: "dont-feel-like-praying",
    when: "you don't feel like praying",
    seal: "🍂",
    color: "#fed7aa",
    body: `that's okay. really.

some days the words just don't come. you feel dry, distracted, maybe even a little far away.

can I tell you a secret? you don't have to perform for God. Hannah prayed with no sound at all, and He heard her.

you can just sit. you can just say "hi God, I'm here." you can just sigh.

and when you don't know what to say, the Spirit Himself prays for you.

showing up tired still counts 🤍`,
    verse: {
      reference: "Romans 8:26",
      text: "Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought: but the Spirit itself maketh intercession for us with groanings which cannot be uttered.",
    },
  },
];
