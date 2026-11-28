# Setup guide

## 1. Create your GitHub profile repository

Create a **public** repository whose name exactly matches your GitHub username. Its root `README.md` becomes your profile README.

Upload the contents of this package to that repository, including the hidden `.github` directory.

## 2. Configure your details

Edit `config/profile-config.json`:

- `profile.githubUsername`: your GitHub username.
- `contact.email`: an email address you are comfortable publishing.
- `contact.whatsapp`: your WhatsApp number in international format, digits only.
- `technologies`: your technology list.
- `learning`: your current learning focus.
- `projects.public`: add public project details when ready.
- `theme`: customize the colors.

Never commit passwords, API keys, tokens, or private contact information to a public repository.

## 3. Generate SVG assets

Install Node.js 18 or newer, then run from the repository root:

```bash
node scripts/generate-assets.js
```

The generator uses Node.js built-in modules only; no npm installation is needed. It updates text, colors, and technology labels without replacing the animation effects. Commit the generated SVG files.

## 4. Configure README links

Replace these placeholders in `README.md`:

- `YOUR_GITHUB_USERNAME`
- `YOUR_EMAIL`
- `YOUR_WHATSAPP_NUMBER`

For WhatsApp, use the full international number with country code, without `+`, spaces, or punctuation. If you do not want a contact method public, remove its link and badge rather than leaving a placeholder.

The JSON configuration customizes the animated banner and technology ticker while preserving their animation effects. The ticker supports up to 8 technology labels. README Markdown links must still be updated manually.

## 5. Enable the contribution snake

The workflow is `.github/workflows/snake.yml`.

1. Push the workflow to your profile repository.
2. Open the repository's **Actions** tab and enable Actions if prompted.
3. Run **Generate contribution snake** manually once.
4. If publishing is denied, open Settings → Actions → General → Workflow permissions and allow read and write permissions.
5. Confirm that the workflow creates the `output` branch.
6. The README image uses `YOUR_GITHUB_USERNAME/YOUR_GITHUB_USERNAME/output/github-contribution-grid-snake.svg`; replace both username placeholders with your actual username.

The workflow also runs daily. It uses the repository owner as the GitHub username.

## 6. Statistics services

The README uses GitHub Readme Stats and Streak Stats, which are third-party services. They can be rate-limited, cached, or temporarily unavailable. They may not show every private contribution or repository statistic. Remove or replace a card if a service becomes unreliable.

## 7. Mobile and animation notes

The README uses fluid-width images, short text blocks, and avoids wide tables. Check the published profile in the GitHub mobile app and a desktop browser.

GitHub sanitizes README content and does not execute custom JavaScript or CSS. SVG animation support can vary between clients and caching layers. The profile remains readable when animations are static or external services are unavailable.


## Animation notes

The local SVG assets include animated gradient strokes, ambient glow, moving scan light, pulsing nodes, a looping technology ticker, and animated mindset/closing accents. GitHub sanitizes SVG content and rendering can vary by client; check the profile on both desktop and mobile after publishing. The README uses local SVGs so the core visual effects do not depend on a third-party animation host.
