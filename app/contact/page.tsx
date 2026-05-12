import Link from "next/link";

export const metadata = {
  title: "Contact — Landly",
  description: "Contact sales or support at Landly.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-900 text-white">
      <section className="mx-auto max-w-4xl px-6 py-24">
        <h1 className="text-3xl font-bold">Contact Sales</h1>
        <p className="mt-4 text-gray-300">Reach out to our sales team for enterprise plans or questions.</p>

        <div className="mt-6 space-y-4">
          <p className="text-sm">Email: <a href="mailto:sales@landly.example" className="text-accent">sales@landly.example</a></p>
          <p className="text-sm">Or visit our <Link href="/" className="underline">help center</Link>.</p>
        </div>
      </section>
    </main>
  );
}
