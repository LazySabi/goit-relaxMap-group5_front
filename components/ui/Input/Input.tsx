"use client";

import React, { useState } from "react";
import clsx from "clsx";

import "../common.module.css";
import css from "./Input.module.css";

// Since interface would be empty, I just use type alias
type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({ onInput, className, ...props }: InputProps): React.ReactNode {
  const [validationError, setValidationError] = useState<string>("");

  // See: https://developer.mozilla.org/en-US/docs/Web/API/ValidityState/badInput#detecting_bad_input
  function handleInput(ev: React.InputEvent<HTMLInputElement>) {
    const input = ev.currentTarget;
    input.reportValidity();
    setValidationError(input.validity.valid ? "" : input.validationMessage);
    if (onInput) onInput(ev);
  }

  return (
    <div className={clsx(css["wrapper"], className)}>
      <input {...props} className={css["input"]} onInput={handleInput} />
      {validationError && <p className={css["validity"]}>{validationError}</p>}
    </div>
  );
}
