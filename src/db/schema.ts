import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar
} from "drizzle-orm/pg-core";

export const projectStatus = pgEnum("project_status", [
  "draft",
  "published",
  "archived"
]);

export const messageStatus = pgEnum("message_status", [
  "new",
  "read",
  "archived"
]);

export const projects = pgTable(
  "projects",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 160 }).notNull(),
    slug: varchar("slug", { length: 180 }).notNull(),
    summary: text("summary").notNull(),
    problem: text("problem"),
    solution: text("solution"),
    role: varchar("role", { length: 160 }),
    year: varchar("year", { length: 32 }),
    status: projectStatus("status").default("draft").notNull(),
    featured: boolean("featured").default(false).notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    coverImageUrl: text("cover_image_url"),
    coverImageAlt: varchar("cover_image_alt", { length: 240 }),
    stack: jsonb("stack")
      .$type<string[]>()
      .default(sql`'[]'::jsonb`)
      .notNull(),
    links: jsonb("links")
      .$type<{ live?: string; github?: string; caseStudy?: string }>()
      .default(sql`'{}'::jsonb`)
      .notNull(),
    content: jsonb("content")
      .$type<Array<{ heading: string; body: string }>>()
      .default(sql`'[]'::jsonb`)
      .notNull(),
    seoTitle: varchar("seo_title", { length: 180 }),
    seoDescription: varchar("seo_description", { length: 240 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .notNull()
  },
  (table) => ({
    slugIdx: uniqueIndex("projects_slug_idx").on(table.slug)
  })
);

export const projectImages = pgTable("project_images", {
  id: uuid("id").defaultRandom().primaryKey(),
  projectId: uuid("project_id")
    .references(() => projects.id, { onDelete: "cascade" })
    .notNull(),
  imageUrl: text("image_url").notNull(),
  alt: varchar("alt", { length: 240 }).notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const skills = pgTable(
  "skills",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 120 }).notNull(),
    category: varchar("category", { length: 80 }).notNull(),
    iconUrl: text("icon_url"),
    color: varchar("color", { length: 32 }).default("#22D3EE").notNull(),
    sortOrder: integer("sort_order").default(0).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull()
  },
  (table) => ({
    nameIdx: uniqueIndex("skills_name_idx").on(table.name)
  })
);

export const projectSkills = pgTable(
  "project_skills",
  {
    projectId: uuid("project_id")
      .references(() => projects.id, { onDelete: "cascade" })
      .notNull(),
    skillId: uuid("skill_id")
      .references(() => skills.id, { onDelete: "cascade" })
      .notNull()
  },
  (table) => ({
    projectSkillIdx: uniqueIndex("project_skills_project_skill_idx").on(
      table.projectId,
      table.skillId
    )
  })
);

export const experiences = pgTable("experiences", {
  id: uuid("id").defaultRandom().primaryKey(),
  role: varchar("role", { length: 160 }).notNull(),
  organization: varchar("organization", { length: 160 }).notNull(),
  period: varchar("period", { length: 80 }).notNull(),
  description: text("description").notNull(),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const testimonials = pgTable("testimonials", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  company: varchar("company", { length: 160 }),
  quote: text("quote").notNull(),
  avatarUrl: text("avatar_url"),
  sortOrder: integer("sort_order").default(0).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const contactMessages = pgTable("contact_messages", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  message: text("message").notNull(),
  status: messageStatus("status").default("new").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const mediaAssets = pgTable("media_assets", {
  id: uuid("id").defaultRandom().primaryKey(),
  label: varchar("label", { length: 160 }).notNull(),
  url: text("url").notNull(),
  alt: varchar("alt", { length: 240 }),
  mimeType: varchar("mime_type", { length: 120 }),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const adminAuditLogs = pgTable("admin_audit_logs", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorEmail: varchar("actor_email", { length: 180 }).notNull(),
  action: varchar("action", { length: 120 }).notNull(),
  entityType: varchar("entity_type", { length: 120 }).notNull(),
  entityId: uuid("entity_id"),
  metadata: jsonb("metadata")
    .$type<Record<string, unknown>>()
    .default(sql`'{}'::jsonb`)
    .notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull()
});

export const projectsRelations = relations(projects, ({ many }) => ({
  images: many(projectImages),
  projectSkills: many(projectSkills)
}));

export const projectImagesRelations = relations(projectImages, ({ one }) => ({
  project: one(projects, {
    fields: [projectImages.projectId],
    references: [projects.id]
  })
}));

export const skillsRelations = relations(skills, ({ many }) => ({
  projectSkills: many(projectSkills)
}));

export const projectSkillsRelations = relations(projectSkills, ({ one }) => ({
  project: one(projects, {
    fields: [projectSkills.projectId],
    references: [projects.id]
  }),
  skill: one(skills, {
    fields: [projectSkills.skillId],
    references: [skills.id]
  })
}));
