import { Purchase, PurchaseListStatus } from '../types/purchase.type'
import { SuccessResponse } from '../types/utils.type'
import http from '../utils/http'

const URL = 'purchases'

export const purchaseApi = {
  addToCart: (body: { product_id: string; buy_count: number }) =>
    http.post<SuccessResponse<Purchase>>(`${URL}/add-to-cart`, body),
  getPurchase: (params: { status: PurchaseListStatus }) => http.get<SuccessResponse<Purchase[]>>(URL, { params }),
  buyProducts(body: { product_id: string; buy_count: number }[]) {
    return http.post<SuccessResponse<Purchase[]>>(`${URL}/buy-products`, body)
  },
  updatePurchase(body: { product_id: string; buy_count: number }) {
    return http.put<SuccessResponse<Purchase>>(`${URL}/update-purchase`, body)
  },
  deletePurchase(purchaseIds: string[]) {
    return http.delete<SuccessResponse<{ delete_count: number }>>(`${URL}`, {
      data: purchaseIds
    })
  }
}

export default purchaseApi
