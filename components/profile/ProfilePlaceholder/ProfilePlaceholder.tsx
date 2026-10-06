import Link from "next/link";
import css from "./ProfilePlaceholder.module.css";

interface ProfilePlaceholderProps {
  isOwnProfile: boolean;
}

export default function ProfilePlaceholder({
  isOwnProfile,
}: ProfilePlaceholderProps) {
  const text = isOwnProfile
    ? "Ви ще нічого не публікували, поділіться своєю першою локацією!"
    : "Цей користувач ще не ділився локаціями";

  const linkText = isOwnProfile ? "Поділитися локацією" : "Назад до локацій";

  const href = isOwnProfile ? "/locations/add" : "/locations";

  return (
    <div className={css.placeholder}>
      <p className={css.text}>{text}</p>

      <Link href={href} className={css.actionLink}>
        {linkText}
      </Link>
    </div>
  );
}
