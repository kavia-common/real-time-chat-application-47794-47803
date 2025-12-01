import React from "react";

export default function NotFound() {
  return (
    <main className="container-centered">
      <section className="card-surface p-8 max-w-xl w-full text-center" role="alert" aria-live="assertive">
        <h1 className="text-2xl font-semibold text-gray-900">404 – Page Not Found</h1>
        <p className="mt-2 text-gray-600">The page you’re looking for doesn’t exist.</p>
      </section>
    </main>
  );
}
