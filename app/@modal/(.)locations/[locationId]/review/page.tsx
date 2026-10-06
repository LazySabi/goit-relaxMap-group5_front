import ReviewModalRoute from "@/components/sections/AddReviewModal/ReviewModalRoute";

type Props = {
  params: Promise<{ locationId: string }>;
};

export default async function ReviewModalPage({ params }: Props) {
  const { locationId } = await params;

  return <ReviewModalRoute locationId={locationId} />;
}