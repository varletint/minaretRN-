import api from "./api";
import type {
  ListStationsResponse,
  ListLiveStationsResponse,
  GetStationResponse,
  GetNowPlayingResponse,
  StationListItem,
  Station,
} from "../types/station";

export const getStations = async (): Promise<StationListItem[]> => {
  const response = await api.get<ListStationsResponse>("/stations");
  return response.data.data.stations;
};

export const getLiveStations = async (): Promise<StationListItem[]> => {
  const response = await api.get<ListLiveStationsResponse>("/stations/live");
  return response.data.data.stations;
};

export const getStation = async (slug: string): Promise<Station> => {
  const response = await api.get<GetStationResponse>(`/stations/${slug}`);
  return response.data.data.station;
};

export const getNowPlaying = async (
  slug: string
): Promise<GetNowPlayingResponse["data"]> => {
  const response = await api.get<GetNowPlayingResponse>(
    `/stations/${slug}/now-playing`
  );
  return response.data.data;
};
