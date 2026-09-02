import ActivitiesClient from "./components/ActivitiesClient";
import JsonLd from "../../../../components/JsonLd";
import { getActivities } from "@/lib/services-cms";
import { breadcrumbsJsonLd, itemListJsonLd, pageMeta } from "@/lib/seo";
import { pageRevalidate } from "@/lib/page-revalidate";

export const revalidate = pageRevalidate;

export const metadata = pageMeta({
  title: "Victoria Falls Activities & Tours",
  description:
    "Book Victoria Falls activities with Musasa Travel — white water rafting, safari game drives, bungee jumping, helicopter flights, sunset cruises and cultural tours.",
  path: "/services/activities",
  keywords: [
    "Victoria Falls activities",
    "Victoria Falls tours",
    "white water rafting Victoria Falls",
    "bungee jumping Victoria Falls",
    "helicopter flight Victoria Falls",
    "Zambezi sunset cruise",
    "Hwange game drive",
  ],
});

export default async function ActivitiesPage() {
  const activities = await getActivities();
  return (
    <>
      <JsonLd
        data={breadcrumbsJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Victoria Falls activities", path: "/services/activities" },
        ])}
      />
      {activities.length > 0 && (
        <JsonLd
          data={itemListJsonLd(
            "Victoria Falls activities and tours",
            activities.map((activity) => ({
              name: activity.name,
              path: "/services/activities",
            }))
          )}
        />
      )}
      <ActivitiesClient activities={activities} />
    </>
  );
}
