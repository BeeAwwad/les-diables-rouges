import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center bg-primary-100">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold text-primary-400">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-primary-400">
          Page Not Found
        </h2>
        <p className="mb-8 text-primary-700">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center text-base font-medium hover:text-primary-100 underline hover:bg-primary-300 text-primary-300"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
