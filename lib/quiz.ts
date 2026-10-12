// Bible quiz content. Every line has English plus a small Indonesian
// translation shown underneath. Verse quotes are KJV.

export type Bi = { en: string; id: string };

export type Question = {
  q: Bi;
  options: Bi[]; // first option is the correct one; shuffled at play time
  why: Bi;
  story?: string; // Bible Stories slug to read more
};

export type Person = {
  name: Bi;
  clues: [Bi, Bi, Bi]; // from hardest to easiest
  story?: string;
};

export type VerseBlank = {
  reference: string;
  before: string;
  after: string;
  options: Bi[]; // first is correct
};

const b = (en: string, id: string): Bi => ({ en, id });

export const questions: Question[] = [
  {
    q: b("What did God create on the very first day?", "Apa yang Tuhan ciptakan di hari pertama?"),
    options: [b("Light", "Terang"), b("The sun and moon", "Matahari dan bulan"), b("Animals", "Binatang"), b("People", "Manusia")],
    why: b("\"Let there be light: and there was light.\" The sun and moon came on day four.", "\"Jadilah terang.\" Matahari dan bulan baru dibuat di hari keempat."),
    story: "in-the-beginning",
  },
  {
    q: b("After Adam and Eve hid, what did God ask first?", "Setelah Adam dan Hawa bersembunyi, apa yang pertama Tuhan tanyakan?"),
    options: [b("\"Where are you?\"", "\"Di manakah engkau?\""), b("\"Why did you eat it?\"", "\"Kenapa kamu memakannya?\""), b("\"Are you hungry?\"", "\"Apakah kamu lapar?\""), b("\"Who are you?\"", "\"Siapa kamu?\"")],
    why: b("God came looking for them: \"Where art thou?\" (Genesis 3:9)", "Tuhan datang mencari mereka: \"Di manakah engkau?\" (Kejadian 3:9)"),
    story: "where-are-you",
  },
  {
    q: b("What sign did God give Noah as His promise?", "Tanda apa yang Tuhan berikan kepada Nuh sebagai janji-Nya?"),
    options: [b("A rainbow", "Pelangi"), b("A dove", "Burung merpati"), b("A star", "Bintang"), b("A burning bush", "Semak yang menyala")],
    why: b("God set His bow in the cloud: never again a flood to destroy the earth.", "Tuhan menaruh busur-Nya di awan: tidak akan ada lagi air bah yang memusnahkan bumi."),
    story: "noah-and-the-rainbow",
  },
  {
    q: b("Which bird came back to Noah with an olive leaf?", "Burung apa yang kembali ke Nuh membawa daun zaitun?"),
    options: [b("A dove", "Burung merpati"), b("A raven", "Burung gagak"), b("An eagle", "Burung rajawali"), b("A sparrow", "Burung pipit")],
    why: b("The dove came back with a fresh olive leaf, so Noah knew the water was going down.", "Merpati kembali dengan daun zaitun segar, jadi Nuh tahu airnya sudah surut."),
    story: "noah-and-the-rainbow",
  },
  {
    q: b("God took Abraham outside at night and told him to count the…", "Tuhan membawa Abraham keluar di malam hari dan menyuruhnya menghitung…"),
    options: [b("Stars", "Bintang"), b("Sheep", "Domba"), b("Trees", "Pohon"), b("Coins", "Koin")],
    why: b("\"So shall thy seed be.\" His family would be as many as the stars.", "\"Demikianlah banyaknya nanti keturunanmu.\" Sebanyak bintang di langit."),
    story: "count-the-stars",
  },
  {
    q: b("What does the name Isaac mean?", "Apa arti nama Ishak?"),
    options: [b("Laughter", "Tertawa"), b("Gift", "Hadiah"), b("Promise", "Janji"), b("Blessing", "Berkat")],
    why: b("Sarah laughed when she heard she'd have a baby at 90. Then God turned it into joy.", "Sara tertawa waktu dengar akan punya bayi di usia 90. Lalu Tuhan mengubahnya jadi sukacita."),
    story: "count-the-stars",
  },
  {
    q: b("On the mountain, what did God provide in Isaac's place?", "Di atas gunung, apa yang Tuhan sediakan sebagai ganti Ishak?"),
    options: [b("A ram", "Seekor domba jantan"), b("A goat", "Seekor kambing"), b("A dove", "Seekor merpati"), b("A calf", "Seekor anak sapi")],
    why: b("A ram caught by its horns in a thicket. Abraham named the place \"The LORD will provide.\"", "Domba jantan yang tanduknya tersangkut di belukar. Abraham menamai tempat itu \"TUHAN menyediakan.\""),
    story: "god-will-provide",
  },
  {
    q: b("After wrestling all night, Jacob got a new name. What was it?", "Setelah bergulat semalaman, Yakub mendapat nama baru. Apa namanya?"),
    options: [b("Israel", "Israel"), b("Abraham", "Abraham"), b("Judah", "Yehuda"), b("Joseph", "Yusuf")],
    why: b("\"Thy name shall be called no more Jacob, but Israel.\" (Genesis 32:28)", "\"Namamu tidak akan disebutkan lagi Yakub, tetapi Israel.\" (Kejadian 32:28)"),
    story: "wrestling-with-god",
  },
  {
    q: b("What did Joseph's brothers tell their father happened to him?", "Apa yang dikatakan saudara-saudara Yusuf kepada ayah mereka?"),
    options: [b("A wild animal killed him", "Dia diterkam binatang buas"), b("Robbers took him", "Dia diculik perampok"), b("He ran away", "Dia kabur dari rumah"), b("He got lost", "Dia tersesat")],
    why: b("They dipped his colorful coat in goat's blood to fool Jacob.", "Mereka mencelupkan jubah warna-warninya ke darah kambing untuk menipu Yakub."),
    story: "joseph-meant-for-good",
  },
  {
    q: b("Pharaoh's dream meant seven years of plenty, then seven years of…", "Mimpi Firaun berarti tujuh tahun kelimpahan, lalu tujuh tahun…"),
    options: [b("Famine", "Kelaparan"), b("War", "Perang"), b("Floods", "Banjir"), b("Darkness", "Kegelapan")],
    why: b("Joseph saved food during the good years, and Egypt survived the famine.", "Yusuf menyimpan makanan di tahun-tahun baik, jadi Mesir selamat dari kelaparan."),
    story: "joseph-meant-for-good",
  },
  {
    q: b("When Moses asked God's name, what did God say?", "Waktu Musa menanyakan nama Tuhan, apa jawab-Nya?"),
    options: [b("\"I AM THAT I AM\"", "\"AKU ADALAH AKU\""), b("\"The Almighty One\"", "\"Yang Mahakuasa\""), b("\"The Holy One\"", "\"Yang Mahakudus\""), b("\"The Great King\"", "\"Raja yang Agung\"")],
    why: b("God answered from the burning bush: \"I AM THAT I AM.\" (Exodus 3:14)", "Tuhan menjawab dari semak yang menyala: \"AKU ADALAH AKU.\" (Keluaran 3:14)"),
    story: "the-burning-bush",
  },
  {
    q: b("What did the Israelites call the bread from heaven?", "Apa nama roti dari surga yang dimakan bangsa Israel?"),
    options: [b("Manna", "Manna"), b("Matzah", "Matzah"), b("Honeycake", "Kue madu"), b("Shewbread", "Roti sajian")],
    why: b("\"Manna\" basically means \"What is it?\" They named their food \"What is this?\" 😄", "\"Manna\" kira-kira artinya \"Apa ini?\" Mereka menamai makanannya \"Apa ini?\" 😄"),
    story: "manna-daily-bread",
  },
  {
    q: b("What did Rahab hang in her window to be saved?", "Apa yang Rahab gantung di jendelanya supaya selamat?"),
    options: [b("A scarlet cord", "Tali kirmizi (merah)"), b("A white flag", "Bendera putih"), b("A lamp", "Pelita"), b("A golden bell", "Lonceng emas")],
    why: b("Everyone in the house with the scarlet cord was kept safe when Jericho fell.", "Semua orang di rumah dengan tali merah itu selamat waktu Yerikho runtuh."),
    story: "rahab-scarlet-thread",
  },
  {
    q: b("How many men did Gideon end up fighting with?", "Berapa banyak orang yang akhirnya ikut berperang bersama Gideon?"),
    options: [b("300", "300"), b("3,000", "3.000"), b("32,000", "32.000"), b("12", "12")],
    why: b("God cut the army from 32,000 to 300, so everyone would know the victory was His.", "Tuhan mengurangi pasukan dari 32.000 jadi 300, supaya semua tahu kemenangan itu dari-Nya."),
    story: "gideon-mighty-warrior",
  },
  {
    q: b("Ruth said \"Where you go, I will go\" to…", "Rut berkata \"Ke mana engkau pergi, ke situ juga aku pergi\" kepada…"),
    options: [b("Naomi", "Naomi"), b("Boaz", "Boas"), b("Orpah", "Orpa"), b("Hannah", "Hana")],
    why: b("Ruth chose to stay with her grieving mother-in-law and follow her God.", "Rut memilih tetap bersama ibu mertuanya yang berduka dan mengikuti Allahnya."),
    story: "ruth-and-naomi",
  },
  {
    q: b("Ruth's great-grandson became…", "Cicit Rut kemudian menjadi…"),
    options: [b("King David", "Raja Daud"), b("King Solomon", "Raja Salomo"), b("The prophet Samuel", "Nabi Samuel"), b("Moses", "Musa")],
    why: b("Ruth → Obed → Jesse → David. A foreigner in the line of Israel's greatest king, and of Jesus.", "Rut → Obed → Isai → Daud. Orang asing di garis keturunan raja terbesar Israel, dan Yesus."),
    story: "ruth-and-naomi",
  },
  {
    q: b("Hannah prayed so deeply that Eli the priest thought she was…", "Hana berdoa begitu dalam sampai Imam Eli mengira dia…"),
    options: [b("Drunk", "Mabuk"), b("Sick", "Sakit"), b("Asleep", "Tertidur"), b("Lost", "Tersesat")],
    why: b("Her lips moved but no sound came out. She was pouring out her soul.", "Bibirnya bergerak tapi tidak bersuara. Dia sedang mencurahkan isi hatinya."),
    story: "hannah-prays",
  },
  {
    q: b("When God called young Samuel at night, who did Samuel think it was?", "Waktu Tuhan memanggil Samuel kecil di malam hari, Samuel mengira siapa yang memanggil?"),
    options: [b("Eli", "Eli"), b("His mother", "Ibunya"), b("An angel", "Malaikat"), b("A thief", "Pencuri")],
    why: b("He ran to Eli three times before saying \"Speak; for thy servant heareth.\"", "Dia lari ke Eli tiga kali sebelum berkata \"Berbicaralah, sebab hamba-Mu ini mendengar.\""),
    story: "speak-lord",
  },
  {
    q: b("How many smooth stones did David pick up?", "Berapa batu licin yang David ambil?"),
    options: [b("Five", "Lima"), b("One", "Satu"), b("Three", "Tiga"), b("Seven", "Tujuh")],
    why: b("Five stones from the stream. He only needed one. 🎯", "Lima batu dari sungai. Dia cuma butuh satu. 🎯"),
    story: "david-and-goliath",
  },
  {
    q: b("Which prophet told King David \"You are the man!\"?", "Nabi mana yang berkata kepada Raja Daud \"Engkaulah orang itu!\"?"),
    options: [b("Nathan", "Natan"), b("Samuel", "Samuel"), b("Elijah", "Elia"), b("Isaiah", "Yesaya")],
    why: b("Nathan told a story about a stolen lamb, then pointed at David.", "Natan bercerita tentang anak domba yang dicuri, lalu menunjuk Daud."),
    story: "thou-art-the-man",
  },
  {
    q: b("When God said \"Ask what I shall give thee,\" Solomon asked for…", "Waktu Tuhan berkata \"Mintalah apa yang hendak Kuberikan,\" Salomo meminta…"),
    options: [b("Wisdom", "Hikmat"), b("Riches", "Kekayaan"), b("A long life", "Umur panjang"), b("Victory over enemies", "Kemenangan atas musuh")],
    why: b("An understanding heart. God was pleased and gave him riches and honor too.", "Hati yang paham. Tuhan senang dan memberinya kekayaan dan kemuliaan juga."),
    story: "solomon-asks-for-wisdom",
  },
  {
    q: b("When Elijah wanted to give up, an angel told him to…", "Waktu Elia ingin menyerah, malaikat menyuruhnya…"),
    options: [b("Get up and eat", "Bangun dan makan"), b("Go back and fight", "Kembali dan bertempur"), b("Pray harder", "Berdoa lebih keras"), b("Climb a mountain", "Mendaki gunung")],
    why: b("\"Arise and eat; because the journey is too great for thee.\" Rest and food first. 🍞", "\"Bangunlah, makanlah! Sebab kalau tidak, perjalananmu nanti terlalu jauh.\" Istirahat dan makan dulu. 🍞"),
    story: "under-the-broom-tree",
  },
  {
    q: b("How many times did Naaman dip himself in the Jordan River?", "Berapa kali Naaman membenamkan diri di Sungai Yordan?"),
    options: [b("Seven", "Tujuh"), b("Three", "Tiga"), b("Ten", "Sepuluh"), b("Once", "Sekali")],
    why: b("After the seventh time, his skin became like a little child's.", "Setelah yang ketujuh kalinya, kulitnya jadi seperti kulit anak kecil."),
    story: "naaman-wash-and-be-clean",
  },
  {
    q: b("When God sent Jonah to Nineveh, where did he try to go instead?", "Waktu Tuhan mengutus Yunus ke Niniwe, ke mana dia malah pergi?"),
    options: [b("Tarshish", "Tarsis"), b("Egypt", "Mesir"), b("Jerusalem", "Yerusalem"), b("Babylon", "Babel")],
    why: b("Tarshish was the opposite direction. He bought a ticket to the other side of the map. 🚢", "Tarsis itu arah sebaliknya. Dia beli tiket ke ujung peta yang lain. 🚢"),
    story: "running-from-god",
  },
  {
    q: b("Who told Esther \"Who knows whether you have come for such a time as this?\"", "Siapa yang berkata kepada Ester \"Siapa tahu, mungkin justru untuk saat yang seperti ini\"?"),
    options: [b("Mordecai", "Mordekhai"), b("The king", "Sang raja"), b("Haman", "Haman"), b("Daniel", "Daniel")],
    why: b("Her cousin Mordecai, who raised her like a daughter.", "Sepupunya Mordekhai, yang membesarkannya seperti anak sendiri."),
    story: "esther-for-such-a-time",
  },
  {
    q: b("How many men did the king see walking in the fiery furnace?", "Berapa orang yang raja lihat berjalan di dalam dapur api?"),
    options: [b("Four", "Empat"), b("Three", "Tiga"), b("Two", "Dua"), b("Seven", "Tujuh")],
    why: b("Three were thrown in, but there was a fourth \"like the Son of God.\"", "Tiga orang dilempar ke dalam, tapi ada orang keempat yang \"seperti anak dewa.\""),
    story: "the-fiery-furnace",
  },
  {
    q: b("How many times a day did Daniel pray by his open window?", "Berapa kali sehari Daniel berdoa di jendelanya yang terbuka?"),
    options: [b("Three", "Tiga"), b("Once", "Sekali"), b("Seven", "Tujuh"), b("Twice", "Dua")],
    why: b("Three times a day, \"as he did aforetime.\" It was already his habit.", "Tiga kali sehari, \"seperti yang biasa dilakukannya.\" Itu sudah kebiasaannya."),
    story: "daniel-in-the-lions-den",
  },
  {
    q: b("Job's friends sat with him in silence for how long?", "Berapa lama sahabat-sahabat Ayub duduk diam bersamanya?"),
    options: [b("Seven days", "Tujuh hari"), b("One hour", "Satu jam"), b("Forty days", "Empat puluh hari"), b("Three days", "Tiga hari")],
    why: b("Seven days and nights without a word. Honestly, the best thing they did. 🤍", "Tujuh hari tujuh malam tanpa kata. Jujur, itu hal terbaik yang mereka lakukan. 🤍"),
    story: "job-and-the-whirlwind",
  },
  {
    q: b("Where was baby Jesus laid after He was born?", "Di mana bayi Yesus dibaringkan setelah lahir?"),
    options: [b("In a manger", "Di palungan"), b("In a cradle", "Di buaian"), b("In a basket", "Di keranjang"), b("In a bed", "Di tempat tidur")],
    why: b("A manger is a feeding trough for animals. The King slept where animals ate.", "Palungan itu tempat makan ternak. Sang Raja tidur di tempat binatang makan."),
    story: "no-room-in-the-inn",
  },
  {
    q: b("Who were the first people the angels told about Jesus' birth?", "Siapa yang pertama kali diberi kabar oleh malaikat tentang kelahiran Yesus?"),
    options: [b("Shepherds", "Para gembala"), b("Kings", "Para raja"), b("Priests", "Para imam"), b("Fishermen", "Para nelayan")],
    why: b("Ordinary shepherds on the night shift heard it first.", "Gembala-gembala biasa yang sedang jaga malam yang pertama mendengarnya."),
    story: "no-room-in-the-inn",
  },
  {
    q: b("What was Jesus' first miracle?", "Apa mukjizat pertama Yesus?"),
    options: [b("Turning water into wine", "Mengubah air jadi anggur"), b("Feeding 5,000 people", "Memberi makan 5.000 orang"), b("Walking on water", "Berjalan di atas air"), b("Healing a blind man", "Menyembuhkan orang buta")],
    why: b("At a wedding in Cana. He saved the party! 🍷", "Di pesta pernikahan di Kana. Dia menyelamatkan pestanya! 🍷"),
    story: "water-into-wine",
  },
  {
    q: b("Jesus told Nicodemus that to see God's kingdom, a person must be…", "Yesus berkata kepada Nikodemus, untuk melihat Kerajaan Allah seseorang harus…"),
    options: [b("Born again", "Dilahirkan kembali"), b("A priest", "Seorang imam"), b("From Jerusalem", "Dari Yerusalem"), b("Perfect", "Sempurna")],
    why: b("A new start only God can give. Then came John 3:16.", "Awal yang baru yang hanya Tuhan bisa berikan. Lalu datanglah Yohanes 3:16."),
    story: "nicodemus-at-night",
  },
  {
    q: b("What did the woman at the well leave behind when she ran to town?", "Apa yang ditinggalkan perempuan di sumur waktu dia lari ke kota?"),
    options: [b("Her water jar", "Tempayannya"), b("Her sandals", "Sandalnya"), b("Her money", "Uangnya"), b("Her cloak", "Jubahnya")],
    why: b("She forgot the whole reason she came, because she'd met Jesus.", "Dia lupa alasan dia datang, karena sudah bertemu Yesus."),
    story: "woman-at-the-well",
  },
  {
    q: b("What was Jesus doing when the storm hit the boat?", "Apa yang Yesus lakukan waktu badai menerjang perahu?"),
    options: [b("Sleeping on a pillow", "Tidur di atas bantal"), b("Praying", "Berdoa"), b("Fishing", "Memancing"), b("Rowing", "Mendayung")],
    why: b("Asleep on a pillow. Then: \"Peace, be still.\" 🌊", "Tidur di atas tilam. Lalu: \"Diam! Tenanglah!\" 🌊"),
    story: "peace-be-still",
  },
  {
    q: b("What did the boy bring that fed 5,000 people?", "Apa yang dibawa anak kecil itu sehingga 5.000 orang bisa makan?"),
    options: [b("5 loaves and 2 fish", "5 roti dan 2 ikan"), b("2 loaves and 5 fish", "2 roti dan 5 ikan"), b("7 loaves and 3 fish", "7 roti dan 3 ikan"), b("12 loaves and 1 fish", "12 roti dan 1 ikan")],
    why: b("Five barley loaves and two small fishes. Small things in Jesus' hands. 🐟", "Lima roti jelai dan dua ikan. Hal kecil di tangan Yesus. 🐟"),
    story: "five-loaves-two-fish",
  },
  {
    q: b("How many baskets of leftovers were gathered after feeding the 5,000?", "Berapa keranjang sisa makanan yang dikumpulkan setelah 5.000 orang makan?"),
    options: [b("Twelve", "Dua belas"), b("Seven", "Tujuh"), b("Three", "Tiga"), b("Five", "Lima")],
    why: b("Twelve baskets. More was left over than they started with!", "Dua belas keranjang. Sisanya lebih banyak dari yang ada di awal!"),
    story: "five-loaves-two-fish",
  },
  {
    q: b("In the Good Samaritan story, who passed by the hurt man first?", "Dalam kisah orang Samaria yang baik hati, siapa yang pertama lewat?"),
    options: [b("A priest", "Seorang imam"), b("A soldier", "Seorang prajurit"), b("A merchant", "Seorang pedagang"), b("A tax collector", "Seorang pemungut cukai")],
    why: b("A priest, then a Levite. Both passed by on the other side.", "Seorang imam, lalu seorang Lewi. Dua-duanya lewat dari seberang jalan."),
    story: "the-good-samaritan",
  },
  {
    q: b("Why did Zacchaeus climb a tree?", "Kenapa Zakheus memanjat pohon?"),
    options: [b("He was too short to see Jesus", "Dia terlalu pendek untuk melihat Yesus"), b("He was hiding from the crowd", "Dia bersembunyi dari orang banyak"), b("To pick fruit", "Untuk memetik buah"), b("To preach", "Untuk berkhotbah")],
    why: b("\"He was little of stature.\" And Jesus stopped right under that tree. 🌳", "\"Badannya pendek.\" Dan Yesus berhenti tepat di bawah pohon itu. 🌳"),
    story: "zacchaeus",
  },
  {
    q: b("Which of these is the shortest verse in the English Bible?", "Mana yang merupakan ayat terpendek di Alkitab bahasa Inggris?"),
    options: [b("\"Jesus wept.\"", "\"Yesus menangis.\""), b("\"Fear not.\"", "\"Jangan takut.\""), b("\"God is love.\"", "\"Allah adalah kasih.\""), b("\"Be still.\"", "\"Diamlah.\"")],
    why: b("John 11:35, at Lazarus' tomb. He cried with His friends.", "Yohanes 11:35, di kubur Lazarus. Dia menangis bersama sahabat-sahabat-Nya."),
    story: "lazarus-come-forth",
  },
  {
    q: b("How long had Lazarus been in the tomb when Jesus came?", "Sudah berapa lama Lazarus di dalam kubur waktu Yesus datang?"),
    options: [b("Four days", "Empat hari"), b("Three days", "Tiga hari"), b("One week", "Satu minggu"), b("Two days", "Dua hari")],
    why: b("Four days. Martha even warned, \"by this time he stinketh.\" 😅", "Empat hari. Marta bahkan bilang, \"ia sudah berbau.\" 😅"),
    story: "lazarus-come-forth",
  },
  {
    q: b("How many times did Peter deny knowing Jesus?", "Berapa kali Petrus menyangkal mengenal Yesus?"),
    options: [b("Three", "Tiga"), b("Once", "Sekali"), b("Two", "Dua"), b("Seven", "Tujuh")],
    why: b("Three times, before the rooster crowed. Then Jesus looked at him.", "Tiga kali, sebelum ayam berkokok. Lalu Yesus memandangnya."),
    story: "gethsemane-and-peter",
  },
  {
    q: b("Who was the first person to see the risen Jesus in John 20?", "Siapa orang pertama yang melihat Yesus yang bangkit di Yohanes 20?"),
    options: [b("Mary Magdalene", "Maria Magdalena"), b("Peter", "Petrus"), b("John", "Yohanes"), b("Thomas", "Tomas")],
    why: b("She thought He was the gardener, until He said her name. 🌷", "Dia kira Yesus itu penunggu taman, sampai Dia memanggil namanya. 🌷"),
    story: "the-empty-tomb",
  },
  {
    q: b("By the sea, how many times did Jesus ask Peter \"Do you love me?\"", "Di tepi danau, berapa kali Yesus bertanya kepada Petrus \"Apakah engkau mengasihi Aku?\""),
    options: [b("Three", "Tiga"), b("Once", "Sekali"), b("Two", "Dua"), b("Seven", "Tujuh")],
    why: b("Three denials, three chances to say \"I love you.\" 🤍", "Tiga kali menyangkal, tiga kesempatan untuk bilang \"aku mengasihi-Mu.\" 🤍"),
    story: "do-you-love-me",
  },
  {
    q: b("About how many people believed on the day of Pentecost?", "Kira-kira berapa orang yang percaya pada hari Pentakosta?"),
    options: [b("3,000", "3.000"), b("300", "300"), b("120", "120"), b("12", "12")],
    why: b("\"About three thousand souls\" in one day, after Peter preached. (Acts 2:41)", "\"Kira-kira tiga ribu jiwa\" dalam sehari, setelah Petrus berkhotbah. (Kisah 2:41)"),
    story: "pentecost",
  },
  {
    q: b("What fell from Saul's eyes when Ananias prayed for him?", "Apa yang jatuh dari mata Saulus waktu Ananias mendoakannya?"),
    options: [b("Something like scales", "Sesuatu seperti sisik"), b("Tears", "Air mata"), b("Dust", "Debu"), b("Light", "Cahaya")],
    why: b("\"There fell from his eyes as it had been scales,\" and he could see again.", "\"Seketika itu juga seolah-olah selaput gugur dari matanya,\" dan dia bisa melihat lagi."),
    story: "saul-becomes-paul",
  },
  {
    q: b("What were Paul and Silas doing at midnight in prison?", "Apa yang Paulus dan Silas lakukan di penjara tengah malam?"),
    options: [b("Praying and singing", "Berdoa dan bernyanyi"), b("Sleeping", "Tidur"), b("Planning an escape", "Merencanakan kabur"), b("Crying", "Menangis")],
    why: b("Singing in chains. Then the earthquake, and the jailer's whole family believed. 🎶", "Bernyanyi dalam rantai. Lalu gempa bumi, dan seluruh keluarga kepala penjara percaya. 🎶"),
    story: "singing-at-midnight",
  },
  {
    q: b("Hagar gave God a name. What did she call Him?", "Hagar memberi Tuhan sebuah nama. Apa sebutannya?"),
    options: [b("The God who sees me", "Allah yang melihat aku"), b("The God who provides", "Allah yang menyediakan"), b("The God of peace", "Allah damai sejahtera"), b("The Mighty One", "Yang Perkasa")],
    why: b("\"Thou God seest me.\" A runaway servant in the desert, and God found her.", "\"Engkaulah El-Roi.\" Seorang budak yang kabur di padang gurun, dan Tuhan menemukannya."),
    story: "the-god-who-sees",
  },
];

