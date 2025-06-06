
import { Certificate } from './certificate';

export interface Skill {
  id: string;
  _id?: string;
  name: string;
  category?: string;
  description?: string;
  level?: number;
}

export interface UserSkill {
  id: string;
  _id?: string;
  skill: Skill;
  level: number;
  assessments: {
    score: number;
    date: string;
    certificate?: Certificate;
  }[];
}
