# Deployment & Domain Guide for Vercel

This project is fully configured for deployment on Vercel. Since you have already linked your GitHub account with Vercel, the process will be automatic and seamless. We will also cover how to set up a custom, authentic domain for your portfolio.

## Step 1: Push Your Code to GitHub
Before deploying, make sure your latest code is pushed to your GitHub repository.

1. Open your terminal in the project folder.
2. Add all your recent changes:
   ```bash
   git add .
   ```
3. Commit the changes:
   ```bash
   git commit -m "Ready for Vercel deployment"
   ```
4. Push to your main branch:
   ```bash
   git push origin main
   ```

## Step 2: Deploy to Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click the black **"Add New..."** button in the top right corner and select **"Project"**.
3. Under "Import Git Repository", you will see a list of your GitHub repositories. Find this portfolio repository and click **"Import"**.
4. **Configure Project:**
   - **Project Name:** Choose a recognizable name (e.g., `chirag-sharma-portfolio`).
   - **Framework Preset:** Leave it as **Create React App** (Vercel detects this automatically).
   - **Root Directory:** Leave it as `./`.
   - **Build and Output Settings:** Leave default settings.
5. Click the **"Deploy"** button.
6. Wait 1-2 minutes for Vercel to build your app. Once finished, you will see a "Congratulations!" screen with your live deployment.

## Step 3: Make the URL Authentic (Custom Domain)
By default, Vercel gives you a URL like `chirag-sharma-portfolio.vercel.app`. While this is okay, a custom domain (like `chiragsharma.dev` or `chirag.com`) looks much more authentic and professional to recruiters and clients.

### Option A: Buy a Domain Directly Through Vercel (Easiest)
If you don't own a domain yet, buying one through Vercel is the fastest method because Vercel handles all the DNS configuration automatically.

1. From your project dashboard on Vercel, click **Settings** (top navigation bar).
2. On the left sidebar, click **Domains**.
3. In the input box, type the domain you want to buy (e.g., `chiragsharma.dev` or `chiragcodes.com`) and click **Add**.
4. Vercel will inform you that the domain is available to purchase. Follow the prompts to buy it.
5. Once purchased, Vercel will automatically link it to your project and generate an SSL certificate. Your authentic URL is instantly live!

### Option B: Use a Domain You Already Own (GoDaddy, Namecheap, etc.)
If you bought your domain elsewhere:

1. From your project dashboard on Vercel, click **Settings** > **Domains**.
2. Type in your existing domain (e.g., `chiragsharma.com`) and click **Add**.
3. Vercel will show an "Invalid Configuration" error message with instructions on how to verify it.
4. It will give you **Nameservers** (e.g., `ns1.vercel-dns.com` and `ns2.vercel-dns.com`).
5. Log into your domain provider (GoDaddy, Namecheap, etc.).
6. Go to your domain's **DNS Management / Nameservers** section.
7. Change your nameservers to "Custom" and paste the two Vercel nameservers provided.
8. Save changes. Within a few minutes to an hour, Vercel will verify the domain, issue a secure HTTPS certificate, and your authentic URL will be live!

---

> **Note:** Because this project includes a `vercel.json` file, your React Router links (like `/blogs`) will work perfectly in production without causing "404 Not Found" errors when users refresh the page.

---

## How to Show Your "Download Resume" Button
The "Download Resume" button in the Hero section is currently hidden. Whenever you have your resume ready and want to show the button again, follow these simple steps:

1. Open `src/components/Hero.js` in your code editor.
2. Scroll down to approximately line 52 inside the `<div className="cta-group">`.
3. You will see the button wrapped in a JSX comment like this:
   ```jsx
   {/* <a href="resume.pdf" download="Chirag_Sharma_Resume.pdf" className="btn btn-outline hover-target">Download Resume</a> */}
   ```
4. Simply remove the `{/*` and `*/}` around the code so it looks like this:
   ```jsx
   <a href="resume.pdf" download="Chirag_Sharma_Resume.pdf" className="btn btn-outline hover-target">Download Resume</a>
   ```
5. Place your actual resume file in the `public` folder and name it `resume.pdf`.
6. Save the file and deploy!
