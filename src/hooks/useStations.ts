import { useQuery } from "@tanstack/react-query";
import {
  getStations,
  getLiveStations,
  getStation,
  getNowPlaying,
} from "../lib/stations";

export const stationKeys = {
  all: ["stations"] as const,
  lists: () => [...stationKeys.all, "list"] as const,
  list: (filters?: string) => [...stationKeys.lists(), filters] as const,
  live: () => [...stationKeys.all, "live"] as const,
  details: () => [...stationKeys.all, "detail"] as const,
  detail: (slug: string) => [...stationKeys.details(), slug] as const,
  nowPlaying: (slug: string) =>
    [...stationKeys.all, "now-playing", slug] as const,
};

export function useStations() {
  return useQuery({
    queryKey: stationKeys.lists(),
    queryFn: getStations,
  });
}

export function useLiveStations() {
  return useQuery({
    queryKey: stationKeys.live(),
    queryFn: getLiveStations,
    refetchInterval: 30 * 1000,
  });
}

export function useStation(slug: string) {
  return useQuery({
    queryKey: stationKeys.detail(slug),
    queryFn: () => getStation(slug),
    enabled: !!slug,
  });
}

export function useNowPlaying(slug: string, enabled = true) {
  return useQuery({
    queryKey: stationKeys.nowPlaying(slug),
    queryFn: () => getNowPlaying(slug),
    enabled: enabled && !!slug,
    refetchInterval: 10 * 1000,
  });
}
