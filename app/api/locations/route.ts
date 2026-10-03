import { NextRequest, NextResponse } from "next/server";
import { api } from "../api";
import { isAxiosError } from "axios";
import {logErrorResponse} from "../auth/_utils/utils";
import { Location } from "@/types/location";
import { cookies } from "next/headers";

export interface LocationsResponse {
  page: number;
  limit: number;
  totalPages: number;
  totalLocations: number;
  locations: Location[];
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const page = Number(searchParams.get("page") ?? 1);
    const limit = Number(searchParams.get("limit") ?? 5);
    const region = searchParams.get("region");
    const type = searchParams.get("type");
    const search = searchParams.get("search");
    const sortBy = searchParams.get("sortBy");
    const sortDirection = searchParams.get("sortDirection");

    const locationsResponse = await api.get<LocationsResponse>(
      "/api/locations",
      {
        params: {
          page,
          limit,
          region,
          type,
          search,
          sortBy,
          sortDirection,
        },
      },
    );

    return NextResponse.json(locationsResponse.data, {
      status: locationsResponse.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error);
      return NextResponse.json(
        {
          error: error.message,
          response: error?.response?.data,
        },
        { status: error.status },
      );
    }

    logErrorResponse(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const cookieStore = await cookies();
    const response = await api.post("/api/locations", formData, {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error);
      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        { status: error.status },
      );
    }
    logErrorResponse({ message: (error as Error).message });
    return NextResponse.json(
      { error: "Internal error server" },
      { status: 500 },
    );
  }
}
