export function asyncHandler(callback) {
    return async function (req, res) {
        try {
            const result = await callback(req, res);
            return result;
        }
        catch (error) {
            console.error(error);
            return res.status(500).send("Internal Server Error");
        }
    };
}
//# sourceMappingURL=asyncHandler.js.map