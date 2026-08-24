import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Musasa Travel")
    .items([
      S.documentTypeListItem("travelPackage").title("Travel Packages"),
      S.listItem()
        .title("Services")
        .child(
          S.list()
            .title("Services")
            .items([
              S.documentTypeListItem("activity").title("Activities"),
              S.documentTypeListItem("stay").title("Accommodation"),
              S.documentTypeListItem("itinerary").title("Sample itineraries"),
              S.documentTypeListItem("tourGuide").title("Tour guides"),
              S.documentTypeListItem("transfer").title("Shuttles & transfers"),
            ])
        ),
      S.divider(),
      S.listItem()
        .title("Legal")
        .child(
          S.list()
            .title("Legal")
            .items([S.documentTypeListItem("terms").title("Terms & policies")])
        ),
    ]);
