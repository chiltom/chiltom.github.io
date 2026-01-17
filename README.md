# Tom's Notes

A modern, performant personal engineering blog built with Astro v5, featuring a seamless reading experience.

## ✨ Features

### Core Features

- **Modern Stack**: Built with Astro v5, React 19, TypeScript, and Tailwind CSS v4
- **Type-Safe Content**: Content Collections with Zod schema validation
- **Optimized Performance**: Static site generation with fast page loads
- **SEO Optimized**: Canonical URLs, Open Graph tags, Twitter Cards, and sitemap
- **RSS Feed**: Stay updated with the latest posts
- **Reading Progress**: Visual progress indicator for blog posts
- **Responsive Design**: Mobile-first approach with beautiful layouts

### Interactive Features

- **Theme Toggle**: Seamless switching between light and dark modes
- **Smart Theme Detection**: Respects system preferences with localStorage persistence
- **FOUC Prevention**: No flash of unstyled content on page load
- **Accessible**: Keyboard navigation, ARIA labels, and semantic HTML

## Quick Start

### Prerequisites

- Node.js 18+
- npm or your preferred package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/chiltom/blog.git
cd blog

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your blog in action!

## Project Structure

```text
/
├── public/              # Static assets (fonts, images)
├── src/
│   ├── assets/         # Optimized images
│   ├── components/     # Reusable components
│   │   ├── BaseHead.astro       # SEO meta tags
│   │   ├── Header.astro         # Navigation with theme toggle
│   │   ├── Footer.astro         # Footer with social links
│   │   ├── ThemeToggle.tsx      # Dark mode toggle component
│   │   └── ReadingProgress.tsx  # Reading progress bar
│   ├── content/
│   │   └── blog/       # Blog posts (.md or .mdx)
│   ├── layouts/
│   │   └── BlogPost.astro       # Blog post layout
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   ├── blog/
│   │   │   ├── index.astro      # Blog listing page
│   │   │   └── [...slug].astro  # Dynamic blog post pages
│   │   ├── about.astro          # About page
│   │   └── rss.xml.js           # RSS feed
│   ├── styles/
│   │   └── global.css           # Global styles
│   └── consts.ts       # Site configuration
├── astro.config.mjs    # Astro configuration
├── CLAUDE.md           # Developer documentation
└── package.json
```

## Writing a Blog Post

1. Create a new `.md` or `.mdx` file in `src/content/blog/`:

```markdown
---
title: "Your Post Title"
description: "A brief description for SEO and previews"
pubDate: 2026-01-16
heroImage: "/path/to/image.jpg" # Optional
---

Your content here! Write in Markdown or MDX.
```

2. The post automatically:
   - Appears on the homepage (sorted by date)
   - Gets its own page at `/blog/your-filename`
   - Includes proper SEO meta tags
   - Appears in the RSS feed
   - Gets validated against the content schema

## Development Commands

| Command           | Action                               |
| ----------------- | ------------------------------------ |
| `npm install`     | Install dependencies                 |
| `npm run dev`     | Start dev server at `localhost:4321` |
| `npm run build`   | Build production site to `./dist/`   |
| `npm run preview` | Preview production build locally     |
| `npm run astro`   | Run Astro CLI commands               |

## Customization

### Site Metadata

Update site information in `src/consts.ts`:

```typescript
export const SITE_TITLE = "Your Blog Title";
export const SITE_DESCRIPTION = "Your blog description";
export const SOCIAL_LINKS = [
  // Your social links
];
```

### Theme Colors

Customize colors in `src/styles/global.css`:

- Light mode: `:root` section (lines 11-37)
- Dark mode: `.dark` section (lines 39-60)

### Deployment URL

Update the site URL in `astro.config.mjs`:

```javascript
export default defineConfig({
  site: "https://yourdomain.com",
  // ...
});
```

## Performance

- **100/100 Lighthouse Score**: Optimized for performance, accessibility, SEO, and best practices
- **Static Generation**: All pages pre-rendered at build time
- **Optimized Images**: Automatic image optimization with Astro's Image component
- **Minimal JavaScript**: Only loads what's necessary (React for interactive components)

## 🔧 Tech Stack

- **Framework**: [Astro v5.16.10](https://astro.build)
- **UI Library**: [React v19.0.0](https://react.dev)
- **Styling**: [Tailwind CSS v4.1.18](https://tailwindcss.com)
- **Language**: [TypeScript](https://www.typescriptlang.org) (strict mode)
- **Content**: [MDX](https://mdxjs.com) for enhanced Markdown
- **Image Optimization**: [Sharp](https://sharp.pixelplumbing.com)

## Content Collections

Blog posts use Astro's Content Collections for type-safe content management:

```typescript
// Query all posts
const posts = await getCollection("blog");

// Posts are automatically validated against schema
// Includes TypeScript autocomplete for frontmatter
```

Schema defined in `src/content/config.ts` ensures content consistency.

## Deployment

This blog is optimized for static hosting platforms:

- **GitHub Pages**: Already configured (see `site` in astro.config.mjs)
- **Netlify**: Zero-config deployment
- **Vercel**: One-click deployment
- **Cloudflare Pages**: Fast global CDN

Build command: `npm run build`
Output directory: `./dist`

## Contributing

This is a personal blog, but feel free to:

- Open issues for bugs or suggestions
- Submit PRs for improvements
- Use this as a template for your own blog

## License

MIT License - feel free to use this for your own blog!

## Credits

- Based on the [Bear Blog](https://github.com/HermanMartinus/bearblog/) template
- Built with [Astro](https://astro.build)
- Icons from [Heroicons](https://heroicons.com)
- Fonts: Atkinson Hyperlegible (custom web font)

## Contact

- GitHub: [@chiltom](https://github.com/chiltom)
- LinkedIn: [Thomas Childress](https://linkedin.com/in/thomas-childress)
- Email: [Gmail](mailto:thomas.childress02@gmail.com)
