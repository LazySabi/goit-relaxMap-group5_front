import { fetchLocationsProps } from "@/types/location";
import { axiosClient as api } from "./api";
import { LocationsResponse } from "@/app/api/locations/route";
import { User } from "@/types/user";
import { Location } from "@/types/location";
import { FeedbacksResponse } from "@/types/feedback";
import { cookies } from "next/headers";

export const fetchLocations = async ({
  page = 1,
  limit = 6,
  region,
  type,
  search,
  sortBy,
  sortDirection,
}: fetchLocationsProps) => {
  const { data } = await api.get<LocationsResponse>("/locations", {
    params: {
      page,
      limit,
      region,
      type,
      search,
      sortBy,
      sortDirection,
    },
  });

  return data;
};

export const fetchLocationById = async(id: string): Promise<Location> => {
  const cookieStore = await cookies();
  const { data} = await api.get<Location>(`/locations/${id}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });

  return data;
}

export const getUserById = async (userId: string): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get<User>(`/users/${userId}`, {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

export const getMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await api.get<User>("/users/current", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};

interface UserLocationsResponse {
  locations: Location[];
  total: number;
  isEmpty: boolean;
}

export const getUserLocations = async (
  userId: string,
): Promise<UserLocationsResponse> => {
  const { data } = await api.get<UserLocationsResponse>(
    `/users/${userId}/locations`,
  );
  return data;
};

export const getAllFeedbacks = async (
  page = 1,
  limit = 10,
): Promise<FeedbacksResponse> => {
  const { data } = await api.get<FeedbacksResponse>("/feedbacks", {
    params: { page, limit },
  });
  return data;
};

export const checkSession = async () => {
  const cookieStore = await cookies();
  const response = await api.get<CheckSessionRequest>("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return response;
};
