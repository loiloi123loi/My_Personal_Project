import { Form, Input } from 'antd'

const FormRow = ({
    name,
    prefix,
    dependencies,
    rules,
    placeholder,
    type,
    hasFeedback,
    disabled,
}) => {
    return (
        <Form.Item
            name={name}
            dependencies={dependencies}
            rules={rules}
            hasFeedback={hasFeedback}
            validateDebounce={500}
        >
            <Input
                prefix={prefix}
                placeholder={placeholder}
                type={type ? type : ''}
                disabled={disabled}
            />
        </Form.Item>
    )
}

export default FormRow
