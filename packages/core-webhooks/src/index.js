'use strict';

const WebhookManager = require('./manager')
const database = require('./database')

/**
 * [plugin description]
 * @type {Object}
 */
exports.plugin = {
  pkg: require('../package.json'),
  defaults: require('./defaults.json'),
  alias: 'webhooks',
  register: async (manager, hook, options) => {
    manager.get('logger').info('Starting Webhooks...')

    await database.init(options.database)

    const webhookManager = new WebhookManager(options)
    await webhookManager.init(options)

    return WebhookManager.getInstance()
  },
  bindings: {
    webhookDB: database
  }
}
