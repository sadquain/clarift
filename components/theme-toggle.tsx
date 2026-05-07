"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState(() =>
    typeof window === "undefined" ? false : window.localStorage.getItem("clarift-theme") === "dark",
  );

  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
  }, [dark]);

  function toggle() {
    const next = !dark;
    setDark(next);
    window.localStorage.setItem("clarift-theme", next ? "dark" : "light");
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className="rounded-full border border-line bg-paper px-3 py-2 text-sm font-semibold text-ink hover:border-brand"
      aria-pressed={dark}
      aria-label="Toggle dark theme"
    >
      {dark ? "Light" : "Dark"}
    </button>
  );
}
