import { currentUser } from "@clerk/nextjs/server";
import { getUserIdentity } from "./layout";

const overviewCards = [
  {
    label: "Projects",
    value: "03",
    note: "Active client spaces",
  },
  {
    label: "Uptime",
    value: "99.9%",
    note: "Last 30 days",
  },
  {
    label: "Tasks",
    value: "12",
    note: "Queued for review",
  },
];

export default async function DashboardPage() {
  const user = await currentUser();
  const { displayName, emailAddress } = getUserIdentity(user);

  return (
    <div className="space-y-6 pb-8 pt-2 sm:space-y-8 sm:pt-6">
      <section
        id="overview"
        className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-xl sm:p-8"
      >
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.3em] text-text-muted">
              Overview
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
              Welcome back, {displayName}.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-6 text-text-muted sm:text-base">
              This dashboard gives you a clean place to review account details,
              monitor progress, and jump into the next action without hunting
              through the app.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-black/20 p-4 sm:min-w-72">
            <p className="text-xs uppercase tracking-[0.24em] text-text-muted">
              Current user
            </p>
            <div className="mt-4 flex items-center gap-4">
              {user?.imageUrl ? (
                <img
                  src={user.imageUrl}
                  alt={displayName}
                  className="h-14 w-14 rounded-2xl object-cover ring-1 ring-white/10"
                />
              ) : (
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/20 text-lg font-semibold text-white">
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
                <p className="text-sm text-text-muted">{emailAddress}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {overviewCards.map((card) => (
            <div
              key={card.label}
              className="rounded-3xl border border-white/10 bg-black/20 p-5"
            >
              <p className="text-sm text-text-muted">{card.label}</p>
              <p className="mt-4 text-3xl font-semibold text-text-primary">
                {card.value}
              </p>
              <p className="mt-2 text-sm text-text-muted">{card.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="profile" className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
          <p className="text-xs uppercase tracking-[0.24em] text-text-muted">
            Profile
          </p>
          <h3 className="mt-3 text-xl font-semibold text-text-primary">
            Account details
          </h3>
          <dl className="mt-5 space-y-4 text-sm">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
              <dt className="text-text-muted">Name</dt>
              <dd className="text-text-primary">{displayName}</dd>
            </div>
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-3">
              <dt className="text-text-muted">Email</dt>
              <dd className="text-text-primary">{emailAddress}</dd>
            </div>
            <div className="flex items-center justify-between gap-4">
              <dt className="text-text-muted">Clerk ID</dt>
              <dd className="max-w-[16rem] truncate text-text-primary">
                {user?.id || "Unavailable"}
              </dd>
            </div>
          </dl>
        </div>

        <div
          id="security"
          className="rounded-[1.75rem] border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <p className="text-xs uppercase tracking-[0.24em] text-text-muted">
            Security
          </p>
          <h3 className="mt-3 text-xl font-semibold text-text-primary">
            Session status
          </h3>
          <p className="mt-4 text-sm leading-6 text-text-muted">
            Your dashboard is protected by the root auth guard and the Next.js
            middleware route matcher, so unauthenticated visitors are redirected
            before the dashboard renders.
          </p>
          <div className="mt-6 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-200">
            Active and secure
          </div>
        </div>
      </section>
    </div>
  );
}