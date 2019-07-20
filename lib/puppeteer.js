
const puppeteer = require('puppeteer');

async function runOnce(cb) {

    let browser;

    try {
        console.log('Launching Chromium...')
        browser = await puppeteer.launch();
        console.log('Chromium launched');

        await cb(browser);

    } finally {

        console.log('Closing Chromium...');
        await browser.close();
        console.log('Chromium closed');
    }
}

module.exports = {
    runOnce,
};
