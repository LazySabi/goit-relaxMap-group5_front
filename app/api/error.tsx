"use client";

import css from "./error-page.module.css";

export default function ErrorPage({ error }: { error: Error }) {
  return <p>Error occured while loading: {error.message}</p>;
}