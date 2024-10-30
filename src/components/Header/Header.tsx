import { Link } from 'react-router-dom'
import Popover from '../Popover'
import { useMutation } from '@tanstack/react-query'
import { logout } from '../../apis/auth.api'
import { useContext } from 'react'
import { AppContext } from '../../contexts/app.context'

export default function Header() {
  const { isAuthenticated, setIsAuthenticated } = useContext(AppContext)
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      setIsAuthenticated(false)
    }
  })
  const handleLogout = () => {
    logoutMutation.mutate()
  }
  return (
    <div className='pb-5 pt-2  bg-[linear-gradient(-180deg,#f53d2d,#f63)]'>
      <div className='container'>
        <div className='flex justify-end'>
          <Popover
            className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
            renderPopover={
              <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
                <div className='flex flex-col py-2 pr-28 pl-3'>
                  <button className='py-2 px-3 hover:text-orange'>Tiếng Việt</button>
                  <button className='py-2 px-3 hover:text-orange'>Tiếng Anh</button>
                </div>
              </div>
            }
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1'>Tiếng Việt</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-6'
            >
              <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
            </svg>
          </Popover>
          {isAuthenticated && (
            <Popover
              className='flex items-center py-1 hover:text-gray-300 cursor-pointer ml-6'
              renderPopover={
                <div className='bg-white relative shadow-md rounded-sm border border-gray-200'>
                  <Link to='/' className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full'>
                    Tài khoản của tôi
                  </Link>
                  <Link to='/' className='block py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full'>
                    Đơn mua
                  </Link>
                  <button
                    onClick={handleLogout}
                    className='py-3 px-4 hover:bg-slate-100 bg-white hover:text-cyan-500 w-full text-left'
                  >
                    Đăng xuất
                  </button>
                </div>
              }
            >
              <div className='w-6 h-6 mr-2 flex-shrink-0'>
                <img
                  src='https://scontent.fsgn2-5.fna.fbcdn.net/v/t39.30808-1/448316774_3849390388626953_1805964275726886412_n.jpg?stp=cp0_dst-jpg_s40x40&_nc_cat=104&ccb=1-7&_nc_sid=0ecb9b&_nc_eui2=AeEgxLCWo07ZSRgexLzBvwYajicYnAq47UeOJxicCrjtR-gtMuMcDQc_8V7ZP85oWq7fxLJ0woXGkWqyGDOnnptZ&_nc_ohc=eArQE4uy5AAQ7kNvgFCZZIq&_nc_zt=24&_nc_ht=scontent.fsgn2-5.fna&_nc_gid=A4dbB7jFmiHWNuFUyqbZYvx&oh=00_AYC8Dnau6_ywP7nTOB-qxFVts-mhaiMRy6l_VvumYqvyzA&oe=672664DD'
                  alt='avatar'
                  className='w-full h-full object-cover rounded-full'
                />
              </div>
              <div className=''>phamquochung</div>
            </Popover>
          )}
          {!isAuthenticated && (
            <div className='flex items-center'>
              <Link to='/register' className='mx-3 capitalize hover:text-white/70'>
                Đăng ký
              </Link>
              <div className='border-r-[1px] border-r-white/40 h-4' />
              <Link to='/login' className='mx-3 capitalize hover:text-white/70'>
                Đăng nhập
              </Link>
            </div>
          )}
        </div>
        <div className='grid grid-cols-12 gap-4 mt-4 items-end'>
          <Link to='/' className='col-span-2'>
            <svg
              viewBox='0 0 1024 1024'
              version='1.1'
              xmlns='http://www.w3.org/2000/svg'
              width='54px'
              height='54px'
              className='fill-white'
              aria-label='temu'
              fill='#fb7701'
              stroke='none'
              strokeWidth='18.962962962962962'
            >
              <title>temu</title>
              <path d='M796.4 0c125.7 0 227.6 101.9 227.6 227.6l0 568.8c0 125.7-101.9 227.6-227.6 227.6l-568.8 0c-125.7 0-227.6-101.9-227.6-227.6l0-568.8c0-125.7 101.9-227.6 227.6-227.6l568.8 0z m-256 531.9l-13.6 0c-12.1 0-22 9.8-21.9 21.9l0 150.5c0 12.1 9.8 22 21.9 22 12.1 0 22-9.8 22-22l0-98.8 37 52.2c7.7 10.8 23.7 10.8 31.5 0l37-52.2 0 98.8c0 12.1 9.8 22 22 22 12.1 0 22-9.8 21.9-22l0-150.5c0-12.1-9.8-22-21.9-21.9l-13.6 0c-5.2 0-10.2 2.5-13.2 6.8l-47.9 72-48-72c-3-4.3-7.9-6.8-13.2-6.8z m340.2 0c-12.1 0-22 9.8-22 21.9l0 91.9c0 28.9-16.3 43.7-43.1 43.6-26.8 0-43.1-15.3-43-44.9l0-90.6c0-12.1-9.8-22-22-21.9-12.1 0-22 9.8-21.9 21.9l0 91.6c0 53.6 32.8 80.9 86.4 80.9 53.6 0 87.6-27 87.5-82.2l0-90.3c0-12.1-9.8-22-21.9-21.9z m-616.9 0l-128.3 0c-12.1 0-22 9.8-22 21.9 0 12.1 9.8 22 22 22l42.2 0 0 128.3c0 12.1 9.8 22 21.9 22 12.1 0 22-9.8 22-22l0-128.3 42.2 0c12.1 0 22-9.8 22-22 0-12.1-9.8-22-22-21.9z m189.9 0l-118.9 0c-12.1 0-22 9.8-22 21.9l0 150.3c0 12.1 9.8 22 22 22l118.9 0c12.1 0 22-9.8 21.9-22 0-12.1-9.8-22-21.9-22l-97 0 0-31.2 84.4 0c12.1 0 22-9.8 22-21.9 0-12.1-9.8-22-22-22l-84.4 0 0-31.2 97 0c12.1 0 22-9.8 21.9-22 0-12.1-9.8-22-21.9-21.9z m-214.5-229.4l-4.1 0.1c-17.1 1.1-28.8 8.5-35.4 18.5-7.7-11.5-22.1-19.6-43.8-18.4l-0.5 0.7c-2.5 4-11.9 21.9 3.3 41.4 3.1 3.3 10.7 12.6 7.6 24.5l-44.1 71.3c-3.6 5.8-2 13.3 3.5 17.2 11.4 8 34.3 19 74 19 39.6 0 62.5-11 73.9-19l1.5-1.3c4.3-4.1 5.2-10.7 2-15.9l-44-71.3 0.3 1.3-0.5-2c-2.4-10.7 3.6-19.2 6.9-23l0.8-0.8c15.3-19.5 5.8-37.3 3.3-41.4l-0.4-0.7-4.3-0.2z m142.8 33.4c-15.1-30-34.7-35.1-44.5-27.3-7.5 6-24.8 29.7-26 31.3-19.1 27.1-18 33.7 6.5 49.1 13.8 8.7 24.9-2.5 29.7-5.8-2.3 14.3-9.3 36.8-19.8 52.6-5.7-4.3-9.9-7.6-12.5-10-3.3-3-8.3-2.8-11.5 0.3-1.5 1.5-2.3 3.5-2.2 5.7 0.1 2.1 1 4.1 2.5 5.5 25.5 23.3 59 36.5 94.7 36.6 35.8 0 69.5-13.2 95-36.6 3.3-3 3.4-8 0.4-11.2-3.2-3.2-8.2-3.3-11.5-0.3-2 1.8-4 3.5-6.1 5.2l-11.2-25c-1.8-4.3-3.8-9.7-6-16.2 1.1-2.7 3.4-5.3 6.7-8.7 2.4-2.4 4.4-4.8 5.9-7.1 7.4-11.7 3.2-18.6 0.9-23.2-5.3-10.8-13.6-7.3-19.6-0.9-7.4 7.8-14.6 11.2-26.2 13.8-9.7 2.2-17.2 1.1-23.4-2.8-8.6-5.3-21.8-25-21.8-25z m277.3-30.5c-32 30.4-1.3 96.5-59.5 124.6-6.4 3.1-11.7-7.1-20.3-7.1-24.3 0.2-70.7 21.6-72.5 32.4-1.5 8.9 18.3 16 76.7 16.1 50.8 0 67.2-77.3 85-77.4 17.8 0 9.5 70.1 7.6 77.4l18.6 0c-1.6-7.3-2.8-29.3-2.7-60.4 0-31.1 5.6-38 10.1-61.5 3.9-20.4-26.3-38.1-43-44.1z m182.4 2.5l-52.1 0c-33.7 0-61.7 26.1-64 59.7l-3.8 53.9c-1.8 25.6 18.5 47.3 44.1 47.4l99.4 0c25.7 0 45.9-21.7 44.2-47.4l-3.8-53.9c-2.4-33.6-30.3-59.7-64-59.7z m-442.6 124c15.7 0 27.7 7.7 32.1 22-10.7 2.8-21.4 4.2-32.3 4.1-16.4 0-22.2-1.5-32.7-4.3 4.2-12.6 18.1-21.8 32.9-21.8z m392.9-79.3l0 1.5c0 13 10.6 23.7 23.6 23.7 13 0 23.7-10.6 23.7-23.7l0-1.5c0-5.8 21-5.8 21 0l0 1.5c0 24.6-20 44.6-44.7 44.6-24.6 0-44.6-20-44.6-44.6l0-1.5c0-5.8 20.9-5.8 21 0z' />
            </svg>
          </Link>
          <form className='col-span-9'>
            <div className='bg-white rounded-sm p-1 flex'>
              <input
                type='text'
                name='search'
                className='text-black px-3 py-2 flex-grow border-none outline-none bg-transparent'
                placeholder='Free Ship Đơn Từ 0Đ'
              />
              <button className='rounded-sm py-2 px-6 flex-shrink-0 bg-orange hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  stroke='currentColor'
                  className='size-6'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>
              </button>
            </div>
          </form>

          <Popover
            className='col-span-1 justify-self-end'
            renderPopover={
              <div className='bg-white relative shadow-md rounded-sm border border-gray-200 max-w-[400px] text-sm'>
                <div className='p-2'>
                  <div className='text-gray-400 capitalize'>Sản Phẩm Mới Thêm</div>
                  <div className='mt-5'>
                    <div className='mt-4 flex'>
                      <div className='flex-shrink-0'>
                        <img
                          src='https://i1.wp.com/laptopmedia.com/wp-content/uploads/2017/06/refurbished-macbook-pro-1.jpg?fit=2160%2C1601'
                          alt='anh'
                          className='w-11 h-11 object-cover'
                        />
                      </div>
                      <div className='flex-grow ml-2 overflow-hidden'>
                        <div className='truncate'>
                          [LIFEMCMBP2 -12% đơn 25M] Apple Macbook Pro M3 19 inch 2024 32GB - 1TB| Chính hãng Apple Việt
                          Nam
                        </div>
                      </div>
                      <div className='ml-2 flex-shrink-0'>
                        <div className='text-orange'>đ56.000.000</div>
                      </div>
                    </div>
                  </div>
                  <div className='flex mt-6 items-center justify-between'>
                    <div className='capitalize text-xs'>Thêm Hàng Vào Giỏ</div>
                    <button className='capitalize bg-orange hover:bg-opacity-80 px-4 py-2 rounded-sm text-white'>
                      Xem Giỏ Hàng
                    </button>
                  </div>
                </div>
              </div>
            }
          >
            <Link to='/'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='size-8'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
                />
              </svg>
            </Link>
          </Popover>
        </div>
      </div>
    </div>
  )
}
