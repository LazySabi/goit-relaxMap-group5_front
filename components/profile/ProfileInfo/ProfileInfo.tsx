import { User } from "@/types/user";
import Image from "next/image";
import css from "./ProfileInfo.module.css";

interface ProfileInfoProps {
  user: User;
}

export default function ProfileInfo({ user }: ProfileInfoProps) {
  return (
    <div className={css.profileInfo}>
      <Image
        className={css.avatar}
        src={user.avatarUrl}
        alt={user.name}
        width={145}
        height={145}
      />
      <div className={css.wrap}>
        <h1 className={css.name}>{user.name}</h1>
        <p className={css.articles}>Статей: {user.articlesAmount}</p>
      </div>
    </div>
  );
}
