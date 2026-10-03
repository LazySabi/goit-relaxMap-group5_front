import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";
import Logo from "../../ui/Logo/Logo";
import css from "./Footer.module.css";

const navLinks = [
  { href: "/", label: "Головна" },
  { href: "/locations", label: "Місця відпочинку" },
];

const socialLinks = [
  { href: "https://facebook.com", label: "Facebook", Icon: FaFacebookF },
  { href: "https://instagram.com", label: "Instagram", Icon: FaInstagram },
  { href: "https://x.com", label: "X", Icon: FaXTwitter },
  { href: "https://youtube.com", label: "YouTube", Icon: FaYoutube },
];

const Footer = () => {
  return (
    <footer className={css.footer}>
      <div className={`container ${css.inner}`}>
        <div className={css.top}>
          <Logo />

          <ul className={css.socialList}>
            {socialLinks.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  className={css.socialLink}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>

          <nav aria-label="Навігація">
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
        </div>

        <div className={css.bottom}>
          <p className={css.copyright}>© 2025 Природні Мандри. Усі права захищені.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
