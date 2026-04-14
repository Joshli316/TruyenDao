import { describe, it, expect } from 'vitest';
import {
  calculateRetention,
  BASE_SCORE,
  MIN_SCORE,
  MAX_SCORE,
  CHURCH_INVOLVEMENT_OPTIONS,
  VN_COMMUNITY_OPTIONS,
  PRE_RETURN_PLAN_OPTIONS,
  FAMILY_BG_OPTIONS,
  CITY_OPTIONS,
  DISCIPLESHIP_OPTIONS,
  YEARS_ABROAD_OPTIONS,
} from '../shared/retention-calc';

describe('retention calculator', () => {
  it('BASE_SCORE is 50', () => {
    expect(BASE_SCORE).toBe(50);
  });

  it('returns base score of 50 when all inputs are neutral/default (no matching options)', () => {
    const result = calculateRetention({});
    expect(result.total).toBe(50);
  });

  it('all minimum inputs produce a score clamped to 5', () => {
    // Pick the lowest-scoring option for each factor
    const form: Record<string, string> = {
      church: 'rarely',        // -15
      community: 'none',       // -10
      plan: 'none',            // -15
      family: 'hostile',       // -15
      city: 'rural',           // -10
      discipleship: 'none',    // -10
      years: '9+',             // -10
    };
    // 50 + (-15 + -10 + -15 + -15 + -10 + -10 + -10) = 50 - 85 = -35 → clamped to 5
    const result = calculateRetention(form);
    expect(result.total).toBe(MIN_SCORE);
    expect(result.total).toBe(5);
  });

  it('all maximum inputs produce a score clamped to 95', () => {
    // Pick the highest-scoring option for each factor
    const form: Record<string, string> = {
      church: 'weekly',        // +20
      community: 'active',     // +15
      plan: 'specific',        // +25
      family: 'christian',     // +15
      city: 'hcmc',            // +10
      discipleship: 'full',    // +20
      years: '1-2',            // +5
    };
    // 50 + (20 + 15 + 25 + 15 + 10 + 20 + 5) = 50 + 110 = 160 → clamped to 95
    const result = calculateRetention(form);
    expect(result.total).toBe(MAX_SCORE);
    expect(result.total).toBe(95);
  });

  it('score never goes below 5', () => {
    const form: Record<string, string> = {
      church: 'rarely',
      community: 'none',
      plan: 'none',
      family: 'hostile',
      city: 'rural',
      discipleship: 'none',
      years: '9+',
    };
    const result = calculateRetention(form);
    expect(result.total).toBeGreaterThanOrEqual(5);
  });

  it('score never goes above 95', () => {
    const form: Record<string, string> = {
      church: 'weekly',
      community: 'active',
      plan: 'specific',
      family: 'christian',
      city: 'hcmc',
      discipleship: 'full',
      years: '1-2',
    };
    const result = calculateRetention(form);
    expect(result.total).toBeLessThanOrEqual(95);
  });

  describe('individual factor weights', () => {
    it('church involvement: weekly = +20', () => {
      const result = calculateRetention({ church: 'weekly' });
      expect(result.total).toBe(BASE_SCORE + 20);
    });

    it('church involvement: rarely = -15', () => {
      const result = calculateRetention({ church: 'rarely' });
      expect(result.total).toBe(BASE_SCORE - 15);
    });

    it('Vietnamese community: active = +15', () => {
      const result = calculateRetention({ community: 'active' });
      expect(result.total).toBe(BASE_SCORE + 15);
    });

    it('pre-return plan: specific = +25', () => {
      const result = calculateRetention({ plan: 'specific' });
      expect(result.total).toBe(BASE_SCORE + 25);
    });

    it('pre-return plan: none = -15', () => {
      const result = calculateRetention({ plan: 'none' });
      expect(result.total).toBe(BASE_SCORE - 15);
    });

    it('family background: christian = +15', () => {
      const result = calculateRetention({ family: 'christian' });
      expect(result.total).toBe(BASE_SCORE + 15);
    });

    it('family background: hostile = -15', () => {
      const result = calculateRetention({ family: 'hostile' });
      expect(result.total).toBe(BASE_SCORE - 15);
    });

    it('city: hcmc = +10', () => {
      const result = calculateRetention({ city: 'hcmc' });
      expect(result.total).toBe(BASE_SCORE + 10);
    });

    it('city: rural = -10', () => {
      const result = calculateRetention({ city: 'rural' });
      expect(result.total).toBe(BASE_SCORE - 10);
    });

    it('discipleship: full = +20', () => {
      const result = calculateRetention({ discipleship: 'full' });
      expect(result.total).toBe(BASE_SCORE + 20);
    });

    it('discipleship: none = -10', () => {
      const result = calculateRetention({ discipleship: 'none' });
      expect(result.total).toBe(BASE_SCORE - 10);
    });

    it('years abroad: 1-2 = +5', () => {
      const result = calculateRetention({ years: '1-2' });
      expect(result.total).toBe(BASE_SCORE + 5);
    });

    it('years abroad: 9+ = -10', () => {
      const result = calculateRetention({ years: '9+' });
      expect(result.total).toBe(BASE_SCORE - 10);
    });
  });

  it('returns all 7 factors in the result', () => {
    const result = calculateRetention({});
    expect(result.factors).toHaveLength(7);
    const keys = result.factors.map(f => f.key);
    expect(keys).toContain('church');
    expect(keys).toContain('community');
    expect(keys).toContain('plan');
    expect(keys).toContain('family');
    expect(keys).toContain('city');
    expect(keys).toContain('discipleship');
    expect(keys).toContain('years');
  });

  it('each factor has correct max weight', () => {
    const result = calculateRetention({});
    const maxByKey: Record<string, number> = {};
    result.factors.forEach(f => { maxByKey[f.key] = f.max; });

    expect(maxByKey.church).toBe(20);
    expect(maxByKey.community).toBe(15);
    expect(maxByKey.plan).toBe(25);
    expect(maxByKey.family).toBe(15);
    expect(maxByKey.city).toBe(10);
    expect(maxByKey.discipleship).toBe(20);
    expect(maxByKey.years).toBe(5);
  });

  it('factors score is 0 for unrecognized option values', () => {
    const result = calculateRetention({ church: 'invalid_value' });
    const church = result.factors.find(f => f.key === 'church');
    expect(church?.score).toBe(0);
  });

  it('combines multiple factors correctly', () => {
    const form: Record<string, string> = {
      church: 'weekly',    // +20
      plan: 'specific',    // +25
    };
    const result = calculateRetention(form);
    // 50 + 20 + 25 = 95, which is exactly at the cap
    expect(result.total).toBe(95);
  });

  describe('option arrays are consistent', () => {
    it('CHURCH_INVOLVEMENT_OPTIONS has correct scores', () => {
      const scores = CHURCH_INVOLVEMENT_OPTIONS.map(o => o.score);
      expect(scores).toEqual([20, 10, 0, -15]);
    });

    it('YEARS_ABROAD_OPTIONS has correct scores', () => {
      const scores = YEARS_ABROAD_OPTIONS.map(o => o.score);
      expect(scores).toEqual([5, 0, -5, -10]);
    });

    it('PRE_RETURN_PLAN_OPTIONS has correct scores', () => {
      const scores = PRE_RETURN_PLAN_OPTIONS.map(o => o.score);
      expect(scores).toEqual([25, 10, -15]);
    });

    it('FAMILY_BG_OPTIONS has correct scores', () => {
      const scores = FAMILY_BG_OPTIONS.map(o => o.score);
      expect(scores).toEqual([15, 5, -5, -15]);
    });

    it('CITY_OPTIONS has correct scores', () => {
      const scores = CITY_OPTIONS.map(o => o.score);
      expect(scores).toEqual([10, 5, 5, 0, -10]);
    });

    it('DISCIPLESHIP_OPTIONS has correct scores', () => {
      const scores = DISCIPLESHIP_OPTIONS.map(o => o.score);
      expect(scores).toEqual([20, 10, 5, -10]);
    });
  });
});
