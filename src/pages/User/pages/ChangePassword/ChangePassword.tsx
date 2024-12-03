import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import Button from '../../../../components/Button'
import Input from '../../../../components/Input'
import { userSchema } from '../../../../utils/rules'
import { UserSchema } from '../../../../utils/rules'
import { isAxiosUnprocessableEntityError } from '../../../../utils/utils'
import { toast } from 'react-toastify'
import omit from 'lodash/omit'
import { ErrorResponse, NoUndefinedField } from '../../../../types/utils.type'
import { useMutation } from '@tanstack/react-query'
import userApi from '../../../../apis/user.api'
import { ObjectSchema } from 'yup'

type FormData = NoUndefinedField<Pick<UserSchema, 'password' | 'new_password' | 'confirm_password'>>
const passwordSchema = userSchema.pick(['password', 'new_password', 'confirm_password'])

export default function ChangePassword() {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    reset
  } = useForm<FormData>({
    defaultValues: {
      password: '',
      confirm_password: '',
      new_password: ''
    },
    resolver: yupResolver<FormData>(passwordSchema as ObjectSchema<FormData>)
  })
  const updateProfileMutation = useMutation({
    mutationFn: userApi.updateProfile
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await updateProfileMutation.mutateAsync(omit(data, ['confirm_password']))
      toast.success(res.data.message)
      reset()
    } catch (error) {
      if (isAxiosUnprocessableEntityError<ErrorResponse<FormData>>(error)) {
        const formError = error.response?.data.data
        if (formError) {
          Object.keys(formError).forEach((key) => {
            setError(key as keyof FormData, {
              message: formError[key as keyof FormData],
              type: 'Server'
            })
          })
        }
      }
    }
  })

  return (
    <div className='rounded-sm bg-white px-2 pb-10 shadow md:px-7 md:pb-20'>
      <div className='border-b border-b-gray-200 py-6'>
        <h1 className='text-lg font-medium capitalize text-gray-900'>Hồ sơ của tôi</h1>
        <div className='mt-1 text-sm text-gray-700'>Quản lý thông tin hồ sơ để bảo mật tài khoản</div>
      </div>
      <form className='mt-8 mr-auto max-w-2xl' onSubmit={onSubmit}>
        <div className='mt-6 flex-grow md:pr-12 md:mt-0'>
          <div className='mt-6 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Mật khẩu cũ</div>
            <div className='sm:w-[80%] px-5'>
              <Input
                classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                className='relative'
                name='password'
                register={register}
                type='password'
                placeholder='Mật khẩu cũ'
                errorMessage={errors.password?.message}
              />
            </div>
          </div>
          <div className='mt-6 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Mật khẩu mới</div>
            <div className='sm:w-[80%] px-5'>
              <Input
                classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                className='relative'
                name='new_password'
                type='password'
                register={register}
                placeholder='Mật khẩu mới'
                errorMessage={errors.new_password?.message}
              />
            </div>
          </div>
          <div className='mt-6 flex flex-wrap flex-col sm:flex-row'>
            <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Nhập lại mật khẩu mới</div>
            <div className='sm:w-[80%] px-5'>
              <Input
                classNameInput='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                className='relative'
                name='confirm_password'
                type='password'
                register={register}
                placeholder='Nhập lại mật khẩu'
                errorMessage={errors.confirm_password?.message}
              />
            </div>
          </div>

          <div className=''>
            <Button
              className='flex h-9 items-center bg-orange px-5 text-center text-sm text-white hover:bg-orange/80'
              type='submit'
            >
              Lưu
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
