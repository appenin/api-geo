export const redirectToDocumentation = {
  method: 'GET',
  path: '/',
  handler: (_request, h) => {
    return h.redirect('/documentation');
  },
};
