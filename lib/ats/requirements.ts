export type AtsRequirements = {
  experienceRequirements: string[];
  educationRequirements: string[];
  requiredSkills: string[];
  preferredSkills: string[];
};

function cleanArray(value: unknown): string[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter(
      (item): item is string =>
        typeof item === "string"
    )
    .map((item) => item.trim())
    .filter(Boolean);
}

export function cleanRequirements(
  data: unknown
): AtsRequirements {
  const result =
    typeof data === "object" && data !== null
      ? (data as Record<string, unknown>)
      : {};

  return {
    experienceRequirements: cleanArray(
      result.experienceRequirements
    ),

    educationRequirements: cleanArray(
      result.educationRequirements
    ),

    requiredSkills: cleanArray(
      result.requiredSkills
    ),

    preferredSkills: cleanArray(
      result.preferredSkills
    ),
  };
}