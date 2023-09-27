const response = ({ res, status, code, message, data }) => {
    return res.status(code).json({
        status,
        message,
        data
    });
};

export const success = (res, code, data) => {
    return response({ res, status: true, code, message: "Success!", data });
};

export const error = (res, code, err, data) => {
    return response({ res, status: false, code, data, message: err.message || err });
};
