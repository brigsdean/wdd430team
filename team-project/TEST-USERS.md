# Test User Credentials

## Overview
This document contains test user accounts for development and testing purposes.

## Test Users

### User 1 - Basic User
- **Email:** `john@example.com`
- **Password:** `password123`
- **Name:** John Doe
- **Type:** User + Seller
- **Business:** Clay Master Studio

### User 2 - Basic User
- **Email:** `jane@example.com`
- **Password:** `password123`
- **Name:** Jane Smith
- **Type:** User + Seller
- **Business:** Textile Arts Co.

## How to Use

### Option 1: Seed the Database (if you have DATABASE_URL set up)

Run this command to populate your database with test data:

```powershell
cd team-project
npx prisma db push
npx prisma db seed
```

### Option 2: Create an Account

Visit `/create-account` and create a new account manually.

## What Gets Created

When you run the seed script, you'll get:

- **2 Users** (john@example.com, jane@example.com)
- **2 Sellers** (Clay Master Studio, Textile Arts Co.)
- **3 Categories** (Pottery, Textiles, Woodwork)
- **3 Products** (Ceramic Bowl, Textile Blanket, Wooden Spoon)
- **2 Reviews** on products

## Security Note

⚠️ **IMPORTANT:** These are test credentials only! Do not use `password123` in production. These accounts should only be used in development environments.
