import styled from 'styled-components'

const Wrapper = styled.section`
    display: flex;
    height: 100vh;
    .slider-item {
    }
    .slider-item img {
        height: 100vh;
    }
    .carousel {
        display: none;
        width: 65vw;
    }
    .welcome {
        display: block;
        margin: auto;
        padding: 20px;
    }
    .welcome-line {
        display: flex;
        justify-content: center;
        width: 100%;
    }
    .welcome-line div {
        margin: 1rem 0;
        width: 100px;
    }
    @media (min-width: 1111px) {
        .carousel {
            display: block;
        }
    }
    @media (max-width: 1111px) and (min-width: 550px) {
        .welcome {
            padding: 100px;
        }
    }
    @media (max-width: 550px) {
        .welcome {
            padding: 20px;
        }
    }
`

export default Wrapper
