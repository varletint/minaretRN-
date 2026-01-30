import type { Mosque } from "../stores/playerStore";

// Mock data - In production, this would come from your API/backend
export const mosques: Mosque[] = [
  {
    id: "1",
    name: "Mosque Al-Noor",
    location: "Downtown",
    mountPoint: "/mosque-alnoor",
    description: "Central community mosque",
  },
  {
    id: "2",
    name: "Mosque Central",
    location: "City Center",
    mountPoint: "/mosque-central",
    description: "Historic grand mosque",
  },
  {
    id: "3",
    name: "Mosque Al-Hidayah",
    location: "East Side",
    mountPoint: "/mosque-hidayah",
    description: "Family-friendly mosque",
  },
  {
    id: "4",
    name: "Mosque Al-Taqwa",
    location: "North District",
    mountPoint: "/mosque-taqwa",
    description: "Community education center",
  },
  {
    id: "5",
    name: "Mosque Al-Furqan",
    location: "West Quarter",
    mountPoint: "/mosque-furqan",
    description: "Youth-focused mosque",
  },
];

// Icecast server URL - Change this to your actual server
// export const ICECAST_URL = 'http://localhost:8000'

// API endpoints
// export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
