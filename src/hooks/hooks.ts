import { BeforeAll, AfterAll, Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, BrowserContext } from "playwright";
import { pageFixture } from "./pageFixtures";

let browser: Browser;
let context: BrowserContext;

BeforeAll(async function() {
    browser = await chromium.launch({ headless: false });
});

Before(async function() {
    context = await browser.newContext();
    const page = await context.newPage();
    pageFixture.page = page;
});

After(async function() {
    await pageFixture.page.close();
    await context.close();
});

AfterAll(async function() {
    await browser.close();
});