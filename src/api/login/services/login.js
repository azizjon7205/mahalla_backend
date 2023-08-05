'use strict';

/**
 * login service
 */

module.exports = {
    login: async (ctx) => {
      try {
        const { phone_number, password, fcm_token } = ctx.request.body;

        // Find the worker with the provided phone_number and password
        const worker = await strapi.query('xodims').findOne({
            phone_number,
            password,
        });
  
        if (worker) {
            // Update the worker's fcm_token
            await strapi.query('xodims').update({ id: worker.id }, { fcm_token });
      
            return {
              success: true,
              message: 'Login successful.',
            };
          } else {
            return {
              success: false,
              message: 'Invalid credentials.',
            };
          }
      } catch (err) {
        return {
        success: false,
        message: 'An error occurred.',
        error: err.message,
      };
      }
    },
};
  