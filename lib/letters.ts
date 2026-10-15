import type { L } from "./i18n/config";
import type { Verse } from "./verses";

// Little "open when..." letters, paired with a verse.

export type Letter = {
  id: string;
  when: L; // "open when ..."
  seal: string; // emoji on the wax seal
  color: string; // envelope tint
  body: L; // paragraphs separated by blank lines
  verse: Verse;
};

export const letters: Letter[] = [
  {
    id: "cant-sleep",
    when: { en: "you can't sleep", id: "kamu nggak bisa tidur", zh: "你睡不着" },
    seal: "🌙",
    color: "#c7d2fe",
    body: {
      en: `hi, you.

it's late, isn't it? your body is tired but your mind keeps replaying things. conversations, worries, tomorrow's to-do list.

here's something I keep reminding myself: you don't have to stay awake to keep the world running. God never clocks out. He's not tired, and He's not worried.

so you can put it down. all of it. just for tonight.

breathe in slowly. breathe out even slower. tell Him the one thing that's heaviest, and then let Him hold it while you sleep.

you're safe. goodnight 🤍`,
      id: `hai, kamu.

udah larut ya? badanmu capek tapi pikiranmu terus muter ulang banyak hal. obrolan, kekhawatiran, daftar tugas besok.

ada satu hal yang terus aku ingatkan ke diriku sendiri: kamu nggak perlu tetap terjaga supaya dunia tetap berjalan. Tuhan nggak pernah "pulang kerja". Dia nggak capek, dan Dia nggak khawatir.

jadi kamu boleh menaruhnya. semuanya. cuma untuk malam ini.

tarik napas pelan-pelan. hembuskan lebih pelan lagi. ceritakan ke Dia satu hal yang paling berat, lalu biarkan Dia yang memegangnya selama kamu tidur.

kamu aman. selamat tidur 🤍`,
      zh: `嗨，你。

很晚了吧？身体很累，脑子却一直在重播：那些对话、那些担心、明天的待办清单。

有一件事我常常提醒自己：你不需要醒着，世界才能继续运转。神从来不下班。祂不累，也不担心。

所以你可以放下了。全部放下。就今晚。

慢慢吸一口气，再更慢地呼出来。把最沉重的那件事告诉祂，然后在你睡着的时候，让祂替你拿着。

你很安全。晚安 🤍`,
    },
    verse: {
      reference: "Psalm 4:8",
      text: "I will both lay me down in peace, and sleep: for thou, LORD, only makest me dwell in safety.",
      tr: {
        id: "Dengan tenteram aku mau membaringkan diri, lalu segera tidur, sebab hanya Engkaulah, ya TUHAN, yang membiarkan aku diam dengan aman.",
        zh: "我必安然躺下睡觉，因为独有你耶和华使我安然居住。",
      },
    },
  },
  {
    id: "behind",
    when: { en: "you feel behind everyone", id: "kamu merasa tertinggal dari semua orang", zh: "你觉得自己落后于所有人" },
    seal: "🐢",
    color: "#bbf7d0",
    body: {
      en: `hey.

I know the feeling. scrolling and seeing everyone graduating, getting married, getting the job, moving forward, while you feel stuck in the same chapter.

but remember Abraham waited 25 years for a promise. Joseph spent 13 years in a pit and a prison before the palace. Moses was 80 when his real calling started.

God isn't running late on your story. He's not comparing your page 12 to someone else's page 200.

you're not behind. you're right where He's still working.

be gentle with yourself today 🌱`,
      id: `hei.

aku tahu rasanya. scroll medsos dan lihat semua orang wisuda, menikah, dapat kerja, terus maju, sementara kamu merasa terjebak di bab yang sama.

tapi ingat, Abraham menunggu 25 tahun untuk sebuah janji. Yusuf menghabiskan 13 tahun di sumur dan penjara sebelum sampai ke istana. Musa umurnya 80 waktu panggilan sebenarnya dimulai.

Tuhan nggak terlambat dalam ceritamu. Dia nggak membandingkan halaman 12 milikmu dengan halaman 200 milik orang lain.

kamu nggak tertinggal. kamu ada tepat di tempat Dia masih bekerja.

hari ini, lembutlah pada dirimu sendiri 🌱`,
      zh: `嘿。

我懂那种感觉。刷手机看到别人毕业、结婚、找到工作、一直往前走，而你觉得自己卡在同一章。

可是记得吗？亚伯拉罕为一个应许等了 25 年。约瑟在坑里和监狱里待了 13 年，才走进王宫。摩西 80 岁时，真正的呼召才开始。

神在你的故事里没有迟到。祂不会拿你的第 12 页去比别人的第 200 页。

你没有落后。你正在祂还在动工的地方。

今天对自己温柔一点吧 🌱`,
    },
    verse: {
      reference: "Philippians 1:6",
      text: "Being confident of this very thing, that he which hath begun a good work in you will perform it until the day of Jesus Christ.",
      tr: {
        id: "Akan hal ini aku yakin sepenuhnya, yaitu Ia, yang memulai pekerjaan yang baik di antara kamu, akan meneruskannya sampai pada akhirnya pada hari Kristus Yesus.",
        zh: "我深信那在你们心里动了善工的，必成全这工，直到耶稣基督的日子。",
      },
    },
  },
  {
    id: "messed-up",
    when: { en: "you messed up", id: "kamu baru saja berbuat salah", zh: "你搞砸了" },
    seal: "🩹",
    color: "#fecdd3",
    body: {
      en: `oh, friend.

first, breathe. it's okay.

I know you're probably replaying it over and over, thinking "how could I do that again?"

but here's the thing. Peter denied Jesus three times, and Jesus made him breakfast. David failed in a huge way, and God still called him a man after His own heart.

you're not the first person to fall, and you're not too far to come back.

say sorry where you need to. make it right if you can. then let grace actually be grace.

today is a new morning. literally 🤍`,
      id: `oh, temanku.

pertama, tarik napas. nggak apa-apa.

aku tahu kamu mungkin terus memutar ulang kejadiannya sambil mikir, "kok bisa aku ngelakuin itu lagi?"

tapi dengar ini. Petrus menyangkal Yesus tiga kali, dan Yesus membuatkan dia sarapan. Daud gagal dengan cara yang sangat besar, dan Tuhan tetap menyebutnya orang yang berkenan di hati-Nya.

kamu bukan orang pertama yang jatuh, dan kamu belum terlalu jauh untuk kembali.

minta maaf kalau memang perlu. perbaiki kalau bisa. lalu biarkan kasih karunia benar-benar jadi kasih karunia.

hari ini pagi yang baru. beneran 🤍`,
      zh: `噢，朋友。

先深呼吸。没关系的。

我知道你可能一遍又一遍地回想，心里想着：“我怎么又这样了？”

可是你看，彼得三次不认耶稣，耶稣却为他预备了早餐。大卫跌得很重，神仍然称他为合神心意的人。

你不是第一个跌倒的人，你也还没有远到回不来。

该道歉的地方就道歉，能弥补的就去弥补。然后，让恩典真的成为恩典。

今天是新的早晨，真的是 🤍`,
    },
    verse: {
      reference: "Lamentations 3:22-23",
      text: "It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness.",
      tr: {
        id: "Tak berkesudahan kasih setia TUHAN, tak habis-habisnya rahmat-Nya, selalu baru tiap pagi; besar kesetiaan-Mu!",
        zh: "我们不至消灭，是出于耶和华诸般的慈爱，是因他的怜悯不至断绝。每早晨这都是新的；你的诚实极其广大！",
      },
    },
  },
  {
    id: "invisible",
    when: { en: "you feel invisible", id: "kamu merasa nggak terlihat", zh: "你觉得没有人看见你" },
    seal: "👀",
    color: "#fde68a",
    body: {
      en: `hi, I see you.

and more importantly, He does.

remember Hagar? alone in the desert, running away, no one on her side. and God came looking for her. she ended up giving Him a name: the God who sees me.

maybe no one noticed how hard you tried today. maybe nobody asked how you're really doing.

but God knows the number of hairs on your head. He notices the small things you do when no one's watching.

you are not background. you are not forgotten. you are seen 🌸`,
      id: `hai, aku lihat kamu.

dan yang lebih penting, Dia juga melihatmu.

ingat Hagar? sendirian di padang gurun, kabur, nggak ada yang membelanya. dan Tuhan datang mencarinya. akhirnya dia memberi Tuhan sebuah nama: Allah yang melihat aku.

mungkin nggak ada yang sadar seberapa keras kamu berusaha hari ini. mungkin nggak ada yang nanya kabarmu yang sebenarnya.

tapi Tuhan tahu jumlah rambut di kepalamu. Dia memperhatikan hal-hal kecil yang kamu lakukan waktu nggak ada yang melihat.

kamu bukan sekadar latar belakang. kamu nggak dilupakan. kamu terlihat 🌸`,
      zh: `嗨，我看见你了。

更重要的是，祂也看见你。

还记得夏甲吗？一个人在旷野里逃跑，没有人站在她那边。可是神来找她。最后她给神起了一个名字：看顾我的神。

也许今天没有人注意到你有多努力。也许没有人问过你，你真正过得怎么样。

但神知道你头上有多少根头发。祂留意你在没人看见时做的那些小事。

你不是背景。你没有被遗忘。你被看见了 🌸`,
    },
    verse: {
      reference: "Genesis 16:13",
      text: "And she called the name of the LORD that spake unto her, Thou God seest me.",
      tr: {
        id: "Kemudian Hagar menamakan TUHAN yang telah berfirman kepadanya itu dengan sebutan: \"Engkaulah Allah yang melihat aku.\"",
        zh: "夏甲就称那对她说话的耶和华为“看顾人的神”。",
      },
    },
  },
  {
    id: "overthinking",
    when: { en: "you're overthinking", id: "kamu lagi overthinking", zh: "你想太多" },
    seal: "🌀",
    color: "#ddd6fe",
    body: {
      en: `okay, pause.

your mind is doing that thing again, isn't it? running through every "what if," rereading that text, imagining every way it could go wrong.

let's try something. what's actually true right now? not what might happen. what's true.

God is still good. you are still loved. this moment is still okay.

you don't have to solve all of it tonight. you just have to take the next small step.

and maybe drink some water. and maybe put your phone down for a bit 😌`,
      id: `oke, berhenti sebentar.

pikiranmu lagi begitu lagi ya? muter semua "gimana kalau", baca ulang chat itu, membayangkan semua kemungkinan yang bisa salah.

yuk coba sesuatu. apa yang sebenarnya benar saat ini? bukan yang mungkin terjadi. yang benar.

Tuhan tetap baik. kamu tetap dikasihi. saat ini tetap baik-baik saja.

kamu nggak harus menyelesaikan semuanya malam ini. kamu cuma perlu ambil satu langkah kecil berikutnya.

dan mungkin minum air dulu. dan mungkin taruh HP-mu sebentar 😌`,
      zh: `好，先停一下。

你的脑子又开始了，对吧？把每一个“万一”都想一遍，反复看那条消息，想象所有可能出错的情况。

我们试试看：现在真正确定的是什么？不是可能会发生的事，而是真实的事。

神依然美好。你依然被爱。此刻依然没事。

你不必今晚就把一切都解决。你只需要走下一小步。

也许先喝点水。也许把手机放下一会儿 😌`,
    },
    verse: {
      reference: "Philippians 4:8",
      text: "Finally, brethren, whatsoever things are true, whatsoever things are honest, whatsoever things are just, whatsoever things are pure, whatsoever things are lovely, whatsoever things are of good report; if there be any virtue, and if there be any praise, think on these things.",
      tr: {
        id: "Jadi akhirnya, saudara-saudara, semua yang benar, semua yang mulia, semua yang adil, semua yang suci, semua yang manis, semua yang sedap didengar, semua yang disebut kebajikan dan patut dipuji, pikirkanlah semuanya itu.",
        zh: "弟兄们，我还有未尽的话：凡是真实的、可敬的、公义的、清洁的、可爱的、有美名的，若有什么德行，若有什么称赞，这些事你们都要思念。",
      },
    },
  },
  {
    id: "happy",
    when: { en: "you're really happy", id: "kamu lagi bahagia banget", zh: "你非常开心" },
    seal: "🎈",
    color: "#fbcfe8",
    body: {
      en: `yay!! 🎉

I love this for you. really.

sometimes we only remember to talk to God when things are hard. but He loves being part of your happy days too.

so enjoy it fully. don't wait for something to go wrong. don't feel guilty for being glad.

take a second and say thank you. for the thing that made you smile, for the people in it, for the little details.

every good thing came from Him. this one too ☀️`,
      id: `yeay!! 🎉

aku ikut senang banget. beneran.

kadang kita cuma ingat ngobrol sama Tuhan kalau lagi susah. padahal Dia juga senang jadi bagian dari hari-hari bahagiamu.

jadi nikmati sepenuhnya. jangan nunggu sesuatu jadi salah. jangan merasa bersalah karena bahagia.

luangkan sebentar dan ucapkan terima kasih. untuk hal yang bikin kamu senyum, untuk orang-orang di dalamnya, untuk detail-detail kecilnya.

setiap hal baik datang dari Dia. yang ini juga ☀️`,
      zh: `耶！！🎉

我真的为你高兴。

有时候我们只在难过的时候才记得跟神说话。可是祂也很喜欢参与你开心的日子。

所以好好享受吧。不用等着什么出错，也不用因为快乐而内疚。

花一点时间说声谢谢：为那件让你微笑的事，为其中的人，为那些小小的细节。

每一样美好的事都从祂而来。这一件也是 ☀️`,
    },
    verse: {
      reference: "James 1:17",
      text: "Every good gift and every perfect gift is from above, and cometh down from the Father of lights.",
      tr: {
        id: "Setiap pemberian yang baik dan setiap anugerah yang sempurna, datangnya dari atas, diturunkan dari Bapa segala terang.",
        zh: "各样美善的恩赐和各样全备的赏赐都是从上头来的，从众光之父那里降下来的。",
      },
    },
  },
  {
    id: "miss-someone",
    when: { en: "you miss someone", id: "kamu kangen seseorang", zh: "你想念某个人" },
    seal: "🤍",
    color: "#bae6fd",
    body: {
      en: `hey, it's okay to miss them.

missing someone just means they mattered. it means love had somewhere to go, and now it doesn't know where to land.

Jesus wept at His friend's grave, even though He knew He was about to bring him back. He didn't rush the sadness. He sat in it with them.

so you don't have to rush either.

cry if you need to. look at the photos. tell God about them. He's close to the brokenhearted, not far from them.

you're not alone in this ache 🤍`,
      id: `hei, nggak apa-apa kangen sama mereka.

kangen sama seseorang artinya mereka berarti. artinya cinta itu punya tujuan, dan sekarang dia nggak tahu harus mendarat di mana.

Yesus menangis di kubur sahabat-Nya, padahal Dia tahu sebentar lagi Dia akan membangkitkannya. Dia nggak buru-buru melewati kesedihan itu. Dia duduk di dalamnya bersama mereka.

jadi kamu juga nggak perlu buru-buru.

menangislah kalau perlu. lihat foto-fotonya. ceritakan tentang mereka ke Tuhan. Dia dekat dengan orang yang patah hati, bukan jauh.

kamu nggak sendirian dalam rasa sakit ini 🤍`,
      zh: `嘿，想念他们是没关系的。

想念一个人，只是说明他们很重要。说明爱曾经有个去处，而现在不知道该落在哪里。

耶稣在朋友的坟前哭了，虽然祂知道自己马上要让他复活。祂没有催促那份悲伤，而是和他们一起留在其中。

所以你也不用着急。

需要哭就哭吧。看看那些照片。把他们的事告诉神。祂靠近伤心的人，不是远离他们。

在这份心痛里，你并不孤单 🤍`,
    },
    verse: {
      reference: "Psalm 147:3",
      text: "He healeth the broken in heart, and bindeth up their wounds.",
      tr: {
        id: "Ia menyembuhkan orang-orang yang patah hati dan membalut luka-luka mereka.",
        zh: "他医好伤心的人，裹好他们的伤处。",
      },
    },
  },
  {
    id: "future",
    when: { en: "you're scared of the future", id: "kamu takut akan masa depan", zh: "你害怕未来" },
    seal: "☁️",
    color: "#e2e8f0",
    body: {
      en: `hi.

the future feels foggy right now, huh? so many questions. what if it doesn't work out? what if I choose wrong?

here's what helps me: I don't know what's coming, but I know who's already there.

the Israelites didn't get a map. they got a pillar of cloud by day and fire by night. just enough light for the next step.

you don't need to see the whole road. you just need to follow the One who does.

whatever's ahead, you won't walk through it alone 🕯️`,
      id: `hai.

masa depan rasanya berkabut ya sekarang? banyak banget pertanyaan. gimana kalau nggak berhasil? gimana kalau aku salah pilih?

ini yang menolong aku: aku nggak tahu apa yang akan datang, tapi aku tahu siapa yang sudah ada di sana.

bangsa Israel nggak dikasih peta. mereka dikasih tiang awan di siang hari dan tiang api di malam hari. cukup terang untuk langkah berikutnya.

kamu nggak perlu melihat seluruh jalan. kamu cuma perlu mengikuti Dia yang melihatnya.

apa pun yang ada di depan, kamu nggak akan melewatinya sendirian 🕯️`,
      zh: `嗨。

未来现在看起来雾蒙蒙的，对吧？好多问题：万一不顺利呢？万一我选错了呢？

对我有帮助的是这一点：我不知道前面会发生什么，但我知道谁已经在那里了。

以色列人没有拿到地图。他们得到的是白天的云柱、夜间的火柱，刚好够照亮下一步。

你不需要看清整条路，只需要跟随那位看得见的主。

不管前面是什么，你都不会独自走过 🕯️`,
    },
    verse: {
      reference: "Isaiah 43:2",
      text: "When thou passest through the waters, I will be with thee; and through the rivers, they shall not overflow thee.",
      tr: {
        id: "Apabila engkau menyeberang melalui air, Aku akan menyertai engkau, atau melalui sungai-sungai, engkau tidak akan dihanyutkan.",
        zh: "你从水中经过，我必与你同在；你趟过江河，水必不漫过你。",
      },
    },
  },
  {
    id: "dont-feel-like-praying",
    when: { en: "you don't feel like praying", id: "kamu lagi nggak pengen berdoa", zh: "你不想祷告" },
    seal: "🍂",
    color: "#fed7aa",
    body: {
      en: `that's okay. really.

some days the words just don't come. you feel dry, distracted, maybe even a little far away.

can I tell you a secret? you don't have to perform for God. Hannah prayed with no sound at all, and He heard her.

you can just sit. you can just say "hi God, I'm here." you can just sigh.

and when you don't know what to say, the Spirit Himself prays for you.

showing up tired still counts 🤍`,
      id: `nggak apa-apa. beneran.

ada hari-hari di mana kata-kata nggak keluar. kamu merasa kering, nggak fokus, mungkin bahkan sedikit jauh.

boleh aku kasih tahu satu rahasia? kamu nggak perlu tampil sempurna di depan Tuhan. Hana berdoa tanpa suara sama sekali, dan Dia mendengarnya.

kamu boleh cuma duduk. kamu boleh cuma bilang "hai Tuhan, aku di sini." kamu boleh cuma menghela napas.

dan waktu kamu nggak tahu harus bilang apa, Roh Kudus sendiri yang berdoa untukmu.

datang dalam keadaan capek pun tetap dihitung 🤍`,
      zh: `没关系的，真的。

有些日子就是说不出话来。你觉得干枯、分心，甚至觉得有点远。

可以告诉你一个秘密吗？你不需要在神面前表现。哈拿祷告时一点声音都没有，神却听见了她。

你可以只是坐着。可以只说一句：“嗨，神，我在这里。”可以只是叹一口气。

当你不知道该说什么的时候，圣灵亲自为你祷告。

就算带着疲惫来到祂面前，也是算数的 🤍`,
    },
    verse: {
      reference: "Romans 8:26",
      text: "Likewise the Spirit also helpeth our infirmities: for we know not what we should pray for as we ought: but the Spirit itself maketh intercession for us with groanings which cannot be uttered.",
      tr: {
        id: "Demikian juga Roh membantu kita dalam kelemahan kita; sebab kita tidak tahu, bagaimana sebenarnya harus berdoa; tetapi Roh sendiri berdoa untuk kita kepada Allah dengan keluhan-keluhan yang tidak terucapkan.",
        zh: "况且，我们的软弱有圣灵帮助；我们本不晓得当怎样祷告，只是圣灵亲自用说不出来的叹息替我们祷告。",
      },
    },
  },
];
