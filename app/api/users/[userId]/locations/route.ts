import { api } from "@/app/api/api";
import { logErrorResponse } from "@/app/api/auth/_utils/utils";
import { Location } from "@/types/location";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type Props = {
  params: Promise<{ userId: string }>;
};

// Формат відповіді бекенду: GET /api/users/:userId/locations
interface LocationsApiResponse {
  data: Location[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
  };
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

    const { data: locations = [], pagination } = locationsResponse.data;
    const total = pagination?.totalItems ?? locations.length;

    return NextResponse.json(
      {
        locations,
        total,
        isEmpty: total === 0,
      },
      { status: locationsResponse.status },
    );
  } catch (error) {
    console.error(error);

    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);
      return NextResponse.json(
        { error: error.message, response: error.response?.data },
        { status: error.response?.status ?? 500 },
      );
    }

    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
