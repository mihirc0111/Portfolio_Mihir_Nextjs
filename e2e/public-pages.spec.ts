import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.route("**/api/analytics/**", (route) => route.fulfill({ status: 204 }));
});

test("a visitor can open the portfolio and navigate to projects", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("link", { name: "Portfolio home" })).toBeVisible();
  await page.getByRole("link", { name: "Projects", exact: true }).first().click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
});

test("@a11y the home page has no automatically detectable serious accessibility violations", async ({ page }) => {
  await page.goto("/");

  const { AxeBuilder } = await import("@axe-core/playwright");
  const results = await new AxeBuilder({ page }).analyze();
  const seriousViolations = results.violations.filter(({ impact }) => impact === "critical" || impact === "serious");

  expect(seriousViolations).toEqual([]);
});
