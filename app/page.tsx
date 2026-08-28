import VerseCard from "@/components/VerseCard";
import TodayJournal from "@/components/TodayJournal";
import TodayLabel from "@/components/TodayLabel";
import Greeting from "@/components/Greeting";
import StatsOverview from "@/components/StatsOverview";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <TodayLabel />
        <Greeting />
      </div>
      <StatsOverview />
      <VerseCard />
      <TodayJournal />
    </div>
  );
}
