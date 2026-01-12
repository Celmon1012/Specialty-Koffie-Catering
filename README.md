This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Optional: Enable Payload CMS

This project includes a ready-to-use Payload configuration that adds a `services` collection
and a `diensten` global (a group of services). The Payload setup is disabled by default; to enable:

1. Install Payload and a DB driver (MongoDB recommended):

```bash
npm install payload mongodb
```

2. Set the following environment variables:

```bash
export MONGODB_URI="your-mongo-uri"
export PAYLOAD_SECRET="a-long-secret"
```

3. Seed a client user (optional):

```bash
npx ts-node scripts/seed-client.ts
```

4. Start the app. You may need to mount Payload in a proper API route—see `app/api/payload/route.ts`.

When enabled, users with role `client` can create/update/delete `services` and update the `diensten` global.

