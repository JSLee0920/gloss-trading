import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Gloss",
  description: "Redirecting you to sign in.",
};

export default function Home() {
  redirect("/login");
}
