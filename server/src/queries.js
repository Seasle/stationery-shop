export const getProducts = key => `
    SELECT
        ${key}.*,
        ${key}Images.Path as Preview
    FROM ${key}
    LEFT JOIN ${key}Images
    ON ${key}.Id = ${key}Images.Product
    GROUP BY ${key}.Id;
`;

export const getProduct = key => `
    SELECT *
    FROM ${key}
    WHERE Id = ?;
`;

export const getImages = key => `
    SELECT
        Id,
        Path
    FROM ${key}Images
    WHERE Product = ?;
`;
