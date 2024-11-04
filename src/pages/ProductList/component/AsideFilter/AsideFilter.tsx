import { createSearchParams, Link } from 'react-router-dom'
import path from '../../../../constants/path'
import Input from '../../../../components/Input'
import Button from '../../../../components/Button'
import { Category } from '../../../../types/category.type'
import { QueryConfig } from '../../ProductList'
import classNames from 'classnames'

interface Props {
  queryConfig: QueryConfig
  categories: Category[]
}

export default function AsideFilter({ queryConfig, categories }: Props) {
  const { category } = queryConfig
  return (
    <div className='py-4'>
      <Link to={path.home} className='flex items-center font-bold'>
        <svg viewBox='0 0 12 10' className='w-3 h-4 mr-3 fill-current'>
          <g fillRule='evenodd' stroke='none' strokeWidth={1}>
            <g transform='translate(-373 -208)'>
              <g transform='translate(155 191)'>
                <g transform='translate(218 17)'>
                  <path d='m0 2h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 6h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                  <path d='m0 10h2v-2h-2zm4 0h7.1519633v-2h-7.1519633z'></path>
                </g>
              </g>
            </g>
          </g>
        </svg>
        Tất cả danh mục
      </Link>
      <div className='br-gray-300 h-[1px] my-4'>
        <ul>
          {categories.map((categoryItem) => {
            const isActive = category === categoryItem._id
            return (
              <li className='py-2 pl-2' key={categoryItem._id}>
                <Link
                  to={{
                    pathname: path.home,
                    search: createSearchParams({
                      ...queryConfig,
                      category: categoryItem._id
                    }).toString()
                  }}
                  className={classNames('relative px-2', {
                    'font-semibold text-orange': isActive
                  })}
                >
                  {isActive && (
                    <svg viewBox='0 0 4 7' className='fill-orange h-2 w-2 absolute top-1 left-[-10px]'>
                      <polygon points='4 3.5 0 0 0 7'></polygon>
                    </svg>
                  )}
                  {categoryItem.name}
                </Link>
              </li>
            )
          })}
        </ul>
        <Link to={path.home} className='flex items-center font-bold mt-4 uppercase'>
          <svg
            enableBackground='new 0 0 15 15'
            viewBox='0 0 15 15'
            x='0'
            y='0'
            className='w-3 h-4 fill-current stroke-current mr-3'
          >
            <g>
              <polyline
                fill='none'
                points='5.5 13.2 5.5 5.8 1.5 1.2 13.5 1.2 9.5 5.8 9.5 10.2'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeMiterlimit={10}
              ></polyline>
            </g>
          </svg>
          Bộ lọc tìm kiếm
        </Link>
        <div className='bg-gray-300 h-[1px] my-4' />
        <div className='my-5'>
          <div>Khoảng giá</div>
          <form action='' className='mt-2'>
            <div className='flex items-start'>
              <Input
                type='text'
                className='grow'
                name='from'
                placeholder='₫ TỪ'
                classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              />
              <div className='mx-2 mt-2 shrink-0'>-</div>
              <Input
                type='text'
                className='grow'
                name='from'
                placeholder='₫ ĐẾN'
                classNameInput='p-1 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
              />
            </div>
            <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'>
              Áp dụng
            </Button>
          </form>
        </div>
        <div className='bg-gray-300 h-[1px] my-4' />
        <div className='text-sm'>Đánh giá</div>
        <ul className='my-3'>
          <li className='py-1 pl-2'>
            <Link to='' className='flex items-center text-sm'>
              Sao
              <span>Trở lên</span>
            </Link>
          </li>
        </ul>
        <div className='bg-gray-300 h-[1px] my-4'>
          <Button className='w-full p-2 uppercase bg-orange text-white text-sm hover:bg-orange/80 flex justify-center items-center'>
            Xóa tất cả
          </Button>
        </div>
      </div>
    </div>
  )
}
