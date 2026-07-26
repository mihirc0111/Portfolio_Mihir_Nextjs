import { defineType, defineField } from "sanity";

const iconOptions = [
  { title: "Code", value: "Code2" },
  { title: "Globe", value: "Globe" },
  { title: "Database", value: "Database" },
  { title: "Server", value: "Server" },
  { title: "Cloud", value: "Cloud" },
  { title: "Layers", value: "Layers" },
  { title: "Package", value: "Package" },
  { title: "CPU", value: "Cpu" },
  { title: "Palette", value: "Palette" },
  { title: "Wrench", value: "Wrench" },
  { title: "Lock", value: "Lock" },
  { title: "Test", value: "TestTube" },
  { title: "Search", value: "Search" },
  { title: "Zap", value: "Zap" },
  { title: "Bar Chart", value: "BarChart3" },
  { title: "Smartphone", value: "Smartphone" },
  { title: "Monitor", value: "Monitor" },
  { title: "Git", value: "GitBranch" },
  { title: "Rocket", value: "Rocket" },
  { title: "Sparkles", value: "Sparkles" },
  { title: "Brain", value: "Brain" },
  { title: "Bot", value: "Bot" },
  { title: "Workflow", value: "Workflow" },
  { title: "Shield", value: "Shield" },
  { title: "Gauge", value: "Gauge" },
  { title: "Settings", value: "Settings" },
  { title: "Cog", value: "Cog" },
];

const categoryOptions = [
  { title: "Frontend", value: "Frontend" },
  { title: "Backend / Database", value: "Backend / Database" },
  { title: "CMS", value: "CMS" },
  { title: "Analytics", value: "Analytics" },
  { title: "Deployment", value: "Deployment" },
  { title: "Styling", value: "Styling" },
  { title: "Tooling", value: "Tooling" },
  { title: "Testing", value: "Testing" },
  { title: "Other", value: "Other" },
];

function techItemFields() {
  return [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { layout: "dropdown", list: iconOptions },
      initialValue: "Code2",
    }),
    defineField({
      name: "version",
      title: "Version",
      type: "string",
      description: "Optional version number (e.g., 15, 19, 3.10)",
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
      description: "Official website URL",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ];
}

function simpleItemFields() {
  return [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 2,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: { layout: "dropdown", list: iconOptions },
      initialValue: "Code2",
    }),
    defineField({
      name: "website",
      title: "Website URL",
      type: "url",
    }),
    defineField({
      name: "order",
      title: "Order",
      type: "number",
      initialValue: 0,
    }),
  ];
}

export default defineType({
  name: "technicalOverview",
  title: "Technical Overview",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Page Title",
      type: "string",
      initialValue: "Technical Overview",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle",
      type: "string",
      description: "One-line intro for the page",
      initialValue: "How this portfolio was built and the technologies behind it.",
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            ...techItemFields(),
            defineField({
              name: "category",
              title: "Category",
              type: "string",
              options: { layout: "dropdown", list: categoryOptions },
              validation: (rule) => rule.required(),
              initialValue: "Frontend",
            }),
          ],
          preview: {
            select: { title: "name", subtitle: "category", media: "icon" },
          },
        },
      ],
      options: { sortable: true },
    }),
    defineField({
      name: "aiTools",
      title: "AI Tools & LLMs",
      type: "array",
      of: [
        {
          type: "object",
          fields: simpleItemFields(),
          preview: {
            select: { title: "name", subtitle: "description" },
          },
        },
      ],
      options: { sortable: true },
    }),
    defineField({
      name: "architecture",
      title: "Architecture",
      type: "array",
      of: [
        {
          type: "object",
          fields: simpleItemFields(),
          preview: {
            select: { title: "name", subtitle: "description" },
          },
        },
      ],
      options: { sortable: true },
    }),
    defineField({
      name: "highlights",
      title: "Key Highlights",
      type: "array",
      of: [
        {
          type: "object",
          fields: simpleItemFields(),
          preview: {
            select: { title: "name", subtitle: "description" },
          },
        },
      ],
      options: { sortable: true },
    }),
    defineField({
      name: "deployment",
      title: "Deployment",
      type: "array",
      of: [
        {
          type: "object",
          fields: simpleItemFields(),
          preview: {
            select: { title: "name", subtitle: "description" },
          },
        },
      ],
      options: { sortable: true },
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "subtitle" },
  },
});
