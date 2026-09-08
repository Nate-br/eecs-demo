# Ethiopian Enterprise Cyber Secure (EECS)

**EECS** is a B2B SaaS platform designed specifically for Ethiopian enterprises (banks, telcos, government agencies) to train their employees on cybersecurity best practices and actively test their resilience against modern threats like phishing and social engineering.

This project was built to demonstrate the core user experience, localization, and technical architecture of the platform through a Minimum Viable Product (MVP).

---

## What Was Built (The MVP)

The MVP is a fully functional, localized frontend and mock-backend application built to showcase the platform's vision without requiring paid third-party infrastructure.

### Tech Stack
* **Framework:** Next.js 15 (App Router), React 19
* **Styling:** Tailwind CSS, `shadcn/ui`, Framer Motion
* **Analytics:** Recharts
* **State & Data:** Next.js Server Actions, Local JSON File Database (`src/lib/db.ts`)

### Core Features
1. **Full Localization:** 
   * Complete support for both **English** and **Amharic**, natively integrated via Next.js middleware and locale dictionaries.
2. **Role-Based Portals:**
   * **Employee Portal:** A clean dashboard for employees to take mandatory training courses. Includes mock video players with anti-cheat timers (enforcing watch time before quizzes), and dynamic HTML **Certificate Generation** upon passing.
   * **Admin Portal:** An enterprise dashboard for IT teams to monitor departmental compliance scores, completion rates, and manage users.
3. **Phishing Simulator Engine:**
   * A simulated end-to-end phishing campaign pipeline. 
   * Admins can launch a campaign targeting specific departments. 
   * The platform generates unique tracking links that direct employees to a pixel-perfect clone of a Microsoft 365 login page.
   * If an employee submits credentials, the platform logs the vulnerability (without storing the password), redirects them to an educational "Oops" page, and updates the Admin Dashboard's live vulnerability charts in real-time.
4. **Mock Database & Authentication:**
   * A custom, lightweight JWT session manager (`src/lib/auth.ts`) utilizing the Edge-compatible `jose` library.
   * A Prisma-like wrapper around a local JSON file to simulate database interactions with CRUD operations and Row-Level Security mock constraints.

---

## What Will Be Built (Production Readiness)

To transition this MVP into a real-world, scalable SaaS product, the following infrastructure and backend integrations are on the roadmap:

### 1. Robust Authentication & Data Security
* **Real Database:** Migrate from the local JSON file to a managed PostgreSQL database (e.g., Supabase or AWS RDS) using **Prisma** or **Drizzle ORM**.
* **Multi-Tenant Isolation:** Implement strict Postgres Row-Level Security (RLS) to ensure absolute data isolation between different enterprise clients.
* **Authentication:** Integrate NextAuth.js or Supabase Auth, enforcing Mandatory 2FA for Admin accounts.

### 2. Live Phishing Infrastructure
* **Email Dispatch:** Integrate **AWS SES**, **SendGrid**, or **Resend** to securely dispatch thousands of real phishing simulation emails.
* **Domain Spoofing:** Register lookalike domains to make the phishing simulations highly realistic while remaining legally compliant.

### 3. Scalable Content Delivery
* **Video Hosting:** Integrate **Mux** or **AWS S3/CloudFront** to securely host and stream the video training modules.
* **Real Certificates:** Implement a serverless PDF generation library (like `react-pdf` or Puppeteer) to email high-quality printable certificates.

### 4. DevOps & Observability
* **Automated Reminders:** Implement background job processing (via Inngest or Supabase Edge Functions) to automatically email employees who are falling behind on compliance.
* **Monitoring:** Integrate **Sentry** for comprehensive error tracking and **PostHog** for user behavior analytics.
