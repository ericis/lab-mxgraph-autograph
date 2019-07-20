
const argv = process.argv.splice(2);

if (argv.length !== 3 && argv.length !== 4) {
    throw new Error('At least 3 arguments are required: 1) javascript build graph file path, 2) DrawIO output file path, 3) output image path');
}

const fs = require('fs');

const graphHost = require('./static-server-puppeteer-mxgraph');
const drawio = require('./drawio');

const buildGraphFilePath = argv[0];
const drawioFilePath = argv[1];
const imageFilePath = argv[2];
const isDebug = argv.length === 4 && argv[3] == '--debug';

console.log(`Building graph from ${buildGraphFilePath}`);
console.log(`Saving graph to ${drawioFilePath}`);
console.log(`Exporting image to ${imageFilePath}`);

(async () => {

    const mxGraphXml = await graphHost.buildGraph({
        js: buildGraphFilePath,
        imagePath: imageFilePath,
        debug: isDebug
    });

    const drawioXml = drawio.transformMxGraphXml(mxGraphXml);

    console.log('Writing draw.io graph to disk...');
    fs.writeFileSync(drawioFilePath, drawioXml, { encoding: 'utf8' });

    console.log(`Diagram ready at ${drawioFilePath}`);
})();
