import { User } from "@/types/user";
import Image from "next/image";
import css from "./ProfileInfo.module.css";

interface ProfileInfoProps {
  user: User;
  onEdit?: () => void;
}

export default function ProfileInfo({ user, onEdit }: ProfileInfoProps) {
  return (
    <div className={css.profileInfo}>
      <Image
        className={css.avatar}
        src={user.avatarUrl || "/avatar-placeholder.svg"}
        alt={user.name}
        width={145}
        height={145}
        priority
      />
      <div className={css.wrap}>
        <h1 className={css.name}>{user.name}</h1>
        <p className={css.articles}>Статей: {user.articlesAmount}</p>
      </div>
      
      {onEdit && (
        <button type="button" className={css.editButton} onClick={onEdit}>
          Редагувати профіль
        </button>
      )}
    </div>
  );
}
