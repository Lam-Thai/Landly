import { currentUser } from "@clerk/nextjs/server";

export type DashboardUser = Awaited<ReturnType<typeof currentUser>>;

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
