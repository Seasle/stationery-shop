export default (fastify, options, done) => {
    fastify.get('/', async (request, reply) => {
        reply.send(request.session.cart || {});
    });

    fastify.post('/', async (request, reply) => {
        if (request.body !== null) {
            const cart = new Map(Object.entries(request.session.cart || {}));
            cart.set(request.body.id, (cart.get(request.body.id) || 0) + 1);

            const values = Object.fromEntries([...cart.entries()]);
            request.session.cart = values;

            reply.send(values);
        } else {
            reply.send(request.session.cart || {});
        }
    });

    fastify.post('/update', async (request, reply) => {
        if (request.body !== null) {
            const cart = new Map(Object.entries(request.body || {}));
            const values = Object.fromEntries([...cart.entries()]);
            request.session.cart = values;

            reply.send(values);
        } else {
            reply.send(request.session.cart || {});
        }
    });

    fastify.get('/remove/:id', async (request, reply) => {
        const cart = new Map(Object.entries(request.session.cart || {}));
        cart.delete(request.params.id);

        const values = Object.fromEntries([...cart.entries()]);
        request.session.cart = values;

        reply.send(values);
    });

    done();
};
