export const responseApi = (res, statusCode,
  { message, errorCode, data }) => res.status(statusCode).json({
  success: statusCode < 300 && statusCode >= 200,
  message,
  errorCode,
  data,
});