export const people: Person[] = [
  {
    name: b("Moses", "Musa"),
    clues: [
      b("I grew up in a palace, but I wasn't royal by birth.", "Aku dibesarkan di istana, tapi aku bukan keturunan raja."),
      b("I spent 40 years taking care of sheep in the desert.", "Aku menggembalakan domba di padang gurun selama 40 tahun."),
      b("God spoke to me from a bush that was on fire but didn't burn up.", "Tuhan berbicara kepadaku dari semak yang menyala tapi tidak terbakar."),
    ],
    story: "the-burning-bush",
  },
  {
    name: b("Noah", "Nuh"),
    clues: [
      b("People probably thought I was crazy for what I was building.", "Orang-orang mungkin mengira aku gila karena apa yang kubangun."),
      b("Animals came to me, two by two.", "Binatang-binatang datang kepadaku, berpasang-pasangan."),
      b("After the rain stopped, God showed me a rainbow.", "Setelah hujan berhenti, Tuhan menunjukkan pelangi kepadaku."),
    ],
    story: "noah-and-the-rainbow",
  },
  {
    name: b("David", "Daud"),
    clues: [
      b("I was the youngest son, and nobody invited me when the prophet came.", "Aku anak bungsu, dan tidak ada yang mengundangku waktu nabi datang."),
      b("I protected my sheep from a lion and a bear.", "Aku melindungi domba-dombaku dari singa dan beruang."),
      b("I beat a giant with a sling and one stone.", "Aku mengalahkan raksasa dengan umban dan satu batu."),
    ],
    story: "david-and-goliath",
  },
  {
    name: b("Esther", "Ester"),
    clues: [
      b("I was an orphan, raised by my cousin.", "Aku yatim piatu, dibesarkan oleh sepupuku."),
      b("I became queen of Persia and kept a big secret.", "Aku menjadi ratu Persia dan menyimpan rahasia besar."),
      b("I said, \"If I perish, I perish.\"", "Aku berkata, \"Kalau terpaksa aku mati, biarlah aku mati.\""),
    ],
    story: "esther-for-such-a-time",
  },
  {
    name: b("Jonah", "Yunus"),
    clues: [
      b("I bought a ticket going the opposite way from where God sent me.", "Aku membeli tiket ke arah yang berlawanan dari tempat Tuhan mengutusku."),
      b("I spent three days somewhere very dark… and very fishy. 🐟", "Aku menghabiskan tiga hari di tempat yang sangat gelap… dan bau ikan. 🐟"),
      b("I got upset when God forgave the city of Nineveh.", "Aku kesal waktu Tuhan mengampuni kota Niniwe."),
    ],
    story: "running-from-god",
  },
  {
    name: b("Joseph", "Yusuf"),
    clues: [
      b("My dad gave me a very special, colorful coat.", "Ayahku memberiku jubah yang istimewa dan warna-warni."),
      b("My own brothers sold me as a slave.", "Saudara-saudaraku sendiri menjualku sebagai budak."),
      b("I explained Pharaoh's dreams and became a ruler in Egypt.", "Aku mengartikan mimpi Firaun dan menjadi penguasa di Mesir."),
    ],
    story: "joseph-meant-for-good",
  },
  {
    name: b("Ruth", "Rut"),
    clues: [
      b("I'm from Moab, a foreigner in Israel.", "Aku dari Moab, orang asing di Israel."),
      b("I refused to leave my mother-in-law after we both lost our husbands.", "Aku tidak mau meninggalkan ibu mertuaku setelah kami sama-sama kehilangan suami."),
      b("I gathered leftover grain in the field of Boaz.", "Aku memungut sisa gandum di ladang Boas."),
    ],
    story: "ruth-and-naomi",
  },
  {
    name: b("Daniel", "Daniel"),
    clues: [
      b("I was taken to Babylon as a teenager.", "Aku dibawa ke Babel waktu masih remaja."),
      b("Even when it was against the law, I kept praying by my open window.", "Walaupun dilarang hukum, aku tetap berdoa di jendela yang terbuka."),
      b("I spent a whole night with hungry lions. 🦁", "Aku menghabiskan satu malam bersama singa-singa yang lapar. 🦁"),
    ],
    story: "daniel-in-the-lions-den",
  },
  {
    name: b("Peter", "Petrus"),
    clues: [
      b("I was a fisherman with a big mouth and a big heart.", "Aku seorang nelayan yang suka asal ngomong tapi hatinya besar."),
      b("I actually walked on water… for a few steps.", "Aku benar-benar berjalan di atas air… beberapa langkah."),
      b("I said I didn't know Jesus three times, and He still gave me breakfast.", "Aku menyangkal Yesus tiga kali, dan Dia tetap membuatkanku sarapan."),
    ],
    story: "do-you-love-me",
  },
  {
    name: b("Zacchaeus", "Zakheus"),
    clues: [
      b("I was very rich, but nobody in town liked me.", "Aku sangat kaya, tapi tidak ada orang di kota yang suka padaku."),
      b("I was the chief tax collector in Jericho.", "Aku kepala pemungut cukai di Yerikho."),
      b("I climbed a sycamore tree just to see Jesus.", "Aku memanjat pohon ara hanya untuk melihat Yesus."),
    ],
    story: "zacchaeus",
  },
  {
    name: b("Mary Magdalene", "Maria Magdalena"),
    clues: [
      b("Jesus set me free from seven demons, and I followed Him after that.", "Yesus membebaskanku dari tujuh roh jahat, dan sejak itu aku mengikuti-Nya."),
      b("I stood near the cross when He died.", "Aku berdiri dekat salib waktu Dia wafat."),
      b("At the empty tomb, I thought He was the gardener.", "Di kubur yang kosong, aku mengira Dia penunggu taman."),
    ],
    story: "the-empty-tomb",
  },
  {
    name: b("Paul", "Paulus"),
    clues: [
      b("I used to arrest and hunt down Christians.", "Dulu aku menangkap dan memburu orang Kristen."),
      b("A bright light stopped me on the road to Damascus.", "Cahaya terang menghentikanku di jalan menuju Damsyik."),
      b("I sang in prison at midnight, and wrote many letters in the New Testament.", "Aku bernyanyi di penjara tengah malam, dan menulis banyak surat di Perjanjian Baru."),
    ],
    story: "saul-becomes-paul",
  },
  {
    name: b("Elijah", "Elia"),
    clues: [
      b("I prayed, and fire fell from heaven on Mount Carmel.", "Aku berdoa, dan api turun dari langit di Gunung Karmel."),
      b("Right after that, I ran away and wanted to give up.", "Tepat setelah itu, aku lari dan ingin menyerah."),
      b("An angel woke me up under a tree and said, \"Arise and eat.\"", "Malaikat membangunkanku di bawah pohon dan berkata, \"Bangunlah, makanlah!\""),
    ],
    story: "under-the-broom-tree",
  },
  {
    name: b("Gideon", "Gideon"),
    clues: [
      b("An angel called me a mighty warrior while I was hiding.", "Malaikat menyebutku pahlawan yang gagah berani waktu aku sedang bersembunyi."),
      b("I asked God for a sign with a wool fleece. Twice.", "Aku minta tanda dari Tuhan dengan bulu domba. Dua kali."),
      b("I won a battle with only 300 men, trumpets, and jars.", "Aku menang perang hanya dengan 300 orang, sangkakala, dan buyung."),
    ],
    story: "gideon-mighty-warrior",
  },
  {
    name: b("Solomon", "Salomo"),
    clues: [
      b("My father was a famous king who played the harp.", "Ayahku raja terkenal yang pandai bermain kecapi."),
      b("God told me in a dream to ask for anything I wanted.", "Tuhan berkata dalam mimpi bahwa aku boleh meminta apa saja."),
      b("I asked for wisdom, and once solved a case about two mothers and a baby.", "Aku meminta hikmat, dan pernah memutuskan perkara dua ibu dan seorang bayi."),
    ],
    story: "solomon-asks-for-wisdom",
  },
  {
    name: b("Hannah", "Hana"),
    clues: [
      b("For years, someone in my family teased me because I had no children.", "Bertahun-tahun, seseorang di keluargaku mengejekku karena aku tidak punya anak."),
      b("I prayed so hard that the priest thought I was drunk.", "Aku berdoa begitu sungguh-sungguh sampai imam mengira aku mabuk."),
      b("My son Samuel became a great prophet.", "Anakku Samuel menjadi nabi besar."),
    ],
    story: "hannah-prays",
  },
  {
    name: b("Abraham", "Abraham"),
    clues: [
      b("God told me to leave home, but didn't say where I was going.", "Tuhan menyuruhku meninggalkan rumah, tapi tidak bilang ke mana."),
      b("He told me to go outside and count the stars.", "Dia menyuruhku keluar dan menghitung bintang."),
      b("I became a father when I was 100 years old.", "Aku menjadi ayah waktu umurku 100 tahun."),
    ],
    story: "count-the-stars",
  },
  {
    name: b("Lazarus", "Lazarus"),
    clues: [
      b("My sisters were Martha and Mary.", "Saudara perempuanku adalah Marta dan Maria."),
      b("I was in a tomb for four days.", "Aku berada di dalam kubur selama empat hari."),
      b("Jesus called, \"Come forth!\" and I walked out.", "Yesus berseru, \"Marilah ke luar!\" dan aku berjalan keluar."),
    ],
    story: "lazarus-come-forth",
  },
];

