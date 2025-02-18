import { BeforeAll, AfterAll, Before, After } from "@cucumber/cucumber";
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
    if (pageFixture.page) {
        await pageFixture.page.close();
    }
    if (browser) {
        await browser.close();
    }
});

//AfterAll(async function() {
    
//});