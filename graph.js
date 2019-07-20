/// <reference path="./node_modules/mxgraph/javascript/mxClient.js" />
/// <reference path="./lib/mxgraph.js" />

/**
 *
 * @param {mxGraph} graph
 */
function buildGraph(graph) {

    console.log('Building custom graph...');

    const a = graph.drawCylinder('A', 0, 0, 60, 80, { whiteSpace: 'wrap', boundedLbl: true });
    const b = graph.drawRectangle('B', 0, 0, 80, 30, { whiteSpace: 'wrap', rounded: true, arcSize: 30 });
    const c = graph.drawRectangle('C', 0, 0, 80, 30, { whiteSpace: 'wrap', rounded: true, arcSize: 30 });
    const d = graph.drawRectangle('D', 0, 0, 80, 30, { whiteSpace: 'wrap' });

    graph.drawEdge(a, b, '');
    graph.drawEdge(a, c, '');
    graph.drawEdge(c, d, '');

    graph.layoutDown(a);
}
