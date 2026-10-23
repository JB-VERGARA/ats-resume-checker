import { NextResponse } from "next/server";
import Groq from "groq-sdk";

import { calculateAtsScore } from "@/lib/ats/scoring";
import { cleanRequirements } from "@/lib/ats/requirements";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

type AnalysisResult = {
  summary: string;
  strengths: string[];
  matchedSkills: string[];
  partialMatches: string[];
  missingSkills: string[];
  recommendations: string[];
};

function cleanArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item): item is string => typeof item === "string")
    .map((item) => item.trim())
    .filter(Boolean);
}

function cleanResult(data: unknown): AnalysisResult {
  const result =
    typeof data === "object" && data !== null
      ? (data as Record<string, unknown>)
      : {};

  return {
    summary: typeof result.summary === "string" ? result.summary.trim() : "",
    strengths: cleanArray(result.strengths),
    matchedSkills: cleanArray(result.matchedSkills),
    partialMatches: cleanArray(result.partialMatches),
    missingSkills: cleanArray(result.missingSkills),
    recommendations: cleanArray(result.recommendations),
  };
}

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          error: "GROQ_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

    const body = await request.json();

    const resume =
      typeof body.resume === "string" ? body.resume.trim() : "";

    const jobDescription =
      typeof body.jobDescription === "string"
        ? body.jobDescription.trim()
        : "";

    if (!resume) {
      return NextResponse.json(
        { error: "Resume text is required." },
        { status: 400 }
      );
    }

    if (!jobDescription) {
      return NextResponse.json(
        { error: "Job description is required." },
        { status: 400 }
      );
    }

    const prompt = `
You are an ATS resume analysis assistant.

Analyze the candidate's resume against the job description.

Your job is NOT to invent qualifications.
Only identify skills, experience, education, and keywords that are supported by the resume.

IMPORTANT:
- "Missing" means the requirement was not detected in the resume.
- Do not assume the candidate lacks a skill just because it is not mentioned.
- Do not recommend adding a skill unless the resume provides evidence that the candidate actually has it.
- Do not fabricate work experience, education, certifications, or achievements.
- Consider synonyms and closely related technologies when identifying partial matches.
- Keep each list concise and useful.
- Return ONLY valid JSON.

Return exactly this structure:

{
  "requirements": {
    "experienceRequirements": [],
    "educationRequirements": [],
    "requiredSkills": [],
    "preferredSkills": []
  },
  "summary": "",
  "strengths": [],
  "matchedSkills": [],
  "partialMatches": [],
  "missingSkills": [],
  "recommendations": []
}

JOB DESCRIPTION:
${jobDescription}

RESUME:
${resume}
`;

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      temperature: 0,
      response_format: {
        type: "json_object",
      },
      messages: [
        {
          role: "system",
          content:
            "You are a precise ATS resume analyzer. Return only valid JSON and never invent candidate qualifications.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = completion.choices[0]?.message?.content;

    if (!content) {
      throw new Error("Groq returned an empty response.");
    }

    const parsed = JSON.parse(content);

    const requirements = cleanRequirements(parsed.requirements);

    const result = cleanResult(parsed);

    const score = calculateAtsScore(
      resume,
      jobDescription,
      result,
      requirements
    );

    return NextResponse.json({
      score,
      requirements,
      ...result,
    });
  } catch (error) {
    console.error("ATS analysis error:", error);

    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to analyze resume.",
      },
      { status: 500 }
    );
  }
}