import { yupResolver } from '@hookform/resolvers/yup'
import omit from 'lodash/omit'
import { createSearchParams, useNavigate } from 'react-router-dom'
import useQueryConfig from './useQueryConfig'
import { useForm } from 'react-hook-form'
import { schema, Schema } from '../utils/rules'
import path from '../constants/path'

type FormData = Pick<Schema, 'name'>
const nameSchema = schema.pick(['name'])

export default function useSearchProducts() {
  const queryConfig = useQueryConfig()
  const { register, handleSubmit } = useForm<FormData>({
    defaultValues: {
      name: ''
    },
    resolver: yupResolver(nameSchema)
  })
  const navigate = useNavigate()
  const onSubmitSearch = handleSubmit((data) => {
    const config = queryConfig.order
      ? omit({ ...queryConfig, name: data.name, page: '1' }, ['order', 'sort_by'])
      : { ...queryConfig, name: data.name, page: '1' }
    navigate({
      pathname: path.home,
      search: createSearchParams(config).toString()
    })
  })
  return { onSubmitSearch, register }
}
