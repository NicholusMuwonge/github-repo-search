import React, { useState } from 'react'
import { Dropdown, Button, Space } from 'antd'
import { DownOutlined } from '@ant-design/icons'
import { orderOptions, sortDirectionOptions } from './Constants';

const styles = {
  container: {
    display: 'inline-block',
    width: '100%',
    margin: '1%',
  },
  resultTextStyle: { fontSize: 'medium', color: 'black' },
  sortOptionStyle: { padding: 5 },
}

/**
 * SortOptions Component
 *
 * @component
 * @param {Object} props - The properties of the SortOptions component.
 * @param {Object[]} props.options - The available sorting options.
 * @param {Function} props.onSelect - The callback function triggered on option selection.
 * @param {string} props.type - The type of sorting (e.g., 'Sort' or 'Order By').
 * @returns {React.Component} The rendered SortOptions component.
 */

const SortOptions = ({ options, onSelect, type }) => {
  const [selected, setSelected] = useState(options[0])
  const [label, setLabel] = useState(selected?.label)
  const handleMenuClick = (item) => {
    setSelected(item)
    onSelect(item)
    let labelMatched = options.filter((i) => i.key === item?.key)[0]
    setLabel(labelMatched?.label)
  }

  const menuProps = {
    items: options,
    onClick: handleMenuClick,
  }
  return (
    <Space wrap>
      <Dropdown menu={menuProps}>
        <Button>
          <Space>
            <b>{type}</b>:{label}
            <DownOutlined />
          </Space>
        </Button>
      </Dropdown>
    </Space>
  )
}

export const useSorter = () => {
  const [sortMethod, setsortMethod] = useState({
    sort: 'best match',
    order: 'desc',
  })

  const handleSortValueChange = (value) => {
    setsortMethod(value)
  }

  return {
    sortMethod,
    handleSortValueChange,
  }
}

/**
 * SortInfoSection Component
 *
 * @component
 * @param {Object} props - The properties of the SortInfoSection component.
 * @param {Function} props.handleSortValueChange - The callback function to handle sort value changes.
 * @param {Object} props.searchData - The data containing search results.
 * @param {Object} props.sortMethod - The current sorting method.
 * @returns {React.Component} The rendered SortInfoSection component.
 */

const SortInfoSection = ({ handleSortValueChange, searchData, sortMethod }) => {
  const sortOptionsProps = [
    {
      options: orderOptions,
      onSelect: (sort) => handleSortValueChange({ ...sortMethod, sort }),
      type: 'Sort',
    },
    {
      options: sortDirectionOptions,
      onSelect: (order) => handleSortValueChange({ ...sortMethod, order }),
      type: 'Order By',
    },
  ]
  return (
    <div style={styles.container}>
      <span style={styles.resultTextStyle}>
        Showing <b>{searchData?.search_results.total_count}</b> search results
      </span>

      <div>
        {sortOptionsProps.map((sortOption) => (
          <span style={styles.sortOptionStyle} key={sortOption.type}>
            <SortOptions
              options={sortOption?.options}
              onSelect={sortOption.onSelect}
              type={sortOption.type}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

export default SortInfoSection
