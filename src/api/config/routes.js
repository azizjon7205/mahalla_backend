const { api } = strapi;

api.routes.set('api', {
  '/api/login': {
    methods: ['POST'],
  },
});