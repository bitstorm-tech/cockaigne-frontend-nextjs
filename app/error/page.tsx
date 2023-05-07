import EmptyContent from "@/components/ui/EmptyContent";
import Link from "next/link";

export default function page() {
  return (
    <main className="flex flex-col items-center pt-10">
      <h1>Ooops</h1>
      <EmptyContent>Hier ist leider etwas schief gegangen, versuche es bitte später noch mal ...</EmptyContent>
      <Link className="mt-10" href="/">
        Zurück zur Startseite
      </Link>
    </main>
  );
}
