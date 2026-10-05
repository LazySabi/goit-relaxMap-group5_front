import { api } from "@/app/api/api";
import { logErrorResponse } from "@/app/api/auth/_utils/utils";
import { isAxiosError } from "axios";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = await cookies();

    await api.post(
      "/api/auth/logout",
      {},
      {
        headers: {
          Cookie: cookieStore.toString(),
        },
      },
    );

    cookieStore.delete("sessionId");
    cookieStore.delete("accessToken");
    cookieStore.delete("refreshToken");

    return NextResponse.json(
      {
        success: true,
        message: "Вихід успішний",
      },
      { status: 200 },
    );
  } catch (error) {
    if (isAxiosError(error)) {
      logErrorResponse(error.response?.data);

      return NextResponse.json(
        {
          error: error.message,
          response: error.response?.data,
        },
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
