import { defineType, defineField } from "sanity";

export default defineType({
  name: "achievement",
  title: "Achievements",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "date",
      options: {
        dateFormat: "YYYY-MM-DD",
      },
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Certification", value: "certification" },
          { title: "Award", value: "award" },
          { title: "Achievement", value: "achievement" },
          { title: "Course", value: "course" },
        ],
      },
      initialValue: "achievement",
    }),
    defineField({
      name: "issuer",
      title: "Issuer / Organization",
      type: "string",
    }),
    defineField({
      name: "certificateUrl",
      title: "Certificate URL",
      type: "url",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      description: "Lucide icon name (e.g., Award, Trophy, BookOpen)",
      initialValue: "Award",
    }),
    defineField({
      name: "orderPriority",
      title: "Order Priority",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: "Date",
      name: "dateDesc",
      by: [{ field: "date", direction: "desc" }],
    },
    {
      title: "Priority",
      name: "priority",
      by: [{ field: "orderPriority", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "issuer",
    },
  },
});
