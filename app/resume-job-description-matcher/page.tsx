import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Resume Job Description Matcher",
  description:
    "Compare your resume with a job description and find matching skills, partial matches, missing requirements, and ways to improve your resume.",
};

export default function ResumeJobDescriptionMatcherPage() {
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
            Resume matching
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            Resume vs. Job Description Matcher
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Find out how closely your resume matches a specific job
            description before you apply.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-xl bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white hover:bg-zinc-800"
          >
            Compare my resume →
          </Link>
        </header>

        <div className="mt-16 space-y-12">
          <section>
            <h2 className="text-2xl font-bold">
              Why compare your resume with the job description?
            </h2>

            <p className="mt-4 leading-7 text-zinc-600">
              A resume can be strong in general but still be poorly
              matched to a particular position. Comparing your resume
              against the actual job description helps you identify the
              skills, technologies, experience, and terminology that are
              most relevant to that role.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              What does the matcher look for?
            </h2>

            <ul className="mt-5 space-y-3 text-zinc-600">
              {[
                "Relevant technical and professional skills",
                "Keywords used in the job description",
                "Experience requirements",
                "Education requirements",
                "Partial or related skill matches",
                "Potentially missing requirements",
                "Resume structure and readability",
              ].map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="font-bold text-zinc-950">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Should you add every missing keyword?
            </h2>

            <p className="mt-4 leading-7 text-zinc-600">
              No. A missing keyword does not automatically mean you should
              add it to your resume. Only include skills and experience
              that you actually have. The purpose of resume matching is to
              make relevant experience easier to identify, not to
              encourage candidates to claim qualifications they do not
              have.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}