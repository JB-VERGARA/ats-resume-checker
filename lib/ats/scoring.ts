export type AtsAnalysis = {
  matchedSkills: string[];
  partialMatches: string[];
  missingSkills: string[];
};

export type AtsRequirements = {
  experienceRequirements: string[];
  educationRequirements: string[];
  requiredSkills: string[];
  preferredSkills: string[];
};

export type AtsScore = {
  overall: number;
  skills: number;
  keywords: number;
  experience: number;
  education: number;
  structure: number;
};

function normalize(text: string) {
  return text.toLowerCase().trim();
}

function containsRequirement(
  resume: string,
  requirement: string
) {
  return normalize(resume).includes(normalize(requirement));
}

function calculateSkillScore(analysis: AtsAnalysis) {
  const matched = analysis.matchedSkills.length;
  const partial = analysis.partialMatches.length;
  const missing = analysis.missingSkills.length;

  const total = matched + partial + missing;

  if (total === 0) return 0;

  const score =
    (matched + partial * 0.5) / total;

  return Math.round(score * 100);
}

function calculateKeywordScore(
  resume: string,
  jobDescription: string
) {
  const stopWords = new Set([
    "the",
    "and",
    "for",
    "with",
    "you",
    "your",
    "this",
    "that",
    "are",
    "our",
    "from",
    "will",
    "have",
    "has",
    "job",
    "work",
    "role",
    "years",
    "year",
    "looking",
    "candidate",
    "required",
    "preferred",
  ]);

  const jobWords =
    jobDescription
      .toLowerCase()
      .match(
        /\b[a-zA-Z][a-zA-Z0-9+#.-]{2,}\b/g
      ) ?? [];

  const keywords = [
    ...new Set(
      jobWords.filter(
        (word) => !stopWords.has(word)
      )
    ),
  ];

  if (keywords.length === 0) return 0;

  const resumeText = resume.toLowerCase();

  const matched = keywords.filter((keyword) =>
    resumeText.includes(keyword)
  );

  return Math.round(
    (matched.length / keywords.length) * 100
  );
}

function calculateStructureScore(resume: string) {
  const sections = [
    /experience/i,
    /education/i,
    /skills/i,
    /projects/i,
  ];

  const detected = sections.filter((section) =>
    section.test(resume)
  ).length;

  return Math.round(
    (detected / sections.length) * 100
  );
}

function calculateRequirementScore(
  resume: string,
  requirements: string[]
) {
  if (requirements.length === 0) {
    return 100;
  }

  const matched = requirements.filter((requirement) =>
    containsRequirement(resume, requirement)
  );

  return Math.round(
    (matched.length / requirements.length) * 100
  );
}

export function calculateAtsScore(
  resume: string,
  jobDescription: string,
  analysis: AtsAnalysis,
  requirements: AtsRequirements
): AtsScore {
  const skills = calculateSkillScore(analysis);

  const keywords = calculateKeywordScore(
    resume,
    jobDescription
  );

  const experience = calculateRequirementScore(
    resume,
    requirements.experienceRequirements
  );

  const education = calculateRequirementScore(
    resume,
    requirements.educationRequirements
  );

  const structure = calculateStructureScore(
    resume
  );

  const overall = Math.round(
    skills * 0.3 +
      keywords * 0.25 +
      experience * 0.2 +
      education * 0.1 +
      structure * 0.15
  );

  return {
    overall,
    skills,
    keywords,
    experience,
    education,
    structure,
  };
}