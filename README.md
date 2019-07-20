# Experiment with mxGraph, Puppeteer and draw.io

## Goals

* Automatically generate graph images using `mxGraph` running in a host container using `static-server` and headless browser automation with `puppeteer`.
* Automatically generate `drawio` graphs using the above `mxGraph` XML

## How it works

**Conceptually**

* Input: Javascript `mxGraph` builder (e.g. `./people-process-technology.js`)
* Output:
    * Graph as `.png` image
    * Graph as `.drawio` file

1. Execute the NodeJS script
2. Initiates the custom graph library
3. Starts `static-server` at `http://localhost:8080` pointed to `./lib/index.html` containing the `mxGraph` javascript files and a `<div>` container to render the graph
4. Starts a headless chromium browser with `puppeteer` pointed to `http://localhost:8080`
5. Injects a custom graph script (e.g. `./people-process-technology.js`) into the HTML page using Puppeteer APIs
6. Configures the `mxGraph` javascript object for updates
7. Executes a standard function `buildGraph(graph)` expected to reside in the custom graph script (e.g. `./people-process-technology.js`). This function should create the custom graph using the `mxGraph` APIs and any extensions for `draw.io`.
8. Exports the `mxGraph` XML
9. Generates a screenshot of the graph using `puppeteer` and exports the image in `.png` format
10. Encodes the `mxGraph` XML into `draw.io` format and generates a `.drawio` file
11. Uses `puppeteer` to close the headless Chromium browser and stops the `static-server` web server

**Technical Prerequisites**

* [Install NodeJS](https://nodejs.org/)
* [Install a git client](https://git-scm.com/downloads)
* Clone or download this project

**Steps**

1. Install library dependencies with `npm i`
2. Execute the node script `build` (e.g. `npm run build`)
3. Execute the node script `build:ppt` (e.g. `npm run build:ppt`)

## Examples

### People, Process, Technology

This example demonstrates the use of custom styles, support for draw.io links with the use of `UserObject`, and ensures edges are below vertices (shapes). View the [clickable diagram on draw.io](https://www.draw.io/?lightbox=1&target=self&highlight=0000ff&edit=_blank#Uhttps%3A%2F%2Fraw.githubusercontent.com%2Fericis%2Flab-mxgraph-autograph%2Fmaster%2Fpeople-process-technology.drawio).

[<img src="./people-process-technology.png" width="250" alt="People, Process, Technology graph example" />](https://www.draw.io/?lightbox=1&target=self&highlight=0000ff&edit=_blank#Uhttps%3A%2F%2Fraw.githubusercontent.com%2Fericis%2Flab-mxgraph-autograph%2Fmaster%2Fpeople-process-technology.drawio)

### Generic shapes graph

This example demonstrates basic, connected shapes. View the [generated diagram on draw.io](https://www.draw.io/?lightbox=1&target=self&highlight=0000ff&edit=_blank#Uhttps%3A%2F%2Fraw.githubusercontent.com%2Fericis%2Flab-mxgraph-autograph%2Fmaster%2Fgraph.drawio).

[<img src="./graph.png" width="150" alt="Generated graph example" />](https://www.draw.io/?lightbox=1&target=self&highlight=0000ff&edit=_blank#Uhttps%3A%2F%2Fraw.githubusercontent.com%2Fericis%2Flab-mxgraph-autograph%2Fmaster%2Fgraph.drawio)

## Resources

* [mxGraph User Manual for JS](https://jgraph.github.io/mxgraph/docs/manual.html)
* [mxGraph API](https://jgraph.github.io/mxgraph/docs/js-api/files/view/mxGraph-js.html)
* [mxGraph examples](https://jgraph.github.io/mxgraph/javascript/index.html)
* [mxGraph source examples](https://github.com/jgraph/mxgraph/tree/master/javascript/examples)
* [draw.io shape styles](https://about.draw.io/shape-styles/)
* [draw.io conversion tools](https://jgraph.github.io/drawio-tools/tools/convert.html)
* [draw.io GitHub integration](https://github.com/jgraph/drawio-github)
* [puppeteer](https://pptr.dev/)
* [mermaidjs inspiration](https://mermaidjs.github.io/)
* [jGraph NodeJS image export](https://github.com/jgraph/draw-image-export2)
