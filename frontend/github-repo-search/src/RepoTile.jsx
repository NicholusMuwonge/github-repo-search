import React from 'react'
import { Avatar, Card, Empty, Skeleton, Typography } from 'antd'
import { cardActionOptions } from './Constants';
const { Meta } = Card
const { Text } = Typography

const styles = {
  cardStyle: {
    width: '700px',
    marginTop: 16,
    maxWidth: '700px',
  },
  cardBodyStyle: { display: 'flex', alignItems: 'flex-start' },
  repoDisplaySectionStyle: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
}

/**
 * RepoTile Component
 *
 * @component
 * @param {Object} props - The properties of the RepoTile component.
 * @param {string} props.repoName - The name of the repository.
 * @param {boolean} [props.loading=true] - Loading state indicator.
 * @param {string} props.repoDescription - The description of the repository.
 * @param {string} props.ownerAvatarUrl - The URL of the owner's avatar.
 * @param {number} [props.starCount=0] - The count of stars the repository has.
 * @param {number} [props.forksCount=0] - The count of forks the repository has.
 * @param {number} [props.watchersCount=0] - The count of watchers the repository has.
 * @param {string} props.url - The URL of the repository.
 * @returns {React.Component} The rendered RepoTile component.
 */

export const RepoTile = ({
  repoName,
  loading = true,
  repoDescription,
  ownerAvatarUrl,
  starCount = 0,
  forksCount = 0,
  watchersCount = 0,
  url,
}) => {
  return (
    <>
      <Card
        style={styles.cardStyle}
        bodyStyle={styles.cardBodyStyle}
        actions={cardActionOptions(starCount, forksCount, watchersCount, url)}
      >
        <Skeleton loading={loading} avatar active>
          <Meta
            style={{ wordWrap: 'break-word', overflow: 'auto' }}
            avatar={
              <Avatar
                src={
                  ownerAvatarUrl ??
                  'https://xsgames.co/randomusers/avatar.php?g=pixel&key=2'
                }
              />
            }
            title={<div style={{ textAlign: 'left' }}>{repoName}</div>}
            description={
              <Text
                style={{ textAlign: 'left' }}
                ellipsis
              >
                {repoDescription}
              </Text>
            }
          />
        </Skeleton>
      </Card>
    </>
  )
}

/**
 * RepoDisplaySection Component
 *
 * @component
 * @param {Object} props - The properties of the RepoDisplaySection component.
 * @param {Object} props.data - The data containing search results.
 * @param {boolean} props.loading - Loading state indicator.
 * @param {string} props.searchQuery - The search query used to fetch the data.
 * @returns {React.Component} The rendered RepoDisplaySection component.
 */

const RepoDisplaySection = ({ data, loading, searchQuery }) => {
  return (
    <div style={styles.repoDisplaySectionStyle}>
      {data?.search_results?.total_count && searchQuery
        ? data?.search_results.items?.map((repo) => (
            <RepoTile
              key={repo?.full_name}
              repoName={repo?.full_name}
              loading={loading}
              repoDescription={repo?.description}
              ownerAvatarUrl={repo?.owner?.avatar_url}
              starCount={repo?.stargazers_count}
              forksCount={repo?.forks_count}
              watchersCount={repo?.watchers_count}
              url={repo?.html_url}
            />
          ))
        : null}

      {data?.search_results?.total_count === 0 && searchQuery ? (
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
      ) : null}
    </div>
  )
}

export default RepoDisplaySection
