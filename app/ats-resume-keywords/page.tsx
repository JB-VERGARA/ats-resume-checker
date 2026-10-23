import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ATS Resume Keywords Guide",
  description:
    "Learn how ATS resume keywords work, how to identify important keywords in a job description, and how to improve keyword alignment honestly.",
};

export default function ATSResumeKeywordsPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-950">
      <article className="mx-auto max-w-4xl px-6 py-16 sm:py-24">
        <Link
          href="/"
          className="text-sm font-semibold text-zinc-500 hover:text-zinc-950"
        >
          ← ATS Resume Checker
        </Link>

        <header className="mt-12">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
            ATS guide
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            ATS Resume Keywords
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Understand which keywords matter in a job description and
            how to make relevant experience easier for resume screening
            systems to identify.
          </p>
        </header>

        <div className="mt-16 space-y-12">
          <section>
            <h2 className="text-2xl font-bold">
              What are ATS keywords?
            </h2>

            <p className="mt-4 leading-7 text-zinc-600">
              ATS keywords are terms found in a job posting that describe
              the skills, technologies, qualifications, responsibilities,
              or experience an employer is looking for.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Where should relevant keywords appear?
            </h2>

            <p className="mt-4 leading-7 text-zinc-600">
              Relevant keywords can naturally appear throughout your
              resume, particularly in your skills, professional experience,
              projects, certifications, and summary sections when they
              accurately describe your background.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Don't keyword-stuff your resume
            </h2>

            <p className="mt-4 leading-7 text-zinc-600">
              Adding a long list of unrelated keywords does not make a
              resume stronger. Instead, focus on describing your real
              experience clearly and using terminology that accurately
              reflects the work you have actually done.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Find keywords from your job description
            </h2>

            <p className="mt-4 leading-7 text-zinc-600">
              The easiest starting point is the job description itself.
              Look for repeated technologies, responsibilities,
              qualifications, tools, and industry terminology.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white hover:bg-zinc-800"
            >
              Check my resume →
            </Link>
          </section>
        </div>
      </article>
    </main>
  );
}