export const getAllProducts = `
    SELECT
        Product.Id,
        Product.Name,
        Product.Description,
        Product.Price,
        Product.Sales,
        Image.Path as Preview
    FROM Product
    LEFT JOIN Image
    ON Product.Id = Image.Product
    GROUP BY Product.Id;
`;

export const getFirstProducts = `
    SELECT
        Product.Id,
        Product.Name,
        Product.Description,
        Product.Price,
        Product.Sales,
        Image.Path as Preview
    FROM Product
    LEFT JOIN Image
    ON Product.Id = Image.Product
    WHERE Product.Category = ?
    GROUP BY Product.Id
    LIMIT 4;
`;

export const getProducts = `
    SELECT
        Product.Id,
        Product.Name,
        Product.Description,
        Product.Price,
        Product.Sales,
        Image.Path as Preview
    FROM Product
    LEFT JOIN Image
    ON Product.Id = Image.Product
    WHERE Product.Category = ?
    GROUP BY Product.Id
    LIMIT 8 OFFSET 8 * ?;
`;

export const getProduct = `
    SELECT
        Id,
        Name,
        Description,
        Price,
        Sales
    FROM Product
    WHERE Id = ?;
`;

export const getTotalProducts = `
    SELECT COUNT(*) AS Total
    FROM Product
    WHERE Product.Category = ?;
`;

export const getPopularProducts = `
    SELECT
        Product.Id,
        Product.Name,
        Product.Description,
        Product.Price,
        Product.Sales,
        Image.Path as Preview
    FROM Product
    LEFT JOIN Image
    ON Product.Id = Image.Product
    GROUP BY Product.Id
    ORDER BY Product.Sales DESC
    LIMIT 40;
`;

export const getImages = `
    SELECT
        Id,
        Path
    FROM Image
    WHERE Product = ?;
`;
