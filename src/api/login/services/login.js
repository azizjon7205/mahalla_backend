'use strict';

/**
 * login service
 */

module.exports = {
    login: async (ctx) => {
      try {
        const { phone_number, password, fcm_token } = ctx.request.body;

        const entries = await strapi.entityService.findMany(
            "api::xodim.xodim",
            {
              fields: ["id", "name", "phone_number", "password", "fcm_token"],
              //populate: {
              //  author: {
              //    fields: ["name", "email"],
              //  },
              //  category: {
              //    fields: ["name"],
              //  },
              //},
            }
          );

        entries.array.forEach(async element => {
            if(element.phone_number == phone_number && element.password == password){
                const entry = await strapi.entityService.update('api::xodim.xodim', element.id, {
                    data: {
                      fcm_token: fcm_token,
                    },
                  });
                return {
                    success: true,
                    message: 'Login successful.',
                  };
            }
        });
  
        return {
            success: false,
            message: 'Invalid credentials.',
          };

      } catch (err) {
        return {
        success: false,
        message: 'An error occurred.',
        error: err.message,
      };
      }
    },
};
  


  