#!/usr/bin/env node

/**
 * Create GitHub issues for the Landly project
 * Run with: node scripts/create-github-issues.js
 */

const { execSync } = require("child_process");

// Auto-detect repo
const REPO = execSync(
  'gh repo view --json nameWithOwner -q .nameWithOwner'
).toString().trim();

console.log(`\n📦 Using repo: ${REPO}\n`);

// Labels to create
const LABELS = [
  { name: "setup", color: "0075ca" },
  { name: "feature", color: "e4e669" },
  { name: "auth", color: "d93f0b" },
  { name: "ai", color: "1d76db" },
  { name: "storage", color: "e11d48" },
  { name: "ui", color: "f9d0c4" },
];

// Issues to create
const ISSUES = [
  // SETUP
  {
    title: "Setup: Create Neon project and get connection string",
    body: "Go to neon.tech, create a free project, copy the PostgreSQL connection string and add it to .env as DATABASE_URL with ?sslmode=require",
    labels: ["setup"],
  },
  {
    title: "Setup: Install and configure Prisma with PostgreSQL",
    body: "Install prisma and @prisma/client, run prisma init with postgresql provider, configure /lib/prisma.ts as a singleton client with Next.js hot reload support",
    labels: ["setup"],
  },
  {
    title: "Setup: Define User model in Prisma schema",
    body: "Add User model to schema.prisma with fields: id (cuid), clerkId (String unique), email (String unique), name (String optional), createdAt, updatedAt",
    labels: ["setup"],
  },
  {
    title: "Setup: Add Prisma scripts to package.json",
    body: "Add db:push, db:generate, and db:studio scripts. Run db:push after Neon is connected to sync schema.",
    labels: ["setup"],
  },
  {
    title: "Setup: Add .env and .env.local to .gitignore",
    body: "Make sure both .env and .env.local are in .gitignore before committing any keys",
    labels: ["setup"],
  },

  // AUTH
  {
    title: "Auth: Install Clerk and add env vars",
    body: "Install @clerk/nextjs and svix. Add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY, CLERK_SECRET_KEY, CLERK_WEBHOOK_SECRET, and the 4 CLERK redirect URL vars to .env.local. Get keys from dashboard.clerk.com",
    labels: ["auth"],
  },
  {
    title: "Auth: Wrap root layout with ClerkProvider",
    body: "Import ClerkProvider from @clerk/nextjs and wrap the children in /app/layout.tsx",
    labels: ["auth"],
  },
  {
    title: "Auth: Configure middleware to protect routes",
    body: "Create middleware.ts at root using clerkMiddleware(). Protect all /dashboard/* routes. Keep public: /, /sign-in/*, /sign-up/*, /api/webhooks/*",
    labels: ["auth"],
  },
  {
    title: "Auth: Create sign-in and sign-up pages",
    body: "Create /app/sign-in/[[...sign-in]]/page.tsx and /app/sign-up/[[...sign-up]]/page.tsx using Clerk's <SignIn /> and <SignUp /> components, centered on the page",
    labels: ["auth"],
  },
  {
    title: "Auth: Create /lib/auth.ts server helpers",
    body: "Export getCurrentUser() using auth() from @clerk/nextjs/server. Export requireAuth() that redirects to /sign-in if no userId found.",
    labels: ["auth"],
  },
  {
    title: "Auth: Create Clerk webhook route",
    body: "Create /app/api/webhooks/clerk/route.ts. Verify signature with svix and CLERK_WEBHOOK_SECRET. Handle user.created (create Prisma User), user.updated (update name/email), user.deleted (delete User). Export runtime = 'nodejs' and dynamic = 'force-dynamic'",
    labels: ["auth"],
  },
  {
    title: "Auth: Test Clerk webhook locally with ngrok",
    body: "Install ngrok, run ngrok http 3000, add the forwarding URL to Clerk dashboard under Webhooks pointing to /api/webhooks/clerk. Test sign up flow end to end.",
    labels: ["auth"],
  },

  // AI
  {
    title: "AI: Install Anthropic SDK and add API key",
    body: "Install @anthropic-ai/sdk. Add ANTHROPIC_API_KEY to .env.local. Get free key from console.anthropic.com — free tier has rate limits so keep maxTokens low (default 500)",
    labels: ["ai"],
  },
  {
    title: "AI: Create /lib/claude.ts client singleton",
    body: "Create a server-only Anthropic client singleton. Export getCompletion(systemPrompt, userMessage, maxTokens) that calls claude-sonnet-4-20250514 and returns the text string. Wrap in try/catch with typed error.",
    labels: ["ai"],
  },
  {
    title: "AI: Create /api/ai POST route",
    body: "POST route that accepts { prompt, systemPrompt? }. Validate prompt max 2000 chars. Require auth via requireAuth(). Call getCompletion() and return { result: string }. Add TODO comment for rate limiting per userId before prod.",
    labels: ["ai"],
  },

  // PDF
  {
    title: "PDF: Install react-pdf renderer",
    body: "Install @react-pdf/renderer. Note this is server-only — never import in client components.",
    labels: ["setup"],
  },
  {
    title: "PDF: Create DocumentTemplate component",
    body: "Create /components/pdf/DocumentTemplate.tsx using react-pdf primitives (Document, Page, Text, View). Props: title, content, authorName, date. Include header, content body, and footer with page number. Use StyleSheet.create() for all styles.",
    labels: ["setup"],
  },
  {
    title: "PDF: Create /lib/pdf.ts with generatePDF helper",
    body: "Export generatePDF(data: DocumentData): Promise<Buffer> using renderToBuffer() with DocumentTemplate. Export the DocumentData type. Keep server-only.",
    labels: ["setup"],
  },
  {
    title: "PDF: Create /api/pdf POST route",
    body: "POST accepts { title, content, authorName }. Require auth via requireAuth(). Validate inputs. Call generatePDF() and return response with Content-Type: application/pdf and Content-Disposition: attachment headers.",
    labels: ["setup"],
  },

  // STORAGE
  {
    title: "R2: Create Cloudflare account and R2 bucket",
    body: "Sign up at cloudflare.com (free). Go to R2, create a new bucket. Note the account ID from the R2 page. Optionally enable public access for the bucket if serving files publicly.",
    labels: ["storage"],
  },
  {
    title: "R2: Create R2 API token and add env vars",
    body: "In R2 > Manage API Tokens, create a token with Object Read & Write permissions. Add R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME, R2_PUBLIC_URL to .env.local",
    labels: ["storage"],
  },
  {
    title: "R2: Install AWS SDK and create /lib/storage.ts",
    body: "Install @aws-sdk/client-s3 and @aws-sdk/s3-request-presigner. Create /lib/storage.ts (server-only) with S3Client pointed at R2 endpoint with region 'auto'. Export uploadFile(), deleteFile(), getPresignedUploadUrl().",
    labels: ["storage"],
  },
  {
    title: "R2: Create /api/upload POST route",
    body: "Accepts multipart FormData with a file field. Require auth. Validate file type (pdf, png, jpg, webp only) and size (max 10MB). Generate unique key: uploads/{clerkUserId}/{timestamp}-{filename}. Upload via uploadFile(), return { url, key }.",
    labels: ["storage"],
  },

  // UI
  {
    title: "UI: Create animation primitives and useScrollAnimation hook",
    body: "Create /lib/animations.ts with Framer Motion variants (fadeUp, fadeIn, staggerChildren, scaleIn). Create /hooks/useScrollAnimation.ts using useInView. Create <AnimatedSection> wrapper component in /components/ui/AnimatedSection.tsx.",
    labels: ["ui"],
  },
  {
    title: "UI: Build Hero section",
    body: "Full viewport Hero (100dvh). Large gradient headline animated word-by-word. Two CTA buttons. Animated gradient orb background. Scroll indicator with bounce animation. Noise texture overlay.",
    labels: ["ui"],
  },
  {
    title: "UI: Build sticky Navbar",
    body: "Fixed top navbar. Transparent to frosted glass (backdrop-blur + bg-black/60 + border) on scroll. Logo left, nav links center, CTA right. Mobile hamburger with Framer Motion slide-down menu. Fade-down entrance animation on load.",
    labels: ["ui"],
  },
  {
    title: "UI: Build scroll-animated Features section",
    body: "3-column card grid (collapses to 1 on mobile). Each card uses AnimatedSection with stagger. Cards: icon, title, description. Hover effect: border brightens to accent, slight scale. Gradient divider above section.",
    labels: ["ui"],
  },
  {
    title: "UI: Polish pass — responsive, fonts, SEO, animations",
    body: "Page-level enter animation on layout. Verify Geist font applied correctly. Add scroll-behavior: smooth. Add SEO metadata in layout.tsx (title, description, og:image). Full responsive check mobile to desktop. Remove all Next.js default boilerplate.",
    labels: ["ui"],
  },
  {
    title: "UI: Build protected Dashboard page",
    body: "Create /app/dashboard/layout.tsx with requireAuth() guard. Basic dashboard home with user info from Clerk (name, email, avatar). Sidebar or top nav for dashboard navigation.",
    labels: ["ui"],
  },
];

