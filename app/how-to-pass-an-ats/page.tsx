import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Pass an ATS Resume Screening",
  description:
    "Learn practical ways to make your resume easier for applicant tracking systems and recruiters to understand without keyword stuffing or inventing qualifications.",
};

export default function HowToPassAnATSPage() {
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
            Resume guide
          </p>

          <h1 className="mt-4 text-4xl font-black tracking-tight sm:text-6xl">
            How to Pass an ATS Resume Screening
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Practical ways to make your resume easier for applicant
            tracking systems and recruiters to understand.
          </p>
        </header>

        <div className="mt-16 space-y-10">
          {[
            {
              number: "01",
              title: "Use a clear resume structure",
              text:
                "Use recognizable sections such as Summary, Experience, Education, Skills, and Projects. Clear structure helps both software and people find important information.",
            },
            {
              number: "02",
              title: "Match relevant terminology",
              text:
                "When a job description uses a specific technology or qualification that you genuinely have, use the same terminology where it accurately describes your experience.",
            },
            {
              number: "03",
              title: "Describe achievements clearly",
              text:
                "Instead of only listing responsibilities, explain what you worked on and what you accomplished. Concrete descriptions give recruiters more useful evidence.",
            },
            {
              number: "04",
              title: "Keep formatting readable",
              text:
                "Avoid overly complicated layouts, excessive graphics, and information hidden inside images. A straightforward resume is easier to parse and easier for recruiters to read.",
            },
            {
              number: "05",
              title: "Tailor your resume honestly",
              text:
                "A tailored resume should emphasize your relevant experience, not invent qualifications. Only claim skills, certifications, and experience you actually possess.",
            },
            {
              number: "06",
              title: "Compare before applying",
              text:
                "Use the actual job description to identify potential gaps before submitting your application. A resume match analysis can help you decide what deserves clarification.",
            },
          ].map((item) => (
            <section
              key={item.number}
              className="grid gap-4 border-b border-zinc-200 pb-10 sm:grid-cols-[80px_1fr]"
            >
              <span className="text-sm font-black text-zinc-300">
                {item.number}
              </span>

              <div>
                <h2 className="text-xl font-bold">{item.title}</h2>

                <p className="mt-3 leading-7 text-zinc-600">
                  {item.text}
                </p>
              </div>
            </section>
          ))}
        </div>

        <div className="mt-14 rounded-2xl bg-zinc-950 p-8 text-white">
          <h2 className="text-2xl font-bold">
            Want to check your resume?
          </h2>

          <p className="mt-3 max-w-xl leading-7 text-zinc-300">
            Compare your resume against the job description and see which
            skills and requirements match.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-bold text-zinc-950 hover:bg-zinc-200"
          >
            Check my resume →
          </Link>
        </div>
      </article>
    </main>
  );
}