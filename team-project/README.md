# Handcrafted Haven

A web application platform for artisans and crafters

## Team Members

- Johnathan Babb
- Briggs Dean
- Fabian Ricardo Betancourt

## Project Overview

Handcrafted Haven serves as a virtual marketplace for crafters and artisans to showcase and sell their unique handcrafted items. The platform focuses on fostering community, supporting local artisans, and promoting sustainable consumption by connecting talented creators with customers who appreciate handmade products.

## Technology Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Node.js
- **Database**: PostgreSQL
- **Deployment**: Vercel
- **Project Management**: GitHub Boards

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

## Project Structure

```
team-project/
├── app/                 # Next.js app router
├── src/components/      # React components
├── public/             # Static assets
├── schema.sql          # Database schema
├── user-stories.md     # User stories and sprint planning
└── README.md           # This file
```

## Features (Current Sprint)

- User authentication and account management
- Product browsing with materials and creation details
- Search functionality with craft type filtering
- Shopping cart system
- Review and rating system
- Product comparison feature
- Dark mode support
- FAQs/Help screen
- Returns process

## Development Workflow

1. Check GitHub Boards for assigned tasks
2. Create feature branch for your task
3. Make your changes
4. Test your changes locally
5. Create pull request
6. Get code review from team member
7. Merge to main branch

## Current Status

- [x] Phase 1: Database schema and user stories completed
- [ ] Phase 2: Authentication system setup
- [ ] Phase 3: Core features development
- [ ] Phase 4: UI/UX polish and deployment

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
