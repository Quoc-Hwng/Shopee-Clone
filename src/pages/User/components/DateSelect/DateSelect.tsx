import range from 'lodash/range'
import { useEffect, useState } from 'react'

interface Props {
  onChange?: (value: Date) => void
  value?: Date
  errorMessage?: string
}
const YEAR_NOW = new Date().getFullYear() + 1
export default function DateSelect({ value, onChange, errorMessage }: Props) {
  const [date, setDate] = useState({
    date: value?.getDate() ?? 1,
    month: value?.getMonth() ?? 0,
    year: value?.getFullYear() ?? 1990
  })

  useEffect(() => {
    if (value) {
      setDate({
        date: value?.getDate(),
        month: value?.getMonth(),
        year: value?.getFullYear()
      })
    }
  }, [value])

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: valueFromSelect, name } = event.target
    const newDate = {
      date: value?.getDate() ?? date.date,
      month: value?.getMonth() ?? date.month,
      year: value?.getFullYear() ?? date.year,
      [name]: valueFromSelect
    }
    setDate(newDate)
    if (onChange) {
      onChange(new Date(newDate.year, newDate.month, newDate.date))
    }
  }

  return (
    <div className='mt-6 flex flex-wrap flex-col sm:flex-row'>
      <div className='sm:w-[20%] truncate pt-3 sm:text-right capitalize'>Ngày sinh</div>
      <div className='sm:w-[80%] px-5'>
        <div className='flex justify-between'>
          <select
            onChange={handleChange}
            name='date'
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-orange focus:border-orange'
            value={value?.getDate() ?? date.date}
          >
            <option disabled>Ngày</option>
            {range(1, 32).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-orange focus:border-orange'
            name='month'
            value={value?.getMonth() ?? date.month}
          >
            <option disabled>Tháng</option>
            {range(0, 12).map((item) => (
              <option className='focus:ring-blue-500 focus:border-blue-500' value={item} key={item}>
                {item + 1}
              </option>
            ))}
          </select>
          <select
            onChange={handleChange}
            className='h-10 w-[32%] rounded-sm border border-black/10 px-3 hover:border-orange focus:border-orange'
            name='year'
            value={value?.getFullYear() ?? date.year}
          >
            <option disabled>Năm</option>
            {range(1990, YEAR_NOW).map((item) => (
              <option value={item} key={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
        <div className='mt-1 text-red-600 min-h-[1.25rem] text-sm'>{errorMessage}</div>
      </div>
    </div>
  )
}
