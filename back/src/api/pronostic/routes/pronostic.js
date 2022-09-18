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
      handler: 'pronostic.submit',
      config: {
        policies: [
          {
            name: 'api::match.match-exists',
            config: {
              getMatchId: (ctx) => +ctx?.params?.mid
            }
          }
        ]
      }
    }
  ]
};
