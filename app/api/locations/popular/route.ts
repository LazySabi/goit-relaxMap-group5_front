import { NextResponse } from "next/server";
import { isAxiosError } from "axios";

import { api } from "../../api";

export async function GET() {
  try {
    const response = await api.get("/api/locations/popular");

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error) {
    if (isAxiosError(error)) {
      console.error(
        "Failed to fetch popular locations:",
        error.response?.data ?? error.message,
      );

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

    console.error("Failed to fetch popular locations:", error);

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