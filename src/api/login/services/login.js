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
              fields: ["id", "name", "phone_number", "password", "fcm_token", "role"],
              filters: {
                phone_number: phone_number,
                password: password
              },
              populate: {
                mahalla: {
                  fields: ["id"]
                }
              }
            }
          );

          if (entries.length > 0) {
            const firstEntry = entries[0];
            // Do something with the first entry.
            const entry = await strapi.entityService.update('api::xodim.xodim', firstEntry.id, {
              data: {
                  fcm_token: fcm_token,
              },
            });
            const entry1 = await strapi.entityService.update('api:mahalla.mahalla', firstEntry.mahalla.id, {
              data: {
                fcm_token: fcm_token
              }
            })
            return {
              success: true,
              data: {
                id: firstEntry.id,
                mahalla_id: firstEntry.mahalla.id,
                role: firstEntry.role
              },
              message: 'Login successful.',
            };
          } else {
            // The entries array is empty.
            return {
              success: false,
              message: 'Invalid credentials.',
            };
          }

        //   const updatePromises = entries.map(async element => {
        //     if (element.phone_number == phone_number && element.password == password) {
        //         const entry = await strapi.entityService.update('api::xodim.xodim', element.id, {
        //             data: {
        //                 fcm_token: fcm_token,
        //             },
        //         });
        //         return true;
        //     }
        //     return false;
        // });
        
        // const updateResults = await Promise.all(updatePromises);
        // const loginSuccessful = updateResults.includes(true);
        
        // if (loginSuccessful) {
        //     return {
        //         success: true,
        //         message: 'Login successful.',
        //     };
        // } else {
        //     return {
        //         success: false,
        //         message: 'Invalid credentials.',
        //     };
        // }

      } catch (err) {
        return {
        success: false,
        message: 'An error occurred.',
        error: err.message,
      };
      }
    },
};
  


  