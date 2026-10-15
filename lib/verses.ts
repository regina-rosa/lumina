import { localizeRef, type Lang } from "./i18n/config";

// English is KJV. Indonesian and Chinese follow common Bible wording for each verse.
export type Verse = {
  reference: string;
  text: string;
  tr: { id: string; zh: string };
};

export function verseText(verse: Verse, lang: Lang): string {
  return lang === "en" ? verse.text : verse.tr[lang];
}

export function verseRef(verse: Verse, lang: Lang): string {
  return localizeRef(verse.reference, lang);
}

const v = (reference: string, text: string, id: string, zh: string): Verse => ({
  reference,
  text,
  tr: { id, zh },
});

export const verses: Verse[] = [
  v("Jeremiah 29:11", "For I know the thoughts that I think toward you, saith the LORD, thoughts of peace, and not of evil, to give you an expected end.",
    "Sebab Aku tahu rancangan-rancangan yang Kupikirkan tentang kamu, firman TUHAN, rancangan damai sejahtera dan bukan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan.",
    "耶和华说：我知道我向你们所怀的意念，是赐平安的意念，不是降灾祸的意念，要叫你们末后有指望。"),
  v("Psalm 119:105", "Thy word is a lamp unto my feet, and a light unto my path.",
    "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku.",
    "你的话是我脚前的灯，是我路上的光。"),
  v("John 3:16", "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life.",
    "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal.",
    "神爱世人，甚至将他的独生子赐给他们，叫一切信他的，不致灭亡，反得永生。"),
  v("Philippians 4:13", "I can do all things through Christ which strengtheneth me.",
    "Segala perkara dapat kutanggung di dalam Kristus yang memberi kekuatan kepadaku.",
    "我靠着那加给我力量的，凡事都能做。"),
  v("Proverbs 3:5-6", "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths.",
    "Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar pada pengertianmu sendiri. Akuilah Dia dalam segala lakumu, maka Ia akan meluruskan jalanmu.",
    "你要专心仰赖耶和华，不可倚靠自己的聪明，在你一切所行的事上都要认定他，他必指引你的路。"),
  v("Romans 8:28", "And we know that all things work together for good to them that love God, to them who are the called according to his purpose.",
    "Kita tahu bahwa segala sesuatu bekerja bersama-sama untuk mendatangkan kebaikan bagi mereka yang mengasihi Allah, yaitu bagi mereka yang terpanggil sesuai dengan rencana-Nya.",
    "我们晓得万事都互相效力，叫爱神的人得益处，就是按他旨意被召的人。"),
  v("Psalm 23:1", "The LORD is my shepherd; I shall not want.",
    "TUHAN adalah gembalaku, aku tidak akan kekurangan.",
    "耶和华是我的牧者，我必不致缺乏。"),
  v("Joshua 1:9", "Be strong and of a good courage; be not afraid, neither be thou dismayed: for the LORD thy God is with thee whithersoever thou goest.",
    "Kuatkan dan teguhkanlah hatimu; jangan takut dan jangan tawar hati, sebab TUHAN, Allahmu, menyertai engkau ke mana pun engkau pergi.",
    "你当刚强壮胆，不要惧怕，也不要惊惶，因为你无论往哪里去，耶和华你的神必与你同在。"),
  v("Psalm 46:1", "God is our refuge and strength, a very present help in trouble.",
    "Allah adalah tempat perlindungan dan kekuatan kita, penolong yang selalu ada dalam kesesakan.",
    "神是我们的避难所，是我们的力量，是我们在患难中随时的帮助。"),
  v("Isaiah 41:10", "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee.",
    "Janganlah takut, sebab Aku menyertai engkau; janganlah cemas, sebab Aku ini Allahmu; Aku akan meneguhkan engkau, ya, Aku akan menolong engkau.",
    "你不要害怕，因为我与你同在；不要惊惶，因为我是你的神。我必坚固你，必帮助你。"),
  v("Proverbs 16:3", "Commit thy works unto the LORD, and thy thoughts shall be established.",
    "Serahkanlah pekerjaanmu kepada TUHAN, maka rencanamu akan terlaksana.",
    "你所做的，要交托耶和华，你所谋的，就必成立。"),
  v("Psalm 37:4", "Delight thyself also in the LORD; and he shall give thee the desires of thine heart.",
    "Bergembiralah karena TUHAN, maka Ia akan memberikan kepadamu apa yang diinginkan hatimu.",
    "又要以耶和华为乐，他就将你心里所求的赐给你。"),
  v("Matthew 6:33", "But seek ye first the kingdom of God, and his righteousness; and all these things shall be added unto you.",
    "Tetapi carilah dahulu Kerajaan Allah dan kebenaran-Nya, maka semua itu akan ditambahkan kepadamu.",
    "你们要先求他的国和他的义，这些东西都要加给你们了。"),
  v("2 Corinthians 5:17", "Therefore if any man be in Christ, he is a new creature: old things are passed away; behold, all things are become new.",
    "Jadi siapa yang ada di dalam Kristus, ia adalah ciptaan baru: yang lama sudah berlalu, lihatlah, semuanya sudah menjadi baru.",
    "若有人在基督里，他就是新造的人，旧事已过，都变成新的了。"),
  v("Galatians 6:9", "And let us not be weary in well doing: for in due season we shall reap, if we faint not.",
    "Janganlah kita jemu-jemu berbuat baik, karena apabila sudah datang waktunya, kita akan menuai, jika kita tidak menjadi lemah.",
    "我们行善，不可丧志，若不灰心，到了时候就要收成。"),
  v("Psalm 34:18", "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit.",
    "TUHAN itu dekat kepada orang-orang yang patah hati, dan Ia menyelamatkan orang-orang yang remuk jiwanya.",
    "耶和华靠近伤心的人，拯救灵性痛悔的人。"),
  v("1 Corinthians 13:4", "Charity suffereth long, and is kind; charity envieth not; charity vaunteth not itself, is not puffed up.",
    "Kasih itu sabar; kasih itu murah hati; kasih tidak cemburu, kasih tidak memegahkan diri dan tidak sombong.",
    "爱是恒久忍耐，又有恩慈；爱是不嫉妒，爱是不自夸，不张狂。"),
  v("Isaiah 40:31", "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles.",
    "Tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru; mereka seumpama rajawali yang naik terbang dengan kekuatan sayapnya.",
    "但那等候耶和华的，必从新得力，他们必如鹰展翅上腾。"),
  v("Psalm 27:1", "The LORD is my light and my salvation; whom shall I fear?",
    "TUHAN adalah terangku dan keselamatanku, kepada siapakah aku harus takut?",
    "耶和华是我的亮光，是我的拯救，我还怕谁呢？"),
  v("Hebrews 11:1", "Now faith is the substance of things hoped for, the evidence of things not seen.",
    "Iman adalah dasar dari segala sesuatu yang kita harapkan dan bukti dari segala sesuatu yang tidak kita lihat.",
    "信就是所望之事的实底，是未见之事的确据。"),
  v("Proverbs 4:23", "Keep thy heart with all diligence; for out of it are the issues of life.",
    "Jagalah hatimu dengan segala kewaspadaan, karena dari situlah terpancar kehidupan.",
    "你要保守你心，胜过保守一切，因为一生的果效是由心发出。"),
  v("Psalm 55:22", "Cast thy burden upon the LORD, and he shall sustain thee: he shall never suffer the righteous to be moved.",
    "Serahkanlah bebanmu kepada TUHAN, maka Ia akan memelihara engkau! Tidak untuk selama-lamanya Ia membiarkan orang benar itu goyah.",
    "你要把你的重担卸给耶和华，他必抚养你；他永不叫义人动摇。"),
  v("2 Timothy 1:7", "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind.",
    "Sebab Allah memberikan kepada kita bukan roh ketakutan, melainkan roh yang membangkitkan kekuatan, kasih, dan ketertiban.",
    "因为神赐给我们，不是胆怯的心，乃是刚强、仁爱、谨守的心。"),
  v("Psalm 118:24", "This is the day which the LORD hath made; we will rejoice and be glad in it.",
    "Inilah hari yang dijadikan TUHAN, mari kita bersorak-sorak dan bersukacita karenanya!",
    "这是耶和华所定的日子，我们在其中要高兴欢喜。"),
  v("Philippians 4:6-7", "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God.",
    "Janganlah hendaknya kamu khawatir tentang apa pun juga, tetapi nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa dan permohonan dengan ucapan syukur.",
    "应当一无挂虑，只要凡事借着祷告、祈求和感谢，将你们所要的告诉神。"),
  v("Psalm 121:1-2", "I will lift up mine eyes unto the hills, from whence cometh my help. My help cometh from the LORD, which made heaven and earth.",
    "Aku melayangkan mataku ke gunung-gunung; dari manakah akan datang pertolonganku? Pertolonganku ialah dari TUHAN, yang menjadikan langit dan bumi.",
    "我要向山举目，我的帮助从何而来？我的帮助从造天地的耶和华而来。"),
  v("James 1:2-3", "My brethren, count it all joy when ye fall into divers temptations; knowing this, that the trying of your faith worketh patience.",
    "Saudara-saudaraku, anggaplah sebagai suatu kebahagiaan apabila kamu jatuh ke dalam berbagai-bagai pencobaan, sebab kamu tahu bahwa ujian terhadap imanmu itu menghasilkan ketekunan.",
    "我的弟兄们，你们落在百般试炼中，都要以为大喜乐；因为知道你们的信心经过试验，就生忍耐。"),
  v("Deuteronomy 31:6", "Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee.",
    "Kuatkan dan teguhkanlah hatimu, janganlah takut dan jangan gemetar, sebab TUHAN, Allahmu, Dialah yang berjalan menyertai engkau; Ia tidak akan membiarkan engkau dan tidak akan meninggalkan engkau.",
    "你们当刚强壮胆，不要害怕，也不要畏惧他们，因为耶和华你的神和你同去。他必不撇下你，也不丢弃你。"),
  v("Psalm 139:14", "I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well.",
    "Aku bersyukur kepada-Mu, karena aku dijadikan dengan dahsyat dan ajaib; ajaib apa yang Kaubuat, dan jiwaku benar-benar menyadarinya.",
    "我要称谢你，因我受造奇妙可畏；你的作为奇妙，这是我心深知道的。"),
  v("Romans 12:2", "And be not conformed to this world: but be ye transformed by the renewing of your mind, that ye may prove what is that good, and acceptable, and perfect, will of God.",
    "Janganlah kamu menjadi serupa dengan dunia ini, tetapi berubahlah oleh pembaharuan budimu, sehingga kamu dapat membedakan manakah kehendak Allah: apa yang baik, yang berkenan kepada Allah dan yang sempurna.",
    "不要效法这个世界，只要心意更新而变化，叫你们察验何为神的善良、纯全、可喜悦的旨意。"),
  v("Psalm 90:12", "So teach us to number our days, that we may apply our hearts unto wisdom.",
    "Ajarlah kami menghitung hari-hari kami sedemikian, hingga kami beroleh hati yang bijaksana.",
    "求你指教我们怎样数算自己的日子，好叫我们得着智慧的心。"),
];

function dayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / 86400000);
}

export function verseForDate(date: Date): Verse {
  const index = dayOfYear(date) % verses.length;
  return verses[index];
}

export function verseOfToday(): Verse {
  return verseForDate(new Date());
}
