import { api } from "@/app/api/api";
import { NextRequest, NextResponse } from "next/server";
import { logErrorResponse } from "@/app/api/auth/_utils/utils";
import { isAxiosError } from "axios";

type Props = {
  params: Promise<{ userId: string }>;
};

export async function GET(req: NextRequest, { params }: Props) {
  try {
    const { userId } = await params;

    const response = await api.get(`/api/users/${userId}`);

    // Бекенд віддає "id", а фронт усюди працює з "_id"
    const { id, ...rest } = response.data;

    return NextResponse.json(
      { ...rest, _id: rest._id ?? id },
      { status: response.status },
    );
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
