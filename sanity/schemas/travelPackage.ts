import { defineField, defineType } from "sanity";
import { galleryField } from "./galleryField";
import { InstantImageInput } from "../components/InstantImageInput";

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
      options: {
        source: "name",
        maxLength: 96,
        slugify: (input: string) =>
          input
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, ""),
      },
      description: "URL path. Use lowercase letters, numbers and hyphens only — no spaces (e.g. tanzania-safari).",
      validation: (Rule) =>
        Rule.required().custom((value: { current?: string } | undefined) => {
          const current = value?.current?.trim() || "";
          if (!current) return "Slug is required";
          if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(current)) {
            return "Use lowercase letters, numbers and hyphens only. Example: tanzania-safari";
          }
          return true;
        }),
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
      options: { hotspot: false },
      components: { input: InstantImageInput },
      validation: (Rule) => Rule.required(),
    }),
    galleryField,
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
      name: "pricing",
      title: "Price",
      type: "string",
      description:
        "Optional. Shown on the package page, e.g. “From USD 2,450 per person sharing”. Leave empty to hide pricing.",
    }),
    defineField({
      name: "pricingNote",
      title: "Pricing notes",
      type: "text",
      // @ts-ignore
      rows: 3,
      description:
        "Optional extra detail under the price (season, what is included, per person vs per vehicle, etc.).",
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
