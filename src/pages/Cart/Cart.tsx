import { useQuery } from '@tanstack/react-query'
import { PURCHASES_STATUS } from '../../constants/purchase'
import { purchaseApi } from '../../apis/purchase.api'
import { Link } from 'react-router-dom'
import path from '../../constants/path'
import { formatCurrency, generateNameId } from '../../utils/utils'
import QuantityController from '../../components/QuantityController'
import Button from '../../components/Button'
import { Purchase } from '../../types/purchase.type'
import { useEffect, useState } from 'react'
import { produce } from 'immer'

interface ExtendedPurchase extends Purchase {
  disabled: boolean
  checked: boolean
}

export default function Cart() {
  const [extendedPurchases, setExtendedPurchases] = useState<ExtendedPurchase[]>([])
  const { data: purchaseInCartData } = useQuery({
    queryKey: ['purchases', { status: PURCHASES_STATUS.inCart }],
    queryFn: () => purchaseApi.getPurchase({ status: PURCHASES_STATUS.inCart })
  })
  const purchaseInCart = purchaseInCartData?.data.data
  const isAllChecked = extendedPurchases.every((purchase) => purchase.checked)
  useEffect(() => {
    setExtendedPurchases(
      purchaseInCart?.map((purchase) => ({
        ...purchase,
        disabled: false,
        checked: false
      })) || []
    )
  }, [purchaseInCart])

  const handleCheck = (productIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setExtendedPurchases(
      produce((draft) => {
        draft[productIndex].checked = event.target.checked
      })
    )
  }
  const handleCheckAll = () => {
    setExtendedPurchases((prev) =>
      prev.map((purchase) => ({
        ...purchase,
        checked: !isAllChecked
      }))
    )
  }
  return (
    <div className='bg-neutral-100 py-16'>
      <div className='container'>
        <div className='overflow-auto'>
          <div className='min-w-[1000px]'>
            <div className='grid grid-cols-12 rounded-sm bg-white py-5 px-9 test-sm capitalize text-gray-500 shadow'>
              <div className='col-span-6'>
                <div className='flex items-center'>
                  <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                    <input
                      type='checkbox'
                      className='size-5 accent-orange'
                      checked={isAllChecked}
                      onChange={handleCheckAll}
                    />
                  </div>
                  <div className='flex-grow text-black'>Sản phẩm</div>
                </div>
              </div>
              <div className='col-span-6'>
                <div className='grid-cols-5 grid text-center'>
                  <div className='col-span-2'>Đơn giá</div>
                  <div className='col-span-1'>Số lượng</div>
                  <div className='col-span-1'>Số tiền</div>
                  <div className='col-span-1'>Thao tác</div>
                </div>
              </div>
            </div>
            <div className='my-3 rounded-sm  shadow p-5 bg-white'>
              {extendedPurchases?.map((purchase, index) => (
                <div
                  className='grid grid-cols-12 text-center rounded-sm border border-gray-200 bg-white py-5 px-4 text-sm text-gray-500'
                  key={purchase._id}
                >
                  <div className='col-span-6'>
                    <div className='flex'>
                      <div className='flex flex-shrink-0 items-center justify-center pr-3'>
                        <input
                          type='checkbox'
                          className='size-5 accent-orange'
                          checked={purchase.checked}
                          onChange={handleCheck(index)}
                        />
                      </div>
                      <div className='flex-grow'>
                        <div className='flex'>
                          <Link
                            className='size-20 flex-shrink-0'
                            to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                          >
                            <img src={purchase.product.image} alt={purchase.product.name} />
                          </Link>
                          <div className='flex-grow px-2 pt-1 pb-2'>
                            <Link
                              className='line-clamp-2'
                              to={`${path.home}${generateNameId({ name: purchase.product.name, id: purchase.product._id })}`}
                            >
                              {purchase.product.name}
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='col-span-6 flex items-center'>
                    <div className='grid grid-cols-5 items-center'>
                      <div className='col-span-2'>
                        <div className='flex items-center justify-center gap-3'>
                          <span className='text-gray line-through'>
                            ₫{formatCurrency(purchase.product.price_before_discount)}
                          </span>
                          <span>₫{formatCurrency(purchase.product.price)}</span>
                        </div>
                      </div>
                      <div className='col-span-1'>
                        <QuantityController
                          max={purchase.product.quantity}
                          value={purchase.buy_count}
                          classNameWrapper='flex items-center'
                        />
                      </div>
                      <div className='col-span-1'>
                        <span className='text-orange'>
                          ₫{formatCurrency(purchase.product.price * purchase.buy_count)}
                        </span>
                      </div>
                      <div className='col-span-1'>
                        <button className='bg-non text-black transition-colors hover:text-orange'>Xóa</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className='sticky bottom-0 z-10 flex flex-col rounded-sm border border-gray-100 bg-white p-5 shadow sm:flex-row sm:items-center'>
          <div className='flex items-center w-full'>
            <div className='flex flex-shrink-0 items-center justify-center pr-3'>
              <input
                type='checkbox'
                className='size-5 accent-orange'
                checked={isAllChecked}
                onChange={handleCheckAll}
              />
            </div>
            <button className='mx-3 border-none bb-none transition-colors hover:text-orange'>
              Chọn tất cả ({purchaseInCart?.length})
            </button>
            <button className='mx-3 border-none bb-none transition-colors hover:text-orange'>Xóa</button>
            <div className='mt-5  flex-col sm:ml-auto sm:mt-0 sm:flex-row sm:items-center flex'>
              <div>
                <div className='flex items-center justify-end'>
                  <div className=''>Tổng thanh toán (0 sản phẩm):</div>
                  <div className='ml-2 text-2xl text-orange'>₫138000</div>
                </div>
                <div className='flex items-center justify-end text-sm '>
                  <div className='text-gray-500'>Tiết kiệm</div>
                  <div className='ml-6 text-orange'>₫139000</div>
                </div>
              </div>
              <Button className='mt-5 flex w-52 h-10 ml-4 items-center bg-red-500 text-sm justify-center uppercase text-white hover:bg-red-600 sm:ml-4 sm:mt-0'>
                Mua hàng
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
