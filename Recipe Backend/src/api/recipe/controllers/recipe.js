'use strict';

/**
 * recipe controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::recipe.recipe' , ({strapi}) => ({  
    async findOne(ctx) {
    const { id } = ctx.params;

    const entity = await strapi.db.query('api::recipe.recipe').findOne({where: {slug : id}});
    const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

    return this.transformResponse(sanitizedEntity);
  }}));
