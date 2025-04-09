import React from 'react';
import { useIntl } from 'react-intl';
import { Select, Option } from '@strapi/design-system';
import { useContentManagerEditViewDataManager } from '@strapi/strapi/admin';
import { getTrad } from '../../../utils/getTrad';

const metaRobotsOptions = [
  { value: 'noindex, nofollow', label: 'No Index, No Follow' },
  { value: 'noindex, follow', label: 'No Index, Follow' },
  { value: 'index, nofollow', label: 'Index, No Follow' },
  { value: 'index, follow', label: 'Index, Follow' },
  { value: 'noarchive', label: 'No Archive' },
  { value: 'nosnippet', label: 'No Snippet' },
  { value: 'noimageindex', label: 'No Image Index' },
  { value: 'nositelinkssearchbox', label: 'No Sitelinks Search Box' }
];

const MetaRobotsInput = ({ onChange, name, value, intlLabel, required }) => {
  const { formatMessage } = useIntl();
  const { modifiedData, layout } = useContentManagerEditViewDataManager();

  return (
    <Select
      id={name}
      name={name}
      value={value || ''}
      onChange={(value) => {
        onChange({ target: { name, value } });
      }}
      required={required}
      label={formatMessage(intlLabel)}
      placeholder={formatMessage({
        id: getTrad('SEO.input.metaRobots.placeholder'),
        defaultMessage: 'Select robots directives'
      })}
    >
      {metaRobotsOptions.map(option => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default MetaRobotsInput;