async function run() {
  try {
    // Step 1: Create labels
    console.log("🏷️  Creating labels...");
    for (const label of LABELS) {
      try {
        execSync(
          `gh label create "${label.name}" --color "${label.color}" --force --repo ${REPO}`,
          { stdio: "pipe" }
        );
        console.log(`  ✓ Label "${label.name}"`);
      } catch (err) {
        // Label might already exist, that's ok
      }
    }

    // Step 2: Fetch all existing issue titles
    console.log("\n📋 Fetching existing issues...");
    let existingIssues = [];
    try {
      const output = execSync(
        `gh issue list --repo ${REPO} --state all --limit 200 --json title`,
        { encoding: "utf-8" }
      );
      existingIssues = JSON.parse(output).map((issue) => issue.title);
    } catch (err) {
      console.log("  (No existing issues found)");
    }

    const existingTitles = new Set(existingIssues);
    console.log(`  Found ${existingTitles.size} existing issues\n`);

    // Step 3: Check all issues and log results before creating anything
    console.log("🔍 Checking issues for duplicates...");
    const toCreate = [];
    const toSkip = [];

    for (const issue of ISSUES) {
      if (existingTitles.has(issue.title)) {
        toSkip.push(issue);
      } else {
        toCreate.push(issue);
      }
    }

    console.log(`  ${toCreate.length} will be created`);
    console.log(`  ${toSkip.length} already exist\n`);

    // Step 4: Create new issues
    if (toCreate.length > 0) {
      console.log("✨ Creating new issues...\n");
      for (const issue of toCreate) {
        const labels = issue.labels.map((l) => `--label "${l}"`).join(" ");
        try {
          execSync(
            `gh issue create --title "${issue.title}" --body "${issue.body}" ${labels} --repo ${REPO}`,
            { stdio: "pipe" }
          );
          console.log(`✅ Created: ${issue.title}\n`);
        } catch (err) {
          console.error(`❌ Failed to create: ${issue.title}`);
          console.error(`   ${err.message}\n`);
        }
      }
    }

    // Step 5: Log skipped issues
    if (toSkip.length > 0) {
      console.log("⏭️  Skipped (already exist):\n");
      for (const issue of toSkip) {
        console.log(`  • ${issue.title}`);
      }
      console.log();
    }

    // Step 6: Summary
    console.log(
      `✨ Done — ${toCreate.length} created, ${toSkip.length} skipped\n`
    );
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
}

run();
