import type { Metadata } from "next";
import ProfilePage from "@/components/sections/ProfilePage/ProfilePage";

export const metadata: Metadata = {
  title: "Мій профіль | RelaxMap",
  description: "Особистий профіль RelaxMap: ваші опубліковані місця відпочинку.",
};

export default function MyProfileRoute() {
  return <ProfilePage />;
}
