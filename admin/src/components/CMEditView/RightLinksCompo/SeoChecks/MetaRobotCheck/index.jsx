import * as React from 'react';
import { useIntl } from 'react-intl';

import isEqual from 'lodash/isEqual';
import isNull from 'lodash/isNull';
import isEmpty from 'lodash/isEmpty';

import { Box, Status, Flex, Typography } from '@strapi/design-system';
import { CheckCircle, WarningCircle } from '@strapi/icons';

import { SEOAccordion } from '../SEOAccordion';
import { SeoCheckerContext } from '../../Summary';

import { getTrad } from '../../../../../utils/getTrad';
import { qualityVerdict } from '../../../utils/checks';

const robotTags = [
  { name: 'noindex', message: 'Search engines will index this page.' },
  {
    name: 'nofollow',
    message: 'Search engines will follow links from this page',
  },
  { name: 'noarchive', message: 'Search engines will cache your page.' },
  {
    name: 'nosnippet',
    message: 'Search engines will show a snippet of this page in search results.',
  },
  {
    name: 'noimageindex',
    message: 'Google will index the images on this page.',
  },
  {
    name: 'nositelinkssearchbox',
    message: 'Google will show the search box in search results.',
  },
];

export const MetaRobotCheck = ({ metaRobots, checks }) => {
  const { formatMessage } = useIntl();
  const dispatch = React.useContext(SeoCheckerContext);

  let status = {
    message: formatMessage({
      id: getTrad('SEOChecks.metaRobotsCheck.default'),
      defaultMessage: 'Robot meta tags have been found!',
    }),
    qualityVerdict: qualityVerdict.good,
  };
  const [tags, setTags] = React.useState([]);

  React.useEffect(() => {
    if (isNull(metaRobots) || isEmpty(metaRobots)) {
      status = {
        message: formatMessage({
          id: getTrad('SEOChecks.metaRobotsCheck.not-found'),
          defaultMessage: 'No Robot meta tags have been found.',
        }),
        qualityVerdict: qualityVerdict.good,
      };
    } else {
      setTags(metaRobots.split ? metaRobots.split(',') : [metaRobots]);
    }
    if (!isEqual(status, checks.metaRobots))
      dispatch({
        type: 'UPDATE_PONCTUAL',
        value: { ...status, entity: 'metaRobots' },
      });
  }, []);

  return (
    <SEOAccordion
      title={formatMessage({
        id: getTrad('SEOModal.summary-title.meta-robots'),
        defaultMessage: 'Meta Robots',
      })}
      status={checks.metaRobots}
      label={formatMessage({
        id: getTrad('SEOChecks.metaRobotsCheck.label'),
        defaultMessage:
          'The robots meta tag informs search engines which pages on your site should be indexed and more.',
      })}
      component={
        <Box padding={2} background="neutral100">
          {robotTags.map((tag, index) => (
            <Flex spacing={2} key={index} horizontal padding={2}>
              {tags.some(x => (x.trim ? x.trim() : x) === tag.name) ? (
                <CheckCircle aria-hidden={true} fill={`success600`} />
              ) : (
                <WarningCircle aria-hidden={true} fill={`warning600`} />
              )}

              <Typography paddingLeft={1}>
                {tags.some(x => (x.trim ? x.trim() : x) === tag.name)
                  ? `${tag.name} is activated:
          ${tag.message.replace('will', 'will not')}`
                  : `${tag.name} is disabled: ${tag.message}`}
              </Typography>
            </Flex>
          ))}
          <Flex spacing={2} paddingTop={4} paddingLeft={2} paddingRight={2} paddingBottom={4}>
            <Status variant="secondary" showBullet={false}>
              <Typography>
                <Typography fontWeight="bold">Notice: </Typography>
                In order to not index your entry and no follow, your MetaRobots field should contain
                the following:
                <Typography fontWeight="bold"> noindex, nofollow </Typography>. The rest should be
                handled by your front-end code logic. "If the field contains noindex, then you need
                to create the corresponding meta tag etc..."
              </Typography>
            </Status>
          </Flex>
        </Box>
      }
    />
  );
};