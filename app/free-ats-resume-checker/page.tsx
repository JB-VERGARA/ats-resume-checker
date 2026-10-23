import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Free ATS Resume Checker",
  description:
    "Use a free ATS resume checker to compare your resume with a job description. No signup, no account, and no paywall.",
};

export default function FreeATSResumeCheckerPage() {
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
          <div className="flex flex-wrap gap-2">
            {["FREE", "NO SIGNUP", "NO PAYWALL"].map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-bold"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="mt-6 text-4xl font-black tracking-tight sm:text-6xl">
            Free ATS Resume Checker
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600">
            Check how closely your resume matches a job description using
            an AI-powered resume analysis tool. No account, subscription,
            or paywall required.
          </p>

          <Link
            href="/"
            className="mt-8 inline-flex rounded-xl bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white hover:bg-zinc-800"
          >
            Check my resume →
          </Link>
        </header>

        <div className="mt-16 space-y-12">
          <section>
            <h2 className="text-2xl font-bold">
              What does an ATS resume checker do?
            </h2>

            <p className="mt-4 leading-7 text-zinc-600">
              An ATS resume checker compares the information in your
              resume with the requirements and keywords found in a job
              description. It can help identify relevant skills, missing
              keywords, experience requirements, and areas where your
              resume could be more closely aligned with a particular role.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Who is this tool for?
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-zinc-200 p-6">
                <h3 className="font-bold">Job seekers</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Compare your resume against a specific job before
                  applying and find areas worth improving.
                </p>
              </div>

              <div className="rounded-2xl border border-zinc-200 p-6">
                <h3 className="font-bold">Recruiters & HR</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  Quickly compare candidate resumes against the
                  requirements of a role.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold">
              Is the ATS score an official ATS score?
            </h2>

            <p className="mt-4 leading-7 text-zinc-600">
              No. Different applicant tracking systems use different
              methods for processing resumes. This tool provides an
              estimated resume match based on the resume and job
              description you provide. It should be used as a practical
              guide rather than a guarantee of passing a particular ATS.
            </p>
          </section>
        </div>
      </article>
    </main>
  );
}