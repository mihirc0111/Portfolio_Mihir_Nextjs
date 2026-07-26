# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: public-pages.spec.ts >> a visitor can open the portfolio and navigate to projects
- Location: e2e\public-pages.spec.ts:3:5

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: 'Projects' })
Expected: visible
Error: strict mode violation: getByRole('heading', { name: 'Projects' }) resolved to 2 elements:
    1) <h1>Projects</h1> aka getByRole('heading', { name: 'Projects', exact: true })
    2) <h3 class="text-xl font-semibold mb-2">No projects yet</h3> aka getByRole('heading', { name: 'No projects yet' })

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: 'Projects' })

```

# Page snapshot

```yaml
- generic [ref=e1]:
  - button "Open Next.js Dev Tools" [ref=e7] [cursor=pointer]
  - alert [ref=e11]: Projects | Mihir Chavan
  - link "Skip to main content" [ref=e12] [cursor=pointer]:
    - /url: "#main-content"
  - banner [ref=e13]:
    - generic [ref=e14]:
      - link "Portfolio home" [ref=e15] [cursor=pointer]:
        - /url: /
        - text: Portfolio
      - navigation "Main navigation" [ref=e16]:
        - link "Home" [ref=e17] [cursor=pointer]:
          - /url: /
        - link "Projects" [active] [ref=e18] [cursor=pointer]:
          - /url: /projects
        - link "Achievements" [ref=e19] [cursor=pointer]:
          - /url: /achievements
        - link "Books" [ref=e20] [cursor=pointer]:
          - /url: /books
        - link "Resume" [ref=e21] [cursor=pointer]:
          - /url: /resume
      - link "Login" [ref=e22] [cursor=pointer]:
        - /url: /login
  - main [ref=e26]:
    - generic [ref=e28]:
      - generic [ref=e29]:
        - heading "Projects" [level=1] [ref=e30]
        - paragraph [ref=e31]: A collection of projects showcasing my skills in frontend development, design, and problem-solving.
      - generic [ref=e32]:
        - heading "No projects yet" [level=3] [ref=e37]
        - paragraph [ref=e38]: Projects will appear here once I add them through the CMS. Check back soon!
  - contentinfo [ref=e39]:
    - generic [ref=e40]:
      - paragraph [ref=e41]: © 2026 Your Name. All rights reserved.
      - generic [ref=e42]:
        - link "GitHub" [ref=e43] [cursor=pointer]:
          - /url: https://github.com/yourusername
        - link "LinkedIn" [ref=e44] [cursor=pointer]:
          - /url: https://linkedin.com/in/yourusername
        - link "Twitter" [ref=e45] [cursor=pointer]:
          - /url: https://twitter.com/yourusername
```

# Test source

```ts
  1  | import { expect, test } from "@playwright/test";
  2  | 
  3  | test("a visitor can open the portfolio and navigate to projects", async ({ page }) => {
  4  |   await page.goto("/");
  5  | 
  6  |   await expect(page.getByRole("link", { name: "Portfolio home" })).toBeVisible();
  7  |   await page.getByRole("link", { name: "Projects", exact: true }).first().click();
  8  |   await expect(page).toHaveURL(/\/projects$/);
> 9  |   await expect(page.getByRole("heading", { name: "Projects" })).toBeVisible();
     |                                                                 ^ Error: expect(locator).toBeVisible() failed
  10 | });
  11 | 
  12 | test("@a11y the home page has no automatically detectable serious accessibility violations", async ({ page }) => {
  13 |   await page.goto("/");
  14 | 
  15 |   const { AxeBuilder } = await import("@axe-core/playwright");
  16 |   const results = await new AxeBuilder({ page }).analyze();
  17 |   const seriousViolations = results.violations.filter(({ impact }) => impact === "critical" || impact === "serious");
  18 | 
  19 |   expect(seriousViolations).toEqual([]);
  20 | });
  21 | 
```