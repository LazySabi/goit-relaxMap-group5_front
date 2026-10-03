import { axiosClient as api } from './api';

export type LocationType = {
  _id: string;
  type: string;
  slug: string;
  shortDescription?: string;
};

export type Region = {
  _id: string;
  region: string;
  slug: string;
  level?: string;
  note?: string;
};

export type Location = {
  _id: string;
  image: string;
  name: string;
  locationType: string;
  region: string;
  rate: number;
  description: string;
  ownerId: string;
};

export type LocationFormData = {
  images: File | null;
  name: string;
  type: string;
  region: string;
  description: string;
};

type ApiResponse<T> = {
  data: T;
};

export const getLocationTypes = async (): Promise<LocationType[]> => {
  const { data } = await api.get<ApiResponse<LocationType[]>>(
    '/categories/types',
  );

  return data.data;
};

export const getRegions = async (): Promise<Region[]> => {
  const { data } = await api.get<ApiResponse<Region[]>>(
    '/categories/regions',
  );

  return data.data;
};

export const getLocationById = async (
  locationId: string,
): Promise<Location> => {
  const { data } = await api.get<ApiResponse<Location>>(
    `/locations/${locationId}`,
  );

  return data.data;
};

const createFormData = (values: LocationFormData) => {
  const formData = new FormData();

  formData.append('name', values.name);
  formData.append('type', values.type);
  formData.append('region', values.region);
  formData.append('description', values.description);

  if (values.images) {
    formData.append('image', values.images);
  }

  return formData;
};

export const createLocation = async (
  values: LocationFormData,
): Promise<Location> => {
  const formData = createFormData(values);

  const { data } = await api.post<ApiResponse<Location>>(
    '/locations',
    formData,
  );

  return data.data;
};

export const updateLocation = async (
  locationId: string,
  values: LocationFormData,
): Promise<Location> => {
  const formData = createFormData(values);

  const { data } = await api.patch<ApiResponse<Location>>(
    `/locations/${locationId}`,
    formData,
  );

  return data.data;
};
