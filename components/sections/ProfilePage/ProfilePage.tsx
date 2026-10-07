"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchUserLocations, getMe, getUserById } from "@/lib/api/clientApi";
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

interface ProfilePageProps {
  /** Якщо передано — показуємо публічний профіль цього користувача */
  userId?: string;
}

export default function ProfilePage({ userId }: ProfilePageProps) {
  const router = useRouter();
  const currentUserId = useAuthStore((state) => state.user._id);
  const isOwnProfile = !userId;
  const [limit] = useState(getPageSize);
  const [page, setPage] = useState(1);
  const sectionRef = useRef<HTMLElement>(null);
  const setUser = useAuthStore((state) => state.setUser);
  const openEditModal = useEditProfileModal((state) => state.open);

  // Відкрили власний профіль через /profile/:id — ведемо на /profile
  useEffect(() => {
    if (userId && currentUserId && userId === currentUserId) {
      router.replace("/profile");
    }
  }, [userId, currentUserId, router]);

  const { data: user, isError: isUserError } = useQuery({
    queryKey: isOwnProfile ? ["currentUser"] : ["user", userId],
    queryFn: () => (isOwnProfile ? getMe() : getUserById(userId!)),
    retry: false,
  });

  useEffect(() => {
    if (isOwnProfile && user) setUser(user);
  }, [isOwnProfile, user, setUser]);

  useEffect(() => {
    if (isOwnProfile && isUserError) router.replace("/sign-in");
  }, [isOwnProfile, isUserError, router]);

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

  if (!isOwnProfile && isUserError) {
    return (
      <main className={css.page}>
        <div className={`container ${css.inner}`}>
          <p className={css.message}>Користувача не знайдено.</p>
        </div>
      </main>
    );
  }

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
      <ProfileInfo
        user={user}
        onEdit={isOwnProfile ? openEditModal : undefined}
      />

      <section className={css.locations} ref={sectionRef}>
        <div className={`container ${css.inner}`}>
          {isLocationsLoading && (
            <div
              className={css.loader}
              role="status"
              aria-label="Завантаження"
            />
          )}

          {isLocationsError && (
            <p className={css.message}>
              Не вдалося завантажити локації. Спробуйте пізніше.
            </p>
          )}

          {!isLocationsLoading &&
            !isLocationsError &&
            locations.length === 0 && (
              <ProfilePlaceholder isOwnProfile={isOwnProfile} />
            )}

          {locations.length > 0 && (
            <ul className={css.grid}>
              {locations.map((location) => (
                <li key={location._id} className={css.item}>
                  <LocationCard
                    location={location}
                    typeName={typeNames[location.locationType]}
                    canEdit={
                      isOwnProfile &&
                      String(location.ownerId) === String(user._id)
                    }
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
