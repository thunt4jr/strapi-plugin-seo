import MetaRobotsInput from './components/CustomFields/MetaRobotsInput';
import MetaViewportInput from './components/CustomFields/MetaViewportInput';

const registerCustomFields = ({ strapi }) => {
  // This registers our custom fields to be used with specific field types
  // in specific content types or components
  strapi.customFields.register({
    name: 'metaRobots',
    pluginId: 'seo',
    type: 'enumeration', 
    intlLabel: {
      id: 'seo.metaRobots.label',
      defaultMessage: 'Meta Robots',
    },
    intlDescription: {
      id: 'seo.metaRobots.description',
      defaultMessage: 'Choose robot directives to control how search engines interact with your page',
    },
    components: {
      Input: MetaRobotsInput,
    },
  });

  strapi.customFields.register({
    name: 'metaViewport',
    pluginId: 'seo',
    type: 'enumeration',
    intlLabel: {
      id: 'seo.metaViewport.label',
      defaultMessage: 'Meta Viewport',
    },
    intlDescription: {
      id: 'seo.metaViewport.description',
      defaultMessage: 'Choose viewport settings for responsive behavior',
    },
    components: {
      Input: MetaViewportInput,
    },
  });
};

export default registerCustomFields;