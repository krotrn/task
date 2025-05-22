export interface MatchType {
  team1: string;
  team2: string;
  score1: number;
  score2: number;
  overs1: number;
  overs2: number;
  wickets1: number;
  wickets2: number;
  status: StatusEnum;
}

export enum StatusEnum {
  LIVE = "LIVE",
  COMPLETED = "COMPLETED",
}
