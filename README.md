# ATS Resume Checker

A free AI-powered resume checker that compares a resume against a job description and provides ATS-style insights.

**No signup. No account. No paywall.**

## What It Does

ATS Resume Checker helps job seekers and recruiters quickly understand how well a resume aligns with a specific job description.

It analyzes:

- Skills and technical requirements
- Relevant keywords
- Experience requirements
- Education requirements
- Resume structure
- Matched and partially matched skills
- Missing requirements
- Resume improvement opportunities

The application also generates an overall ATS-style compatibility score based on the analysis.

## How It Works

```text
Resume
   +
Job Description
   ↓
PDF Text Extraction
   ↓
AI Analysis
   ↓
Requirement Matching
   ↓
Deterministic ATS Scoring
   ↓
Resume Insights
```

AI is used to understand the resume and job requirements, while the final scoring is calculated separately using TypeScript logic.

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Groq
- GPT-OSS 120B
- pdf-parse
- Vercel

## Scoring Model

The ATS-style score is calculated using five categories:

| Category | Weight |
|---|---:|
| Skills | 30% |
| Keywords | 25% |
| Experience | 20% |
| Education | 10% |
| Structure | 15% |

The score is designed as a practical comparison between a resume and a job description. It is **not an official score from any specific ATS platform**.

## Design Principles

### Free by default

The application is designed to remain accessible without requiring an account, subscription, or payment.

### AI-assisted, not AI-dependent

AI handles the interpretation of resumes and job requirements, while deterministic TypeScript logic handles the final scoring.

### Honest recommendations

The analyzer does not encourage users to fabricate qualifications. Missing skills are presented as missing requirements, not instructions to falsely add them to a resume.

### Simple workflow

The goal is to make resume analysis straightforward:

**Upload → Analyze → Understand → Improve**

## Project

Built as an independent web application exploring AI-assisted resume analysis, ATS scoring, and practical UX for job seekers and recruiters.

## Author

**John Bryan Vergara**

[Portfolio](https://johnbryanvergara.vercel.app) · [GitHub](https://github.com/JB-VERGARA)
