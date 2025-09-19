import createHttpError from 'http-errors';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof createHttpError.HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err.message,
    });
    return;
  }

  if (err.name === 'CastError') {
    return res.status(400).json({
      success: false,
      status: 400,
      message: `Invalid ID format: ${err.value}`,
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};
