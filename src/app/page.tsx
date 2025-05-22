import { getMatches } from "@/actions/data";
import { MatchesTable } from "@/components/matches";

export default async function Home() {
  const matchesResponse = await getMatches();
  console.log(matchesResponse.data);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {matchesResponse.success ? <MatchesTable matchesResponse={matchesResponse} /> : (
        <p className="text-red-500">{matchesResponse.message}</p>
      )}

    </main>
  );
}
