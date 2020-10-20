const BASE = 'http://127.0.0.1:3000/api';

export const get = url => {
    const controller = new AbortController();
    const request = new Request(`${BASE}/${url}`, {
        method: 'GET',
        credentials: 'same-origin',
        signal: controller.signal,
    });

    return [fetch(request).then(response => response.json()), controller];
};

export const post = (url, data) => {
    const controller = new AbortController();
    const request = new Request(`${BASE}/${url}`, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        signal: controller.signal,
    });

    return [fetch(request).then(response => response.json()), controller];
};

export const image = id => `${BASE}/image/${id}`;
