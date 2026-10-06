import { api } from "@/app/api/api";
import { logErrorResponse } from "@/app/api/auth/_utils/utils";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import type { Review } from "@/components/sections/ReviewsBlock/ReviewsCard";

type BackendFeedbacksResponse = {
  data: Review[];
  pagination: {
    page: number;
    limit: number;
    totalItems: number;
    totalPages: number;
  };
};

const handleError = (error: unknown) => {
  if (isAxiosError(error)) {
    logErrorResponse(error.response?.data);

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

  logErrorResponse({
    message: (error as Error).message,
  });

  return NextResponse.json(
    {
      error: "Internal Server Error",
    },
    {
      status: 500,
    },
  );
};

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;

    const response = await api.get<BackendFeedbacksResponse>(
      "/api/feedbacks",
      {
        params: {
          locationId:
            searchParams.get("locationId") ?? undefined,
          page: searchParams.get("page") ?? undefined,
          limit: searchParams.get("limit") ?? undefined,
        },
      },
    );

    return NextResponse.json(
      {
        feedbacks: response.data.data,
        total: response.data.pagination.totalItems,
        page: response.data.pagination.page,
        limit: response.data.pagination.limit,
        totalPages: response.data.pagination.totalPages,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const cookieStore = await cookies();

    const response = await api.post(
      "/api/feedbacks",
      body,
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    return NextResponse.json(
      response.data,
      {
        status: response.status,
      },
    );
  } catch (error) {
    return handleError(error);
  }
}