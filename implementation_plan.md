# Transition to Database-Backed Articles

This plan details the steps to fully transition the application to saving and fetching articles from the Neon PostgreSQL database instead of the hardcoded `mockArticles`.

## User Review Required

> [!WARNING]
> We will be pushing the new `Article` schema to your Neon database. This will create the `Article` table if it doesn't currently exist.

The article categories available for users to select when writing an article will be strictly the three you have defined in the system:
1. Philosophy
2. History
3. Geography

## Proposed Changes

### Database Layer
- Push the existing Prisma schema to the Neon database (`Article` table).

### Article Creation Flow (New Feature)
#### [NEW] `app/write/page.tsx`
- Create a new page with a form to write articles.
- Include fields: Title, Summary, Content, Cover Image URL.
- Include a dropdown for Category (Philosophy, History, Geography).
- The form will use a Server Action to save the article.

#### [NEW] `app/actions/article.ts`
- Create a Next.js Server Action called `createArticle`.
- Fetch the user's name and image from their session to populate the `author` and `authorImage` fields.
- Insert the new article into the database using Prisma.
- Revalidate the home page to show the new article.

### Fetching Articles (Refactoring)
#### [MODIFY] `app/lib/articles.ts`
- Refactor `getArticles` to query from the Prisma database using `prisma.article.findMany()`.
- Sort articles by `createdAt` in descending order.

#### [MODIFY] `app/page.tsx`
- Convert the `Home` component to `async`.
- Await the new asynchronous `getArticles()` function.

#### [MODIFY] `app/category/[slug]/page.tsx`
- Await the new asynchronous `getArticles(slug)` function.

## Verification Plan

### Manual Verification
- We will navigate to the `/write` page and fill out the form.
- Upon submission, we should be redirected to the home page, and the newly created article should appear at the top of the feed list.
- We'll also verify that clicking on one of the categories filters the feed with the newly added articles matching that category.
