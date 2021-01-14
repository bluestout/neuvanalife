/**
 * @type {?Number|String} ipAddress - force ip to use for dev server
 * @type {?Boolean} external - if no ip is provided use first external address
 * @type {?Boolean|String} interface - use a specific network interface by name, otherwise first interface is selected
 */
module.exports = {
  network: {
    ipAddress: 'localhost',
    external: false,
    interface: false,
  },
  themes: {
    development: {
      id: '82028003446',
      password: '45a6c936994beac03d4ac5b325864028',
      store: 'neuvanalife.myshopify.com',
      ignore: [
        'settings_data.json',
      ],
    },
    staging: {
      id: '82137284726',
      password: '45a6c936994beac03d4ac5b325864028',
      store: 'neuvanalife.myshopify.com',
      ignore: [
        'settings_data.json',
      ],
    },
  },
};
