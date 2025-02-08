import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">404</h1>
        <h2 className="mb-4 text-2xl font-semibold text-gray-700">
          Page Not Found
        </h2>
        <p className="mb-8 text-gray-600">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white hover:bg-blue-700"
        >
          Go back home
        </Link>
      </div>
    </div>
  );
}
