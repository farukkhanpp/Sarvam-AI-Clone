import bodyHtml from "@/lib/bodyHtml";

// The homepage markup (and its Astro islands) is served as-is so every
// bundled script keeps working exactly as in the original build.
export default function Home() {
  return (
    <div
      id="sarvam-root"
      style={{ display: "contents" }}
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: bodyHtml }}
    />
  );
}
