This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Intro

# Simple-App

**Simple-App** is a user management web application, including authentication, user statistics, and profile management.

## Features

### Authentication

- **Sign Up & Login:**
  - **Email & Password:** Users can sign up and log in using their email and a user-defined password. After registering, the user will receive an email verification link. To verify the email, simply click the link sent to their inbox. Once the link is clicked, the email will be verified, and they will be automatically logged into the dashboard
  - **Google OAuth:** Users can sign up and log in using their Google account, bypassing the need for email verification.
  - **Facebook OAuth:** Users can sign up and log in using their Facebook account, bypassing the need for email verification.

### Dashboard

Once logged in, users are redirected to a personalized dashboard where they can access the following:

- **User Profile:**

  - View their username and email.

- **User List:**

  - View a list of all users registered in the application, with the following details for each user:
    - **Sign-Up Timestamp:** The date and time when the user signed up.
    - **Login Count:** The number of times the user has logged in.
    - **Logout Timestamp:** The last time the user logged out.

- **User Statistics:**
  - **Total Registered Users:** The total number of users who have signed up.
  - **Active Sessions Today:** The total number of users with active sessions today.
  - **Average Active Sessions (Last 7 Days):** The average number of users with active sessions over the last 7 days.

### Profile Management

- **Reset Password:** Users can reset their password using the provided form. They need to input their old password, new password, and confirm the new password.
- **Update Username:** Users can change their username.
- **Logout:** Users can securely log out from the application.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
