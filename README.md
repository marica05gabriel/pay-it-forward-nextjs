# Commands:

```bash
# Install Dependencies
npm i
# Start development server
npm run dev
# Creating optimized production build
npm run build
```

# Issues

1. Warning in `global.css` "Unknown rule at @tailwind"
   - Installed "Tailwind CSS IntelliSense" v0.10.5
   - Added the following to the settings.json of VS Code local workspace (`./vscode/settings.json`)
   ```json
   {
     "files.associations": {
       "*.css": "tailwindcss"
     },
     "editor.quickSuggestions": {
       "strings": "on"
     },
     "tailwindCSS.includeLanguages": {
       "plaintext": "html"
     }
   }
   ```
   - See https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss#recommended-vs-code-settings

## NexjJs

- We use app router, instead of pages router.

## Styles

- Use Hero Icons project by tailwind labs if needed
  - https://github.com/tailwindlabs/heroicons
  - https://heroicons.com/
- Use clsx to toggle class names: https://github.com/lukeed/clsx

====================================================================================================
============================================= Generated ============================================

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

# Notes

- installed thirdweb using `npm install thirdweb` -> v5.0.3
- npm i @thirdweb-dev/react @thirdweb-dev/sdk
- npm i pino-pretty ? idk what/s this
- Created a react context fo keeping third web clinet and chann (not sure if needed though
- create a client component where wrapping the child with the context for third web client, chain and so on
- Be careful at .env -> need to add NEXT_PUBLIC prefix to be exposed on client !!!
- wrap the component with ThirdWebProvider as well after initializing the client
- npm i react-query
- import query client from `@tanstack/react-query` !!! See: `https://github.com/TanStack/query/issues/4933#issuecomment-1430925282`
  Otherwize you'll get "Unhandled Runtime Error - Error: No QueryClient set, use QueryClientProvider to set one"
