
const pako = require('pako');
const btoa = require('btoa');
const etag = require('etag');

function bytesToString(arr) {

    let str = '';

    for (let i = 0; i < arr.length; i++) {
        str += String.fromCharCode(arr[i]);
    }

    return str;
}

function transformMxGraphXmlToDrawIoXml(mxGraphXml) {

    console.log('URI encoding draw.io graph...');
    const uriEncodedGraphXml = encodeURIComponent(mxGraphXml);

    console.log('Compressing draw.io graph...');
    const deflatedGraphXmlBytes = pako.deflateRaw(uriEncodedGraphXml);
    const deflatedGraphXml = bytesToString(deflatedGraphXmlBytes);

    console.log('Base-64 encoding draw.io graph...');
    const base64EncodedGraphXml = btoa(deflatedGraphXml);

    console.log('Generate draw.io graph e-tag...');
    const graphXmlEtag = etag(base64EncodedGraphXml);

    console.log('E-Tag', graphXmlEtag);

    const lastModified = new Date().toISOString();

    //             const drawioXml = `<?xml version="1.0" encoding="UTF-8" ?>
    // <mxfile modified="${lastModified}" host="www.draw.io" agent="Ourchitecture Graph" etag=${graphXmlEtag} version="10.9.8" type="device">
    //     <diagram id="urL9c-78Or0Zooq1TWaK" name="Ourchitecture">${base64EncodedGraphXml}</diagram>
    // </mxfile>
    // `;

    const drawioXml = `<mxfile modified="${lastModified}" host="www.draw.io" agent="Ourchitecture Graph" etag=${graphXmlEtag} version="10.7.7" type="device">
    <diagram id="8swvhjimAStfEv3QiS_M" name="Ourchitecture">${base64EncodedGraphXml}</diagram>
</mxfile>
`;

    return drawioXml;
}

module.exports = {
    transformMxGraphXml: transformMxGraphXmlToDrawIoXml,
};
