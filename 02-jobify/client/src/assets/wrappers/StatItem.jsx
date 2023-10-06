import styled from 'styled-components'

const Wrapper = styled.article`
    padding: 2rem;
    background: var(--background-secondary-color);
    border-bottom: 5px solid ${(props) => props.color};
    border-radius: var(--border-radius);
    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .count {
        display: block;
        font-weight: 700;
        font-size: 50px;
        color: ${(props) => props.color};
        line-height: 2;
    }
    .title {
        margin: 0.5rem 0px 0px;
        text-transform: capitalize;
        letter-spacing: var(--letter-spacing);
        text-align: left;
        font-size: 1.25rem;
    }
    .icon {
        width: 70px;
        height: 60px;
        background: ${(props) => props.bcg};
        border-radius: var(--borderRadius);
        display: flex;
        align-items: center;
        justify-content: center;
        svg {
            font-size: 2rem;
            color: ${(props) => props.color};
        }
    }
`

export default Wrapper
