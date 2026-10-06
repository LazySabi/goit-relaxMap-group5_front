import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ locationId: string }>;
};

export default async function ReviewPage({ params }: Props) {
  const { locationId } = await params;
  redirect(`/locations/${locationId}`);
}