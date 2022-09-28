module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/pronostics',
      handler: 'pronostic.find'
    },
    {
      method: 'GET',
      path: '/matches/:mid([0-9]+)/pronostics',
      handler: 'pronostic.findOne'
    },
    {
      method: 'PUT',
      path: '/matches/:mid([0-9]+)/pronostics',
      handler: 'pronostic.submit',
      config: {
        policies: [
          {
            name: 'api::match.match-is-valid',
            config: {
              getMatchId: (ctx) => +ctx?.params?.mid
            }
          }
        ]
      }
    }
  ]
};
