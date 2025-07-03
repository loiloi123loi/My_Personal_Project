import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { cn } from '@/lib/utils'
import { format, isValid } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { Control } from 'react-hook-form'

const customStyles = `
  .react-datepicker {
    font-family: inherit;
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  }

  .dark .react-datepicker {
    background-color: #1f2937;
    border-color: #4b5563;
    color: #f3f4f6;
  }

  .react-datepicker__header {
    background-color: #f3f4f6;
    border-bottom: 1px solid #d1d5db;
    color: #111827;
  }

  .dark .react-datepicker__header {
    background-color: #374151;
    border-bottom: 1px solid #4b5563;
    color: #f3f4f6;
  }

  .react-datepicker__day,
  .react-datepicker__day-name {
    color: #111827;
  }

  .dark .react-datepicker__day,
  .dark .react-datepicker__day-name {
    color: #f3f4f6;
  }

  .react-datepicker__day:hover {
    background-color: #e5e7eb;
  }

  .dark .react-datepicker__day:hover {
    background-color: #374151;
  }

  .react-datepicker__day--selected,
  .react-datepicker__day--in-range,
  .react-datepicker__day--in-selecting-range {
    background-color: #3b82f6;
    color: #ffffff !important;
  }

  .dark .react-datepicker__day--selected,
  .dark .react-datepicker__day--in-range,
  .dark .react-datepicker__day--in-selecting-range {
    background-color: #2563eb;
  }

  .react-datepicker__day--range-start,
  .react-datepicker__day--range-end {
    background-color: #1d4ed8;
    color: #ffffff !important;
  }

  .react-datepicker__triangle {
    display: none;
  }

  .react-datepicker__input-container input {
    width: 100%;
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    background-color: #ffffff;
    color: #111827;
  }

  .dark .react-datepicker__input-container input {
    border-color: #4b5563;
    background-color: #1f2937;
    color: #f3f4f6;
  }

  .react-datepicker__month-select,
  .react-datepicker__year-select {
    background-color: #ffffff;
    border: 1px solid #d1d5db;
    border-radius: 0.25rem;
    padding: 0.25rem;
    color: #111827;
  }

  .dark .react-datepicker__month-select,
  .dark .react-datepicker__year-select {
    background-color: #374151;
    border-color: #4b5563;
    color: #f3f4f6;
  }

  .date-range-button {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
    padding: 0.5rem;
    border: 1px solid hsl(var(--input));
    border-radius: 0.375rem;
    background-color: transparent;
  }

  .dark .date-range-button {
    border-color: hsl(var(--input));
    background-color: transparent;
    color: #f3f4f6;
  }

  .react-datepicker-wrapper {
    width: 100%;
  }
`

interface DateRange {
  startDate?: string
  endDate?: string
}

interface DateRangePickerProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  label?: string
  placeholder?: string
}

const dateFormat = 'dd/MM/yyyy'

export function DateRangePicker({ name, control, label, placeholder }: DateRangePickerProps) {
  const [open, setOpen] = useState(false)

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const value: DateRange = field.value || { startDate: '', endDate: '' }
        const startDate = value.startDate ? new Date(value.startDate) : null
        const endDate = value.endDate ? new Date(value.endDate) : null

        return (
          <FormItem>
            <FormLabel className="block text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
              {label || name}
            </FormLabel>
            <style>{customStyles}</style>
            <div className="relative w-full">
              <DatePicker
                selectsRange
                startDate={startDate}
                endDate={endDate}
                onChange={(dates: [Date | null, Date | null]) => {
                  const [start, end] = dates
                  if (start && isValid(start) && (!end || isValid(end))) {
                    field.onChange({
                      startDate: start.toISOString(),
                      endDate: end ? end.toISOString() : ''
                    })
                  } else {
                    field.onChange({ startDate: '', endDate: '' })
                  }
                }}
                onCalendarOpen={() => setOpen(true)}
                onCalendarClose={() => setOpen(false)}
                open={open}
                customInput={
                  <Button
                    variant="outline"
                    className={cn(
                      'w-full justify-start text-left font-normal date-range-button',
                      !value.startDate && !value.endDate && 'text-muted-foreground',
                      'bg-transparent border-0 p-0'
                    )}
                    onClick={() => setOpen(!open)}
                  >
                    <CalendarIcon className="h-4 w-4 flex-shrink-0" />
                    <span className={`truncate ${!value.startDate && !value.endDate ? 'text-muted-foreground' : ''}`}>
                      {value.startDate && value.endDate
                        ? `${format(new Date(value.startDate), dateFormat)} ~ ${format(
                            new Date(value.endDate),
                            dateFormat
                          )}`
                        : placeholder || `${dateFormat} ~ ${dateFormat}`}
                    </span>
                  </Button>
                }
                monthsShown={1}
                dateFormat={dateFormat}
                popperPlacement="bottom-start"
                className="text-gray-900 dark:text-gray-100"
              />
            </div>
            <FormMessage />
          </FormItem>
        )
      }}
    />
  )
}
