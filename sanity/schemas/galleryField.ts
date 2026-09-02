import { defineField } from "sanity";
import { InstantGalleryInput } from "../components/InstantGalleryInput";
import { MAX_EXTRA_PHOTOS } from "@/lib/content-images";

export const galleryField = defineField({
  name: "gallery",
  title: "More photos",
  type: "array",
  description:
    "Optional extra photos. Drop files in — they appear immediately. Visitors can browse up to 5 images including the main photo.",
  options: { layout: "grid" },
  components: { input: InstantGalleryInput },
  of: [
    {
      type: "image",
      options: { hotspot: false },
    },
  ],
  validation: (Rule) => Rule.max(MAX_EXTRA_PHOTOS),
});
