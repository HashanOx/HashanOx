#!/usr/bin/env node
/**
 * Safely customize the animated SVG assets from profile-config.json.
 * Keeps the hand-authored animation timelines and layout intact.
 * Usage: node scripts/generate-assets.js
 * Requires Node.js 18+. Uses built-in modules only.
 */
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const configPath = path.join(root, "config", "profile-config.json");
const bannerPath = path.join(root, "assets", "banner.svg");
const showcasePath = path.join(root, "assets", "animations", "technology-showcase.svg");

function fail(message) {
  console.error(`[asset-generator] ${message}`);
  process.exit(1);
}
if (!fs.existsSync(configPath)) fail("Missing config/profile-config.json");
let config;
try { config = JSON.parse(fs.readFileSync(configPath, "utf8")); }
catch (error) { fail(`Could not parse profile-config.json: ${error.message}`); }
for (const file of [bannerPath, showcasePath]) {
  if (!fs.existsSync(file)) fail(`Missing animated asset: ${path.relative(root, file)}`);
}
const xml = (value) => String(value ?? "").replace(/[<>&"']/g, (c) => ({
  "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;", "'": "&apos;"
}[c]));
const profile = config.profile || {};
const theme = config.theme || {};
let banner = fs.readFileSync(bannerPath, "utf8");
let showcase = fs.readFileSync(showcasePath, "utf8");

banner = banner
  .replace("HASHAN CHAMUDITHA", xml(profile.name || "Your Name"))
  .replace("FULL-STACK DEVELOPER", xml(profile.title || "Developer").toUpperCase())
  .replace("Learn by building. Understand by experimenting. Improve through iteration.", xml(profile.heroTagline || "Learn by building. Understand by experimenting. Improve through iteration."));

const replacements = [
  ["#A78BFA", theme.primary], ["#22D3EE", theme.secondary], ["#F4F4F8", theme.text],
  ["#070710", theme.background]
];
for (const [from, to] of replacements) {
  if (typeof to === "string" && to.trim()) {
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    banner = banner.replace(new RegExp(escaped, "g"), xml(to));
    showcase = showcase.replace(new RegExp(escaped, "g"), xml(to));
  }
}
const defaults = ["JavaScript", "TypeScript", "HTML", "CSS", "Python", "C++", "Bash", "Docker"];
const technologies = Array.isArray(config.technologies) ? config.technologies : defaults;
if (technologies.length > 8) fail("The animated ticker supports up to 8 technology labels; reduce config.technologies to 8 or fewer.");
for (let i = 0; i < defaults.length; i++) {
  const from = `>${defaults[i]}</text>`;
  const to = technologies[i] ? `>${xml(technologies[i])}</text>` : `> </text>`;
  showcase = showcase.replace(from, to);
}
fs.writeFileSync(bannerPath, banner);
fs.writeFileSync(showcasePath, showcase);
console.log("Updated profile text, theme, and technology labels while preserving SVG animations.");
