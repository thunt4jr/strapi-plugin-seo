import { Search } from '@strapi/icons';

import pluginPkg from '../../package.json';
import { Initializer } from './components/Initializer';
import { SeoChecker } from './components/CMEditView/RightLinksCompo';
import { pluginPermissions } from './permissions';
import registerCustomFields from './customFields';

import { pluginId } from './pluginId';
import { prefixPluginTranslations } from './utils/prefixPluginTranslations';

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.addMenuLink({
      to: `${pluginId}`,
      icon: Search,
      permissions: pluginPermissions.main,
      intlLabel: {
        id: `${pluginId}.plugin.name`,
        defaultMessage: 'SEO',
      },
      Component: () => import('./pages/App'),
    });
    app.registerPlugin({
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    });
  },
  bootstrap(app) {    
    registerCustomFields({ strapi: app });
    
    app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
      name: 'SeoChecker',
      Component: SeoChecker,
    });
  },
  async registerTrads(app) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};