/**
 * Pure retention score calculation, extracted for testability.
 */

export interface FactorOption {
  value: string;
  score: number;
}

export interface FactorResult {
  label: string;
  score: number;
  max: number;
  key: string;
}

export interface RetentionResult {
  total: number;
  factors: FactorResult[];
}

export const BASE_SCORE = 50;
export const MIN_SCORE = 5;
export const MAX_SCORE = 95;

export const YEARS_ABROAD_OPTIONS: FactorOption[] = [
  { value: '1-2', score: 5 },
  { value: '3-5', score: 0 },
  { value: '6-8', score: -5 },
  { value: '9+', score: -10 },
];

export const CHURCH_INVOLVEMENT_OPTIONS: FactorOption[] = [
  { value: 'weekly', score: 20 },
  { value: 'monthly', score: 10 },
  { value: 'occasionally', score: 0 },
  { value: 'rarely', score: -15 },
];

export const VN_COMMUNITY_OPTIONS: FactorOption[] = [
  { value: 'active', score: 15 },
  { value: 'loose', score: 5 },
  { value: 'none', score: -10 },
];

export const PRE_RETURN_PLAN_OPTIONS: FactorOption[] = [
  { value: 'specific', score: 25 },
  { value: 'general', score: 10 },
  { value: 'none', score: -15 },
];

export const FAMILY_BG_OPTIONS: FactorOption[] = [
  { value: 'christian', score: 15 },
  { value: 'mixed', score: 5 },
  { value: 'non-christian', score: -5 },
  { value: 'hostile', score: -15 },
];

export const CITY_OPTIONS: FactorOption[] = [
  { value: 'hcmc', score: 10 },
  { value: 'hanoi', score: 5 },
  { value: 'danang', score: 5 },
  { value: 'other-major', score: 0 },
  { value: 'rural', score: -10 },
];

export const DISCIPLESHIP_OPTIONS: FactorOption[] = [
  { value: 'full', score: 20 },
  { value: 'course', score: 10 },
  { value: 'informal', score: 5 },
  { value: 'none', score: -10 },
];

interface FactorDef {
  key: string;
  label: string;
  options: FactorOption[];
  max: number;
}

const FACTOR_DEFS: FactorDef[] = [
  { key: 'church', label: 'Church involvement', options: CHURCH_INVOLVEMENT_OPTIONS, max: 20 },
  { key: 'community', label: 'Vietnamese community', options: VN_COMMUNITY_OPTIONS, max: 15 },
  { key: 'plan', label: 'Pre-return church plan', options: PRE_RETURN_PLAN_OPTIONS, max: 25 },
  { key: 'family', label: 'Family background', options: FAMILY_BG_OPTIONS, max: 15 },
  { key: 'city', label: 'City returning to', options: CITY_OPTIONS, max: 10 },
  { key: 'discipleship', label: 'Discipleship depth', options: DISCIPLESHIP_OPTIONS, max: 20 },
  { key: 'years', label: 'Years abroad', options: YEARS_ABROAD_OPTIONS, max: 5 },
];

export function calculateRetention(form: Record<string, string>): RetentionResult {
  const factors: FactorResult[] = FACTOR_DEFS.map(def => {
    const option = def.options.find(o => o.value === form[def.key]);
    return {
      label: def.label,
      score: option?.score ?? 0,
      max: def.max,
      key: def.key,
    };
  });

  const rawTotal = BASE_SCORE + factors.reduce((sum, f) => sum + f.score, 0);
  const total = Math.max(MIN_SCORE, Math.min(MAX_SCORE, rawTotal));

  return { total, factors };
}
