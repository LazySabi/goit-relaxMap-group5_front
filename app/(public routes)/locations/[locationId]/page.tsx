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
  rate: number;
  description: string;
  region: string;
  locationType: string;
  ownerId: string;
  author: {
    id: string;
    name: string;
  } | null;
};

type CategoryItem = { slug: string; type: string };
type RegionItem = { slug: string; region: string };

const getCategories = async () => {
  try {
    const [typesRes, regionsRes] = await Promise.all([
      api.get<{ data: CategoryItem[] }>("/api/categories/types"),
      api.get<{ data: RegionItem[] }>("/api/categories/regions"),
    ]);

    return { types: typesRes.data.data, regions: regionsRes.data.data };
  } catch {
    // Якщо довідники недоступні, сторінка все одно відкриється зі slug.
    return { types: [], regions: [] };
  }
};

export default async function LocationPage({ params }: Props) {
  const { locationId } = await params;

  let location: LocationResponse;

  try {
    const response = await api.get<LocationResponse>(
      `/api/locations/${locationId}`,
    );

    location = response.data;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 404) {
      notFound();
    }

    throw error;
  }

  const { types, regions } = await getCategories();

  const typeNames = Object.fromEntries(types.map((t) => [t.slug, t.type]));
  const regionNames = Object.fromEntries(
    regions.map((r) => [r.slug, r.region]),
  );

  const locationAuthorPage = {
    ...location,
    locationType: typeNames[location.locationType] ?? location.locationType,
    region: regionNames[location.region] ?? location.region,
    author: location.author ?? {
      id: location.ownerId,
      name: "Автор невідомий",
    },
  };

  return <LocationDetailsPage location={locationAuthorPage} />;
}