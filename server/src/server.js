import fastify from 'fastify';
import cors from 'fastify-cors';
import { smart } from './utils.js';

import notebooks from './routes/notebooks.js';
import image from './routes/image.js';

const server = fastify();

server.register(cors);
server.register(notebooks, { prefix: 'notebooks' });
server.register(image, { prefix: 'image' });

server.listen(
    process.env.SERVER_PORT,
    process.env.SERVER_HOSTNAME,
    smart(address => {
        console.log(`Сервер запущен по адресу ${address}`);
    })
);
