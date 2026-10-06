"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchUserLocations, getMe } from "@/lib/api/clientApi";
import { getLocationTypes } from "@/lib/api/locationsApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEditProfileModal } from "@/lib/store/editProfileModalStore";
import ProfileInfo from "@/components/profile/ProfileInfo/ProfileInfo";
import ProfilePlaceholder from "@/components/profile/ProfilePlaceholder/ProfilePlaceholder";
import LocationCard from "@/components/sections/LocationCard/LocationCard";
import Pagination from "@/components/ui/Pagination/Pagination";
import css from "./ProfilePage.module.css";

const getPageSize = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(min-width: 1440px)").matches
    ? 6
    : 4;

export default function ProfilePage() {
  const router = useRouter();
  const [limit] = useState(getPageSize);
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const setUser = useAuthStore((state) => state.setUser);
  const openEditModal = useEditProfileModal((state) => state.open);

  const { data: user, isError: isUserError } = useQuery({
    queryKey: ["currentUser"],
    queryFn: getMe,
    retry: false,
  });

  useEffect(() => {
    if (user) setUser(user);
  }, [user, setUser]);

  useEffect(() => {
    if (isUserError) router.replace("/sign-in");
  }, [isUserError, router]);

  const { data: types = [] } = useQuery({
    queryKey: ["location-types"],
    queryFn: getLocationTypes,
    staleTime: Infinity,
  });
  const typeNames = Object.fromEntries(types.map((t) => [t.slug, t.type]));

  const {
    data,
    isLoading: isLocationsLoading,
    isError: isLocationsError,
  } = useQuery({
    queryKey: ["userLocations", user?._id, page, limit],
    queryFn: () => fetchUserLocations(user!._id, page, limit),
    enabled: Boolean(user?._id),
    placeholderData: keepPreviousData,
  });

  const handlePageChange = (nextPage: number) => {
    setPage(nextPage);
    sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (!user) {
    return (
      <main className={css.page}>
        <div className={css.loader} role="status" aria-label="Завантаження" />
      </main>
    );
  }

  const locations = data?.locations ?? [];
  const totalPages = Math.ceil((data?.total ?? 0) / limit);

  return (
    <main className={css.page}>
      <ProfileInfo user={user} onEdit={openEditModal} />

      <section className={css.locations} ref={sectionRef}>
        <div className={`container ${css.inner}`}>
          {isLocationsLoading && (
            <div className={css.loader} role="status" aria-label="Завантаження" />
          )}

          {isLocationsError && (
            <p className={css.message}>
              Не вдалося завантажити локації. Спробуйте пізніше.
            </p>
          )}

          {!isLocationsLoading && !isLocationsError && locations.length === 0 && (
            <ProfilePlaceholder isOwnProfile />
          )}

          {locations.length > 0 && (
            <ul className={css.grid}>
              {locations.map((location) => (
                <li key={location._id} className={css.item}>
                  <LocationCard
                    location={location}
                    typeName={typeNames[location.locationType]}
                  />
                </li>
              ))}
            </ul>
          )}

          <Pagination
            page={page}
            totalPages={totalPages}
            onChange={handlePageChange}
          />
        </div>
      </section>
    </main>
  );
}