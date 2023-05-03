import Link from "next/link";

export default function LegalFooter() {
  return (
    <section className="flex justify-around gap-2 text-xs">
      <Link href="/imprint">Impressum</Link>
      <Link href="/terms">AGB</Link>
      <Link href="/privacy">Datenschutz</Link>
    </section>
  );
}
