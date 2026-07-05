import { defineType, defineField } from "sanity";

export default defineType({
  name: "book",
  title: "Books",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "author",
      title: "Author",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "rating",
      title: "Rating (out of 5)",
      type: "number",
      validation: (rule) => rule.min(0).max(5),
    }),
    defineField({
      name: "review",
      title: "Review / Notes",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { title: "Currently Reading", value: "reading" },
          { title: "Read", value: "read" },
          { title: "Want to Read", value: "want-to-read" },
        ],
      },
      initialValue: "read",
    }),
    defineField({
      name: "startDate",
      title: "Start Date",
      type: "date",
    }),
    defineField({
      name: "endDate",
      title: "End Date",
      type: "date",
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
      title: "Priority",
      name: "priority",
      by: [{ field: "orderPriority", direction: "asc" }],
    },
    {
      title: "Title",
      name: "title",
      by: [{ field: "title", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "author",
      media: "coverImage",
    },
  },
});
