import type { Metadata } from "next";
import ProfilePage from "@/components/sections/ProfilePage/ProfilePage";

type Props = {
  params: Promise<{ userId: string }>;
};

export const metadata: Metadata = {
  title: "Профіль автора | RelaxMap",
  description: "Профіль автора RelaxMap: опубліковані ним місця відпочинку.",
};

export default async function UserProfileRoute({ params }: Props) {
  const { userId } = await params;

  return <ProfilePage userId={userId} />;
}
