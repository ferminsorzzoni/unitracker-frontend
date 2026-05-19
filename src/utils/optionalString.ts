import z from "zod";

const optionalString = z.preprocess(
    value => value === "" ? undefined : value,
    z.string().trim().min(1).optional()
);

export { optionalString };