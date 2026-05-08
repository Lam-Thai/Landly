import type { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { requireAuth } from "@/lib/auth";

type DashboardUser = Awaited<ReturnType<typeof currentUser>>;

export function getUserIdentity(user: DashboardUser) {
  const displayName =
    user?.fullName ||
    [user?.firstName, user?.lastName].filter(Boolean).join(" ") ||
    "Member";
  const emailAddress =
    user?.primaryEmailAddress?.emailAddress ||
    user?.emailAddresses[0]?.emailAddress ||
    "No email available";

  return { displayName, emailAddress };
}

const navItems = [
  { label: "Overview", href: "#overview" },
  { label: "Profile", href: "#profile" },
  { label: "Security", href: "#security" },
];

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  await requireAuth();

  const user = await currentUser();
  const { displayName, emailAddress } = getUserIdentity(user);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.14),transparent_32%),linear-gradient(180deg,#0a0a0a_0%,#09090b_100%)] text-text-primary">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-4 sm:px-6 lg:flex-row lg:px-8">
        <aside className="mb-4 rounded-3xl border border-white/10 bg-black/30 p-5 backdrop-blur-xl lg:mb-0 lg:w-80 lg:shrink-0 lg:pr-4">
          <div className="flex items-center justify-between gap-4 lg:block">
            <div>
              <p className="text-xs uppercase tracking-[0.32em] text-text-muted">
                Landly
              </p>
              <h1 className="mt-2 text-2xl font-semibold">Dashboard</h1>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-right lg:mt-8 lg:text-left">
              <p className="text-sm font-medium text-text-primary">
                {displayName}
              </p>
              <p className="mt-1 text-xs text-text-muted">{emailAddress}</p>
            </div>
          </div>

          <nav className="mt-8 flex gap-2 overflow-x-auto lg:flex-col lg:gap-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="inline-flex min-w-max items-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-text-muted transition-colors hover:border-white/20 hover:bg-white/10 hover:text-text-primary"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs uppercase tracking-[0.24em] text-text-muted">
              Account
            </p>
            <div className="mt-4 flex items-center gap-3">
              {user?.imageUrl ? (
                <Image
                  src={user.imageUrl}
                  alt={displayName}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-2xl object-cover ring-1 ring-white/10"
                />
              ) : (
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/20 text-sm font-semibold text-white">
                  {displayName
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()}
                </div>
              )}
              <div>
                <p className="font-medium text-text-primary">{displayName}</p>
                <p className="text-sm text-text-muted">Authenticated session</p>
              </div>
            </div>
          </div>
        </aside>

        <main className="flex-1 lg:pl-6">{children}</main>
      </div>
    </div>
  );
}