import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "qonxqseo",
  dataset: "production",
  apiVersion: "2024-10-01",
  useCdn: false,
});
