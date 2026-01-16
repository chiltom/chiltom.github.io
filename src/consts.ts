// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Tom's Notes";
export const SITE_DESCRIPTION =
  "A collection of full-stack engineering insights from the field. Building systems, solving problems, sharing lessons learned.";

// Social links for header and footer
export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/chiltom", // TODO: Replace with your GitHub URL
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/thomas-childress", // TODO: Replace with your LinkedIn URL
    icon: "linkedin",
  },
  {
    name: "Email",
    url: "mailto:thomas.childress02@gmail.com", // TODO: Replace with your email
    icon: "email",
  },
  {
    name: "RSS",
    url: "/rss.xml",
    icon: "rss",
  },
];

// Helper function to calculate reading time (optional)
export function getReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}
