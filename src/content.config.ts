import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const faq = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faq" }),
  schema: z.object({
    question: z.string(),
    excerpt: z.string(),
    order: z.number(),
    // Path immagine principale. Vuoto = placeholder finché arrivano le foto da Compass In.
    image: z.string().optional().default(""),
    imageAlt: z.string().optional().default(""),
    // object-position del hero 16:9 (le foto sono verticali): centra la botola PERMALINE
    heroPosition: z.string().optional().default("50% 50%"),
    // Tipo di CTA in fondo all'articolo
    cta: z.enum(["supporto", "tutorial-posa"]).default("supporto"),
  }),
});

export const collections = { faq };
