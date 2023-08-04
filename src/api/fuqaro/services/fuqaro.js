'use strict';

/**
 * fuqaro service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::fuqaro.fuqaro');
