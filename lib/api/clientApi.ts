import { axiosClient as api } from "./api";
import { LocationsResponse } from "@/app/api/locations/route";
import {
  fetchLocationsProps,
  Location,
  UpdateLocationData,
} from "@/types/location";
import { User } from "@/types/user";
import { RegisterSchema } from "@/components/auth/RegistrationForm/RegistrationForm";
import type { AxiosError } from "axios";
import { LoginSchema } from "@/components/auth/LoginForm/LoginForm";

export interface ApiErrorResponse {
  message: string;
  error?: string;
}

export type ApiError = AxiosError<ApiErrorResponse>;

export const register = async (userData: RegisterSchema): Promise<User> => {
  const { data } = await api.post<User>("/auth/register", userData);
  return data;
};

export const login = async (userData: LoginSchema): Promise<User> => {
  const { data } = await api.post<User>("/auth/login", userData);
  return data;
};

export const logout = async (): Promise<void> => {
  await api.post("/auth/logout");
};

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>("/users/current");
  return data;
};

export const fetchLocations = async ({
  page = 1,
  limit = 10,
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
export const createLocation = async (formData: FormData): Promise<Location> => {
  const { data } = await api.post<Location>("/locations", formData);
  return data;
};

export const checkSessionClient = async () => {
  const { data } = await api.get<CheckSessionRequest>("/auth/session");
  return data;
};

export async function updateLocation(
  locationId: string,
  location: UpdateLocationData,
): Promise<Location> {
  const response = await api.patch<Location>(
    `/locations/${locationId}`,
    location,
  );

  return response.data;
}

export async function fetchLocationById(id: string): Promise<Location> {
  const { data} = await api.get<Location>(`/locations/${id}`);

  return data;
}
