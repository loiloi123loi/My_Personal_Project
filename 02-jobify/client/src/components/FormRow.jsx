const FormRow = ({
    type,
    name,
    value,
    handleChange,
    labelText,
    required,
    accept,
    disabled,
}) => {
    return (
        <div className="form-row">
            <label htmlFor={name} className="form-label">
                {labelText || name}
            </label>
            <input
                id={name}
                type={type}
                name={name}
                value={value}
                onChange={handleChange}
                required={required}
                accept={accept}
                disabled={disabled}
                className="form-input"
            />
        </div>
    )
}

export default FormRow
