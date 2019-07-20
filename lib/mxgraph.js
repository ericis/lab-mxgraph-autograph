/// <reference path="../node_modules/mxgraph/javascript/mxClient.js" />

(function extendApi(document, mxGraph, mxUtils, mxCodec) {

    console.log('Extending mxGraph...');

    const buildShapeStyle = function(attributes) {

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
    };

    const drawRectangle = function(text, x, y, width, height, styles) {

        const style = this.buildShapeStyle(styles);

        return this.insertVertex(this.getDefaultParent(), null, text, x, y, width, height, style);
    };

    const drawCylinder = function(text, x, y, width, height, styles) {

        const style = this.buildShapeStyle(styles);

        return this.insertVertex(this.getDefaultParent(), null, text, x, y, width, height, `shape=cylinder;${style}`);
    };

    const drawEdge = function(node1, node2, text, styles) {

        const style = this.buildShapeStyle(styles);

        return this.insertEdge(this.getDefaultParent(), null, text || '', node1, node2, style);
    };

    const buildLabel = function(options) {

        const userObj = document.createElement('UserObject');

        userObj.setAttribute('label', options.label);
        userObj.setAttribute('link', options.url);

        return userObj;
    };

    const layoutDown = function(startNode) {

        const layout = new mxHierarchicalLayout(this, mxConstants.DIRECTION_NORTH);

        layout.execute(this.getDefaultParent(), startNode);
    };

    mxGraph.prototype.configureDrawIO = function () {

        new mxRubberband(this);

        this.setResizeContainer(true);

        this.convertValueToString = function(cell) {

            if (mxUtils.isNode(cell.value) && cell.value.nodeName.toLowerCase() == 'userobject') {

                // Returns a DOM for the label
                const div = document.createElement('div');

                div.innerHTML = cell.getAttribute('label');

                mxUtils.br(div);

                return div;
            }

            return cell.value;
        };
    };

    mxGraph.prototype.getXml = function() {

        const enc = new mxCodec();

        console.log('Encoding mxgraph...');
        const graphXmlNode = enc.encode(this.getModel());

        return mxUtils.getXml(graphXmlNode);
    };

    mxGraph.prototype.buildShapeStyle = buildShapeStyle;
    mxGraph.prototype.drawRectangle = drawRectangle;
    mxGraph.prototype.drawCylinder = drawCylinder;
    mxGraph.prototype.drawEdge = drawEdge;
    mxGraph.prototype.buildLabel = buildLabel;
    mxGraph.prototype.layoutDown = layoutDown;

})(document, mxGraph, mxUtils, mxCodec);
