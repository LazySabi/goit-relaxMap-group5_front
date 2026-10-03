import { api } from "@/app/api/api";
import { logErrorResponse } from "@/app/api/auth/_utils/utils";
import { Location } from "@/types/location";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ userId: string }>;
};

interface LocationsApiResponse {
  locations: Location[];
  page: number;
  limit: number;
  totalPages: number;
  totalLocations: number;
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const cookieStore = await cookies();
    const { userId } = await params;
    const limit = request.nextUrl.searchParams.get("limit");
    const page = request.nextUrl.searchParams.get("page");

    const locationsResponse = await api<LocationsApiResponse>(
      `/api/users/${userId}/locations`,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
        params: {
          limit,
          page,
        },
      },
    );

    const { locations, totalLocations } = locationsResponse.data;

    return NextResponse.json(
      {
        locations,
        total: totalLocations,
        isEmpty: totalLocations === 0,
      },
      { status: locationsResponse.status },
    );
  } catch (error) {
    console.error(error);

    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.status },
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
