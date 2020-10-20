import fastify from 'fastify';
import cors from 'fastify-cors';
import cookie from 'fastify-cookie';
import caching from 'fastify-caching';
import session from 'fastify-server-session';
import proxy from 'fastify-http-proxy';
import { smart } from './utils.js';

import products from './routes/products.js';
import product from './routes/product.js';
import cart from './routes/cart.js';
import image from './routes/image.js';

const server = fastify();

server.register(cors);
server.register(cookie);
server.register(caching);
server.register(session, {
    secretKey: process.env.SECRET,
    sessionMaxAge: 30 * 24 * 60 * 60 * 1000,
});
server.register(proxy, {
    upstream: process.env.PROXY,
    prefix: '/',
});

server.register(products, { prefix: 'api/products' });
server.register(product, { prefix: 'api/product' });
server.register(cart, { prefix: 'api/cart' });
server.register(image, { prefix: 'api/image' });

server.listen(
    process.env.SERVER_PORT,
    process.env.SERVER_HOSTNAME,
    smart(address => {
        console.log(`Сервер запущен по адресу ${address}`);
    })
);
