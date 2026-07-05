import { defineType, defineField } from "sanity";

export default defineType({
  name: "skillCategory",
  title: "Skill Categories",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Category Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "skills",
      title: "Skills",
      type: "array",
      of: [{ type: "string" }],
      options: {
        layout: "tags",
      },
      validation: (rule) => rule.required(),
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
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "skills",
    },
  },
});
