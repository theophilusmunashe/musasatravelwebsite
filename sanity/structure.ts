import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Musasa Travel")
    .items([
      S.documentTypeListItem("travelPackage").title("Travel Packages"),
      S.divider(),
      S.listItem()
        .title("Blogs")
        .child(
          S.list()
            .title("Blogs")
            .items([
              S.documentTypeListItem("post").title("Posts"),
              S.documentTypeListItem("author").title("Authors"),
              S.documentTypeListItem("category").title("Categories"),
            ])
        ),
      S.listItem()
        .title("Legal")
        .child(
          S.list()
            .title("Legal")
            .items([S.documentTypeListItem("terms").title("Terms & policies")])
        ),
      S.listItem()
        .title("Site content")
        .child(
          S.list()
            .title("Site content")
            .items([S.documentTypeListItem("home").title("Home")])
        ),
      S.divider(),
      S.listItem()
        .title("Legacy")
        .child(
          S.list()
            .title("Legacy")
            .items([S.documentTypeListItem("project").title("Projects (old site)")])
        ),
    ]);
