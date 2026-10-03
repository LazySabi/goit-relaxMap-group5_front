import Link from "@/components/ui/Link/Link";
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

  const href = isOwnProfile ? "/locations/action/create" : "/locations";

  return (
    <div className={css.placeholder}>
      <p className={css.text}>{text}</p>

      <Link href={href} variant="primary" className={css.actionLink}>
        {linkText}
      </Link>
    </div>
  );
}
