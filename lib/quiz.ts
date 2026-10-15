// Bible quiz content in English, Indonesian, and Chinese.
import type { L } from "./i18n/config";

export type Question = {
  q: L;
  options: L[]; // first option is the correct one; shuffled at play time
  why: L;
  story?: string; // Bible Stories slug to read more
};

export type Person = {
  name: L;
  clues: [L, L, L]; // from hardest to easiest
  story?: string;
};

export type VerseBlank = {
  reference: string;
  before: L;
  after: L;
  options: L[]; // first is correct
};

const b = (en: string, id: string, zh: string): L => ({ en, id, zh });

export const questions: Question[] = [
  {
    q: b("What did God create on the very first day?", "Apa yang Tuhan ciptakan di hari pertama?", "神在第一天创造了什么？"),
    options: [b("Light", "Terang", "光"), b("The sun and moon", "Matahari dan bulan", "太阳和月亮"), b("Animals", "Binatang", "动物"), b("People", "Manusia", "人")],
    why: b("\"Let there be light: and there was light.\" The sun and moon came on day four.", "\"Jadilah terang.\" Matahari dan bulan baru dibuat di hari keempat.", "“要有光”，就有了光。太阳和月亮是第四天才造的。"),
    story: "in-the-beginning",
  },
  {
    q: b("After Adam and Eve hid, what did God ask first?", "Setelah Adam dan Hawa bersembunyi, apa yang pertama Tuhan tanyakan?", "亚当和夏娃躲起来以后，神先问了什么？"),
    options: [b("\"Where are you?\"", "\"Di manakah engkau?\"", "“你在哪里？”"), b("\"Why did you eat it?\"", "\"Kenapa kamu memakannya?\"", "“你为什么吃？”"), b("\"Are you hungry?\"", "\"Apakah kamu lapar?\"", "“你饿了吗？”"), b("\"Who are you?\"", "\"Siapa kamu?\"", "“你是谁？”")],
    why: b("God came looking for them: \"Where art thou?\" (Genesis 3:9)", "Tuhan datang mencari mereka: \"Di manakah engkau?\" (Kejadian 3:9)", "神亲自来找他们：“你在哪里？”（创世记 3:9）"),
    story: "where-are-you",
  },
  {
    q: b("What sign did God give Noah as His promise?", "Tanda apa yang Tuhan berikan kepada Nuh sebagai janji-Nya?", "神给挪亚什么记号作为祂的应许？"),
    options: [b("A rainbow", "Pelangi", "彩虹"), b("A dove", "Burung merpati", "鸽子"), b("A star", "Bintang", "星星"), b("A burning bush", "Semak yang menyala", "燃烧的荆棘")],
    why: b("God set His bow in the cloud: never again a flood to destroy the earth.", "Tuhan menaruh busur-Nya di awan: tidak akan ada lagi air bah yang memusnahkan bumi.", "神把虹放在云彩中：不再有洪水毁灭大地。"),
    story: "noah-and-the-rainbow",
  },
  {
    q: b("Which bird came back to Noah with an olive leaf?", "Burung apa yang kembali ke Nuh membawa daun zaitun?", "哪一种鸟叼着橄榄叶回到挪亚那里？"),
    options: [b("A dove", "Burung merpati", "鸽子"), b("A raven", "Burung gagak", "乌鸦"), b("An eagle", "Burung rajawali", "老鹰"), b("A sparrow", "Burung pipit", "麻雀")],
    why: b("The dove came back with a fresh olive leaf, so Noah knew the water was going down.", "Merpati kembali dengan daun zaitun segar, jadi Nuh tahu airnya sudah surut.", "鸽子叼回一片新拧下来的橄榄叶，挪亚就知道水退了。"),
    story: "noah-and-the-rainbow",
  },
  {
    q: b("God took Abraham outside at night and told him to count the…", "Tuhan membawa Abraham keluar di malam hari dan menyuruhnya menghitung…", "神在夜里领亚伯拉罕到外面，叫他数一数…"),
    options: [b("Stars", "Bintang", "星星"), b("Sheep", "Domba", "羊"), b("Trees", "Pohon", "树"), b("Coins", "Koin", "钱币")],
    why: b("\"So shall thy seed be.\" His family would be as many as the stars.", "\"Demikianlah banyaknya nanti keturunanmu.\" Sebanyak bintang di langit.", "“你的后裔将要如此。”他的后代要像天上的星那样多。"),
    story: "count-the-stars",
  },
  {
    q: b("What does the name Isaac mean?", "Apa arti nama Ishak?", "“以撒”这个名字是什么意思？"),
    options: [b("Laughter", "Tertawa", "喜笑"), b("Gift", "Hadiah", "礼物"), b("Promise", "Janji", "应许"), b("Blessing", "Berkat", "祝福")],
    why: b("Sarah laughed when she heard she'd have a baby at 90. Then God turned it into joy.", "Sara tertawa waktu dengar akan punya bayi di usia 90. Lalu Tuhan mengubahnya jadi sukacita.", "撒拉听说自己 90 岁要生孩子时笑了。后来神把它变成了喜乐。"),
    story: "count-the-stars",
  },
  {
    q: b("On the mountain, what did God provide in Isaac's place?", "Di atas gunung, apa yang Tuhan sediakan sebagai ganti Ishak?", "在山上，神预备了什么来代替以撒？"),
    options: [b("A ram", "Seekor domba jantan", "一只公羊"), b("A goat", "Seekor kambing", "一只山羊"), b("A dove", "Seekor merpati", "一只鸽子"), b("A calf", "Seekor anak sapi", "一头牛犊")],
    why: b("A ram caught by its horns in a thicket. Abraham named the place \"The LORD will provide.\"", "Domba jantan yang tanduknya tersangkut di belukar. Abraham menamai tempat itu \"TUHAN menyediakan.\"", "一只角扣在稠密小树中的公羊。亚伯拉罕给那地方起名叫“耶和华以勒”（耶和华必预备）。"),
    story: "god-will-provide",
  },
  {
    q: b("After wrestling all night, Jacob got a new name. What was it?", "Setelah bergulat semalaman, Yakub mendapat nama baru. Apa namanya?", "雅各摔跤了一整夜，得到了一个新名字。是什么？"),
    options: [b("Israel", "Israel", "以色列"), b("Abraham", "Abraham", "亚伯拉罕"), b("Judah", "Yehuda", "犹大"), b("Joseph", "Yusuf", "约瑟")],
    why: b("\"Thy name shall be called no more Jacob, but Israel.\" (Genesis 32:28)", "\"Namamu tidak akan disebutkan lagi Yakub, tetapi Israel.\" (Kejadian 32:28)", "“你的名不要再叫雅各，要叫以色列。”（创世记 32:28）"),
    story: "wrestling-with-god",
  },
  {
    q: b("What did Joseph's brothers tell their father happened to him?", "Apa yang dikatakan saudara-saudara Yusuf kepada ayah mereka?", "约瑟的哥哥们告诉父亲约瑟怎么了？"),
    options: [b("A wild animal killed him", "Dia diterkam binatang buas", "被野兽吃了"), b("Robbers took him", "Dia diculik perampok", "被强盗抓走了"), b("He ran away", "Dia kabur dari rumah", "他离家出走了"), b("He got lost", "Dia tersesat", "他迷路了")],
    why: b("They dipped his colorful coat in goat's blood to fool Jacob.", "Mereka mencelupkan jubah warna-warninya ke darah kambing untuk menipu Yakub.", "他们把他的彩衣蘸上山羊的血，骗了雅各。"),
    story: "joseph-meant-for-good",
  },
  {
    q: b("Pharaoh's dream meant seven years of plenty, then seven years of…", "Mimpi Firaun berarti tujuh tahun kelimpahan, lalu tujuh tahun…", "法老的梦表示七个丰年，之后是七个…"),
    options: [b("Famine", "Kelaparan", "荒年"), b("War", "Perang", "战争之年"), b("Floods", "Banjir", "洪水之年"), b("Darkness", "Kegelapan", "黑暗之年")],
    why: b("Joseph saved food during the good years, and Egypt survived the famine.", "Yusuf menyimpan makanan di tahun-tahun baik, jadi Mesir selamat dari kelaparan.", "约瑟在丰年储存粮食，埃及就度过了饥荒。"),
    story: "joseph-meant-for-good",
  },
  {
    q: b("When Moses asked God's name, what did God say?", "Waktu Musa menanyakan nama Tuhan, apa jawab-Nya?", "摩西问神的名字，神怎么回答？"),
    options: [b("\"I AM THAT I AM\"", "\"AKU ADALAH AKU\"", "“我是自有永有的”"), b("\"The Almighty One\"", "\"Yang Mahakuasa\"", "“全能者”"), b("\"The Holy One\"", "\"Yang Mahakudus\"", "“至圣者”"), b("\"The Great King\"", "\"Raja yang Agung\"", "“大君王”")],
    why: b("God answered from the burning bush: \"I AM THAT I AM.\" (Exodus 3:14)", "Tuhan menjawab dari semak yang menyala: \"AKU ADALAH AKU.\" (Keluaran 3:14)", "神从燃烧的荆棘中回答：“我是自有永有的。”（出埃及记 3:14）"),
    story: "the-burning-bush",
  },
  {
    q: b("What did the Israelites call the bread from heaven?", "Apa nama roti dari surga yang dimakan bangsa Israel?", "以色列人怎么称呼从天上降下的食物？"),
    options: [b("Manna", "Manna", "吗哪"), b("Matzah", "Matzah", "无酵饼"), b("Honeycake", "Kue madu", "蜜饼"), b("Shewbread", "Roti sajian", "陈设饼")],
    why: b("\"Manna\" basically means \"What is it?\" They named their food \"What is this?\" 😄", "\"Manna\" kira-kira artinya \"Apa ini?\" Mereka menamai makanannya \"Apa ini?\" 😄", "“吗哪”的意思差不多是“这是什么？”他们给食物起名叫“这是什么” 😄"),
    story: "manna-daily-bread",
  },
  {
    q: b("What did Rahab hang in her window to be saved?", "Apa yang Rahab gantung di jendelanya supaya selamat?", "喇合在窗户上挂了什么，好让全家得救？"),
    options: [b("A scarlet cord", "Tali kirmizi (merah)", "一条朱红线绳"), b("A white flag", "Bendera putih", "一面白旗"), b("A lamp", "Pelita", "一盏灯"), b("A golden bell", "Lonceng emas", "一个金铃")],
    why: b("Everyone in the house with the scarlet cord was kept safe when Jericho fell.", "Semua orang di rumah dengan tali merah itu selamat waktu Yerikho runtuh.", "耶利哥倒塌时，挂着朱红线绳的那家人都平安无事。"),
    story: "rahab-scarlet-thread",
  },
  {
    q: b("How many men did Gideon end up fighting with?", "Berapa banyak orang yang akhirnya ikut berperang bersama Gideon?", "基甸最后带了多少人去打仗？"),
    options: [b("300", "300", "300 人"), b("3,000", "3.000", "3,000 人"), b("32,000", "32.000", "32,000 人"), b("12", "12", "12 人")],
    why: b("God cut the army from 32,000 to 300, so everyone would know the victory was His.", "Tuhan mengurangi pasukan dari 32.000 jadi 300, supaya semua tahu kemenangan itu dari-Nya.", "神把军队从 32,000 人减到 300 人，让大家知道得胜是出于祂。"),
    story: "gideon-mighty-warrior",
  },
  {
    q: b("Ruth said \"Where you go, I will go\" to…", "Rut berkata \"Ke mana engkau pergi, ke situ juga aku pergi\" kepada…", "路得对谁说“你往哪里去，我也往哪里去”？"),
    options: [b("Naomi", "Naomi", "拿俄米"), b("Boaz", "Boas", "波阿斯"), b("Orpah", "Orpa", "俄珥巴"), b("Hannah", "Hana", "哈拿")],
    why: b("Ruth chose to stay with her grieving mother-in-law and follow her God.", "Rut memilih tetap bersama ibu mertuanya yang berduka dan mengikuti Allahnya.", "路得选择留在悲伤的婆婆身边，跟随她的神。"),
    story: "ruth-and-naomi",
  },
  {
    q: b("Ruth's great-grandson became…", "Cicit Rut kemudian menjadi…", "路得的曾孙后来成为了…"),
    options: [b("King David", "Raja Daud", "大卫王"), b("King Solomon", "Raja Salomo", "所罗门王"), b("The prophet Samuel", "Nabi Samuel", "先知撒母耳"), b("Moses", "Musa", "摩西")],
    why: b("Ruth → Obed → Jesse → David. A foreigner in the line of Israel's greatest king, and of Jesus.", "Rut → Obed → Isai → Daud. Orang asing di garis keturunan raja terbesar Israel, dan Yesus.", "路得 → 俄备得 → 耶西 → 大卫。一个外邦女子，竟在以色列最伟大君王、也是耶稣的家谱里。"),
    story: "ruth-and-naomi",
  },
  {
    q: b("Hannah prayed so deeply that Eli the priest thought she was…", "Hana berdoa begitu dalam sampai Imam Eli mengira dia…", "哈拿祷告得太投入，祭司以利以为她…"),
    options: [b("Drunk", "Mabuk", "喝醉了"), b("Sick", "Sakit", "生病了"), b("Asleep", "Tertidur", "睡着了"), b("Lost", "Tersesat", "迷路了")],
    why: b("Her lips moved but no sound came out. She was pouring out her soul.", "Bibirnya bergerak tapi tidak bersuara. Dia sedang mencurahkan isi hatinya.", "她嘴唇在动，却没有出声。她是在神面前倾心吐意。"),
    story: "hannah-prays",
  },
  {
    q: b("When God called young Samuel at night, who did Samuel think it was?", "Waktu Tuhan memanggil Samuel kecil di malam hari, Samuel mengira siapa yang memanggil?", "神在夜里呼唤小撒母耳，撒母耳以为是谁在叫他？"),
    options: [b("Eli", "Eli", "以利"), b("His mother", "Ibunya", "他的母亲"), b("An angel", "Malaikat", "天使"), b("A thief", "Pencuri", "小偷")],
    why: b("He ran to Eli three times before saying \"Speak; for thy servant heareth.\"", "Dia lari ke Eli tiga kali sebelum berkata \"Berbicaralah, sebab hamba-Mu ini mendengar.\"", "他跑到以利那里三次，后来才说：“请说，仆人敬听。”"),
    story: "speak-lord",
  },
  {
    q: b("How many smooth stones did David pick up?", "Berapa batu licin yang David ambil?", "大卫捡了几块光滑的石子？"),
    options: [b("Five", "Lima", "五块"), b("One", "Satu", "一块"), b("Three", "Tiga", "三块"), b("Seven", "Tujuh", "七块")],
    why: b("Five stones from the stream. He only needed one. 🎯", "Lima batu dari sungai. Dia cuma butuh satu. 🎯", "从溪中挑了五块石子，结果只用了一块 🎯"),
    story: "david-and-goliath",
  },
  {
    q: b("Which prophet told King David \"You are the man!\"?", "Nabi mana yang berkata kepada Raja Daud \"Engkaulah orang itu!\"?", "哪位先知对大卫王说“你就是那人！”？"),
    options: [b("Nathan", "Natan", "拿单"), b("Samuel", "Samuel", "撒母耳"), b("Elijah", "Elia", "以利亚"), b("Isaiah", "Yesaya", "以赛亚")],
    why: b("Nathan told a story about a stolen lamb, then pointed at David.", "Natan bercerita tentang anak domba yang dicuri, lalu menunjuk Daud.", "拿单先讲了一个小母羊羔被抢的故事，然后指着大卫。"),
    story: "thou-art-the-man",
  },
  {
    q: b("When God said \"Ask what I shall give thee,\" Solomon asked for…", "Waktu Tuhan berkata \"Mintalah apa yang hendak Kuberikan,\" Salomo meminta…", "神说“你愿我赐你什么，你可以求”，所罗门求了…"),
    options: [b("Wisdom", "Hikmat", "智慧"), b("Riches", "Kekayaan", "财富"), b("A long life", "Umur panjang", "长寿"), b("Victory over enemies", "Kemenangan atas musuh", "战胜仇敌")],
    why: b("An understanding heart. God was pleased and gave him riches and honor too.", "Hati yang paham. Tuhan senang dan memberinya kekayaan dan kemuliaan juga.", "一颗智慧明辨的心。神很喜悦，又加给他富足和尊荣。"),
    story: "solomon-asks-for-wisdom",
  },
  {
    q: b("When Elijah wanted to give up, an angel told him to…", "Waktu Elia ingin menyerah, malaikat menyuruhnya…", "以利亚想放弃的时候，天使叫他…"),
    options: [b("Get up and eat", "Bangun dan makan", "起来吃"), b("Go back and fight", "Kembali dan bertempur", "回去战斗"), b("Pray harder", "Berdoa lebih keras", "更用力祷告"), b("Climb a mountain", "Mendaki gunung", "去爬山")],
    why: b("\"Arise and eat; because the journey is too great for thee.\" Rest and food first. 🍞", "\"Bangunlah, makanlah! Sebab kalau tidak, perjalananmu nanti terlalu jauh.\" Istirahat dan makan dulu. 🍞", "“起来吃吧！因为你当走的路甚远。”先休息、先吃饭 🍞"),
    story: "under-the-broom-tree",
  },
  {
    q: b("How many times did Naaman dip himself in the Jordan River?", "Berapa kali Naaman membenamkan diri di Sungai Yordan?", "乃缦在约旦河里沐浴了几次？"),
    options: [b("Seven", "Tujuh", "七次"), b("Three", "Tiga", "三次"), b("Ten", "Sepuluh", "十次"), b("Once", "Sekali", "一次")],
    why: b("After the seventh time, his skin became like a little child's.", "Setelah yang ketujuh kalinya, kulitnya jadi seperti kulit anak kecil.", "第七次之后，他的皮肉复原，像小孩子的一样。"),
    story: "naaman-wash-and-be-clean",
  },
  {
    q: b("When God sent Jonah to Nineveh, where did he try to go instead?", "Waktu Tuhan mengutus Yunus ke Niniwe, ke mana dia malah pergi?", "神差约拿去尼尼微，他却想逃到哪里？"),
    options: [b("Tarshish", "Tarsis", "他施"), b("Egypt", "Mesir", "埃及"), b("Jerusalem", "Yerusalem", "耶路撒冷"), b("Babylon", "Babel", "巴比伦")],
    why: b("Tarshish was the opposite direction. He bought a ticket to the other side of the map. 🚢", "Tarsis itu arah sebaliknya. Dia beli tiket ke ujung peta yang lain. 🚢", "他施在完全相反的方向。他买了一张去地图另一头的船票 🚢"),
    story: "running-from-god",
  },
  {
    q: b("Who told Esther \"Who knows whether you have come for such a time as this?\"", "Siapa yang berkata kepada Ester \"Siapa tahu, mungkin justru untuk saat yang seperti ini\"?", "谁对以斯帖说“焉知你得了王后的位分，不是为现今的机会吗？”"),
    options: [b("Mordecai", "Mordekhai", "末底改"), b("The king", "Sang raja", "国王"), b("Haman", "Haman", "哈曼"), b("Daniel", "Daniel", "但以理")],
    why: b("Her cousin Mordecai, who raised her like a daughter.", "Sepupunya Mordekhai, yang membesarkannya seperti anak sendiri.", "是她的堂兄末底改，他像养女儿一样把她养大。"),
    story: "esther-for-such-a-time",
  },
  {
    q: b("How many men did the king see walking in the fiery furnace?", "Berapa orang yang raja lihat berjalan di dalam dapur api?", "王看见火窑里有几个人在走动？"),
    options: [b("Four", "Empat", "四个"), b("Three", "Tiga", "三个"), b("Two", "Dua", "两个"), b("Seven", "Tujuh", "七个")],
    why: b("Three were thrown in, but there was a fourth \"like the Son of God.\"", "Tiga orang dilempar ke dalam, tapi ada orang keempat yang \"seperti anak dewa.\"", "扔进去的是三个人，却多了第四个，“相貌好像神子”。"),
    story: "the-fiery-furnace",
  },
  {
    q: b("How many times a day did Daniel pray by his open window?", "Berapa kali sehari Daniel berdoa di jendelanya yang terbuka?", "但以理每天在开着的窗前祷告几次？"),
    options: [b("Three", "Tiga", "三次"), b("Once", "Sekali", "一次"), b("Seven", "Tujuh", "七次"), b("Twice", "Dua", "两次")],
    why: b("Three times a day, \"as he did aforetime.\" It was already his habit.", "Tiga kali sehari, \"seperti yang biasa dilakukannya.\" Itu sudah kebiasaannya.", "一日三次，“与素常一样”。这本来就是他的习惯。"),
    story: "daniel-in-the-lions-den",
  },
  {
    q: b("Job's friends sat with him in silence for how long?", "Berapa lama sahabat-sahabat Ayub duduk diam bersamanya?", "约伯的朋友们陪他静静坐了多久？"),
    options: [b("Seven days", "Tujuh hari", "七天"), b("One hour", "Satu jam", "一小时"), b("Forty days", "Empat puluh hari", "四十天"), b("Three days", "Tiga hari", "三天")],
    why: b("Seven days and nights without a word. Honestly, the best thing they did. 🤍", "Tujuh hari tujuh malam tanpa kata. Jujur, itu hal terbaik yang mereka lakukan. 🤍", "七天七夜一言不发。老实说，这是他们做得最好的事 🤍"),
    story: "job-and-the-whirlwind",
  },
  {
    q: b("Where was baby Jesus laid after He was born?", "Di mana bayi Yesus dibaringkan setelah lahir?", "婴孩耶稣出生后被放在哪里？"),
    options: [b("In a manger", "Di palungan", "马槽里"), b("In a cradle", "Di buaian", "摇篮里"), b("In a basket", "Di keranjang", "篮子里"), b("In a bed", "Di tempat tidur", "床上")],
    why: b("A manger is a feeding trough for animals. The King slept where animals ate.", "Palungan itu tempat makan ternak. Sang Raja tidur di tempat binatang makan.", "马槽是喂牲口的槽。万王之王睡在动物吃饭的地方。"),
    story: "no-room-in-the-inn",
  },
  {
    q: b("Who were the first people the angels told about Jesus' birth?", "Siapa yang pertama kali diberi kabar oleh malaikat tentang kelahiran Yesus?", "天使最先把耶稣降生的消息告诉了谁？"),
    options: [b("Shepherds", "Para gembala", "牧羊人"), b("Kings", "Para raja", "君王"), b("Priests", "Para imam", "祭司"), b("Fishermen", "Para nelayan", "渔夫")],
    why: b("Ordinary shepherds on the night shift heard it first.", "Gembala-gembala biasa yang sedang jaga malam yang pertama mendengarnya.", "在夜里看守羊群的普通牧羊人最先听到。"),
    story: "no-room-in-the-inn",
  },
  {
    q: b("What was Jesus' first miracle?", "Apa mukjizat pertama Yesus?", "耶稣行的第一个神迹是什么？"),
    options: [b("Turning water into wine", "Mengubah air jadi anggur", "水变酒"), b("Feeding 5,000 people", "Memberi makan 5.000 orang", "喂饱五千人"), b("Walking on water", "Berjalan di atas air", "在水面上行走"), b("Healing a blind man", "Menyembuhkan orang buta", "医治瞎子")],
    why: b("At a wedding in Cana. He saved the party! 🍷", "Di pesta pernikahan di Kana. Dia menyelamatkan pestanya! 🍷", "在迦拿的婚宴上。祂救了这场婚宴！🍷"),
    story: "water-into-wine",
  },
  {
    q: b("Jesus told Nicodemus that to see God's kingdom, a person must be…", "Yesus berkata kepada Nikodemus, untuk melihat Kerajaan Allah seseorang harus…", "耶稣告诉尼哥底母，人要见神的国，就必须…"),
    options: [b("Born again", "Dilahirkan kembali", "重生"), b("A priest", "Seorang imam", "做祭司"), b("From Jerusalem", "Dari Yerusalem", "来自耶路撒冷"), b("Perfect", "Sempurna", "完美无缺")],
    why: b("A new start only God can give. Then came John 3:16.", "Awal yang baru yang hanya Tuhan bisa berikan. Lalu datanglah Yohanes 3:16.", "一个只有神能给的新开始。接着就是约翰福音 3:16。"),
    story: "nicodemus-at-night",
  },
  {
    q: b("What did the woman at the well leave behind when she ran to town?", "Apa yang ditinggalkan perempuan di sumur waktu dia lari ke kota?", "井边的妇人跑回城里时，留下了什么？"),
    options: [b("Her water jar", "Tempayannya", "她的水罐"), b("Her sandals", "Sandalnya", "她的鞋"), b("Her money", "Uangnya", "她的钱"), b("Her cloak", "Jubahnya", "她的外衣")],
    why: b("She forgot the whole reason she came, because she'd met Jesus.", "Dia lupa alasan dia datang, karena sudah bertemu Yesus.", "她连来打水的目的都忘了，因为她遇见了耶稣。"),
    story: "woman-at-the-well",
  },
  {
    q: b("What was Jesus doing when the storm hit the boat?", "Apa yang Yesus lakukan waktu badai menerjang perahu?", "风暴打到船上时，耶稣在做什么？"),
    options: [b("Sleeping on a pillow", "Tidur di atas bantal", "枕着枕头睡觉"), b("Praying", "Berdoa", "祷告"), b("Fishing", "Memancing", "钓鱼"), b("Rowing", "Mendayung", "划船")],
    why: b("Asleep on a pillow. Then: \"Peace, be still.\" 🌊", "Tidur di atas tilam. Lalu: \"Diam! Tenanglah!\" 🌊", "枕着枕头睡着了。然后说：“住了吧！静了吧！”🌊"),
    story: "peace-be-still",
  },
  {
    q: b("What did the boy bring that fed 5,000 people?", "Apa yang dibawa anak kecil itu sehingga 5.000 orang bisa makan?", "那个孩子带了什么，后来喂饱了五千人？"),
    options: [b("5 loaves and 2 fish", "5 roti dan 2 ikan", "五个饼和两条鱼"), b("2 loaves and 5 fish", "2 roti dan 5 ikan", "两个饼和五条鱼"), b("7 loaves and 3 fish", "7 roti dan 3 ikan", "七个饼和三条鱼"), b("12 loaves and 1 fish", "12 roti dan 1 ikan", "十二个饼和一条鱼")],
    why: b("Five barley loaves and two small fishes. Small things in Jesus' hands. 🐟", "Lima roti jelai dan dua ikan. Hal kecil di tangan Yesus. 🐟", "五个大麦饼、两条小鱼。小小的东西，在耶稣手中 🐟"),
    story: "five-loaves-two-fish",
  },
  {
    q: b("How many baskets of leftovers were gathered after feeding the 5,000?", "Berapa keranjang sisa makanan yang dikumpulkan setelah 5.000 orang makan?", "五千人吃饱后，剩下的零碎装了几个篮子？"),
    options: [b("Twelve", "Dua belas", "十二个"), b("Seven", "Tujuh", "七个"), b("Three", "Tiga", "三个"), b("Five", "Lima", "五个")],
    why: b("Twelve baskets. More was left over than they started with!", "Dua belas keranjang. Sisanya lebih banyak dari yang ada di awal!", "十二个篮子。剩下的比一开始的还多！"),
    story: "five-loaves-two-fish",
  },
  {
    q: b("In the Good Samaritan story, who passed by the hurt man first?", "Dalam kisah orang Samaria yang baik hati, siapa yang pertama lewat?", "在好撒玛利亚人的故事里，谁最先从受伤的人旁边经过？"),
    options: [b("A priest", "Seorang imam", "一个祭司"), b("A soldier", "Seorang prajurit", "一个士兵"), b("A merchant", "Seorang pedagang", "一个商人"), b("A tax collector", "Seorang pemungut cukai", "一个税吏")],
    why: b("A priest, then a Levite. Both passed by on the other side.", "Seorang imam, lalu seorang Lewi. Dua-duanya lewat dari seberang jalan.", "先是祭司，然后是利未人。两个人都从另一边走过去了。"),
    story: "the-good-samaritan",
  },
  {
    q: b("Why did Zacchaeus climb a tree?", "Kenapa Zakheus memanjat pohon?", "撒该为什么爬上树？"),
    options: [b("He was too short to see Jesus", "Dia terlalu pendek untuk melihat Yesus", "他太矮，看不见耶稣"), b("He was hiding from the crowd", "Dia bersembunyi dari orang banyak", "他在躲人群"), b("To pick fruit", "Untuk memetik buah", "为了摘果子"), b("To preach", "Untuk berkhotbah", "为了讲道")],
    why: b("\"He was little of stature.\" And Jesus stopped right under that tree. 🌳", "\"Badannya pendek.\" Dan Yesus berhenti tepat di bawah pohon itu. 🌳", "“因为他身材矮小。”而耶稣就正好停在那棵树下 🌳"),
    story: "zacchaeus",
  },
  {
    q: b("Which of these is the shortest verse in the English Bible?", "Mana yang merupakan ayat terpendek di Alkitab bahasa Inggris?", "下面哪一句是英文圣经里最短的一节经文？"),
    options: [b("\"Jesus wept.\"", "\"Yesus menangis.\"", "“耶稣哭了。”"), b("\"Fear not.\"", "\"Jangan takut.\"", "“不要怕。”"), b("\"God is love.\"", "\"Allah adalah kasih.\"", "“神就是爱。”"), b("\"Be still.\"", "\"Diamlah.\"", "“要安静。”")],
    why: b("John 11:35, at Lazarus' tomb. He cried with His friends.", "Yohanes 11:35, di kubur Lazarus. Dia menangis bersama sahabat-sahabat-Nya.", "约翰福音 11:35，在拉撒路的坟前。祂和朋友们一起哭泣。"),
    story: "lazarus-come-forth",
  },
  {
    q: b("How long had Lazarus been in the tomb when Jesus came?", "Sudah berapa lama Lazarus di dalam kubur waktu Yesus datang?", "耶稣到的时候，拉撒路已经在坟墓里多久了？"),
    options: [b("Four days", "Empat hari", "四天"), b("Three days", "Tiga hari", "三天"), b("One week", "Satu minggu", "一个星期"), b("Two days", "Dua hari", "两天")],
    why: b("Four days. Martha even warned, \"by this time he stinketh.\" 😅", "Empat hari. Marta bahkan bilang, \"ia sudah berbau.\" 😅", "四天了。马大甚至说：“他现在必是臭了。”😅"),
    story: "lazarus-come-forth",
  },
  {
    q: b("How many times did Peter deny knowing Jesus?", "Berapa kali Petrus menyangkal mengenal Yesus?", "彼得几次说他不认识耶稣？"),
    options: [b("Three", "Tiga", "三次"), b("Once", "Sekali", "一次"), b("Two", "Dua", "两次"), b("Seven", "Tujuh", "七次")],
    why: b("Three times, before the rooster crowed. Then Jesus looked at him.", "Tiga kali, sebelum ayam berkokok. Lalu Yesus memandangnya.", "在鸡叫以前三次。然后耶稣转过身来看他。"),
    story: "gethsemane-and-peter",
  },
  {
    q: b("Who was the first person to see the risen Jesus in John 20?", "Siapa orang pertama yang melihat Yesus yang bangkit di Yohanes 20?", "在约翰福音 20 章，谁第一个看见复活的耶稣？"),
    options: [b("Mary Magdalene", "Maria Magdalena", "抹大拉的马利亚"), b("Peter", "Petrus", "彼得"), b("John", "Yohanes", "约翰"), b("Thomas", "Tomas", "多马")],
    why: b("She thought He was the gardener, until He said her name. 🌷", "Dia kira Yesus itu penunggu taman, sampai Dia memanggil namanya. 🌷", "她以为祂是看园的，直到祂叫了她的名字 🌷"),
    story: "the-empty-tomb",
  },
  {
    q: b("By the sea, how many times did Jesus ask Peter \"Do you love me?\"", "Di tepi danau, berapa kali Yesus bertanya kepada Petrus \"Apakah engkau mengasihi Aku?\"", "在海边，耶稣问了彼得几次“你爱我吗？”"),
    options: [b("Three", "Tiga", "三次"), b("Once", "Sekali", "一次"), b("Two", "Dua", "两次"), b("Seven", "Tujuh", "七次")],
    why: b("Three denials, three chances to say \"I love you.\" 🤍", "Tiga kali menyangkal, tiga kesempatan untuk bilang \"aku mengasihi-Mu.\" 🤍", "三次不认主，三次机会说“我爱你” 🤍"),
    story: "do-you-love-me",
  },
  {
    q: b("About how many people believed on the day of Pentecost?", "Kira-kira berapa orang yang percaya pada hari Pentakosta?", "五旬节那天，大约有多少人信了主？"),
    options: [b("3,000", "3.000", "约三千人"), b("300", "300", "约三百人"), b("120", "120", "约一百二十人"), b("12", "12", "十二人")],
    why: b("\"About three thousand souls\" in one day, after Peter preached. (Acts 2:41)", "\"Kira-kira tiga ribu jiwa\" dalam sehari, setelah Petrus berkhotbah. (Kisah 2:41)", "彼得讲道后，那一天“门徒约添了三千人”。（使徒行传 2:41）"),
    story: "pentecost",
  },
  {
    q: b("What fell from Saul's eyes when Ananias prayed for him?", "Apa yang jatuh dari mata Saulus waktu Ananias mendoakannya?", "亚拿尼亚为扫罗祷告时，什么从扫罗眼中掉下来？"),
    options: [b("Something like scales", "Sesuatu seperti sisik", "像鳞一样的东西"), b("Tears", "Air mata", "眼泪"), b("Dust", "Debu", "灰尘"), b("Light", "Cahaya", "光")],
    why: b("\"There fell from his eyes as it had been scales,\" and he could see again.", "\"Seketika itu juga seolah-olah selaput gugur dari matanya,\" dan dia bisa melihat lagi.", "“扫罗的眼睛上，好像有鳞立刻掉下来”，他就能看见了。"),
    story: "saul-becomes-paul",
  },
  {
    q: b("What were Paul and Silas doing at midnight in prison?", "Apa yang Paulus dan Silas lakukan di penjara tengah malam?", "保罗和西拉半夜在监狱里做什么？"),
    options: [b("Praying and singing", "Berdoa dan bernyanyi", "祷告唱诗"), b("Sleeping", "Tidur", "睡觉"), b("Planning an escape", "Merencanakan kabur", "计划越狱"), b("Crying", "Menangis", "哭泣")],
    why: b("Singing in chains. Then the earthquake, and the jailer's whole family believed. 🎶", "Bernyanyi dalam rantai. Lalu gempa bumi, dan seluruh keluarga kepala penjara percaya. 🎶", "戴着锁链唱诗。接着地大震动，禁卒全家都信了主 🎶"),
    story: "singing-at-midnight",
  },
  {
    q: b("Hagar gave God a name. What did she call Him?", "Hagar memberi Tuhan sebuah nama. Apa sebutannya?", "夏甲给神起了一个名字。她怎么称呼祂？"),
    options: [b("The God who sees me", "Allah yang melihat aku", "看顾我的神"), b("The God who provides", "Allah yang menyediakan", "预备的神"), b("The God of peace", "Allah damai sejahtera", "赐平安的神"), b("The Mighty One", "Yang Perkasa", "大能者")],
    why: b("\"Thou God seest me.\" A runaway servant in the desert, and God found her.", "\"Engkaulah El-Roi.\" Seorang budak yang kabur di padang gurun, dan Tuhan menemukannya.", "“你是看顾人的神。”一个逃到旷野的使女，神却找到了她。"),
    story: "the-god-who-sees",
  },
];

