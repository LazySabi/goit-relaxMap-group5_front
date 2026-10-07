"use client";

import { useEffect, useState } from "react";
import Link from "@/components/ui/Link/Link";
import { useAuthStore } from "@/lib/store/authStore";

type Props = {
  locationId: string;
  ownerId?: string;
};

// Кнопка "Редагувати" видна тільки автору локації.
// Бек додатково перевіряє власника (403 для чужих).
export default function EditLocationButton({ locationId, ownerId }: Props) {
  const [mounted, setMounted] = useState(false);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const currentUserId = useAuthStore((state) => state.user._id);

  // Стор береться з localStorage — рендеримо тільки на клієнті,
  // щоб не було hydration mismatch
  useEffect(() => setMounted(true), []);

  if (!mounted || !isAuthenticated || !ownerId) return null;
  if (String(ownerId) !== String(currentUserId)) return null;

  return (
    <Link
      href={`/locations/${locationId}/edit`}
      variant="primary"
      size="md"
      prefetch={false}
    >
      Редагувати
    </Link>
  );
}
