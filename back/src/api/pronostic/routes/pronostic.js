module.exports = {
  routes: [
    {
      method: 'PUT',
      path: '/matches/:mid([0-9]+)/pronostics',
      handler: 'pronostic.submit'
    }
  ]
};