export const people: Person[] = [
  {
    name: b("Moses", "Musa", "摩西"),
    clues: [
      b("I grew up in a palace, but I wasn't royal by birth.", "Aku dibesarkan di istana, tapi aku bukan keturunan raja.", "我在王宫里长大，却不是王室出身。"),
      b("I spent 40 years taking care of sheep in the desert.", "Aku menggembalakan domba di padang gurun selama 40 tahun.", "我在旷野放了四十年的羊。"),
      b("God spoke to me from a bush that was on fire but didn't burn up.", "Tuhan berbicara kepadaku dari semak yang menyala tapi tidak terbakar.", "神从一个着火却没有烧毁的荆棘里对我说话。"),
    ],
    story: "the-burning-bush",
  },
  {
    name: b("Noah", "Nuh", "挪亚"),
    clues: [
      b("People probably thought I was crazy for what I was building.", "Orang-orang mungkin mengira aku gila karena apa yang kubangun.", "大家可能觉得我在造的东西很疯狂。"),
      b("Animals came to me, two by two.", "Binatang-binatang datang kepadaku, berpasang-pasangan.", "动物们一对一对地来到我这里。"),
      b("After the rain stopped, God showed me a rainbow.", "Setelah hujan berhenti, Tuhan menunjukkan pelangi kepadaku.", "雨停以后，神让我看见了彩虹。"),
    ],
    story: "noah-and-the-rainbow",
  },
  {
    name: b("David", "Daud", "大卫"),
    clues: [
      b("I was the youngest son, and nobody invited me when the prophet came.", "Aku anak bungsu, dan tidak ada yang mengundangku waktu nabi datang.", "我是家里最小的儿子，先知来的时候没人叫我。"),
      b("I protected my sheep from a lion and a bear.", "Aku melindungi domba-dombaku dari singa dan beruang.", "我从狮子和熊口中救过我的羊。"),
      b("I beat a giant with a sling and one stone.", "Aku mengalahkan raksasa dengan umban dan satu batu.", "我用一个甩石的机弦和一块石头打败了巨人。"),
    ],
    story: "david-and-goliath",
  },
  {
    name: b("Esther", "Ester", "以斯帖"),
    clues: [
      b("I was an orphan, raised by my cousin.", "Aku yatim piatu, dibesarkan oleh sepupuku.", "我是孤儿，由堂兄抚养长大。"),
      b("I became queen of Persia and kept a big secret.", "Aku menjadi ratu Persia dan menyimpan rahasia besar.", "我成了波斯的王后，还守着一个大秘密。"),
      b("I said, \"If I perish, I perish.\"", "Aku berkata, \"Kalau terpaksa aku mati, biarlah aku mati.\"", "我说过：“我若死就死吧。”"),
    ],
    story: "esther-for-such-a-time",
  },
  {
    name: b("Jonah", "Yunus", "约拿"),
    clues: [
      b("I bought a ticket going the opposite way from where God sent me.", "Aku membeli tiket ke arah yang berlawanan dari tempat Tuhan mengutusku.", "我买了一张船票，往和神差我去的方向相反的地方去。"),
      b("I spent three days somewhere very dark… and very fishy. 🐟", "Aku menghabiskan tiga hari di tempat yang sangat gelap… dan bau ikan. 🐟", "我在一个很黑、很有鱼腥味的地方待了三天 🐟"),
      b("I got upset when God forgave the city of Nineveh.", "Aku kesal waktu Tuhan mengampuni kota Niniwe.", "神饶恕了尼尼微城，我却很不高兴。"),
    ],
    story: "running-from-god",
  },
  {
    name: b("Joseph", "Yusuf", "约瑟"),
    clues: [
      b("My dad gave me a very special, colorful coat.", "Ayahku memberiku jubah yang istimewa dan warna-warni.", "我爸爸给了我一件特别的彩衣。"),
      b("My own brothers sold me as a slave.", "Saudara-saudaraku sendiri menjualku sebagai budak.", "我的亲哥哥们把我卖去做奴隶。"),
      b("I explained Pharaoh's dreams and became a ruler in Egypt.", "Aku mengartikan mimpi Firaun dan menjadi penguasa di Mesir.", "我为法老解梦，后来成了埃及的宰相。"),
    ],
    story: "joseph-meant-for-good",
  },
  {
    name: b("Ruth", "Rut", "路得"),
    clues: [
      b("I'm from Moab, a foreigner in Israel.", "Aku dari Moab, orang asing di Israel.", "我来自摩押，在以色列是个外人。"),
      b("I refused to leave my mother-in-law after we both lost our husbands.", "Aku tidak mau meninggalkan ibu mertuaku setelah kami sama-sama kehilangan suami.", "我和婆婆都失去了丈夫，我却不肯离开她。"),
      b("I gathered leftover grain in the field of Boaz.", "Aku memungut sisa gandum di ladang Boas.", "我在波阿斯的田里拾麦穗。"),
    ],
    story: "ruth-and-naomi",
  },
  {
    name: b("Daniel", "Daniel", "但以理"),
    clues: [
      b("I was taken to Babylon as a teenager.", "Aku dibawa ke Babel waktu masih remaja.", "我年少时被掳到巴比伦。"),
      b("Even when it was against the law, I kept praying by my open window.", "Walaupun dilarang hukum, aku tetap berdoa di jendela yang terbuka.", "即使法令禁止，我仍在开着的窗前祷告。"),
      b("I spent a whole night with hungry lions. 🦁", "Aku menghabiskan satu malam bersama singa-singa yang lapar. 🦁", "我和饥饿的狮子待了一整夜 🦁"),
    ],
    story: "daniel-in-the-lions-den",
  },
  {
    name: b("Peter", "Petrus", "彼得"),
    clues: [
      b("I was a fisherman with a big mouth and a big heart.", "Aku seorang nelayan yang suka asal ngomong tapi hatinya besar.", "我是个渔夫，嘴快，心也大。"),
      b("I actually walked on water… for a few steps.", "Aku benar-benar berjalan di atas air… beberapa langkah.", "我真的在水面上走过……走了几步。"),
      b("I said I didn't know Jesus three times, and He still gave me breakfast.", "Aku menyangkal Yesus tiga kali, dan Dia tetap membuatkanku sarapan.", "我三次说不认识耶稣，祂还是为我预备了早餐。"),
    ],
    story: "do-you-love-me",
  },
  {
    name: b("Zacchaeus", "Zakheus", "撒该"),
    clues: [
      b("I was very rich, but nobody in town liked me.", "Aku sangat kaya, tapi tidak ada orang di kota yang suka padaku.", "我很有钱，可是城里没人喜欢我。"),
      b("I was the chief tax collector in Jericho.", "Aku kepala pemungut cukai di Yerikho.", "我是耶利哥的税吏长。"),
      b("I climbed a sycamore tree just to see Jesus.", "Aku memanjat pohon ara hanya untuk melihat Yesus.", "我爬上一棵桑树，只为了看耶稣。"),
    ],
    story: "zacchaeus",
  },
  {
    name: b("Mary Magdalene", "Maria Magdalena", "抹大拉的马利亚"),
    clues: [
      b("Jesus set me free from seven demons, and I followed Him after that.", "Yesus membebaskanku dari tujuh roh jahat, dan sejak itu aku mengikuti-Nya.", "耶稣从我身上赶出七个鬼，从那以后我就跟随祂。"),
      b("I stood near the cross when He died.", "Aku berdiri dekat salib waktu Dia wafat.", "祂死的时候，我站在十字架旁边。"),
      b("At the empty tomb, I thought He was the gardener.", "Di kubur yang kosong, aku mengira Dia penunggu taman.", "在空坟墓前，我以为祂是看园的。"),
    ],
    story: "the-empty-tomb",
  },
  {
    name: b("Paul", "Paulus", "保罗"),
    clues: [
      b("I used to arrest and hunt down Christians.", "Dulu aku menangkap dan memburu orang Kristen.", "我以前到处捉拿基督徒。"),
      b("A bright light stopped me on the road to Damascus.", "Cahaya terang menghentikanku di jalan menuju Damsyik.", "在往大马士革的路上，一道大光拦住了我。"),
      b("I sang in prison at midnight, and wrote many letters in the New Testament.", "Aku bernyanyi di penjara tengah malam, dan menulis banyak surat di Perjanjian Baru.", "我半夜在监狱里唱诗，还写了新约里的许多书信。"),
    ],
    story: "saul-becomes-paul",
  },
  {
    name: b("Elijah", "Elia", "以利亚"),
    clues: [
      b("I prayed, and fire fell from heaven on Mount Carmel.", "Aku berdoa, dan api turun dari langit di Gunung Karmel.", "我在迦密山上祷告，火就从天降下。"),
      b("Right after that, I ran away and wanted to give up.", "Tepat setelah itu, aku lari dan ingin menyerah.", "就在那之后，我逃跑了，还想放弃。"),
      b("An angel woke me up under a tree and said, \"Arise and eat.\"", "Malaikat membangunkanku di bawah pohon dan berkata, \"Bangunlah, makanlah!\"", "天使在树下叫醒我说：“起来吃吧！”"),
    ],
    story: "under-the-broom-tree",
  },
  {
    name: b("Gideon", "Gideon", "基甸"),
    clues: [
      b("An angel called me a mighty warrior while I was hiding.", "Malaikat menyebutku pahlawan yang gagah berani waktu aku sedang bersembunyi.", "我正在躲藏的时候，天使称我为大能的勇士。"),
      b("I asked God for a sign with a wool fleece. Twice.", "Aku minta tanda dari Tuhan dengan bulu domba. Dua kali.", "我用一团羊毛向神求了两次记号。"),
      b("I won a battle with only 300 men, trumpets, and jars.", "Aku menang perang hanya dengan 300 orang, sangkakala, dan buyung.", "我只带着三百人、号角和瓶子就打赢了仗。"),
    ],
    story: "gideon-mighty-warrior",
  },
  {
    name: b("Solomon", "Salomo", "所罗门"),
    clues: [
      b("My father was a famous king who played the harp.", "Ayahku raja terkenal yang pandai bermain kecapi.", "我父亲是一位会弹琴的著名君王。"),
      b("God told me in a dream to ask for anything I wanted.", "Tuhan berkata dalam mimpi bahwa aku boleh meminta apa saja.", "神在梦中对我说，我想要什么都可以求。"),
      b("I asked for wisdom, and once solved a case about two mothers and a baby.", "Aku meminta hikmat, dan pernah memutuskan perkara dua ibu dan seorang bayi.", "我求了智慧，还判过两个母亲争一个婴孩的案子。"),
    ],
    story: "solomon-asks-for-wisdom",
  },
  {
    name: b("Hannah", "Hana", "哈拿"),
    clues: [
      b("For years, someone in my family teased me because I had no children.", "Bertahun-tahun, seseorang di keluargaku mengejekku karena aku tidak punya anak.", "很多年来，家里有人因为我没有孩子而讥笑我。"),
      b("I prayed so hard that the priest thought I was drunk.", "Aku berdoa begitu sungguh-sungguh sampai imam mengira aku mabuk.", "我祷告得太投入，祭司还以为我喝醉了。"),
      b("My son Samuel became a great prophet.", "Anakku Samuel menjadi nabi besar.", "我的儿子撒母耳成了一位伟大的先知。"),
    ],
    story: "hannah-prays",
  },
  {
    name: b("Abraham", "Abraham", "亚伯拉罕"),
    clues: [
      b("God told me to leave home, but didn't say where I was going.", "Tuhan menyuruhku meninggalkan rumah, tapi tidak bilang ke mana.", "神叫我离开家乡，却没告诉我要去哪里。"),
      b("He told me to go outside and count the stars.", "Dia menyuruhku keluar dan menghitung bintang.", "祂叫我到外面去数星星。"),
      b("I became a father when I was 100 years old.", "Aku menjadi ayah waktu umurku 100 tahun.", "我一百岁才当上爸爸。"),
    ],
    story: "count-the-stars",
  },
  {
    name: b("Lazarus", "Lazarus", "拉撒路"),
    clues: [
      b("My sisters were Martha and Mary.", "Saudara perempuanku adalah Marta dan Maria.", "我的姐妹是马大和马利亚。"),
      b("I was in a tomb for four days.", "Aku berada di dalam kubur selama empat hari.", "我在坟墓里躺了四天。"),
      b("Jesus called, \"Come forth!\" and I walked out.", "Yesus berseru, \"Marilah ke luar!\" dan aku berjalan keluar.", "耶稣大声说：“出来！”我就走了出来。"),
    ],
    story: "lazarus-come-forth",
  },
];

