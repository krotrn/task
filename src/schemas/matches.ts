import { StatusEnum, type MatchType } from "@/types/match";
import { model, models, Schema } from "mongoose";

const matchSchema = new Schema({
  team1: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  team2: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  score1: {
    type: Number,
    required: true,
    default: 0,
  },
  score2: {
    type: Number,
    required: true,
    default: 0,
  },
  overs1: {
    type: Number,
    required: true,
    default: 0,
  },
  overs2: {
    type: Number,
    required: true,
    default: 0,
  },
  wickets1: {
    type: Number,
    required: true,
    default: 0,
  },
  wickets2: {
    type: Number,
    required: true,
    default: 0,
  },
  status: {
    type: String,
    enum: StatusEnum,
    required: true,
  },
});

export const Match = models.Match || model<MatchType>("Match", matchSchema);
