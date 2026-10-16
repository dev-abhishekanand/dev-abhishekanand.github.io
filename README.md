# Abhishek Anand — Official GitHub Portfolio Suite

This directory contains everything built to host your professional portfolio directly on **GitHub** with **zero external redirection**:

1. **GitHub Pages Web Portfolio** (`https://dev-abhishekanand.github.io`):
   - Fast, interactive, single-page application built with clean HTML5, Tailwind CSS, Lucide Icons, and Vanilla JS.
   - Features: Dark/Light mode toggle, Metrics counter, Skills Matrix with category filters, Career Experience timeline, Featured Projects showcase, and Direct Contact system.
   - Code files: `index.html`, `style.css`, `script.js`.

2. **GitHub Profile Portfolio README** (`https://github.com/dev-abhishekanand`):
   - Rich Markdown portfolio designed to render directly on your main GitHub profile page.
   - Includes dynamic typewriter banners, tech stack shields, featured project cards, professional timeline, live GitHub streak/language stats, and direct links to your web portfolio.
   - File: `PROFILE_README.md`.

---

## 🚀 How to Publish Both in 2 Minutes

### Step 1: Launch Your GitHub Pages Web Portfolio (`dev-abhishekanand.github.io`)

1. Go to GitHub and create a **new public repository** named exactly:
   ```
   dev-abhishekanand.github.io
   ```
2. In your terminal inside this folder (`/Users/abhishekanand/Downloads/Github Portfolio`), run:
   ```bash
   ./deploy.sh
   git push -u origin main
   ```
3. That's it! GitHub Pages automatically enables itself for repositories named `<username>.github.io`. Your website will be live at:
   👉 **`https://dev-abhishekanand.github.io`**

---

### Step 2: Set Up Your GitHub Profile Portfolio (`github.com/dev-abhishekanand`)

1. Go to GitHub and create a **new public repository** named exactly:
   ```
   dev-abhishekanand
   ```
   *(GitHub will show a banner saying: "You found a secret! dev-abhishekanand/dev-abhishekanand is a ✨special✨ repository that you can use to add a README.md to your GitHub profile.")*
2. Check the box **"Add a README file"** (or push `PROFILE_README.md` as `README.md`).
3. Copy the contents of [`PROFILE_README.md`](./PROFILE_README.md) into that repository's `README.md` and commit.
4. Anyone visiting **`https://github.com/dev-abhishekanand`** will immediately see your complete portfolio!
