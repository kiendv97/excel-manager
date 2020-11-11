export const responseCommon = ((res, statusCode: Number, success: Boolean, message: String, code: Number, data: any = {}) => {
    statusCode = statusCode || 200;
    if (statusCode) {
        return res.status(statusCode).json({
            'success': success,
            'message': message,
            'code': code,
            'data': data
        });
    }
    return null;
})