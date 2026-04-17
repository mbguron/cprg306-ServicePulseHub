# Creating a Separate Layout for Login/Signup Pages

## Overview

Next.js 13+ supports route groups and nested layouts, which allow you to create different layouts for different sections of your app. Here's how to do it for login/signup pages.

## Step 1: Create a Route Group

Create a new folder structure to group your auth pages:

```
app/
├── (auth)/
│   ├── layout.js          ← Separate layout for auth pages
│   ├── login/
│   │   └── page.js
│   ├── register/
│   │   └── page.js
│   └── forgot-password/
│       └── page.js
├── (main)/
│   ├── layout.js          ← Layout for main pages
│   ├── page.js
│   └── services/
│       └── page.js
├── layout.js              ← Root layout
└── globals.css
```

## Step 2: Create Auth Layout

Create `app/(auth)/layout.js`:

```javascript
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ServicePulse Hub - Authentication",
  description: "Login and signup for ServicePulse Hub",
};

export default function AuthLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased`}
    >
      <body className="h-screen">{children}</body>
    </html>
  );
}
```

## Step 3: Create Main Layout

Create `app/(main)/layout.js`:

```javascript
import { Geist, Geist_Mono } from "next/font/google";
import NavBar from "@/components/layouts/NavBar";
import Footer from "@/components/layouts/Footer";
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ServicePulse Hub",
  description: "Digital Device Repair Service",
};

export default function MainLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-screen antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-1 overflow-y-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

## Step 4: Update Root Layout

Update `app/layout.js` (optional - can be minimal):

```javascript
export const metadata = {
  title: "ServicePulse Hub",
  description: "Digital Device Repair Service",
};

export default function RootLayout({ children }) {
  return children;
}
```

## Step 5: Move and Update Your Pages

### Move login page to auth group:

- From: `app/login/page.js`
- To: `app/(auth)/login/page.js`

### Move register page to auth group:

- From: `app/register/page.js`
- To: `app/(auth)/register/page.js`

### Move main page to main group:

- From: `app/page.js`
- To: `app/(main)/page.js` (or keep at root, both work)

## Key Benefits

✅ **Separate Styling**: Auth pages won't show navbar/footer
✅ **Different Metadata**: Each group can have different titles/descriptions
✅ **Clean Organization**: Better code organization and maintainability
✅ **Flexible Layouts**: Easy to add more route groups later
✅ **Route Groups Don't Affect URL**: `(auth)` doesn't appear in URLs

## URL Examples

After setup, your URLs will be:

- `https://yoursite.com/login` → `app/(auth)/login/page.js`
- `https://yoursite.com/register` → `app/(auth)/register/page.js`
- `https://yoursite.com/` → `app/(main)/page.js` or `app/page.js`
- `https://yoursite.com/services` → `app/(main)/services/page.js`

## Alternative: Simple Conditional Layout

If you prefer keeping everything in one structure, you can conditionally render in the root layout:

```javascript
import { usePathname } from "next/navigation";
import NavBar from "@/components/layouts/NavBar";
import Footer from "@/components/layouts/Footer";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname.startsWith("/login") || pathname.startsWith("/register");

  return (
    <html>
      <body className="min-h-screen flex flex-col">
        {!isAuthPage && <NavBar />}
        <main className="flex-1">{children}</main>
        {!isAuthPage && <Footer />}
      </body>
    </html>
  );
}
```

## Recommended Approach

Use **Route Groups** (Step 1-5) because:

- Cleaner separation of concerns
- Different metadata per layout
- Better performance
- More scalable as app grows
- Professional app structure
