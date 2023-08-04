'use strict';

/**
 * xodim service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::xodim.xodim');
