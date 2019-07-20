/// <reference path="./node_modules/mxgraph/javascript/mxClient.js" />

function buildShapeStyle(attributes) {

    let style = '';

    if (!attributes) {
        return style;
    }

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

const canvasPadding = 20;

const ourdrawio = {

    drawRectangle: (graph, text, x, y, width, height, styles) => {

        const style = buildShapeStyle(styles);

        return graph.insertVertex(graph.getDefaultParent(), null, text, x, y, width, height, style);
    },

    drawCylinder: (graph, text, x, y, width, height, styles) => {

        const style = buildShapeStyle(styles);

        return graph.insertVertex(graph.getDefaultParent(), null, text, x, y, width, height, `shape=cylinder;${style}`);
    },

    drawEdge: (graph, node1, node2, text, styles) => {

        const style = buildShapeStyle(styles);

        return graph.insertEdge(graph.getDefaultParent(), null, text || '', node1, node2, style);
    },

    buildLabel: (options) => {

        const userObj = document.createElement('UserObject');

        userObj.setAttribute('label', options.label);
        userObj.setAttribute('link', options.url);

        return userObj;
    },
};

/**
 *
 * @param {mxGraph} graph
 */
function buildGraph(graph) {

    console.log('Building custom graph...');

    const canvasPadding = 10;
    const width = 120;
    const height = 60;
    const xPadding = 35;
    const yPadding = 30;
    const xCenter = canvasPadding + ((width * 2 + xPadding) / 2);
    const xPeople = xCenter - (width / 2);
    const xTechnology = width + xPadding;
    const yBottom = canvasPadding + height + yPadding;

    const fontSize = 12;
    const strokeColor = '#333333';
    const strokeWidth = 2;
    const defaultStyles = {
        strokeColor,
        strokeWidth,
        html: true,
    };
    const boxStyles = {
        ...defaultStyles,
        fontSize,
        rounded: true,
        whiteSpace: 'wrap',
    };
    const edgeStyles = {
        ...defaultStyles,
        endArrow: 'none',
    };

    const peopleData = ourdrawio.buildLabel({
        label: 'People',
        url: 'https://ourchitecture.github.io/people',
    });

    const people = ourdrawio.drawRectangle(
        graph,
        peopleData,
        xPeople,
        canvasPadding,
        width,
        height,
        {
            ...boxStyles,
            fillColor: '#d5e8d4',
            strokeColor: '#82b366',
        });

    const processData = ourdrawio.buildLabel({
        label: 'Process',
        url: 'https://ourchitecture.github.io/process',
    });

    const process = ourdrawio.drawRectangle(
        graph,
        processData,
        canvasPadding,
        yBottom,
        width,
        height,
        {
            ...boxStyles,
            fillColor: '#dae8fc',
            strokeColor: '#6c8ebf',
        });

    const technologyData = ourdrawio.buildLabel({
        label: 'Technology',
        url: 'https://ourchitecture.github.io/technology',
    });

    const technology = ourdrawio.drawRectangle(
        graph,
        technologyData,
        xTechnology,
        yBottom,
        width,
        height,
        {
            ...boxStyles,
            fillColor: '#e1d5e7',
            strokeColor: '#9673a6',
        });

    const edges = [];

    edges.push(ourdrawio.drawEdge(graph, people, process, '', edgeStyles));
    edges.push(ourdrawio.drawEdge(graph, process, technology, '', edgeStyles));
    edges.push(ourdrawio.drawEdge(graph, technology, people, '', edgeStyles));

    graph.orderCells(true, edges);

    graph.convertValueToString = function (cell) {

        if (mxUtils.isNode(cell.value) && cell.value.nodeName.toLowerCase() == 'userobject') {

            // Returns a DOM for the label
            const div = document.createElement('div');

            div.innerHTML = cell.getAttribute('label');

            mxUtils.br(div);

            return div;
        }

        return '';
    };
}
