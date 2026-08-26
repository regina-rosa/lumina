export type Verse = {
  reference: string;
  text: string;
};

export const verses: Verse[] = [
  { reference: "Yeremia 29:11", text: "Sebab Aku ini mengetahui rancangan-rancangan apa yang ada pada-Ku mengenai kamu, demikianlah firman TUHAN, yaitu rancangan damai sejahtera dan bukan rancangan kecelakaan, untuk memberikan kepadamu hari depan yang penuh harapan." },
  { reference: "Mazmur 119:105", text: "Firman-Mu itu pelita bagi kakiku dan terang bagi jalanku." },
  { reference: "Yohanes 3:16", text: "Karena begitu besar kasih Allah akan dunia ini, sehingga Ia telah mengaruniakan Anak-Nya yang tunggal, supaya setiap orang yang percaya kepada-Nya tidak binasa, melainkan beroleh hidup yang kekal." },
  { reference: "Filipi 4:13", text: "Segala perkara dapat kutanggung di dalam Dia yang memberi kekuatan kepadaku." },
  { reference: "Amsal 3:5-6", text: "Percayalah kepada TUHAN dengan segenap hatimu, dan janganlah bersandar kepada pengertianmu sendiri. Akuilah Dia dalam segala lakumu, maka Ia akan meluruskan jalanmu." },
  { reference: "Roma 8:28", text: "Kita tahu sekarang, bahwa Allah turut bekerja dalam segala sesuatu untuk mendatangkan kebaikan bagi mereka yang mengasihi Dia." },
  { reference: "Mazmur 23:1", text: "TUHAN adalah gembalaku, takkan kekurangan aku." },
  { reference: "Yosua 1:9", text: "Kuatkan dan teguhkanlah hatimu, janganlah takut dan janganlah gentar, sebab TUHAN, Allahmu, menyertai engkau, ke mana pun engkau pergi." },
  { reference: "Mazmur 46:1", text: "Allah itu bagi kita tempat perlindungan dan kekuatan, sebagai penolong dalam kesesakan sangat terbukti." },
  { reference: "Yesaya 41:10", text: "Janganlah takut, sebab Aku menyertai engkau, janganlah bimbang, sebab Aku ini Allahmu; Aku akan meneguhkan, bahkan akan menolong engkau." },
  { reference: "Amsal 16:3", text: "Serahkanlah perbuatanmu kepada TUHAN, maka terlaksanalah segala rencanamu." },
  { reference: "Mazmur 37:4", text: "Dan bergembiralah karena TUHAN; maka Ia akan memberikan kepadamu apa yang diinginkan hatimu." },
  { reference: "Matius 6:33", text: "Tetapi carilah dahulu Kerajaan Allah dan kebenarannya, maka semuanya itu akan ditambahkan kepadamu." },
  { reference: "2 Korintus 5:17", text: "Jadi siapa yang ada di dalam Kristus, ia adalah ciptaan baru: yang lama sudah berlalu, sesungguhnya yang baru sudah datang." },
  { reference: "Galatia 6:9", text: "Janganlah kita jemu-jemu berbuat baik, karena apabila kita tidak menjadi lemah, kita akan menuai pada waktunya." },
  { reference: "Mazmur 34:18", text: "TUHAN itu dekat kepada orang-orang yang patah hati, dan Ia menyelamatkan orang-orang yang remuk jiwanya." },
  { reference: "1 Korintus 13:4", text: "Kasih itu sabar; kasih itu murah hati; ia tidak cemburu, ia tidak memegahkan diri dan tidak sombong." },
  { reference: "Yesaya 40:31", text: "Tetapi orang-orang yang menanti-nantikan TUHAN mendapat kekuatan baru: mereka seumpama rajawali yang naik terbang dengan kekuatan sayapnya." },
  { reference: "Mazmur 27:1", text: "TUHAN adalah terangku dan keselamatanku, kepada siapakah aku harus takut?" },
  { reference: "Ibrani 11:1", text: "Iman adalah dasar dari segala sesuatu yang kita harapkan dan bukti dari segala sesuatu yang tidak kita lihat." },
  { reference: "Amsal 4:23", text: "Jagalah hatimu dengan segala kewaspadaan, karena dari situlah terpancar kehidupan." },
  { reference: "Mazmur 55:22", text: "Serahkanlah kuatirmu kepada TUHAN, maka Ia akan memelihara engkau! Tidak untuk selama-lamanya dibiarkan-Nya orang benar itu goyah." },
  { reference: "2 Timotius 1:7", text: "Sebab Allah memberikan kepada kita bukan roh ketakutan, melainkan roh yang membangkitkan kekuatan, kasih dan ketertiban." },
  { reference: "Mazmur 118:24", text: "Inilah hari yang dijadikan TUHAN, marilah kita bersorak-sorak dan bersukacita karenanya." },
  { reference: "Filipi 4:6-7", text: "Janganlah hendaknya kamu kuatir tentang apa pun juga, tetapi nyatakanlah dalam segala hal keinginanmu kepada Allah dalam doa dan permohonan dengan ucapan syukur." },
  { reference: "Mazmur 121:1-2", text: "Aku melayangkan mataku ke gunung-gunung; dari manakah akan datang pertolonganku? Pertolonganku ialah dari TUHAN, yang menjadikan langit dan bumi." },
  { reference: "Yakobus 1:2-3", text: "Saudara-saudaraku, anggaplah sebagai suatu kebahagiaan, apabila kamu jatuh ke dalam berbagai-bagai pencobaan, sebab kamu tahu, bahwa ujian terhadap imanmu itu menghasilkan ketekunan." },
  { reference: "Ulangan 31:6", text: "Kuatkan dan teguhkanlah hatimu, janganlah takut dan janganlah gentar, sebab TUHAN, Allahmu, sendiri yang berjalan menyertai engkau; Ia tidak akan membiarkan engkau dan tidak akan meninggalkan engkau." },
  { reference: "Mazmur 139:14", text: "Aku bersyukur kepada-Mu oleh karena kejadianku dahsyat dan ajaib; ajaib apa yang Kaubuat, dan jiwaku benar-benar menyadarinya." },
  { reference: "Roma 12:2", text: "Berubahlah oleh pembaharuan budimu, sehingga kamu dapat membedakan manakah kehendak Allah: apa yang baik, yang berkenan kepada Allah dan yang sempurna." },
  { reference: "Mazmur 90:12", text: "Ajarlah kami menghitung hari-hari kami sedemikian, hingga kami beroleh hati yang bijaksana." },
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
