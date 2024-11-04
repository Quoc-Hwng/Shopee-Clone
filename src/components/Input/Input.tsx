import { InputHTMLAttributes } from 'react'
import { UseFormRegister, FieldValues, FieldPath } from 'react-hook-form'

interface Props<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  errorMessage?: string
  classNameInput?: string
  classNameError?: string
  register?: UseFormRegister<T>
  name: FieldPath<T>
}
export default function Input<T extends FieldValues>(props: Readonly<Props<T>>) {
  const {
    errorMessage,
    className,
    name,
    register,
    classNameInput = 'p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm',
    classNameError = 'mt-1 text-red-600 min-h-[1.25rem] text-sm',
    ...rest
  } = props
  const registerResult = register && name ? register(name) : {}
  return (
    <div className={className}>
      <input className={classNameInput} {...registerResult} {...rest} />
      <div className={classNameError}>{errorMessage}</div>
    </div>
  )
}
