import { Result } from 'antd'

const ResultDisplay = ({ icon, status, title, subTitle, extra }) => {
    return (
        <Result
            icon={icon}
            status={status}
            title={title}
            extra={extra}
            subTitle={subTitle}
        />
    )
}

export default ResultDisplay
