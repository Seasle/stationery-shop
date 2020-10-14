import db from '../database.js';
import { mapper } from '../utils.js';
import * as queries from '../queries.js';

export default (fastify, options, done) => {
    fastify.get('/', async (request, reply) => {
        const data = await db.all(queries.getAllProducts);

        reply.send(mapper(data));
    });

    fastify.get('/:category/top', async (request, reply) => {
        const data = await db.all(queries.getFirstProducts, request.params.category);

        reply.send(mapper(data));
    });

    fastify.get('/:category', async (request, reply) => {
        const total = await db.get(queries.getTotalProducts, request.params.category);
        const data = await db.all(
            queries.getProducts,
            request.params.category,
            Number(request.query.page) || 0
        );

        reply.send(
            mapper({
                ...total,
                data,
            })
        );
    });

    // TODO Вынести в отдельный модуль
    fastify.get('/:category/:id', async (request, reply) => {
        const data = await db.get(queries.getProduct, request.params.id);
        const images = await db.all(queries.getImages, request.params.id);

        reply.send(
            mapper({
                ...data,
                images,
            })
        );
    });

    // TODO Вынести в отдельный модуль
    fastify.get('/:category/:id/images', async (request, reply) => {
        const data = await db.all(queries.getImages, request.params.id);

        reply.send(mapper(data));
    });

    done();
};
