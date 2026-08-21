import { defineField, defineType } from "sanity";

export default defineType({
  name: "travelPackage",
  title: "Travel Package",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "region",
      title: "Region",
      type: "string",
      options: {
        list: [
          { title: "Zimbabwe", value: "zimbabwe" },
          { title: "Southern Africa", value: "southern-africa" },
          { title: "Beach & Island", value: "beach" },
          { title: "Ultra Luxury", value: "luxury" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      // @ts-ignore — Sanity image alt field
      fields: [
        defineField({
          name: "alt",
          title: "Alt text",
          type: "string",
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "days",
      title: "Duration (days)",
      type: "number",
      validation: (Rule) => Rule.required().integer().positive(),
    }),
    defineField({
      name: "destinations",
      title: "Destinations",
      type: "array",
      // @ts-ignore
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "groupSize",
      title: "Group size",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "badge",
      title: "Badge",
      type: "string",
      description: "Optional pill on the card, e.g. Best Seller",
    }),
    defineField({
      name: "includes",
      title: "Included",
      type: "array",
      // @ts-ignore
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      // @ts-ignore
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      // @ts-ignore
      rows: 6,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating",
      type: "number",
      initialValue: 4.9,
      validation: (Rule) => Rule.min(0).max(5),
    }),
    defineField({
      name: "displayOrder",
      title: "Display order",
      type: "number",
      initialValue: 0,
      description: "Lower numbers appear first on /packages",
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "region",
      media: "image",
      days: "days",
    },
    prepare({ title, subtitle, media, days }) {
      return {
        title,
        subtitle: [subtitle, days ? `${days} days` : null].filter(Boolean).join(" · "),
        media,
      };
    },
  },
  orderings: [
    {
      title: "Display order",
      name: "displayOrderAsc",
      by: [{ field: "displayOrder", direction: "asc" }],
    },
  ],
});
