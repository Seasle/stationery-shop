import fastify from 'fastify';
import cors from 'fastify-cors';
import { smart } from './utils.js';

import products from './routes/products.js';
import product from './routes/product.js';
import image from './routes/image.js';

const server = fastify();

server.register(cors);
server.register(products, { prefix: 'products' });
server.register(product, { prefix: 'product' });
server.register(image, { prefix: 'image' });

server.listen(
    process.env.SERVER_PORT,
    process.env.SERVER_HOSTNAME,
    smart(address => {
        console.log(`Сервер запущен по адресу ${address}`);
    })
);
