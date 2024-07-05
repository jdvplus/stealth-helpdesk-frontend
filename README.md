# Stealth Startup: Full Stack Engineering Exercise

## App Structure

- Home page: `/`
  - Ticket Submission Form: `/submit-a-request`
  - Admin Panel: `/admin-panel`

## Components

This application leverages [`shadcn/ui`](https://ui.shadcn.com/)'s component library for a unified user interface.

All files in `./src/components/ui` were imported into the project via shadcn's CLI.

## API

The data-fetching frontend modules make HTTP requests to a Node.js/Express app separately deployed via Vercel.

## Getting Started

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

**NOTE**: For the backend API calls to work properly within a local environment, you will need to add an `.env` file to the root folder of this project on your local machine. A key `NEXT_PUBLIC_API_URL` should be added to this file, whose value will be a URL string of the backend deployment hosted on Vercel. This environment variable has intentionally been hidden for safety & security.

Once set up, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Now open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

(This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.)
