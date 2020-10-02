const BASE = 'http://127.0.0.1:3000';

export const get = url => {
    const controller = new AbortController();
    const request = new Request(`${BASE}/${url}`, {
        method: 'GET',
        signal: controller.signal,
    });

    return [fetch(request).then(response => response.json()), controller];
};
