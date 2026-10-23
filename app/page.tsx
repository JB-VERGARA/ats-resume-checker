"use client";

import {
  ChangeEvent,
  DragEvent,
  useRef,
  useState,
} from "react";

type Score = {
  overall: number;
  skills: number;
  keywords: number;
  experience: number;
  education: number;
  structure: number;
};

type AnalysisResult = {
  score: Score;
  requirements: {
    experienceRequirements: string[];
    educationRequirements: string[];
    requiredSkills: string[];
    preferredSkills: string[];
  };
  summary: string;
  strengths: string[];
  matchedSkills: string[];
  partialMatches: string[];
  missingSkills: string[];
  recommendations: string[];
};

function getScoreLabel(score: number) {
  if (score >= 85) return "Strong match";
  if (score >= 70) return "Good match";
  if (score >= 50) return "Partial match";
  return "Needs improvement";
}

function getScoreDescription(score: number) {
  if (score >= 85) {
    return "Your resume appears to align well with this job description.";
  }

  if (score >= 70) {
    return "Your resume has a solid match, with a few areas worth improving.";
  }

  if (score >= 50) {
    return "There are some relevant matches, but several areas could be stronger.";
  }

  return "Your resume may need significant tailoring for this particular role.";
}

export default function Home() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const [isDragging, setIsDragging] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const [error, setError] = useState("");
  const [result, setResult] = useState<AnalysisResult | null>(null);

  async function processFile(selectedFile: File) {
    setError("");
    setResult(null);

    if (selectedFile.type !== "application/pdf") {
      setError("Please upload a PDF resume.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      setError("Your PDF must be smaller than 10 MB.");
      return;
    }

    setFile(selectedFile);
    setIsParsing(true);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/parse-resume", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to read the PDF.");
      }

      setResumeText(data.text || "");

      if (!data.text?.trim()) {
        throw new Error(
          "No readable text was found in this PDF. Try uploading a text-based PDF."
        );
      }
    } catch (err) {
      setFile(null);
      setResumeText("");

      setError(
        err instanceof Error
          ? err.message
          : "Failed to read your resume."
      );
    } finally {
      setIsParsing(false);
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];

    if (selectedFile) {
      void processFile(selectedFile);
    }
  }

  function handleDragOver(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(true);
  }

  function handleDragLeave(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    event.stopPropagation();

    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];

    if (droppedFile) {
      void processFile(droppedFile);
    }
  }

  async function handleAnalyze() {
    setError("");
    setResult(null);

    if (!resumeText.trim()) {
      setError("Upload your resume first.");
      return;
    }

    if (!jobDescription.trim()) {
      setError("Paste the job description first.");
      return;
    }

    setIsAnalyzing(true);

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: resumeText,
          jobDescription,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Something went wrong while analyzing the resume."
        );
      }

      setResult(data);

      setTimeout(() => {
        document
          .getElementById("results")
          ?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
      }, 100);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to analyze the resume."
      );
    } finally {
      setIsAnalyzing(false);
    }
  }

  function handleReset() {
    setFile(null);
    setResumeText("");
    setJobDescription("");
    setResult(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  const canAnalyze =
    Boolean(resumeText.trim()) &&
    Boolean(jobDescription.trim()) &&
    !isParsing &&
    !isAnalyzing;

  return (
    <main className="min-h-screen bg-white text-zinc-950">
      {/* Header */}
<header className="border-b border-zinc-200">
  <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
    <button
      type="button"
      onClick={handleReset}
      className="flex items-center gap-3 text-sm font-bold tracking-tight"
    >
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-950 text-[10px] font-black text-white">
        JBV
      </span>

      ATS Resume Checker
    </button>

    <div className="hidden items-center gap-3 text-xs font-medium text-zinc-500 sm:flex">
      <span>Free</span>
      <span>•</span>
      <span>No signup</span>
      <span>•</span>
      <span>No paywall</span>
    </div>
  </div>
</header>

      {/* Hero */}
      <section className="border-b border-zinc-200">
        <div className="mx-auto max-w-5xl px-6 pb-20 pt-16 text-center sm:pt-24">
          <div className="mb-6 flex flex-wrap justify-center gap-2">
            {["FREE", "NO SIGNUP", "NO PAYWALL", "FOR EVERYONE"].map(
              (tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-zinc-300 bg-zinc-50 px-3 py-1.5 text-[11px] font-bold tracking-wide text-zinc-700"
                >
                  {tag}
                </span>
              )
            )}
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl font-black tracking-tight sm:text-6xl">
            Check how well a resume
            <br />
            matches a job.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-zinc-600 sm:text-lg">
            Whether you're a job seeker checking your resume or an HR
            professional reviewing candidates, get a quick AI-powered
            resume match analysis.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm font-medium text-zinc-600">
            <span>✓ Free for job seekers</span>
            <span>✓ Free for recruiters</span>
            <span>✓ No account required</span>
            <span>✓ No paywall bullshit</span>
          </div>
        </div>
      </section>

      {/* Analyzer */}
      <section className="mx-auto max-w-5xl px-6 py-12 sm:py-16">
        <div className="grid gap-6 lg:grid-cols-2">
          {/* Resume */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Step 01
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-tight">
                Upload your resume
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Upload a PDF and we&apos;ll extract the text automatically.
              </p>
            </div>

            <label
              htmlFor="resume-upload"
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={[
                "flex min-h-64 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed px-6 text-center transition",
                isDragging
                  ? "border-zinc-950 bg-zinc-100"
                  : "border-zinc-300 bg-zinc-50 hover:border-zinc-500 hover:bg-zinc-100",
              ].join(" ")}
            >
              <input
                ref={fileInputRef}
                id="resume-upload"
                type="file"
                accept="application/pdf,.pdf"
                onChange={handleFileChange}
                className="hidden"
              />

              {isParsing ? (
                <>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-white">
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  </div>

                  <p className="font-semibold">
                    Reading your resume...
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    Extracting text from the PDF
                  </p>
                </>
              ) : file ? (
                <>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-950 text-white">
                    ✓
                  </div>

                  <p className="max-w-full truncate font-semibold">
                    {file.name}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    PDF loaded successfully
                  </p>

                  <span className="mt-4 text-xs font-semibold text-zinc-700 underline underline-offset-4">
                    Choose another file
                  </span>
                </>
              ) : (
                <>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-zinc-300 bg-white text-xl">
                    ↑
                  </div>

                  <p className="font-semibold">
                    Drop your PDF here
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    or click to browse your files
                  </p>

                  <p className="mt-4 text-xs text-zinc-400">
                    PDF only · Maximum 10 MB
                  </p>
                </>
              )}
            </label>
          </div>

          {/* Job Description */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5">
              <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                Step 02
              </p>

              <h2 className="mt-1 text-xl font-bold tracking-tight">
                Add the job description
              </h2>

              <p className="mt-2 text-sm leading-6 text-zinc-500">
                Paste the job posting you want to compare your resume
                against.
              </p>
            </div>

            <textarea
              value={jobDescription}
              onChange={(event) =>
                setJobDescription(event.target.value)
              }
              placeholder="Paste the job description here..."
              className="min-h-64 w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 p-4 text-sm leading-6 outline-none transition placeholder:text-zinc-400 focus:border-zinc-500 focus:bg-white"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* Analyze */}
        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={handleAnalyze}
            disabled={!canAnalyze}
            className="inline-flex min-w-56 items-center justify-center gap-3 rounded-xl bg-zinc-950 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-300"
          >
            {isAnalyzing ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Analyzing...
              </>
            ) : (
              "Check Resume Match"
            )}
          </button>

          <p className="mt-3 text-xs text-zinc-400">
            AI-powered analysis · No account required
          </p>
        </div>
      </section>

      {/* Free */}
      {!result && (
        <section className="border-y border-zinc-200 bg-zinc-50">
          <div className="mx-auto max-w-5xl px-6 py-14">
            <div className="grid gap-8 sm:grid-cols-3">
              <div>
                <p className="text-sm font-bold">Free means free.</p>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  No account. No trial. No credit card. No surprise
                  subscription screen.
                </p>
              </div>

              <div>
                <p className="text-sm font-bold">Built for both sides.</p>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  Job seekers can tailor resumes. Recruiters can quickly
                  compare candidate resumes against a role.
                </p>
              </div>

              <div>
                <p className="text-sm font-bold">Useful, not magical.</p>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  The score is an estimate based on the resume and job
                  description you provide, not a hiring decision.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {result && (
        <section
          id="results"
          className="border-t border-zinc-200 bg-zinc-50"
        >
          <div className="mx-auto max-w-5xl px-6 py-14 sm:py-20">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Analysis complete
                </p>

                <h2 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
                  Your resume match
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  {getScoreDescription(result.score.overall)}
                </p>
              </div>

              <button
                type="button"
                onClick={handleReset}
                className="self-start rounded-lg border border-zinc-300 bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-zinc-100 sm:self-auto"
              >
                Analyze another
              </button>
            </div>

            {/* Overall score */}
            <div className="mt-8 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="flex flex-col items-center gap-6 sm:flex-row">
                <div className="flex h-36 w-36 shrink-0 items-center justify-center rounded-full border-[12px] border-zinc-200">
                  <div className="text-center">
                    <div className="text-4xl font-black tracking-tight">
                      {result.score.overall}
                    </div>

                    <div className="text-xs font-semibold text-zinc-400">
                      / 100
                    </div>
                  </div>
                </div>

                <div className="text-center sm:text-left">
                  <p className="text-sm font-bold uppercase tracking-wider text-zinc-400">
                    Estimated match
                  </p>

                  <h3 className="mt-1 text-2xl font-black">
                    {getScoreLabel(result.score.overall)}
                  </h3>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-500">
                    This score estimates how closely your resume matches
                    the provided job description. It is not a prediction
                    of whether you will get hired.
                  </p>
                </div>
              </div>
            </div>

            {/* Score breakdown */}
            <div className="mt-6">
              <h3 className="text-lg font-bold tracking-tight">
                Score breakdown
              </h3>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {[
                  ["Skills", result.score.skills],
                  ["Keywords", result.score.keywords],
                  ["Experience", result.score.experience],
                  ["Education", result.score.education],
                  ["Structure", result.score.structure],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl border border-zinc-200 bg-white p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="text-sm font-medium text-zinc-500">
                        {label}
                      </span>

                      <span className="text-sm font-bold">
                        {value}%
                      </span>
                    </div>

                    <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className="h-full rounded-full bg-zinc-950 transition-all"
                        style={{
                          width: `${Math.max(
                            0,
                            Math.min(100, Number(value))
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            {result.summary && (
              <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8">
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  Summary
                </p>

                <p className="mt-4 text-base leading-7 text-zinc-700">
                  {result.summary}
                </p>
              </div>
            )}

            {/* Skills */}
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              <ResultList
                title="Matched skills"
                description="Skills detected in both your resume and the job description."
                items={result.matchedSkills}
                empty="No direct skill matches were detected."
                variant="positive"
              />

              <ResultList
                title="Partial matches"
                description="Related skills or technologies that may be worth clarifying."
                items={result.partialMatches}
                empty="No partial matches were detected."
                variant="neutral"
              />

              <ResultList
                title="Missing skills"
                description="Requirements mentioned in the job description that were not detected."
                items={result.missingSkills}
                empty="No obvious missing skills were detected."
                variant="negative"
              />
            </div>

            {/* Strengths + Recommendations */}
            <div className="mt-6 grid gap-6 lg:grid-cols-2">
              <ResultList
                title="Strengths"
                description="Things your resume already does well for this role."
                items={result.strengths}
                empty="No specific strengths were returned."
                variant="positive"
              />

              <ResultList
                title="Recommendations"
                description="Practical ways to improve the match without inventing qualifications."
                items={result.recommendations}
                empty="No additional recommendations were returned."
                variant="neutral"
              />
            </div>

            {/* Disclaimer */}
            <div className="mt-8 rounded-xl border border-zinc-200 bg-white px-5 py-4 text-xs leading-5 text-zinc-500">
              <strong className="text-zinc-700">
                Important:
              </strong>{" "}
              This analysis is an estimate based on the resume and job
              description you provided. Different applicant tracking
              systems use different methods, so this should be treated as
              a practical comparison tool rather than an official ATS
              score.
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-200">
  <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-xs text-zinc-400 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <p className="font-semibold text-zinc-700">
        ATS Resume Checker
      </p>
      <p className="mt-1">
        A project by John Bryan Vergara
      </p>
    </div>

    <div className="flex flex-wrap items-center gap-4">
      <span>Free to use · No signup · No paywall</span>

      <a
        href="https://johnbryanvergara.vercel.app"
        target="_blank"
        rel="noreferrer"
        className="font-medium text-zinc-600 transition hover:text-zinc-950"
      >
        johnbryanvergara.vercel.app ↗
      </a>
    </div>
  </div>
</footer>
    </main>
  );
}

function ResultList({
  title,
  description,
  items,
  empty,
  variant,
}: {
  title: string;
  description: string;
  items: string[];
  empty: string;
  variant: "positive" | "neutral" | "negative";
}) {
  const bulletClass =
    variant === "positive"
      ? "bg-emerald-100 text-emerald-700"
      : variant === "negative"
        ? "bg-red-100 text-red-700"
        : "bg-zinc-100 text-zinc-700";

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6">
      <h3 className="font-bold tracking-tight">{title}</h3>

      <p className="mt-1 text-sm leading-5 text-zinc-500">
        {description}
      </p>

      {items.length > 0 ? (
        <ul className="mt-5 space-y-3">
          {items.map((item, index) => (
            <li
              key={`${item}-${index}`}
              className="flex items-start gap-3 text-sm leading-6 text-zinc-700"
            >
              <span
                className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold ${bulletClass}`}
              >
                {variant === "positive"
                  ? "✓"
                  : variant === "negative"
                    ? "!"
                    : "•"}
              </span>

              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mt-5 text-sm leading-6 text-zinc-400">
          {empty}
        </p>
      )}
    </div>
  );
}