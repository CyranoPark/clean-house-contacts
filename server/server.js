const next = require('next');
const express = require('express');
const smsRouter = require('./router/sms');

const env = process.env.NODE_ENV || 'development';
const dev = env !== 'production';
const port = process.env.PORT || 3000;
const app = next({
    dev,
});
const handle = app.getRequestHandler();

app.prepare()
    .then(async () => {
        const server = express();

        server.use(express.json());
        server.use(express.urlencoded({ extended: false }));

        server.use('/sms', smsRouter);
        server.get('*', (req, res) => handle(req, res));

        server.listen(port, (err) => {
            if (err) throw err;

            console.log(`> Ready on port ${port} [${env}]`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
