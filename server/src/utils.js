/**
 * Синтаксический сахар для функций, первым аргументом которых является ошибка.
 * В том случае, если возникает ошибка - выбрасывает исключение, иначе передает оставшиеся аргументы в функцию-обработчик.
 * @param {T} callback Функция-обработчик
 * @returns {function (Error|null, ...any)}
 *
 * @template T
 */
export const smart = callback => (error, ...args) => {
    if (error) {
        throw error;
    } else {
        return callback(...args);
    }
};

/**
 * Устанавливает первый символ каждого ключа в каждом объекта в нижний регистр.
 * @param {T|T[]} data Данные
 *
 * @template T
 */
export const mapper = data => {
    const isArray = Array.isArray(data);
    const mapped = (isArray ? data : [data]).map(entry =>
        Object.fromEntries(
            Object.entries(entry).map(([key, value]) => [
                key.replace(/^./g, match => match.toLowerCase()),
                value instanceof Object ? mapper(value) : value,
            ])
        )
    );

    return isArray ? mapped : mapped[0];
};
