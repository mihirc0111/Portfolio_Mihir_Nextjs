import { defineType, defineField } from "sanity";

export default defineType({
  name: "hero",
  title: "Hero",
  type: "document",
  fields: [
    defineField({
      name: "greeting",
      title: "Greeting",
      type: "string",
      description: "e.g., 'Hi, I'm'",
      initialValue: "Hi, I'm",
    }),
    defineField({
      name: "name",
      title: "Your Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "e.g., 'Software Developer'",
      initialValue: "Software Developer",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ctaPrimary",
      title: "Primary CTA Text",
      type: "string",
      initialValue: "View My Work",
    }),
    defineField({
      name: "ctaSecondary",
      title: "Secondary CTA Text",
      type: "string",
      initialValue: "Download Resume",
    }),
    defineField({
      name: "profileImage",
      title: "Profile Image (Full Body Photo)",
      type: "image",
      description: "Upload your full-body or portrait photo here. Recommended aspect ratio: 3:4",
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
    },
  },
});
