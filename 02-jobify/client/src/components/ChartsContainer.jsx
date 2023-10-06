import Wrapper from '../assets/wrappers/ChartsContainer'
import BarChart from './BarChart'
import AreaChart from './AreaChart'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const ChartsContainer = () => {
    const [isBarChart, setIsBarChart] = useState(true)
    const { monthlyApplications: data } = useSelector((store) => store.allJobs)

    return (
        <Wrapper>
            <h4>Monthly Applications</h4>
            <button type="button" onClick={() => setIsBarChart(!isBarChart)}>
                {isBarChart ? 'Area Chart' : 'Bar Chart'}
            </button>
            {isBarChart ? <BarChart data={data} /> : <AreaChart data={data} />}
        </Wrapper>
    )
}

export default ChartsContainer
