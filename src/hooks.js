import { useEffect, useRef, useState } from "react";

/** Reveal element once it scrolls into view. */
export function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || seen) return;
    const io = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setSeen(true);
        io.disconnect();
      }
    }, options);
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seen]);

  return [ref, seen];
}

/** Typewriter that cycles through a list of words. */
export function useTyping(words, { type = 80, erase = 40, hold = 1400 } = {}) {
  const [text, setText] = useState("");

  useEffect(() => {
    // All mutable state lives in this closure, so StrictMode's
    // mount/unmount/mount cycle simply restarts cleanly.
    let i = 0;
    let len = 0;
    let deleting = false;
    let t;

    const tick = () => {
      const word = words[i % words.length];
      len += deleting ? -1 : 1;
      setText(word.slice(0, len));

      let delay = deleting ? erase : type;
      if (!deleting && len === word.length) {
        deleting = true;
        delay = hold;
      } else if (deleting && len === 0) {
        deleting = false;
        i += 1;
        delay = 300;
      }
      t = setTimeout(tick, delay);
    };

    t = setTimeout(tick, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return text;
}

/** Animate a number from 0 to `to` when `start` becomes true. */
export function useCountUp(to, start, duration = 1200) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const step = (now) => {
      const p = Math.min((now - t0) / duration, 1);
      setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [start, to, duration]);
  return n;
}

/** Persisted light/dark theme, defaulting to the OS preference. */
export function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      const saved = localStorage.getItem("theme");
      if (saved) return saved;
    } catch {}
    return window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
  });

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("theme", theme);
    } catch {}
  }, [theme]);

  return [theme, () => setTheme((t) => (t === "dark" ? "light" : "dark"))];
}

/** Which section id is currently in the viewport (for nav highlight). */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return active;
}
