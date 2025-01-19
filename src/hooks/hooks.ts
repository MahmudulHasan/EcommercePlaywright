import { BeforeAll, AfterAll } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "playwright";
import { pageFixture } from "./pageFixtures";

let browser: Browser;
let page: Page;

BeforeAll(async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    pageFixture.page = page;
});

AfterAll(async () => {
    await page.close();
    await browser.close();
});