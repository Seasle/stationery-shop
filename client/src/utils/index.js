export const clamp = (min, max, value) => Math.max(min, Math.min(max, value));

export const debounce = (callback, delay = 0) => {
    let timeout = null;

    return function (...args) {
        clearTimeout(timeout);

        timeout = setTimeout(() => callback.apply(this, args), delay);
    };
};
