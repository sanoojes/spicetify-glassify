import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Glassify Theme",
  description:
    "A sleek, glass-like Spicetify theme. Documentation for installation, customization, and configuration.",
  head: [
    ["link", { rel: "icon", href: "/favicon.ico" }],
    ["meta", { name: "author", content: "Sanooj E Sanish" }],
    ["meta", { property: "og:url", content: "https://spicetify-glassify.sanooj.uk" }],
    [
      "script",
      {
        src: "https://static.cloudflareinsights.com/beacon.min.js",
        "data-cf-beacon": '{"token": "e7d1e12433864af29912cffd4a1d3697"}',
        defer: "true",
      },
    ],
  ],
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [{ text: "Guide", link: "/getting-started" }],

    sidebar: [
      {
        text: "Glassify Theme",
        items: [
          { text: "Overview", link: "/" },
          { text: "Installation", link: "/getting-started" },
          { text: "Screenshots", link: "/screenshots" },
          { text: "Uninstallation", link: "/uninstallation" },
          { text: "Credits", link: "/credits" },
        ],
      },
    ],

    socialLinks: [
      { icon: "gitlab", link: "https://gitlab.com/sanoojes/spicetify-glassify" },
      {
        icon: "discord",
        link: "https://discord.gg/Jvw8KFe3xY",
      },
    ],
  },
});
