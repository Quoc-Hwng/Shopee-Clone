import { createSearchParams, Link } from 'react-router-dom'
import classNames from 'classnames'
import { QueryConfig } from '../../pages/ProductList/ProductList'
import path from '../../constants/path'

interface Props {
  queryConfig: QueryConfig
  pageSize: number
}

const RANGE = 2 //Áp dụng cho khoảng cách đầu, cuối và xung quanh current_page
export default function Pagination({ queryConfig, pageSize }: Props) {
  const page = Number(queryConfig.page)
  const renderPagination = () => {
    let dotAfter = false
    let dotBefore = false
    const renderDotAfter = (index: number) => {
      if (!dotAfter) {
        dotAfter = true
        return (
          <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border' key={index}>
            ...
          </span>
        )
      }
    }
    const renderDotBefore = (index: number) => {
      if (!dotBefore) {
        dotBefore = true
        return (
          <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border' key={index}>
            ...
          </span>
        )
      }
    }
    return Array(pageSize)
      .fill(0)
      .map((_, index) => {
        const pageNumber = index + 1
        //Điều kiện để return ...
        if (page <= RANGE * 2 + 1 && pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
          return renderDotAfter(index)
        } else if (page > RANGE * 2 + 1 && page < pageSize - RANGE * 2) {
          if (pageNumber < page - RANGE && pageNumber > RANGE) {
            return renderDotBefore(index)
          } else if (pageNumber > page + RANGE && pageNumber < pageSize - RANGE + 1) {
            return renderDotAfter(index)
          }
        } else if (page >= pageSize - RANGE - RANGE * 2 && pageNumber > RANGE && pageNumber < page - RANGE) {
          return renderDotBefore(index)
        }
        return (
          <Link
            to={{
              pathname: path.home,
              search: createSearchParams({
                ...queryConfig,
                page: String(pageNumber)
              }).toString()
            }}
            className={classNames('bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border', {
              'border-cyan-500': pageNumber === page,
              'border-transparent': pageNumber !== page
            })}
            key={index}
          >
            {pageNumber}
          </Link>
        )
      })
  }
  return (
    <div className='flex flex-wrap mt-6 justify-center'>
      {page === 1 ? (
        <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 border'>Prev</span>
      ) : (
        <Link
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page - 1).toString()
            }).toString()
          }}
        >
          Prev
        </Link>
      )}
      {renderPagination()}
      {page === pageSize ? (
        <span className='bg-white rounded px-3 py-2 shadow-sm mx-2 border'>Next</span>
      ) : (
        <Link
          className='bg-white rounded px-3 py-2 shadow-sm mx-2 cursor-pointer border'
          to={{
            pathname: path.home,
            search: createSearchParams({
              ...queryConfig,
              page: (page + 1).toString()
            }).toString()
          }}
        >
          Next
        </Link>
      )}
    </div>
  )
}
