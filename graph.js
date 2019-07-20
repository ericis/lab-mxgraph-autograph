/// <reference path="./node_modules/mxgraph/javascript/mxClient.js" />

function buildShapeStyle(attributes) {

    let style = '';

    Object.keys(attributes).forEach((key, index) => {

        let value = attributes[key];

        if (typeof value === 'boolean') {
            value = value ? 1 : 0;
        }

        style += (style.length === 0 ? '' : ';') + `${key}=${value}`;
    });

    // console.log('Shape style', style);

    return style;
}

const ourdrawio = {

    drawRectangle: (graph, text, x, y, width, height, styles) => {

        const style = buildShapeStyle(styles);

        return graph.insertVertex(graph.getDefaultParent(), null, text, x, y, width, height, style);
    },

    drawCylinder: (graph, text, x, y, width, height, styles) => {

        const style = buildShapeStyle(styles);

        return graph.insertVertex(graph.getDefaultParent(), null, text, x, y, width, height, `shape=cylinder;${style}`);
    },
};

/**
 *
 * @param {mxGraph} graph
 */
function buildGraph(graph) {

    console.log('Building custom graph...');

    const parent = graph.getDefaultParent();

    const a = ourdrawio.drawCylinder(graph, 'A', 0, 0, 60, 80, { whiteSpace: 'wrap', boundedLbl: true });
    const b = ourdrawio.drawRectangle(graph, 'B', 0, 0, 80, 30, { whiteSpace: 'wrap', rounded: true, arcSize: 30 });
    const c = ourdrawio.drawRectangle(graph, 'C', 0, 0, 80, 30, { whiteSpace: 'wrap', rounded: true, arcSize: 30 });
    const d = ourdrawio.drawRectangle(graph, 'D', 0, 0, 80, 30, { whiteSpace: 'wrap' });

    graph.insertEdge(parent, null, '', a, b);
    graph.insertEdge(parent, null, '', a, c);
    graph.insertEdge(parent, null, '', c, d);

    const layout = new mxHierarchicalLayout(graph, mxConstants.DIRECTION_NORTH);

    layout.execute(parent, a);
}
