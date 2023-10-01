import { ForkOutlined, SortAscendingOutlined, SortDescendingOutlined, StarOutlined } from "@ant-design/icons";
import {
  EyeOutlined,
  GithubOutlined,
} from '@ant-design/icons'

export const orderOptions = Object.freeze([
  { label: 'Best Match', key: 'best match' },
  {
    label: 'Stars',
    key: 'stars',
    icon: <StarOutlined key={'star-gazers'} />,
  },
  {
    label: 'Forks',
    key: 'forks',
    icon: <ForkOutlined key={'forks'} />,
  },
  {
    label: 'Help Wanted Issues',
    key: 'help-wanted-issues',
  },
  { label: 'Updated', key: 'updated' },
])

export const sortDirectionOptions = Object.freeze([
  { label: 'Descending', key: 'desc', icon: <SortAscendingOutlined /> },
  { label: 'Ascending', key: 'asc', icon: <SortDescendingOutlined /> },
])

export const cardActionOptions = (starCount, forksCount, watchersCount, url) => Object.freeze([
  <div>
    <StarOutlined key={'star-gazers'} /> <b>{starCount}</b>
  </div>,
  <div>
    <ForkOutlined key={'forks'} /> <b>{forksCount}</b>
  </div>,
  <div>
    <EyeOutlined key={'watchers'} /> <b>{watchersCount}</b>
  </div>,
  <a href={url} target="_blank">
    Visit <GithubOutlined key={'forks'} />{' '}
  </a>,
])

export const PAGE_SIZE_OPTIONS = Object.freeze([10, 20])
export const MAX_RESULT_COUNT = 1000
export const DEFAULT_PAGE_SIZE = 10
export const DEFAULT_PAGE = 1
