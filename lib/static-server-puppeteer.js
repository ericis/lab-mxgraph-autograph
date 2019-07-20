
const puppeteer = require('./puppeteer');

const server = require('./static-server');

function runOnceWithPage(options, cb) {

    const serverOptions = {};

    if (options.port) {
        serverOptions['port'] = options.port;
    }

    if (options.rootPath) {
        serverOptions['rootPath'] = options.rootPath;
    }

    if (options.index) {
        serverOptions['index'] = options.index;
    }

    server.runOnce(
        serverOptions,
        async (server) => {

            await puppeteer.runOnce(async (browser) => {

                const page = await browser.newPage();

                if (options.debug) {
                    // avoid issue with synchronous threads on async execution
                    // (async () => {
                    page.on('console', (msg) => {
                        console.log(msg.text());
                    });
                    // });
                }

                page.setViewport({ width: 1000, height: 600, deviceScaleFactor: 2 });

                const url = `http://${server.host}:${server.port}`;

                console.log(`GET ${url}`);
                await page.goto(url, { waitUntil: 'networkidle2' });

                const context = {
                    server,
                    browser,
                    page,
                };

                await cb(context);

                (async () => { page.removeAllListeners(); });
            });
        });
}

module.exports = {
    runOnceWithPage,
};
