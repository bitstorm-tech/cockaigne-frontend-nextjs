import EmptyContent from "@/components/ui/EmptyContent";
import Link from "next/link";

type Props = {
  isLoggedIn: boolean;
};

export default function UserFavoriteDealerList({ isLoggedIn }: Props) {
  return <EmptyContent>{isLoggedIn ? <NoDealsYet /> : <Register />}</EmptyContent>;
}

const Register = () => (
  <span>
    <Link href="/registration">
      <u>Registriere</u>
    </Link>{" "}
    dich jetzt und ...
  </span>
);

const NoDealsYet = () => <span>Du hast noch keinen Dealer als Favoriten gespeichert ... worauf wartest du!</span>;
