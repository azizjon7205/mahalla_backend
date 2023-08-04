'use strict';

/**
 * mahalla service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::mahalla.mahalla');
