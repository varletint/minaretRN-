// Populated mosque reference
export interface PopulatedMosque {
  _id: string;
  name: string;
  slug: string;
  location: string;
}

// Current track info
export interface CurrentTrack {
  title?: string;
  artist?: string;
  album?: string;
  startedAt?: string;
}

// Station settings
export interface StationSettings {
  bitrate: number;
  format: "mp3" | "ogg" | "aac";
  isPublic: boolean;
}

// Station statistics
export interface StationStats {
  totalListeners: number;
  peakListeners?: number;
  totalBroadcastMinutes?: number;
}

// Full Station type (from GET /stations/:slug)
export interface Station {
  _id: string;
  mosqueId: string | PopulatedMosque;
  name: string;
  slug: string;
  description?: string;
  streamUrl?: string;
  mountPoint: string;
  isLive: boolean;
  currentTrack?: CurrentTrack;
  settings: StationSettings;
  stats: StationStats;
  createdAt: string;
  updatedAt: string;
}

// Station list item (partial data from GET /stations)
export interface StationListItem {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  isLive: boolean;
  streamUrl?: string;
  currentTrack?: CurrentTrack;
  mosqueId: {
    _id: string;
    name: string;
    slug: string;
    location: string;
  };
  stats: {
    totalListeners: number;
  };
}

// Generic API response wrapper
export interface ApiResponse<T> {
  status: "success";
  data: T;
  message?: string;
  results?: number;
}

// GET /stations
export interface ListStationsResponse {
  status: "success";
  results: number;
  data: {
    stations: StationListItem[];
  };
}

// GET /stations/live
export interface ListLiveStationsResponse {
  status: "success";
  results: number;
  data: {
    stations: StationListItem[];
  };
}

// GET /stations/:slug
export interface GetStationResponse {
  status: "success";
  data: {
    station: Station;
  };
}

// GET /stations/:slug/now-playing
export interface GetNowPlayingResponse {
  status: "success";
  data: {
    stationName: string;
    isLive: boolean;
    currentTrack?: CurrentTrack;
  };
}

// Display-friendly station type used by UI components
export interface DisplayStation {
  _id?: string;
  id?: string;
  slug?: string;
  name: string;
  description?: string;
  location: string;
  listeners?: number;
  isLive: boolean;
  logo?: string;
  streamUrl?: string;
  currentTrack?: CurrentTrack;
  recurrence?: number[];
}
