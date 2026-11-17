import { useEffect } from "react";
import { OG_IMAGE, SITE_NAME, SITE_URL } from "../data/site";

type Seo = {
  title: string;
  description: string;
  /** Ruta relativa a la base, p. ej. "/tratamientos/pink-glow". "" = inicio. */
  path: string;
  noindex?: boolean;
  /** Objetos JSON-LD (schema.org) que describen contenido visible en la página. */
  jsonLd?: object[];
};

function meta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attr}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  const prev = el.getAttribute("content");
  el.setAttribute("content", content);
  return () => {
    if (prev === null) el.remove();
    else el.setAttribute("content", prev);
  };
}

/** Título, descripción, canonical, Open Graph y JSON-LD por ruta (SPA). Restaura al desmontar. */
export function useSeo({ title, description, path, noindex, jsonLd }: Seo) {
  const ld = JSON.stringify(jsonLd ?? []);

  useEffect(() => {
    const url = `${SITE_URL}${path || "/"}`;
    const prevTitle = document.title;
    document.title = title;

    const undo = [
      meta("name", "description", description),
      meta("name", "robots", noindex ? "noindex" : "index,follow"),
      meta("property", "og:title", title),
      meta("property", "og:description", description),
      meta("property", "og:url", url),
      meta("property", "og:image", OG_IMAGE),
      meta("property", "og:site_name", SITE_NAME),
      meta("name", "twitter:card", "summary_large_image"),
    ];

    let link = document.head.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    const hadLink = !!link;
    const prevHref = link?.getAttribute("href") ?? "";
    if (!link) {
      link = document.createElement("link");
      link.rel = "canonical";
      document.head.appendChild(link);
    }
    link.href = url;

    const scripts = (JSON.parse(ld) as object[]).map((o) => {
      const s = document.createElement("script");
      s.type = "application/ld+json";
      s.dataset.seo = "";
      s.textContent = JSON.stringify(o);
      document.head.appendChild(s);
      return s;
    });

    return () => {
      document.title = prevTitle;
      undo.forEach((u) => u());
      if (hadLink) link.href = prevHref;
      else link.remove();
      scripts.forEach((s) => s.remove());
    };
  }, [title, description, path, noindex, ld]);
}
