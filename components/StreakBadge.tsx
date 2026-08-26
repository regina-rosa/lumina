export default function StreakBadge({ streak }: { streak: number }) {
  return (
    <div className="flex items-center gap-2 rounded-full border border-amber-900/10 bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-800">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-4 w-4 fill-amber-600"
      >
        <path d="M12 2c1 3-1.5 4.5-2.5 6.5C8.5 10.5 8 12 9 13.5c-1.5-.3-2.7-1.6-3-3.2C4.7 12 4 14 4 15.5 4 19.6 7.6 22 12 22s8-2.4 8-6.5c0-3.3-2-6-4-8 .3 1.7-.6 3-1.7 3.6C15 8 14.5 4.8 12 2z" />
      </svg>
      {streak > 0
        ? `${streak} hari beruntun`
        : "Mulai renunganmu hari ini"}
    </div>
  );
}
