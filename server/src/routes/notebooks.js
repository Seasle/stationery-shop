import db from '../database.js';
import { mapper, bindQueries } from '../utils.js';
import * as rawQueries from '../queries.js';

const queries = bindQueries('Notebook', rawQueries);

export default (fastify, options, done) => {
    fastify.get('/', async (request, reply) => {
        const data = await db.all(queries.getProducts);

        reply.send(mapper(data));
    });

    fastify.get('/top', async (request, reply) => {
        const data = await db.all(queries.getFirstProducts);

        reply.send(mapper(data));
    });

    fastify.get('/:id', async (request, reply) => {
        const data = await db.get(queries.getProduct, request.params.id);
        const images = await db.all(queries.getImages, request.params.id);

        reply.send(
            mapper({
                ...data,
                images,
            })
        );
    });

    fastify.get('/:id/images', async (request, reply) => {
        const data = await db.all(queries.getImages, request.params.id);

        reply.send(mapper(data));
    });

    done();
};
