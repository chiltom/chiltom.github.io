# CLAUDE.md

This file is intended for future instances of Claude Code working in this repository. It provides context about the codebase architecture, patterns, and workflows that require understanding multiple files.

## Project Overview

**Tom's Notes** - A personal engineering blog built with Astro v5, based on the Bear Blog template with customizations.

**Tech Stack:**
- Astro v5.1.6 (Static Site Generator)
- TypeScript (strict mode enabled)
- Tailwind CSS v4.0.14
- React v19.0.0
- MDX for enhanced Markdown content

**Site Metadata** (src/consts.ts):
- Title: "Tom's Notes"
- Description: "A Collection of Random Engineering Notes"

## Development Commands

```bash
npm run dev        # Start dev server at http://localhost:4321
npm run build      # Build for production to ./dist/
npm run preview    # Preview production build locally
npm run astro      # Access Astro CLI directly
```

## Architecture Overview

### Content Collections System

Blog posts are managed through Astro's Content Collections, providing type-safe content management:

**Location:** `src/content/blog/`

**File Format:** `.md` or `.mdx` files with frontmatter

**Required Frontmatter Fields:**
```yaml
---
title: string
description: string
pubDate: date (YYYY-MM-DD or Date object)
---
```

**Optional Fields:**
- `updatedDate: date` - Shows "Last updated" instead of publish date
- `heroImage: string` - Path to hero image (relative to public/ or assets/)

**Schema Definition:** src/content/config.ts defines Zod schemas that validate all frontmatter

**Querying Content:**
```typescript
import { getCollection } from 'astro:content';

const posts = await getCollection('blog');
// Returns type-safe array with validated frontmatter
// Posts sorted by pubDate (newest first) on index page
```

**Rendering:**
```typescript
const post = await entry.render();
const { Content } = post;
// <Content /> renders the Markdown/MDX content
```

### Routing & Pages

**File-based Routing:** All files in `src/pages/` become routes

**Key Routes:**
- `src/pages/index.astro` - Homepage with blog post list
- `src/pages/blog/[...slug].astro` - Dynamic blog post pages
- `src/pages/about.astro` - About page
- `src/pages/rss.xml.js` - RSS feed generator

**Dynamic Blog Routes:**
The `[...slug].astro` pattern uses `getStaticPaths()` to pre-render all blog posts at build time:
```typescript
export async function getStaticPaths() {
  const posts = await getCollection('blog');
  return posts.map((post) => ({
    params: { slug: post.slug },
    props: post,
  }));
}
```

### Component Architecture

**Core Layout Components:**

1. **BaseHead.astro** (src/components/BaseHead.astro)
   - Centralizes ALL SEO meta tags (title, description, Open Graph, Twitter cards)
   - Sets canonical URLs
   - Includes RSS feed link in `<head>`
   - Loads Google Fonts (Inter)
   - Takes props: `title`, `description`, `image` (optional)
   - Always use this in page `<head>` sections for consistent SEO

2. **BlogPost.astro** (src/layouts/BlogPost.astro)
   - Standard layout for all blog posts
   - Handles hero image display (if provided)
   - Formats publication/update dates
   - Wraps content in semantic `<article>` tags with proper structure
   - Props: `title`, `description`, `pubDate`, `updatedDate`, `heroImage`

3. **Header.astro & Footer.astro**
   - Persistent navigation with social links
   - Social icons for GitHub, LinkedIn, Email defined in consts.ts

4. **HeaderLink.astro**
   - Navigation links with automatic active state detection
   - Compares `Astro.url.pathname` to highlight current page

**Pattern:** Layouts (BlogPost.astro) use `<slot />` for content injection

### Styling System

**Tailwind CSS v4:**
- Integrated via `@tailwindcss/vite` plugin
- Import in astro.config.mjs as Vite plugin
- Utility-first CSS in component templates
- Configured for class-based dark mode using `@variant dark` directive

**Global Styles:** src/styles/global.css
- Bear Blog-inspired minimal aesthetic
- CSS custom properties for color theming (light + dark)
- Base typography styles for article content
- Responsive design defaults
- Dark mode configured with `.dark` class selector

**Styling Approaches:**
1. Tailwind utilities in component templates (preferred for layout)
2. Scoped `<style>` blocks in .astro files (component-specific styles)
3. Global CSS for base typography and theme variables

### Dark Mode Implementation

**Architecture:**
- Class-based dark mode using `.dark` class on `<html>` element
- System preference detection with localStorage override
- FOUC (Flash of Unstyled Content) prevention

**Key Files:**

1. **src/styles/global.css**
   - Line 9: `@variant dark (&:where(.dark, .dark *))` - Configures Tailwind v4 for class-based dark mode
   - Lines 39-60: Dark theme CSS variables (inverted colors, adjusted shadows)
   - Lines 275-322: Dark mode prose styles for blog content

2. **src/components/BaseHead.astro**
   - Lines 59-79: Inline script that runs before page render
   - Checks localStorage for saved theme preference
   - Falls back to system preference via `prefers-color-scheme` media query
   - Adds/removes `.dark` class on `<html>` element immediately

