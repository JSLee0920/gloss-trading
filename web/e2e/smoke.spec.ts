import { expect, test } from "@playwright/test";

test("unauthenticated visitor is redirected home -> /login", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/login$/);
  await expect(
    page.getByRole("heading", { level: 1, name: /sign in/i })
  ).toBeVisible();
});
