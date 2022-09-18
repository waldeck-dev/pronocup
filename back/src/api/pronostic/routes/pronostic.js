module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/pronostics',
      handler: 'pronostic.find'
    },
    {
      method: 'PUT',
      path: '/matches/:mid([0-9]+)/pronostics',
      handler: 'pronostic.submit'
    }
  ]
};
