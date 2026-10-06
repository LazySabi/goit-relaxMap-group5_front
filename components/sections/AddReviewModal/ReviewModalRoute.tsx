"use client";

import { useRouter } from "next/navigation";
import { useAuthStore } from "@/lib/store/authStore";
import AddReviewModal from "./AddReviewModal";
import AuthPromptModal from "../AuthPromptModal/AuthPromptModal";

type ReviewModalRouteProps = {
  locationId: string;
};

export default function ReviewModalRoute({ locationId }: ReviewModalRouteProps) {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleClose = () => router.back();

  return isAuthenticated ? (
    <AddReviewModal locationId={locationId} onClose={handleClose} />
  ) : (
    <AuthPromptModal onClose={handleClose} />
  );
}