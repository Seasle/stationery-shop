import db from '../database.js';
import { mapper } from '../utils.js';
import * as queries from '../queries.js';

export default (fastify, options, done) => {
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
