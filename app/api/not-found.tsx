import { Metadata } from "next";
import css from "./notFoundPage.module.css";
import clsx from "clsx";

export const metadata: Metadata = {
  title: "404 - Page not found | Relax Map",
  description: "Page not found",
  openGraph: {
    title: "404 - Page not found | Relax Map",
    description: "Page not found",
    images: [
      {
        url: "/opengraph-image.jpg",
        height: 1200,
        width: 630,
        alt: "Relax Map",
      },
    ],
    url: process.env.NEXT_PUBLIC_SITE_URL,
    type: "article",
  },
};

export default function NotFoundPage() {
  return (
    <div className={clsx("container", css.centered)}>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}