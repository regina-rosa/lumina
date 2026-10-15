import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDevotionalById } from "@/lib/devotionalStore";
import ArticleView from "@/components/ArticleView";
import { isLang, withLang } from "@/lib/i18n/config";
import { ui } from "@/lib/i18n/ui";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type Props = PageProps<"/[lang]/read/[id]">;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const devotional = await getDevotionalById(id);
  if (!devotional) return { title: "Devotional not found" };
  const description = devotional.body.replace(/\s+/g, " ").slice(0, 155);
  return {
    title: `${devotional.title}`,
    description,
    openGraph: {
      title: devotional.title,
      description,
      type: "article",
    },
  };
}

export default async function ReadArticlePage({ params }: Props) {
  const { id, lang } = await params;
  const devotional = await getDevotionalById(id);
  if (!devotional || !isLang(lang)) notFound();

  return (
    <div className="flex flex-col gap-6">
      <ArticleView devotional={devotional} />
      <div className="flex items-center justify-center gap-2 text-sm text-muted">
        <Link
          href={withLang(lang, "/")}
          className="font-medium text-accent-strong hover:text-accent"
        >
          {ui[lang].read.back}
        </Link>
      </div>
    </div>
  );
}