export const verseBlanks: VerseBlank[] = [
  {
    reference: "Psalm 23:1",
    before: b("The LORD is my", "TUHAN adalah", "耶和华是我的"),
    after: b("; I shall not want.", ", aku tidak akan kekurangan.", "，我必不致缺乏。"),
    options: [b("shepherd", "gembalaku", "牧者"), b("king", "rajaku", "王"), b("friend", "sahabatku", "朋友"), b("rock", "gunung batuku", "磐石")],
  },
  {
    reference: "Psalm 119:105",
    before: b("Thy word is a", "Firman-Mu itu", "你的话是我脚前的"),
    after: b("unto my feet, and a light unto my path.", "bagi kakiku dan terang bagi jalanku.", "，是我路上的光。"),
    options: [b("lamp", "pelita", "灯"), b("map", "peta", "地图"), b("sword", "pedang", "刀剑"), b("song", "lagu", "诗歌")],
  },
  {
    reference: "John 3:16",
    before: b("For God so", "Karena begitu besar", "神"),
    after: b("the world, that he gave his only begotten Son.", "Allah akan dunia ini, sehingga Ia mengaruniakan Anak-Nya yang tunggal.", "世人，甚至将他的独生子赐给他们。"),
    options: [b("loved", "kasih", "爱"), b("blessed", "kuasa", "祝福"), b("watched", "murka", "看顾"), b("made", "hikmat", "创造")],
  },
  {
    reference: "Philippians 4:13",
    before: b("I can do all things through", "Segala perkara dapat kutanggung di dalam", "我靠着那加给我"),
    after: b("which strengtheneth me.", "yang memberi kekuatan kepadaku.", "的，凡事都能做。"),
    options: [b("Christ", "Kristus", "力量"), b("prayer", "doa", "智慧"), b("faith", "iman", "平安"), b("love", "kasih", "喜乐")],
  },
  {
    reference: "Psalm 46:10",
    before: b("Be", "", "你们要"),
    after: b(", and know that I am God.", ", dan ketahuilah, bahwa Akulah Allah!", "，要知道我是神。"),
    options: [b("still", "Diamlah", "休息"), b("strong", "Kuatlah", "刚强"), b("brave", "Beranilah", "勇敢"), b("glad", "Bersukacitalah", "欢喜")],
  },
  {
    reference: "Matthew 11:28",
    before: b("Come unto me, all ye that labour and are heavy laden, and I will give you", "Marilah kepada-Ku, semua yang letih lesu dan berbeban berat, Aku akan memberi", "凡劳苦担重担的人，可以到我这里来，我就使你们得"),
    after: b(".", "kepadamu.", "。"),
    options: [b("rest", "kelegaan", "安息"), b("bread", "roti", "饱足"), b("gold", "emas", "财富"), b("wisdom", "hikmat", "智慧")],
  },
  {
    reference: "2 Corinthians 12:9",
    before: b("My grace is", "Cukuplah kasih karunia-Ku bagimu, sebab justru dalam", "我的恩典够你用的，因为我的能力是在人的"),
    after: b("for thee: for my strength is made perfect in weakness.", "kuasa-Ku menjadi sempurna.", "上显得完全。"),
    options: [b("sufficient", "kelemahanlah", "软弱"), b("waiting", "kekuatanlah", "刚强"), b("coming", "kekayaanlah", "聪明"), b("hidden", "kemenanganlah", "成功")],
  },
  {
    reference: "Proverbs 3:5",
    before: b("Trust in the LORD with all thine", "Percayalah kepada TUHAN dengan segenap", "你要专心仰赖耶和华，不可倚靠自己的"),
    after: b("; and lean not unto thine own understanding.", ", dan janganlah bersandar kepada pengertianmu sendiri.", "。"),
    options: [b("heart", "hatimu", "聪明"), b("strength", "kekuatanmu", "力量"), b("mind", "pikiranmu", "财富"), b("soul", "jiwamu", "朋友")],
  },
  {
    reference: "Isaiah 40:31",
    before: b("they shall mount up with wings as", "mereka seumpama", "他们必如"),
    after: b("; they shall run, and not be weary.", "yang naik terbang dengan kekuatan sayapnya.", "展翅上腾，他们奔跑却不困倦。"),
    options: [b("eagles", "rajawali", "鹰"), b("angels", "malaikat", "天使"), b("doves", "merpati", "鸽子"), b("sparrows", "burung pipit", "麻雀")],
  },
  {
    reference: "1 John 4:8",
    before: b("He that loveth not knoweth not God; for God is", "Barangsiapa tidak mengasihi, ia tidak mengenal Allah, sebab Allah adalah", "没有爱心的，就不认识神，因为神就是"),
    after: b(".", ".", "。"),
    options: [b("love", "kasih", "爱"), b("light", "terang", "光"), b("near", "dekat", "灵"), b("good", "baik", "善")],
  },
  {
    reference: "Lamentations 3:23",
    before: b("They are new every", "selalu baru tiap", "每"),
    after: b(": great is thy faithfulness.", "; besar kesetiaan-Mu!", "这都是新的；你的诚实极其广大！"),
    options: [b("morning", "pagi", "早晨"), b("day", "hari", "一天"), b("year", "tahun", "一年"), b("hour", "jam", "小时")],
  },
  {
    reference: "John 11:35",
    before: b("Jesus", "Maka", "耶稣"),
    after: b(".", "Yesus.", "了。"),
    options: [b("wept", "menangislah", "哭"), b("smiled", "tersenyumlah", "笑"), b("slept", "tidurlah", "睡"), b("prayed", "berdoalah", "祷告")],
  },
  {
    reference: "Psalm 56:3",
    before: b("What time I am", "Waktu aku", "我"),
    after: b(", I will trust in thee.", ", aku ini percaya kepada-Mu.", "的时候要倚靠你。"),
    options: [b("afraid", "takut", "惧怕"), b("alone", "sendirian", "孤单"), b("tired", "lelah", "疲倦"), b("sad", "sedih", "难过")],
  },
  {
    reference: "Jeremiah 29:11",
    before: b("For I know the thoughts that I think toward you, saith the LORD, thoughts of", "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan", "我知道我向你们所怀的意念，是赐"),
    after: b(", and not of evil.", "dan bukan rancangan kecelakaan.", "的意念，不是降灾祸的意念。"),
    options: [b("peace", "damai sejahtera", "平安"), b("joy", "sukacita", "喜乐"), b("power", "kuasa", "能力"), b("glory", "kemuliaan", "荣耀")],
  },
  {
    reference: "Psalm 118:24",
    before: b("This is the day which the LORD hath made; we will", "Inilah hari yang dijadikan TUHAN, mari kita", "这是耶和华所定的日子，我们在其中要"),
    after: b("and be glad in it.", "dan bersukacita karenanya!", "欢喜。"),
    options: [b("rejoice", "bersorak-sorak", "高兴"), b("rest", "beristirahat", "休息"), b("pray", "berdoa", "祷告"), b("sing", "bernyanyi", "歌唱")],
  },
  {
    reference: "Matthew 28:20",
    before: b("and, lo, I am with you", "Dan ketahuilah, Aku menyertai kamu", "我就"),
    after: b(", even unto the end of the world.", "sampai kepada akhir zaman.", "与你们同在，直到世界的末了。"),
    options: [b("alway", "senantiasa", "常"), b("today", "hari ini", "今天"), b("sometimes", "kadang-kadang", "有时"), b("here", "di sini", "在这里")],
  },
];

