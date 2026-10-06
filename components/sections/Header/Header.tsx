"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  LuMenu,
  LuX,
  LuLogOut,
  LuUserRound,
} from "react-icons/lu";

import Logo from "../../ui/Logo/Logo";
import { useAuthStore } from "@/lib/store/authStore";
import { logout } from "@/lib/api/clientApi";

import css from "./Header.module.css";

const publicNavLinks = [
  { href: "/", label: "Головна" },
  { href: "/locations", label: "Місця відпочинку" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isAuthenticated = useAuthStore(
    (state) => state.isAuthenticated,
  );

  const user = useAuthStore((state) => state.user);

  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1440px)");

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) setIsMenuOpen(false);
    };

    desktop.addEventListener("change", handleChange);

    return () => desktop.removeEventListener("change", handleChange);
  }, []);

  const closeMenu = () => setIsMenuOpen(false);

  const handleLogout = async () => {
    try {
      await logout();
    } finally {
      clearIsAuthenticated();
      closeMenu();
    }
  };

  return (
    <header className={css.header}>
      <div className={`container ${css.inner}`}>
        <Logo onClick={closeMenu} />

        <div className={css.navGroup}>
          <nav
            className={css.nav}
            aria-label="Основна навігація"
          >
            <ul className={css.navList}>
              {publicNavLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={css.navLink}>
                    {label}
                  </Link>
                </li>
              ))}

              {isAuthenticated && (
                <li>
                  <Link
                    href="/profile"
                    className={css.navLink}
                  >
                    Мій Профіль
                  </Link>
                </li>
              )}
            </ul>
          </nav>

          {isAuthenticated ? (
            <div className={css.authorizedActions}>
              <Link
                href="/locations/create"
                className={css.shareLocationBtn}
              >
                Поділитись локацією
              </Link>

              <Link
                href="/profile"
                className={css.userInfo}
                aria-label="Перейти до профілю"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt=""
                    className={css.avatar}
                  />
                ) : (
                  <span className={css.avatarFallback}>
                    <LuUserRound size={16} />
                  </span>
                )}

                <span className={css.userName}>
                  {user.name || "Користувач"}
                </span>
              </Link>

              <button
                type="button"
                className={css.logoutBtn}
                onClick={handleLogout}
                aria-label="Вийти з акаунта"
                title="Вийти"
              >
                <LuLogOut size={20} />
              </button>
            </div>
          ) : (
            <div className={css.authActions}>
              <Link
                href="/sign-in"
                className={css.signInBtn}
              >
                Вхід
              </Link>

              <Link
                href="/sign-up"
                className={css.signUpBtn}
              >
                Реєстрація
              </Link>
            </div>
          )}
        </div>

        <button
          type="button"
          className={css.burger}
          aria-label={
            isMenuOpen ? "Закрити меню" : "Відкрити меню"
          }
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? (
            <LuX size={26} />
          ) : (
            <LuMenu size={26} />
          )}
        </button>
      </div>

      <div
        className={`${css.mobileMenu}${
          isMenuOpen ? ` ${css.mobileMenuOpen}` : ""
        }`}
        aria-hidden={!isMenuOpen}
      >
        <nav aria-label="Мобільна навігація">
          <ul className={css.mobileNavList}>
            {publicNavLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={css.mobileNavLink}
                  onClick={closeMenu}
                >
                  {label}
                </Link>
              </li>
            ))}

            {isAuthenticated && (
              <li>
                <Link
                  href="/profile"
                  className={css.mobileNavLink}
                  onClick={closeMenu}
                >
                  Мій Профіль
                </Link>
              </li>
            )}
          </ul>
        </nav>

        {isAuthenticated ? (
          <div className={css.mobileAuthorizedActions}>
            <Link
              href="/locations/create"
              className={css.shareLocationBtn}
              onClick={closeMenu}
            >
              Поділитись локацією
            </Link>

            <div className={css.mobileUserRow}>
              <Link
                href="/profile"
                className={css.userInfo}
                onClick={closeMenu}
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt=""
                    className={css.avatar}
                  />
                ) : (
                  <span className={css.avatarFallback}>
                    <LuUserRound size={16} />
                  </span>
                )}

                <span className={css.userName}>
                  {user.name || "Користувач"}
                </span>
              </Link>

              <button
                type="button"
                className={css.logoutBtn}
                onClick={handleLogout}
                aria-label="Вийти з акаунта"
              >
                <LuLogOut size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className={css.mobileAuthActions}>
            <Link
              href="/sign-in"
              className={css.signInBtn}
              onClick={closeMenu}
            >
              Вхід
            </Link>

            <Link
              href="/sign-up"
              className={css.signUpBtn}
              onClick={closeMenu}
            >
              Реєстрація
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;