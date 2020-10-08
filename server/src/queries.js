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
    GROUP BY Product.Id;
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

export const getImages = `
    SELECT
        Id,
        Path
    FROM Image
    WHERE Product = ?;
`;
