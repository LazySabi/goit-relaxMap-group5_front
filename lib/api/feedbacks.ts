import { axiosClient as api } from "./api";
import type { Review } from "@/components/sections/ReviewsBlock/ReviewsCard";

export interface FeedbacksResponse {
  feedbacks: Review[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateFeedbackData {
  locationId: string;
  rate: number;
  description: string;
}

export const fetchFeedbacks = async (
  locationId?: string,
): Promise<FeedbacksResponse> => {
  const { data } = await api.get<FeedbacksResponse>("/feedbacks", {
    params: locationId ? { locationId } : {},
  });

  return data;
};

export const createFeedback = async (values: CreateFeedbackData) => {
  const { data } = await api.post("/feedbacks", values);
  return data;
};
