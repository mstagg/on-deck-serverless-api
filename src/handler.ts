export const hello = async () => ({
  statusCode: 200,
  body: JSON.stringify({
    message: 'Hello World!',
  }),
});
