
# MediaShare

**Your memories, kept in good company.**

MediaShare is an open-source platform designed for those who value privacy and aesthetics. Built with the T3 Stack, it allows you to create private "Vaults" where you can share high-resolution media with your inner circle.

## 🚀 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org) (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Prisma ORM (PostgreSQL)
- **Auth:** NextAuth.js / Auth.js (Google OAuth)
- **Uploads:** UploadThing (Direct-to-S3)

## 🛠️ Getting Started

### 1. Clone the repo
  
```bash
git clone [https://github.com/yourusername/mediashare.git](https://github.com/yourusername/mediashare.git)
cd mediashare

```

### 2. Environment Variables

Create a `.env` file in the root and add your keys:

```env
DATABASE_URL="your-db-url"
AUTH_SECRET="your-secret"
AUTH_GOOGLE_ID="your-id"
AUTH_GOOGLE_SECRET="your-secret"
UPLOADTHING_SECRET="your-secret"
UPLOADTHING_APP_ID="your-id"
```

### 3. Install & Run

```bash
npm install
npx prisma db push
npm run dev
```

## 📁 Project Structure

- `/src/app`: Next.js App Router (Pages & API routes)
- `/src/components`: Reusable UI (Navbar, MediaGrid, Modals)
- `/src/styles`: Tailwind v4 Global CSS & Theme variables
- `/src/server`: Server-side logic, Prisma client, and Auth configuration

## 📜 License

This project is licensed under the **MIT License**. Feel free to fork, experiment, and build upon it.

**Built with intention. Shared with privacy.**
