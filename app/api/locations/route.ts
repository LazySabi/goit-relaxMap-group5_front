import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";

import { api } from "../api";
import { logErrorResponse } from "../auth/_utils/utils";
import type { Location } from "@/types/location";

type BackendLocationsResponse = {
  data: Location[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

export type LocationsResponse = {
  data: Location[];
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};

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

    switch (sort) {
      case "newest":
        sortBy = "updatedAt";
        sortDirection = "desc";
        break;

      case "rating":
        sortBy = "rate";
        sortDirection = "desc";
        break;

      case "popular":
      default:
        sortBy = "rate";
        sortDirection = "desc";
        break;
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
      data: response.data.data,
      page: response.data.pagination.page,
      limit: response.data.pagination.limit,
      totalItems: response.data.pagination.totalItems,
      totalPages: response.data.pagination.totalPages,
    };

    return NextResponse.json(
      {
        data: result,
      },
      {
        status: 200,
      },
    );
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