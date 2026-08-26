import VerseCard from "@/components/VerseCard";
import TodayJournal from "@/components/TodayJournal";
import TodayLabel from "@/components/TodayLabel";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <TodayLabel />
        <h1 className="font-serif text-2xl text-[#1c1917]">Selamat datang kembali</h1>
      </div>
      <VerseCard />
      <TodayJournal />
    </div>
  );
}
