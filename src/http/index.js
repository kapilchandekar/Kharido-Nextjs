export const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "https://kharido-nextjs.vercel.app"
    : "http://localhost:3000";