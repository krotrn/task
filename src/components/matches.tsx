"use client";
import { ApiResponse } from "@/actions/data";
import { MatchType, StatusEnum } from "@/types/match";
import { ChevronDown, ChevronUp, Filter, RefreshCw } from "lucide-react";
import React, { useState } from "react";

export const MatchesTable = ({
  matchesResponse,
}: {
  matchesResponse: ApiResponse<MatchType[]>;
}) => {
  const [matches, setMatches] = useState<MatchType[]>(matchesResponse.data);
  const [sortBy, setSortBy] = useState<{
    key: keyof MatchType | null;
    order: 1 | -1;
  }>({
    key: null,
    order: 1,
  });
  const [filter, setFilter] = useState<StatusEnum | null>(null);
  const TableHeader: (keyof MatchType)[] = [
    "team1",
    "team2",
    "score1",
    "score2",
    "overs1",
    "overs2",
    "wickets1",
    "wickets2",
    "status",
  ];

  const handleSort = (key: keyof MatchType) => {
    let order: 1 | -1 = 1;
    if (sortBy.key === key && sortBy.order === 1) {
      order = -1;
    }
    setSortBy({ key, order });
    const filteredMatches = [...matches].sort((a, b) => {
      if (a[key] < b[key]) {
        return order === 1 ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return order === 1 ? 1 : -1;
      }
      return 0;
    });
    setMatches(filteredMatches);
  };
  const statuses = [
    ...Object.values(StatusEnum).filter((status) => typeof status === "string"),
  ];

  const handleFilterMatches = (st: string | StatusEnum | null) => {
    let status: StatusEnum | null = null;
    if (st === statuses[0]) {
      status = StatusEnum.LIVE;
    } else if (st === statuses[1]) {
      status = StatusEnum.COMPLETED;
    }
    setFilter(status);
    if (status === null) {
      setMatches(matchesResponse.data);
    } else {
      const filteredMatches = matchesResponse.data.filter(
        (match) => match.status === status
      );
      setMatches(filteredMatches);
    }
  };

  const handleFilterReset = () => {
    setFilter(null);
    setSortBy({ key: null, order: 1 });
    setMatches(matchesResponse.data);
  };

  const getSortIcon = (key: keyof MatchType) => {
    if (sortBy.key !== key) {
      return null;
    }
    return sortBy.order === 1 ? (
      <ChevronUp className="inline h-4 w-4" />
    ) : (
      <ChevronDown className="inline h-4 w-4" />
    );
  };
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-500 mb-3 sm:mb-0">
          Cricket Matches
        </h2>
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <select
              value={filter ?? ""}
              onChange={(e) => handleFilterMatches(e.target.value || null)}
              className="px-3 py-2 border rounded-md shadow-sm text-sm text-gray-700 bg-white"
            >
              <option value="">Filter by Status</option>
              {statuses.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>

          <button
            className="flex items-center gap-2 px-4 py-2 bg-white border rounded-md shadow-sm hover:bg-gray-50 text-sm font-medium text-gray-700"
            onClick={handleFilterReset}
          >
            {" "}
            <RefreshCw />
            Reset Filter
          </button>
        </div>
      </div>

      <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              {TableHeader.map((val) => (
                <th
                  className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer"
                  key={val}
                  onClick={() => handleSort(val)}
                >
                  {val} {getSortIcon(val)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-gray-200">
            {matches.length > 0 ? (
              matches.map((match) => (
                <tr
                  className="hover:bg-gray-50 transition-colors"
                  key={`${match.team1}-${match.team2}`}
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {match.team1}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {match.team2}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {match.score1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {match.score2}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {match.overs1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {match.overs2}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {match.wickets1}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {match.wickets2}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {" "}
                    <span
                      className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${
                        match.status === StatusEnum.LIVE
                          ? "text-green-600 bg-green-100"
                          : "text-blue-600 bg-blue-100"
                      }`}
                    >
                      {match.status === StatusEnum.LIVE ? "LIVE" : "COMPLETED"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="px-6 py-4 text-center text-sm text-gray-500"
                >
                  No matches found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="md:hidden space-y-4">
        {matches.length > 0 ? (
          matches.map((match) => (
            <div
              key={`${match.team1}-${match.team2}`}
              className="bg-white shadow-sm border border-gray-200 rounded-lg p-4"
            >
              <div>
                <div className="text-lg font-medium text-gray-900">
                  {match.team1} vs {match.team2}
                </div>
                <span
                  className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    match.status === StatusEnum.LIVE
                      ? "text-green-600 bg-green-100"
                      : "text-blue-600 bg-blue-100"
                  }`}
                >
                  {match.status === StatusEnum.LIVE ? "LIVE" : "COMPLETED"}
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {Object.entries(match).map(
                  ([key, value]) =>
                    key !== "team1" &&
                    key !== "team2" &&
                    key !== "status" &&
                    key !== "_id" &&
                    (
                      <div key={key} className="bg-gray-50 p-2 rounded">
                        <div className="text-xs text-gray-700 uppercase">
                          {key}
                        </div>
                        <div className="font-medium text-gray-500">{value}</div>
                      </div>
                    )
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center p-4 text-gray-500 bg-white rounded-lg border border-gray-200">
            No matches found
          </div>
        )}
      </div>
    </div>
  );
};
