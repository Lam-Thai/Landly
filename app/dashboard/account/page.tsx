import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Account — Landly",
  description: "View and manage dashboard account settings.",
};

export default function AccountPage() {
  return (
    <div className="space-y-4 rounded-4xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-text-muted">
          Account
        </p>
        <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary">
          Manage your account
        </h2>
      </div>

      <p className="max-w-2xl text-sm leading-6 text-text-muted sm:text-base">
        This page is now routed from the dashboard sidebar and can host profile,
        billing, and security settings without returning a 404.
      </p>
    </div>
  );
}