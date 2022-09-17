module.exports = {
  routes: [
    {
      method: 'POST',
      path: '/matches/:mid([0-9]+)/pronostics',
      handler: 'pronostic.create'
    }
  ]
};
