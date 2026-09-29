"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LuMenu, LuX } from "react-icons/lu";
import Logo from "../../ui/Logo/Logo";
import css from "./Header.module.css";

const navLinks = [
  { href: "/", label: "Головна" },
  { href: "/locations", label: "Місця відпочинку" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={css.header}>
      <div className={`container ${css.inner}`}>
        <Logo onClick={closeMenu} />

        <div className={css.navGroup}>
          <nav className={css.nav} aria-label="Основна навігація">
            <ul className={css.navList}>
              {navLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className={css.navLink}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={css.authActions}>
            <Link href="/sign-in" className={css.signInBtn}>
              Вхід
            </Link>
            <Link href="/sign-up" className={css.signUpBtn}>
              Реєстрація
            </Link>
          </div>
        </div>

        <button
          type="button"
          className={css.burger}
          aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          {isMenuOpen ? <LuX size={26} /> : <LuMenu size={26} />}
        </button>
      </div>

      <div
        className={`${css.mobileMenu}${isMenuOpen ? ` ${css.mobileMenuOpen}` : ""}`}
        aria-hidden={!isMenuOpen}
      >
        <nav aria-label="Мобільна навігація">
          <ul className={css.mobileNavList}>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className={css.mobileNavLink} onClick={closeMenu}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className={css.mobileAuthActions}>
          <Link href="/sign-in" className={css.signInBtn} onClick={closeMenu}>
            Вхід
          </Link>
          <Link href="/sign-up" className={css.signUpBtn} onClick={closeMenu}>
            Реєстрація
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
