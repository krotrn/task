"use server";

import { connectToDB } from "@/lib/database";
import { Match } from "@/schemas/matches";
import { type MatchType } from "@/types/match";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}

export const getMatches = async (): Promise<ApiResponse<MatchType[]>> => {
  try {
    await connectToDB();
    const res: MatchType[] = await Match.find({});
    return {
      success: true,
      data: JSON.parse(JSON.stringify(res)),
      message: "Matches Fetched Successfully",
    };
  } catch (error) {
    console.log("Error fetching matches: ", error);
    return { success: false, data: [], message: "Error Getting Matches" };
  }
};