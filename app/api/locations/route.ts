import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

import { api } from "../api";
import { logErrorResponse } from "../auth/_utils/utils";
import { Location } from "@/types/location";

type BackendLocationsResponse = {
  data: Location[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

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
    const limit = Number(searchParams.get("limit") ?? 9);

    const region = searchParams.get("region") || undefined;
    const type = searchParams.get("type") || undefined;
    const search = searchParams.get("search") || undefined;

    const sort = searchParams.get("sort") ?? "popular";

    let sortBy: "rate" | "updatedAt" = "rate";
    let sortDirection: "asc" | "desc" = "desc";

    if (sort === "newest") {
      sortBy = "updatedAt";
      sortDirection = "desc";
    }

    if (sort === "rating") {
      sortBy = "rate";
      sortDirection = "desc";
    }

    if (sort === "popular") {
      sortBy = "rate";
      sortDirection = "desc";
    }

    const response = await api.get<BackendLocationsResponse>(
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

    const result: LocationsResponse = {
      locations: response.data.data,
      page: response.data.pagination.page,
      limit: response.data.pagination.limit,
      totalLocations: response.data.pagination.totalItems,
      totalPages: response.data.pagination.totalPages,
    };

    return NextResponse.json(result, {
      status: 200,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
        {
          status: error.response?.status ?? 500,
        },
      );
    }

    logErrorResponse(error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const cookieStore = await cookies();

    const response = await api.post(
      "/api/locations",
      formData,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

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
        {
          status: error.response?.status ?? 500,
        },
      );
    }

    logErrorResponse(error);

    return NextResponse.json(
      {
        error: "Internal server error",
      },
      {
        status: 500,
      },
    );
  }
}
