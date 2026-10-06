import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { api } from "../../api";

export async function GET() {
  try {
    const response = await api.get("/api/categories/regions");

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
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