3. **src/components/ThemeToggle.tsx**
   - React component with state management for theme switching
   - Persists choice to localStorage
   - Detects system preference on mount
   - Shows sun/moon icon based on current theme
   - Fully accessible with ARIA labels and keyboard navigation

**Usage Pattern:**
All components use Tailwind's `dark:` variant for dark mode styles:
```astro
<div class="bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
  Content that adapts to theme
</div>
```

**Dark Mode Color Palette:**
- Backgrounds: `dark:bg-gray-950`, `dark:bg-gray-900`, `dark:bg-gray-800`
- Text: `dark:text-gray-100`, `dark:text-gray-300`, `dark:text-gray-400`
- Accents: `dark:text-blue-400`, `dark:bg-blue-900`
- Borders: `dark:border-gray-700`

**Integration Points:**
- Header: ThemeToggle component rendered with `client:only="react"`
- All pages: Body backgrounds, text colors, card backgrounds
- Blog posts: Prose styles, code blocks, blockquotes
- Interactive elements: Buttons, links, hover states

## Content Creation Workflow

### Adding a New Blog Post

1. Create a new `.md` or `.mdx` file in `src/content/blog/`
   - Filename becomes the URL slug (e.g., `my-post.md` → `/blog/my-post`)

2. Add required frontmatter:
```markdown
---
title: 'Your Post Title'
description: 'Brief description for SEO and previews'
pubDate: 2026-01-15
heroImage: '/blog-placeholder.jpg'  # Optional
---

Your content here...
```

3. The post automatically:
   - Appears on the homepage (sorted by date)
   - Gets its own page at `/blog/your-slug`
   - Includes proper SEO meta tags
   - Appears in RSS feed at `/rss.xml`
   - Gets validated against the schema

### Image Handling

**Two Approaches:**

1. **Optimized Images (Recommended):**
   - Place in `src/assets/` or `src/content/blog/assets/`
   - Import and use with Astro's `<Image>` component
   - Automatic optimization, responsive sizes, lazy loading

2. **Static Images:**
   - Place in `public/` directory
   - Reference with absolute paths: `/image.jpg`
   - Served as-is without optimization
   - Good for placeholder images or small assets

### MDX Capabilities

When using `.mdx` files, you can:
- Import and use React components directly in content
- Create interactive elements within blog posts
- Import other MDX files or components
- Use JavaScript expressions in content

## Configuration Files

### astro.config.mjs

**Key Settings:**
- `site: 'https://example.com'` - Base URL for canonical links (UPDATE THIS for production)
- Integrations: MDX, Sitemap, React, Tailwind (via Vite)
- Markdown configuration: syntax highlighting with Shiki

**When to Update:**
- Change `site` URL before deploying to production
- Add new integrations here
- Modify markdown rendering settings

### src/consts.ts

**Purpose:** Centralized configuration for site metadata and social links

**Contents:**
- `SITE_TITLE` - Appears in header, page titles, RSS feed
- `SITE_DESCRIPTION` - Default meta description, RSS feed description
- Social links array for header/footer

**When to Update:**
- Changing site branding
- Adding/removing social media links
- Updating contact information

### tsconfig.json

**Configuration:**
- `strict: true` - Strict TypeScript checking enabled
- `jsx: "react-jsx"` - React 19 JSX transform
- Path aliases: `@/*` maps to `src/*`
- Astro type references for editor support

## Key Patterns

### Content Collections Pattern

Content Collections provide type-safe content management:
1. Define schema in `src/content/config.ts`
2. Content validated at build time against schema
3. Full TypeScript autocomplete for frontmatter
4. Query with `getCollection('blog')`
5. Render with `await entry.render()`

**Benefit:** Catch content errors at build time, not runtime

### Static Site Generation

All pages are pre-rendered at build time:
- No server needed for hosting
- Fast page loads (static HTML)
- `getStaticPaths()` generates all dynamic routes during build
- Content changes require rebuild/redeploy

### SEO Best Practices

Every page should include BaseHead.astro in the `<head>`:
```astro
<head>
  <BaseHead title="Page Title" description="Page description" />
</head>
```

This ensures:
- Proper canonical URLs (based on `site` in astro.config.mjs)
- Open Graph tags for social sharing
- Twitter Card metadata
- Structured meta tags for search engines

### Component Communication

**Props Flow:**
- Astro components receive props via `Astro.props` or Astro frontmatter interface
- Layouts use `<slot />` for content injection
- React components (.tsx) use standard React props

**Data Flow:**
1. Content Collections → getCollection() → page component
2. Page component → layout via props
3. Layout → slot for content

### Image Optimization

Use Astro's built-in `<Image>` component for best performance:
```astro
import { Image } from 'astro:assets';
import myImage from '../assets/photo.jpg';

<Image src={myImage} alt="Description" />
```

Astro automatically:
- Generates multiple sizes
- Converts to optimal formats (WebP, AVIF)
- Adds width/height to prevent layout shift
- Implements lazy loading
