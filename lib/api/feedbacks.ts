import axios from "axios";
import type { Review } from "@/components/sections/ReviewsBlock/ReviewsCard";

const API_URL = process.env.NEXT_PUBLIC_SITE_URL;

// interface FeedbacksResponse {
//   status: number;
//   message: string;
//   data: {
//     feedbacks: Review[];
//     total: number;
//     page: number;
//     totalPages: number;
//   };
// }
interface FeedbacksResponse {
  feedbacks: Review[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

interface CreateFeedbacksData {
  locationId?: string;
  userName: string;
  rate: number;
  description: string;
}

export const fetchFeedbacks = async (
  locationId?: string,
): Promise<FeedbacksResponse> => {
  const params = locationId ? { locationId } : {};
  const res = await axios.get(`${API_URL}/api/feedbacks`, { params });
  return res.data;
};

export const createFeedbacks = async (data: CreateFeedbacksData) => {
  const res = await axios.post(`${API_URL}/api/feedbacks`, data);
  return res.data;
};
