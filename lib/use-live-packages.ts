"use client";

import { useEffect, useState } from "react";
import { getBrowserSanityClient } from "@/lib/sanity-browser";
import {
  listQuery,
  parseTravelPackage,
  type TravelPackage,
} from "@/lib/travel-packages";

export function useLiveTravelPackage(initial: TravelPackage) {
  const [pkg, setPkg] = useState(initial);

  useEffect(() => {
    setPkg(initial);
    let cancelled = false;
    getBrowserSanityClient()
      .fetch(listQuery)
      .then((rows: unknown) => {
        const next = Array.isArray(rows)
          ? rows
              .map(parseTravelPackage)
              .find((p): p is TravelPackage => p != null && p.slug === initial.slug)
          : null;
        if (!cancelled && next) setPkg(next);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [initial.slug]);

  return pkg;
}

export function useLiveTravelPackages(initial: TravelPackage[]) {
  const [packages, setPackages] = useState(initial);

  useEffect(() => {
    let cancelled = false;
    getBrowserSanityClient()
      .fetch(listQuery)
      .then((rows: unknown) => {
        const next = Array.isArray(rows)
          ? rows.map(parseTravelPackage).filter((p): p is TravelPackage => Boolean(p))
          : [];
        if (!cancelled && next.length) setPackages(next);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, []);

  return packages;
}