export const verseBlanks: VerseBlank[] = [
  { reference: "Psalm 23:1", before: "The LORD is my", after: "; I shall not want.", options: [b("shepherd", "gembala"), b("king", "raja"), b("friend", "sahabat"), b("rock", "gunung batu")] },
  { reference: "Psalm 119:105", before: "Thy word is a", after: "unto my feet, and a light unto my path.", options: [b("lamp", "pelita"), b("map", "peta"), b("sword", "pedang"), b("song", "lagu")] },
  { reference: "John 3:16", before: "For God so", after: "the world, that he gave his only begotten Son.", options: [b("loved", "mengasihi"), b("blessed", "memberkati"), b("watched", "mengawasi"), b("made", "menciptakan")] },
  { reference: "Philippians 4:13", before: "I can do all things through", after: "which strengtheneth me.", options: [b("Christ", "Kristus"), b("prayer", "doa"), b("faith", "iman"), b("love", "kasih")] },
  { reference: "Psalm 46:10", before: "Be", after: ", and know that I am God.", options: [b("still", "diam / tenang"), b("strong", "kuat"), b("brave", "berani"), b("glad", "bersukacita")] },
  { reference: "Matthew 11:28", before: "Come unto me, all ye that labour and are heavy laden, and I will give you", after: ".", options: [b("rest", "kelegaan"), b("bread", "roti"), b("gold", "emas"), b("wisdom", "hikmat")] },
  { reference: "2 Corinthians 12:9", before: "My grace is", after: "for thee: for my strength is made perfect in weakness.", options: [b("sufficient", "cukup"), b("waiting", "menunggu"), b("coming", "datang"), b("hidden", "tersembunyi")] },
  { reference: "Proverbs 3:5", before: "Trust in the LORD with all thine", after: "; and lean not unto thine own understanding.", options: [b("heart", "hati"), b("strength", "kekuatan"), b("mind", "pikiran"), b("soul", "jiwa")] },
  { reference: "Isaiah 40:31", before: "they shall mount up with wings as", after: "; they shall run, and not be weary.", options: [b("eagles", "rajawali"), b("angels", "malaikat"), b("doves", "merpati"), b("sparrows", "burung pipit")] },
  { reference: "1 John 4:8", before: "He that loveth not knoweth not God; for God is", after: ".", options: [b("love", "kasih"), b("light", "terang"), b("near", "dekat"), b("good", "baik")] },
  { reference: "Lamentations 3:23", before: "They are new every", after: ": great is thy faithfulness.", options: [b("morning", "pagi"), b("day", "hari"), b("year", "tahun"), b("hour", "jam")] },
  { reference: "John 11:35", before: "Jesus", after: ".", options: [b("wept", "menangis"), b("smiled", "tersenyum"), b("slept", "tidur"), b("prayed", "berdoa")] },
  { reference: "Psalm 56:3", before: "What time I am", after: ", I will trust in thee.", options: [b("afraid", "takut"), b("alone", "sendirian"), b("tired", "lelah"), b("sad", "sedih")] },
  { reference: "Jeremiah 29:11", before: "For I know the thoughts that I think toward you, saith the LORD, thoughts of", after: ", and not of evil.", options: [b("peace", "damai sejahtera"), b("joy", "sukacita"), b("power", "kuasa"), b("glory", "kemuliaan")] },
  { reference: "Psalm 118:24", before: "This is the day which the LORD hath made; we will", after: "and be glad in it.", options: [b("rejoice", "bersorak-sorak"), b("rest", "beristirahat"), b("pray", "berdoa"), b("sing", "bernyanyi")] },
  { reference: "Matthew 28:20", before: "and, lo, I am with you", after: ", even unto the end of the world.", options: [b("alway", "senantiasa"), b("today", "hari ini"), b("sometimes", "kadang-kadang"), b("here", "di sini")] },
];

export type Rank = { min: number; title: Bi; note: Bi };

// Picked by score percentage at the end of a round.
export const ranks: Rank[] = [
  { min: 90, title: b("Bible Bestie 👑", "Sahabat Alkitab"), note: b("Okay wow, you really know your stuff!", "Wah, kamu beneran hafal banget!") },
  { min: 70, title: b("Scripture Star ⭐", "Bintang Firman"), note: b("So good! Just a few more to go.", "Keren banget! Sedikit lagi sempurna.") },
  { min: 40, title: b("Growing Sprout 🌱", "Tunas yang Bertumbuh"), note: b("You're growing! Every story is waiting in Bible Stories.", "Kamu lagi bertumbuh! Semua ceritanya ada di Bible Stories.") },
  { min: 0, title: b("Brave Beginner 🐣", "Pemula Pemberani"), note: b("Everyone starts somewhere. Read a story and try again!", "Semua orang mulai dari nol. Baca satu cerita, lalu coba lagi!") },
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
