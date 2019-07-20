const StaticServer = require('static-server');

module.exports = {
    runOnce: (options, cb) => {

        const server = new StaticServer({
            port: options.port ? options.port : 8080,
            rootPath: options.rootPath ? options.rootPath : '.',
        });

        if (options.index) {
            server['templates'] = {
                index: options.index,
            };
        }

        console.log('Starting server...');
        server.start(() => {

            server.host = server.host || 'localhost';

            console.log(`Server started and running at http://${server.host}:${server.port}`);

            (async () => {
                try {

                    await cb(server);

                } finally {

                    console.log('Stopping server...');
                    server.stop();
                    console.log('Server stopped');
                }
            })();
        });
    },
};
