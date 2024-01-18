import styled from 'styled-components'

const Wrapper = styled.div`
    background-color: #000;
    height: 100vh;
    width: 100%;

    p {
        line-height: 3;
        margin: 0 2rem;
        color: var(--primary-100);
    }
    a {
        width: 100%;
        color: var(--primary-100);
        text-transform: capitalize;
        line-height: 3;
        margin: 0 2rem;
    }

    #loader-container {
        display: inline-block;
        max-width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    #loader path:nth-child(2) {
        stroke-dasharray: 200%;
        stroke-dashoffset: 200%;
        animation: strokeAnimate 2s 0s ease forwards;
    }

    #loader path:nth-child(3) {
        stroke-dasharray: 100%;
        stroke-dashoffset: 100%;
        animation: strokeAnimate 2s 0.3s ease forwards;
    }
    #loader path:nth-child(4) {
        stroke-dasharray: 100%;
        stroke-dashoffset: 100%;
        animation: strokeAnimate 2s 0.9s ease forwards;
    }
    #loader path:nth-child(5) {
        stroke-dasharray: 100%;
        stroke-dashoffset: 100%;
        animation: strokeAnimate 2s 1.2s ease forwards;
    }
    #loader path:nth-child(6) {
        stroke-dasharray: 100%;
        stroke-dashoffset: 100%;
        animation: strokeAnimate 2s 1.5s ease forwards;
    }
    #loader path:nth-child(7) {
        stroke-dasharray: 100%;
        stroke-dashoffset: 100%;
        animation: strokeAnimate 2s 1.8s ease forwards;
    }
    #loader path:nth-child(8) {
        stroke-dasharray: 100%;
        stroke-dashoffset: 100%;
        animation: strokeAnimate 2s 2.1s ease forwards;
    }

    @keyframes strokeAnimate {
        to {
            stroke-dashoffset: 0;
        }
    }

    @media screen and (max-width: 768px) {
        #loader-container {
            max-width: 150px;
        }
        #loader {
            width: 150px;
        }
    }

    @media screen and (max-width: 650px) {
        #loader-container {
            max-width: 100px;
        }
        #loader {
            width: 100px;
        }
    }
`

export default Wrapper
