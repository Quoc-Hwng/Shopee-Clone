import { Link } from 'react-router-dom'
import path from '../../../../constants/path'
import { useContext } from 'react'
import { AppContext } from '../../../../contexts/app.context'
import userImage from '../../../../assets/images/user.svg'

export default function UserSideNav() {
  const { profile } = useContext(AppContext)
  return (
    <>
      <div className='flex items-center border-b border-b-gray-200 py-4'>
        <Link to={path.profile} className='size-12 flex-shrink-0 overflow-hidden rounded-full bprder border-black/10'>
          <img src={profile?.avatar || userImage} alt={profile?.email} className='size-full object-cover' />
        </Link>
        <div className='flex-grow pl-4'>
          <div className='mb-1 truncate font-semibold text-gray-600'>SanSan</div>
          <Link to={path.profile} className='flex items-center capitalize text-gray-500'>
            <svg
              width={12}
              height={12}
              viewBox='0 0 12 12'
              xmlns='http://www.w3.org/2000/svg'
              style={{ marginRight: 4 }}
            >
              <path
                d='M8.54 0L6.987 1.56l3.46 3.48L12 3.48M0 8.52l.074 3.428L3.46 12l6.21-6.18-3.46-3.48'
                fill='#9B9B9B'
                fillRule='evenodd'
              />
            </svg>
            Sửa hồ sơ
          </Link>
        </div>
      </div>
      <div className='mt-7 flex flex-col gap-4'>
        <Link to={path.profile} className='flex items-center capitalize text-orange transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className='size-full' />
          </div>
          Tài khoản của tôi
        </Link>
        <Link to={path.profile} className='flex items-center capitalize text-orange transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/ba61750a46794d8847c3f463c5e71cc4' alt='' className='size-full' />
          </div>
          Đổi mật khẩu
        </Link>
        <Link to={path.profile} className='flex items-center capitalize text-orange transition-colors'>
          <div className='mr-3 h-[22px] w-[22px]'>
            <img src='https://cf.shopee.vn/file/f0049e9df4e536bc3e7f140d071e9078' alt='' className='size-full' />
          </div>
          Đơn mua
        </Link>
      </div>
    </>
  )
}
