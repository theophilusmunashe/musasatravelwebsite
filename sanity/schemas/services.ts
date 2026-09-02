import { defineField, defineType } from "sanity";
import { galleryField } from "./galleryField";

const stringList = (name: string, title: string, required = true) =>
  defineField({
    name,
    title,
    type: "array",
    // @ts-ignore
    of: [{ type: "string" }],
    validation: required ? (Rule) => Rule.required().min(1) : undefined,
  });

const imageField = defineField({
  name: "image",
  title: "Image",
  type: "image",
  options: { hotspot: true },
  // @ts-ignore
  fields: [{ name: "alt", title: "Alt text", type: "string" }],
  validation: (Rule) => Rule.required(),
});

const preview = {
  select: { title: "name", subtitle: "tagline", media: "image" },
};

export const activity = defineType({
  name: "activity",
  title: "Activity",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Adventure", value: "adventure" },
          { title: "Wildlife", value: "wildlife" },
          { title: "Culture", value: "culture" },
          { title: "Water", value: "water" },
          { title: "Aerial", value: "aerial" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    imageField,
    galleryField,
    defineField({ name: "duration", title: "Duration", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "groupSize", title: "Group size", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "price", title: "Price label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "priceNum", title: "Price (number)", type: "number", validation: (Rule) => Rule.required().min(0) }),
    defineField({ name: "rating", title: "Rating", type: "number", initialValue: 4.9, validation: (Rule) => Rule.min(0).max(5) }),
    defineField({ name: "reviews", title: "Reviews", type: "number", initialValue: 0 }),
    defineField({ name: "difficultyLabel", title: "Difficulty", type: "string", initialValue: "Easy" }),
    defineField({
      name: "difficultyColor",
      title: "Difficulty colour class",
      type: "string",
      options: {
        list: [
          { title: "Easy (green)", value: "text-green-400" },
          { title: "Moderate (amber)", value: "text-amber-400" },
          { title: "Hard (orange)", value: "text-orange-400" },
          { title: "Extreme (red)", value: "text-red-400" },
        ],
      },
      initialValue: "text-green-400",
    }),
    defineField({ name: "badge", title: "Badge", type: "string" }),
    stringList("highlights", "Highlights"),
    defineField({ name: "description", title: "Description", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "displayOrder", title: "Display order", type: "number", initialValue: 0 }),
  ],
  preview,
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "displayOrder", direction: "asc" }] }],
});

export const stay = defineType({
  name: "stay",
  title: "Accommodation",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Musasa Exclusive", value: "musasa" },
          { title: "Luxury", value: "luxury" },
          { title: "Safari lodge", value: "safari-lodge" },
          { title: "Eco lodge", value: "eco-lodge" },
          { title: "Boutique", value: "boutique" },
          { title: "Resort", value: "resort" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    imageField,
    galleryField,
    defineField({ name: "location", title: "Location", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "country", title: "Country", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "price", title: "Price label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "priceNum", title: "Price (number)", type: "number", validation: (Rule) => Rule.required().min(0) }),
    defineField({ name: "rating", title: "Rating", type: "number", initialValue: 4.9 }),
    defineField({ name: "reviews", title: "Reviews", type: "number", initialValue: 0 }),
    defineField({ name: "nights", title: "Nights", type: "string" }),
    defineField({ name: "guests", title: "Guests", type: "string" }),
    defineField({ name: "badge", title: "Badge", type: "string" }),
    stringList("amenities", "Amenities"),
    stringList("highlights", "Highlights"),
    defineField({ name: "description", title: "Description", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "displayOrder", title: "Display order", type: "number", initialValue: 0 }),
  ],
  preview,
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "displayOrder", direction: "asc" }] }],
});

export const itinerary = defineType({
  name: "itinerary",
  title: "Sample itinerary",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string", validation: (Rule) => Rule.required() }),
    imageField,
    galleryField,
    defineField({ name: "days", title: "Days", type: "number", validation: (Rule) => Rule.required().integer().positive() }),
    defineField({
      name: "filter",
      title: "Length",
      type: "string",
      options: {
        list: [
          { title: "Short", value: "short" },
          { title: "Medium", value: "medium" },
          { title: "Extended", value: "extended" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    stringList("destinations", "Destinations"),
    defineField({ name: "price", title: "Price label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "priceNum", title: "Price (number)", type: "number", validation: (Rule) => Rule.required().min(0) }),
    defineField({ name: "groupSize", title: "Group size", type: "string" }),
    defineField({ name: "badge", title: "Badge", type: "string" }),
    stringList("highlights", "Highlights"),
    defineField({ name: "description", title: "Description", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "displayOrder", title: "Display order", type: "number", initialValue: 0 }),
  ],
  preview,
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "displayOrder", direction: "asc" }] }],
});

export const tourGuide = defineType({
  name: "tourGuide",
  title: "Tour guide",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "role", title: "Role", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "specialty",
      title: "Specialty",
      type: "string",
      options: {
        list: [
          { title: "Wildlife", value: "wildlife" },
          { title: "Adventure", value: "adventure" },
          { title: "Culture", value: "culture" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    imageField,
    galleryField,
    defineField({ name: "experience", title: "Experience", type: "string" }),
    stringList("languages", "Languages"),
    defineField({ name: "rating", title: "Rating", type: "number", initialValue: 4.9 }),
    defineField({ name: "reviews", title: "Reviews", type: "number", initialValue: 0 }),
    defineField({ name: "badge", title: "Badge", type: "string" }),
    stringList("certifications", "Certifications"),
    stringList("highlights", "Highlights"),
    defineField({ name: "bio", title: "Bio", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "displayOrder", title: "Display order", type: "number", initialValue: 0 }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "image" } },
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "displayOrder", direction: "asc" }] }],
});

export const transfer = defineType({
  name: "transfer",
  title: "Shuttle / transfer",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "slug", title: "Slug", type: "slug", options: { source: "name", maxLength: 96 }, validation: (Rule) => Rule.required() }),
    defineField({ name: "tagline", title: "Tagline", type: "string", validation: (Rule) => Rule.required() }),
    defineField({
      name: "type",
      title: "Type",
      type: "string",
      options: {
        list: [
          { title: "Airport", value: "airport" },
          { title: "Cross-border", value: "cross-border" },
          { title: "Private", value: "private" },
          { title: "Group", value: "group" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    imageField,
    galleryField,
    defineField({ name: "price", title: "Price label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "priceNum", title: "Price (number)", type: "number", validation: (Rule) => Rule.required().min(0) }),
    defineField({ name: "duration", title: "Duration", type: "string" }),
    defineField({ name: "capacity", title: "Capacity", type: "string" }),
    defineField({ name: "badge", title: "Badge", type: "string" }),
    stringList("amenities", "Amenities"),
    stringList("routes", "Routes"),
    stringList("highlights", "Highlights"),
    defineField({ name: "description", title: "Description", type: "text", validation: (Rule) => Rule.required() }),
    defineField({ name: "displayOrder", title: "Display order", type: "number", initialValue: 0 }),
  ],
  preview,
  orderings: [{ title: "Display order", name: "orderAsc", by: [{ field: "displayOrder", direction: "asc" }] }],
});
