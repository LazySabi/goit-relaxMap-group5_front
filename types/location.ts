export interface Location {
  _id: string;
  image: string;
  name: string;
  description: string;
  locationType: string;
  region: string;
  rate: number;
  ownerId: string;
  feedbacksId: string[];
  coordinates: {
    lat: number;
    lon: number;
  };
}

export type SortBy = "rate" | "updatedAt";
export type SortDirection = "asc" | "desc";

export interface fetchLocationsProps {
  page?: number;
  limit?: number;
  region?: string;
  type?: string;
  search?: string;
  sortBy?: SortBy;
  sortDirection?: SortDirection;
}

export interface UpdateLocationData {
  image?: string;
  name?: string;
  description?: string;
  locationType?: string;
  region?: string;
}
