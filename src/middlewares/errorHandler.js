export const errorHandler = (error, request, response, next) => {
  const status = error.status ? error.status : 500;
  const errorResponse = {
    message: error.message ? error.message : 'Internal server error',
    stack: error.stack,
  };

  response.status(status).json(errorResponse);
};

export const makeError = ({ message, status = 500 }) => {
  return {
    message,
    status,
  };
};