export type Rank = { min: number; title: L; note: L };

// Picked by score percentage at the end of a round.
export const ranks: Rank[] = [
  { min: 90, title: b("Bible Bestie 👑", "Sahabat Alkitab 👑", "圣经好闺蜜 👑"), note: b("Okay wow, you really know your stuff!", "Wah, kamu beneran hafal banget!", "哇，你真的很熟悉圣经！") },
  { min: 70, title: b("Scripture Star ⭐", "Bintang Firman ⭐", "经文之星 ⭐"), note: b("So good! Just a few more to go.", "Keren banget! Sedikit lagi sempurna.", "太棒了！只差一点点就满分了。") },
  { min: 40, title: b("Growing Sprout 🌱", "Tunas yang Bertumbuh 🌱", "成长中的小苗 🌱"), note: b("You're growing! Every story is waiting in Bible Stories.", "Kamu lagi bertumbuh! Semua ceritanya ada di Cerita Alkitab.", "你在成长！所有故事都在“圣经故事”里等你。") },
  { min: 0, title: b("Brave Beginner 🐣", "Pemula Pemberani 🐣", "勇敢的新手 🐣"), note: b("Everyone starts somewhere. Read a story and try again!", "Semua orang mulai dari nol. Baca satu cerita, lalu coba lagi!", "每个人都是从头开始的。读一个故事，再试一次吧！") },
];

