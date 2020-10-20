export default (fastify, options, done) => {
    fastify.get('/', async (request, reply) => {
        reply.send(request.session.cart || []);
    });

    fastify.post('/', async (request, reply) => {
        if (request.body !== null) {
            const cart = new Set([...(request.session.cart || []), request.body.id]);
            const values = [...cart.values()];

            request.session.cart = values;

            reply.send(values);
        } else {
            reply.send(request.session.cart || []);
        }
    });

    done();
};
