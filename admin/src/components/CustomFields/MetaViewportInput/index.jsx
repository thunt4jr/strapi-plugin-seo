import React from 'react';
import { useIntl } from 'react-intl';
import { Select, Option } from '@strapi/design-system';
import { useContentManagerEditViewDataManager } from '@strapi/strapi/admin';
import { getTrad } from '../../../utils/getTrad';

const viewportOptions = [
  { 
    value: 'width=device-width, initial-scale=1', 
    label: 'Responsive (Default)' 
  },
  { 
    value: 'width=device-width, initial-scale=1, maximum-scale=1', 
    label: 'Responsive with Maximum Scale' 
  },
  { 
    value: 'width=device-width, initial-scale=1, user-scalable=no', 
    label: 'Responsive without User Scaling' 
  },
  { 
    value: 'width=device-width, initial-scale=1, shrink-to-fit=no', 
    label: 'Responsive with No Shrinking' 
  }
];

const MetaViewportInput = ({ onChange, name, value, intlLabel, required }) => {
  const { formatMessage } = useIntl();
  const { modifiedData, layout } = useContentManagerEditViewDataManager();

  return (
    <Select
      id={name}
      name={name}
      value={value || viewportOptions[0].value}
      onChange={(value) => {
        onChange({ target: { name, value } });
      }}
      required={required}
      label={formatMessage(intlLabel)}
      placeholder={formatMessage({
        id: getTrad('SEO.input.metaViewport.placeholder'),
        defaultMessage: 'Select viewport settings'
      })}
    >
      {viewportOptions.map(option => (
        <Option key={option.value} value={option.value}>
          {option.label}
        </Option>
      ))}
    </Select>
  );
};

export default MetaViewportInput;