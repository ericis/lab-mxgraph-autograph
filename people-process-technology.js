/// <reference path="./node_modules/mxgraph/javascript/mxClient.js" />

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

    const peopleData = graph.buildLabel({
        label: 'People',
        url: 'https://ourchitecture.github.io/people',
    });

    const people = graph.drawRectangle(
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

    const processData = graph.buildLabel({
        label: 'Process',
        url: 'https://ourchitecture.github.io/process',
    });

    const process = graph.drawRectangle(
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

    const technologyData = graph.buildLabel({
        label: 'Technology',
        url: 'https://ourchitecture.github.io/technology',
    });

    const technology = graph.drawRectangle(
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

    edges.push(graph.drawEdge(people, process, '', edgeStyles));
    edges.push(graph.drawEdge(process, technology, '', edgeStyles));
    edges.push(graph.drawEdge(technology, people, '', edgeStyles));

    graph.orderCells(true, edges);
}
