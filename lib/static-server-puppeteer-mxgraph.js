/// <reference path="../node_modules/mxgraph/javascript/mxClient.js" />
/// <reference path="../node_modules/puppeteer/index.js" />

const webHost = require('./static-server-puppeteer');

function buildGraph(options) {

    return new Promise((resolve) => {

        webHost.runOnceWithPage(
            {
                debug: options.debug || false,
                rootPath: options.rootPath || '.',
                index: './lib/index.html',
            },
            async (context) => {

                await context.page.addScriptTag({
                    url: options.js,
                });

                const mxGraphXml = await context.page.evaluate(() => {

                    console.log('Creating container...');
                    const container = document.querySelector('#graphContainer');

                    const graph = new mxGraph(container);

                    graph.configureDrawIO();

                    console.log('Begin graph updates...');
                    graph.getModel().beginUpdate();

                    console.log('Building graph...');
                    buildGraph(graph);
                    console.log('Graph built');

                    console.log('End graph updates');
                    graph.getModel().endUpdate();

                    return graph.getXml();
                });

                const graphCoordinates = await context.page.evaluate(() => {

                    const graphSelector = '#graphContainer';

                    console.log(`Retreiving coordinates for "${graphSelector} "...`);
                    const graphElement = document.querySelector(graphSelector);

                    const { x, y, width, height } = graphElement.getBoundingClientRect();

                    return {
                        x,
                        y,
                        width,
                        height,
                        id: graphElement.id,
                    };
                });

                // console.log('Graph element position', graphCoordinates);

                console.log(`Exporting graph image to ${options.imagePath}`);

                await context.page.screenshot({
                    path: options.imagePath,
                    omitBackground: true,
                    clip: {
                        x: graphCoordinates.x,
                        y: graphCoordinates.y,
                        width: graphCoordinates.width,
                        height: graphCoordinates.height,
                    }
                });

                // console.log('mxgraph xml', mxGraphXml);

                resolve(mxGraphXml);
            });
    });
}

module.exports = {
    buildGraph,
};
