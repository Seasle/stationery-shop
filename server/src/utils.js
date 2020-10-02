export const smart = callback => (error, ...args) => {
    if (error) {
        throw error;
    } else {
        return callback(...args);
    }
};

export const mapper = entries =>
    entries.map(entry =>
        Object.fromEntries(
            Object.entries(entry).map(([key, value]) => [
                key.replace(/^./g, match => match.toLowerCase()),
                value,
            ])
        )
    );
