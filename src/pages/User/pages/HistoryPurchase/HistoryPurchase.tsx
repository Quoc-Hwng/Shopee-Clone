import { createSearchParams, Link, useNavigate } from 'react-router-dom'
import path from '../../../../constants/path'
import { PURCHASES_STATUS } from '../../../../constants/purchase'
import classNames from 'classnames'
import useQueryParams from '../../../../hooks/useQueryParams'
import { useMutation, useQuery } from '@tanstack/react-query'
import purchaseApi from '../../../../apis/purchase.api'
import { PurchaseListStatus } from '../../../../types/purchase.type'
import { formatCurrency, generateNameId } from '../../../../utils/utils'

const purchaseTabs = [
  { status: PURCHASES_STATUS.all, name: 'Tất cả' },
  { status: PURCHASES_STATUS.waitForConfirmation, name: 'Chờ xác nhận' },
  { status: PURCHASES_STATUS.waitForGetting, name: 'Chờ lấy hàng' },
  { status: PURCHASES_STATUS.inProgress, name: 'Đang giao' },
  { status: PURCHASES_STATUS.delivered, name: 'Đã giao' },
  { status: PURCHASES_STATUS.cancelled, name: 'Đã hủy' }
]

const BUY_COUNT = 1
export default function HistoryPurchase() {
  const queryParams: { status?: string } = useQueryParams()
  const status: number = Number(queryParams.status) || PURCHASES_STATUS.all

  const addToCartMutation = useMutation({
    mutationFn: purchaseApi.addToCart
  })
  const navigate = useNavigate()

  const { data: purchasesInStatusData } = useQuery({
    queryKey: ['purchases', { status }],
    queryFn: () => purchaseApi.getPurchase({ status: status as PurchaseListStatus })
  })

  const purchasesData = purchasesInStatusData?.data?.data?.filter((purchase) => purchase.status !== -1) || []

  const purchaseTabsLink = purchaseTabs.map((tab) => (
    <Link
      key={tab.status}
      to={{
        pathname: path.historyPurchase,
        search: createSearchParams({ status: String(tab.status) }).toString()
      }}
      className={classNames('flex flex-1 items-center justify-center border-b-2 bg-white py-4 text-center', {
        'border-b-orange text-orange': status === tab.status,
        'border-b-black/10 text-gray-900': status !== tab.status
      })}
    >
      {tab.name}
    </Link>
  ))

  const buyNow = async (productId: string) => {
    const res = await addToCartMutation.mutateAsync({ buy_count: BUY_COUNT, product_id: productId as string })
    const purchase = res.data.data
    navigate(path.cart, {
      state: {
        purchaseId: purchase?._id
      }
    })
  }

  return (
    <div>
      <div className='overflow-x-auto'>
        <div className='min-w-[700px]'>
          <div className='sticky top-0 flex rounded-t-sm shadow-sm'>{purchaseTabsLink}</div>
          <div>
            {purchasesData?.map((purchase) => (
              <div key={purchase._id} className='mt-4 rounded-sm border-black/10 bg-white p-6 text-gray-800 shadow-sm'>
                <Link
                  to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                  className='flex'
                >
                  <div className='flex-shrink-0'>
                    <img className='h-20 w-20 object-cover' src={purchase.product.image} alt={purchase.product.name} />
                  </div>
                  <div className='ml-3 flex-grow overflow-hidden'>
                    <div className='truncate'>{purchase.product.name}</div>
                    <div className='mt-3'>x{purchase.buy_count}</div>
                  </div>
                  <div className='ml-3 flex-shrink-0'>
                    <span className='truncate text-gray-500 line-through'>
                      ₫{formatCurrency(purchase.product.price_before_discount)}
                    </span>
                    <span className='ml-2 truncate text-orange'>₫{formatCurrency(purchase.product.price)}</span>
                  </div>
                </Link>
                <div className='flex justify-end gap-5 items-center'>
                  <div>
                    <span>Tổng giá tiền</span>
                    <span className='ml-4 text-xl text-orange'>
                      ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                    </span>
                  </div>
                  <button
                    onClick={() => buyNow(purchase.product._id)}
                    className='flex ml-4 h-12 min-w-[5rem] items-center justify-center rounded-sm bg-orange px-5 capitalize text-white shadow-sm outline-none hover:bg-orange/90'
                  >
                    Mua lại
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
