import { UTApi } from "uploadthing/server";

export const utapi = new UTApi({
  apiUrl: process.env.UPLOADTHING_SECRET
});