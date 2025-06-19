import { RegisterOptions, UseFormRegister } from 'react-hook-form'

interface IInputFormItemProps {
  name: string
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  register: UseFormRegister<any>
  error?: string
  rules?: RegisterOptions
}

const InputFormItem = ({
  label,
  type = 'text',
  name,
  placeholder,
  required,
  register,
  error,
  rules
}: IInputFormItemProps) => {
  if (required && !rules?.required) {
    rules = { ...rules, required: `${label} không được để trống` }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">
        {label}
      </label>
      <input
        type={type}
        id={name}
        className={`w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-1 ${
          error ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
        }`}
        placeholder={placeholder}
        required={required}
        {...register(name, rules)}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
}

export default InputFormItem
