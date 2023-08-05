'use strict';

/**
 * A set of functions called "actions" for `login`
 */

// module.exports = {
//   // exampleAction: async (ctx, next) => {
//   //   try {
//   //     ctx.body = 'ok';
//   //   } catch (err) {
//   //     ctx.body = err;
//   //   }
//   // }
// };

module.exports = {
  async login(ctx, next) {
    try {
      const data = await strapi
        .service("api::login.login")
        .login(ctx);
      console.log(data, "data");

      ctx.body = data;
    } catch (err) {
      ctx.badRequest("Post report controller error", { moreDetails: err });
    }
  },
};
