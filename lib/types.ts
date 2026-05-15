// lib/types.ts
export type StageStatus = "completed" | "in_progress" | "pending";

export type Stage = "ideation" | "design" | "technical_planning" | "development";

export interface StageCardData {
  stage: string;
  status: StageStatus;
  documents: number;
  pages: number;
}

export interface ActivityLog {
  timestamp: string;
  stage: string;
  agent: string;
  message: string;
}

export interface MissionState {
  mission_id: string;
  project_name: string;
  current_stage: Stage;
  waiting_for_human: boolean;
  last_human_action?: "continue" | "iterate" | "pause";
}
