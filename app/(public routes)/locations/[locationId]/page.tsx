import LocationDetailsPage from "../../../../components/sections/LocationDetailsPage/LocationDetailsPage";
import { api } from "@/app/api/api";
import { isAxiosError } from "axios";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ locationId: string }>;
};

type LocationResponse = {
  _id: string;
  name: string;
  image: string;
  description: string;
  region: string;
  locationType: string;
  ownerId: string;
  author: {
    id: string;
    name: string;
  } | null;
};

export default async function LocationPage({ params }: Props) {
  const { locationId } = await params;

  let location: LocationResponse;

  try {
    const response = await api.get<LocationResponse>(
      `/api/locations/${locationId}`
    );

    location = response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }

    throw error;
  }

  const locationForPage = {
    ...location,
    author: location.author ?? {
      id: location.ownerId,
      name: "Автор невідомий",
    },
  };

  return <LocationDetailsPage location={locationForPage} />;
}