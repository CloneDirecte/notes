import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="center montserrat">
      <h1>Page n'existe pas.</h1>
      <Link href="/">
        <a className="goBack">Retournez à la page de login</a>
      </Link>
    </div>
  );
}
