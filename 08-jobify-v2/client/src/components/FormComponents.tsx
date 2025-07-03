import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Control } from 'react-hook-form'

interface CustomFormFieldProps {
  name: string
  labelText?: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  placeholder?: string
}

export function CustomFormField({ name, labelText, control, placeholder }: CustomFormFieldProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="capitalize">{labelText || name}</FormLabel>
          <FormControl>
            <Input {...field} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export interface CustomFormSelectItem {
  label: string
  value: string
}

interface CustomFormSelectProps {
  name: string
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>
  items: CustomFormSelectItem[]
  labelText?: string
  hideLabel?: boolean
  onChange?: (value: string) => void
}

export function CustomFormSelect({
  name,
  control,
  items,
  labelText,
  hideLabel = false,
  onChange
}: CustomFormSelectProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {!hideLabel && <FormLabel className="capitalize">{labelText || name}</FormLabel>}
          <Select
            onValueChange={(value) => {
              field.onChange(value)
              onChange?.(value)
            }}
            value={field.value}
          >
            <FormControl>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {items.map((item) => {
                return (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                )
              })}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
