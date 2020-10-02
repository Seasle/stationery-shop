import fastify from 'fastify';
import db from './database.js';
import { smart, mapper } from './utils.js';

const server = fastify();

server.get('/notebooks', async (request, reply) => {
    const data = await db.all('SELECT * FROM Notebooks');

    reply.send(mapper(data));
});

server.listen(
    process.env.SERVER_PORT,
    process.env.SERVER_HOSTNAME,
    smart(address => {
        console.log(`Сервер запущен по адресу ${address}`);
    })
);
