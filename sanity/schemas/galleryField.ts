import { defineField } from "sanity";

export const MAX_EXTRA_PHOTOS = 4;

export const galleryField = defineField({
  name: "gallery",
  title: "More photos",
  type: "array",
  description:
    "Optional extra photos. Visitors can browse up to 5 images including the main photo.",
  options: { layout: "grid" },
  of: [
    {
      type: "image",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    },
  ],
  validation: (Rule) => Rule.max(MAX_EXTRA_PHOTOS),
});