export const cheers: L[] = [
  b("Yesss! 🎉", "Benar! 🎉", "答对了！🎉"),
  b("You got it! ✨", "Tepat sekali! ✨", "完全正确！✨"),
  b("Bible bestie behavior 💅", "Kelakuan sahabat Alkitab 💅", "圣经达人就是你 💅"),
  b("So smart!! 🧠", "Pinter banget!! 🧠", "太聪明了！！🧠"),
  b("Correct-a-mundo 🌸", "Betul sekali 🌸", "没错没错 🌸"),
];

export const oops: L[] = [
  b("Oops, almost! 🙈", "Ups, hampir! 🙈", "哎呀，差一点！🙈"),
  b("Not quite 🤏", "Belum tepat 🤏", "还差一点 🤏"),
  b("Nice try! 🫶", "Usaha yang bagus! 🫶", "不错的尝试！🫶"),
];

export const modes: { id: "quiz" | "who" | "verse"; emoji: string; title: L; blurb: L }[] = [
  {
    id: "quiz",
    emoji: "🧩",
    title: b("Bible Quiz", "Kuis Alkitab", "圣经问答"),
    blurb: b("10 multiple-choice questions from the stories.", "10 soal pilihan ganda dari cerita-cerita.", "10 道来自故事的选择题。"),
  },
  {
    id: "who",
    emoji: "🕵️",
    title: b("Who Am I?", "Siapakah Aku?", "我是谁？"),
    blurb: b("Guess the Bible character. Fewer clues, more points!", "Tebak tokoh Alkitab. Makin sedikit petunjuk, makin banyak poin!", "猜猜圣经人物。提示越少，分数越高！"),
  },
  {
    id: "verse",
    emoji: "📜",
    title: b("Finish the Verse", "Lengkapi Ayatnya", "填经文"),
    blurb: b("Pick the missing word from a famous verse.", "Pilih kata yang hilang dari ayat terkenal.", "从有名的经文里选出缺少的词。"),
  },
];

export function rankFor(percent: number): Rank {
  return ranks.find((r) => percent >= r.min) ?? ranks[ranks.length - 1];
}

export function shuffle<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}
