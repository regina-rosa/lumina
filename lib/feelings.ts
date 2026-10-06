import type { Verse } from "./verses";

// Verses to sit with for how you feel today. KJV text.
export type Feeling = {
  id: string;
  label: string;
  emoji: string;
  note: string;
  verses: Verse[];
};

export const feelings: Feeling[] = [
  {
    id: "anxious",
    label: "Anxious",
    emoji: "🌧️",
    note: "You don't have to carry tomorrow today. Hand Him the thing that's spinning in your head.",
    verses: [
      { reference: "Philippians 4:6-7", text: "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God. And the peace of God, which passeth all understanding, shall keep your hearts and minds through Christ Jesus." },
      { reference: "1 Peter 5:7", text: "Casting all your care upon him; for he careth for you." },
      { reference: "Isaiah 26:3", text: "Thou wilt keep him in perfect peace, whose mind is stayed on thee: because he trusteth in thee." },
      { reference: "Matthew 6:34", text: "Take therefore no thought for the morrow: for the morrow shall take thought for the things of itself. Sufficient unto the day is the evil thereof." },
    ],
  },
  {
    id: "sad",
    label: "Sad",
    emoji: "💧",
    note: "It's okay to cry. God is close to the brokenhearted, not far from them.",
    verses: [
      { reference: "Psalm 34:18", text: "The LORD is nigh unto them that are of a broken heart; and saveth such as be of a contrite spirit." },
      { reference: "Psalm 147:3", text: "He healeth the broken in heart, and bindeth up their wounds." },
      { reference: "Psalm 30:5", text: "For his anger endureth but a moment; in his favour is life: weeping may endure for a night, but joy cometh in the morning." },
      { reference: "Revelation 21:4", text: "And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away." },
    ],
  },
  {
    id: "tired",
    label: "Tired",
    emoji: "🌙",
    note: "Rest isn't failure. Even Elijah needed a nap and a meal before anything else.",
    verses: [
      { reference: "Matthew 11:28", text: "Come unto me, all ye that labour and are heavy laden, and I will give you rest." },
      { reference: "Isaiah 40:29", text: "He giveth power to the faint; and to them that have no might he increaseth strength." },
      { reference: "Isaiah 40:31", text: "But they that wait upon the LORD shall renew their strength; they shall mount up with wings as eagles; they shall run, and not be weary; and they shall walk, and not faint." },
      { reference: "Psalm 23:2-3", text: "He maketh me to lie down in green pastures: he leadeth me beside the still waters. He restoreth my soul." },
    ],
  },
  {
    id: "lonely",
    label: "Lonely",
    emoji: "🕊️",
    note: "Even when no one else notices, you are seen. He is the God who sees.",
    verses: [
      { reference: "Hebrews 13:5", text: "for he hath said, I will never leave thee, nor forsake thee." },
      { reference: "Deuteronomy 31:6", text: "Be strong and of a good courage, fear not, nor be afraid of them: for the LORD thy God, he it is that doth go with thee; he will not fail thee, nor forsake thee." },
      { reference: "Matthew 28:20", text: "and, lo, I am with you alway, even unto the end of the world." },
      { reference: "Psalm 68:6", text: "God setteth the solitary in families." },
    ],
  },
  {
    id: "afraid",
    label: "Afraid",
    emoji: "🕯️",
    note: "Fear is loud, but it isn't in charge. You can be afraid and still trust Him.",
    verses: [
      { reference: "Isaiah 41:10", text: "Fear thou not; for I am with thee: be not dismayed; for I am thy God: I will strengthen thee; yea, I will help thee; yea, I will uphold thee with the right hand of my righteousness." },
      { reference: "Psalm 56:3", text: "What time I am afraid, I will trust in thee." },
      { reference: "2 Timothy 1:7", text: "For God hath not given us the spirit of fear; but of power, and of love, and of a sound mind." },
      { reference: "Psalm 27:1", text: "The LORD is my light and my salvation; whom shall I fear? the LORD is the strength of my life; of whom shall I be afraid?" },
    ],
  },
  {
    id: "not-enough",
    label: "Not enough",
    emoji: "🌱",
    note: "Your weakness isn't the end of the story. It's often where His strength shows up.",
    verses: [
      { reference: "2 Corinthians 12:9", text: "My grace is sufficient for thee: for my strength is made perfect in weakness." },
      { reference: "Psalm 139:14", text: "I will praise thee; for I am fearfully and wonderfully made: marvellous are thy works; and that my soul knoweth right well." },
      { reference: "Ephesians 2:10", text: "For we are his workmanship, created in Christ Jesus unto good works, which God hath before ordained that we should walk in them." },
      { reference: "Zephaniah 3:17", text: "The LORD thy God in the midst of thee is mighty; he will save, he will rejoice over thee with joy; he will rest in his love, he will joy over thee with singing." },
    ],
  },
  {
    id: "guilty",
    label: "Guilty",
    emoji: "🤍",
    note: "You don't have to hide. Come out from behind the trees. Mercy is new this morning.",
    verses: [
      { reference: "1 John 1:9", text: "If we confess our sins, he is faithful and just to forgive us our sins, and to cleanse us from all unrighteousness." },
      { reference: "Romans 8:1", text: "There is therefore now no condemnation to them which are in Christ Jesus." },
      { reference: "Psalm 103:12", text: "As far as the east is from the west, so far hath he removed our transgressions from us." },
      { reference: "Lamentations 3:22-23", text: "It is of the LORD's mercies that we are not consumed, because his compassions fail not. They are new every morning: great is thy faithfulness." },
    ],
  },
  {
    id: "confused",
    label: "Confused",
    emoji: "🧭",
    note: "You don't need the whole map. Just the next step, and the One who's guiding you.",
    verses: [
      { reference: "Proverbs 3:5-6", text: "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths." },
      { reference: "James 1:5", text: "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him." },
      { reference: "Psalm 32:8", text: "I will instruct thee and teach thee in the way which thou shalt go: I will guide thee with mine eye." },
      { reference: "Isaiah 30:21", text: "And thine ears shall hear a word behind thee, saying, This is the way, walk ye in it, when ye turn to the right hand, and when ye turn to the left." },
    ],
  },
  {
    id: "angry",
    label: "Angry",
    emoji: "🔥",
    note: "Anger is allowed. Take a breath before you speak, and bring it to God first.",
    verses: [
      { reference: "Ephesians 4:26", text: "Be ye angry, and sin not: let not the sun go down upon your wrath." },
      { reference: "James 1:19-20", text: "Wherefore, my beloved brethren, let every man be swift to hear, slow to speak, slow to wrath: For the wrath of man worketh not the righteousness of God." },
      { reference: "Proverbs 15:1", text: "A soft answer turneth away wrath: but grievous words stir up anger." },
      { reference: "Ephesians 4:32", text: "And be ye kind one to another, tenderhearted, forgiving one another, even as God for Christ's sake hath forgiven you." },
    ],
  },
  {
    id: "waiting",
    label: "Waiting",
    emoji: "⏳",
    note: "Waiting isn't wasted. Like manna, there's enough grace for just today.",
    verses: [
      { reference: "Psalm 27:14", text: "Wait on the LORD: be of good courage, and he shall strengthen thine heart: wait, I say, on the LORD." },
      { reference: "Lamentations 3:25", text: "The LORD is good unto them that wait for him, to the soul that seeketh him." },
      { reference: "Ecclesiastes 3:1", text: "To every thing there is a season, and a time to every purpose under the heaven." },
      { reference: "Habakkuk 2:3", text: "though it tarry, wait for it; because it will surely come, it will not tarry." },
    ],
  },
  {
    id: "thankful",
    label: "Thankful",
    emoji: "🌻",
    note: "Hold onto this feeling. Name one good thing and say thank You for it.",
    verses: [
      { reference: "Psalm 107:1", text: "O give thanks unto the LORD, for he is good: for his mercy endureth for ever." },
      { reference: "1 Thessalonians 5:18", text: "In every thing give thanks: for this is the will of God in Christ Jesus concerning you." },
      { reference: "James 1:17", text: "Every good gift and every perfect gift is from above, and cometh down from the Father of lights." },
      { reference: "Psalm 118:24", text: "This is the day which the LORD hath made; we will rejoice and be glad in it." },
    ],
  },
  {
    id: "joyful",
    label: "Joyful",
    emoji: "☀️",
    note: "Joy is a gift. Enjoy it fully, and let it turn into praise.",
    verses: [
      { reference: "Nehemiah 8:10", text: "for the joy of the LORD is your strength." },
      { reference: "Psalm 16:11", text: "in thy presence is fulness of joy; at thy right hand there are pleasures for evermore." },
      { reference: "Philippians 4:4", text: "Rejoice in the Lord alway: and again I say, Rejoice." },
      { reference: "Psalm 126:3", text: "The LORD hath done great things for us; whereof we are glad." },
    ],
  },
];

export function getFeeling(id: string): Feeling | undefined {
  return feelings.find((f) => f.id === id);
}
