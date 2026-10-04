import { api } from "@/app/api/api";
import { logErrorResponse } from "@/app/api/auth/_utils/utils";
import { FeedbacksResponse } from "@/types/feedback";
import { isAxiosError } from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const page = request.nextUrl.searchParams.get("page");
    const limit = request.nextUrl.searchParams.get("limit");

    const response = await api.get<FeedbacksResponse>("/api/feedbacks", {
      params: { page, limit },
    });

    return NextResponse.json(response.data, { status: response.status });
  } catch (error) {
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
