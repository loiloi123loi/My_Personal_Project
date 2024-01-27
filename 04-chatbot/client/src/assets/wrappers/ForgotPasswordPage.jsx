import styled from 'styled-components'

const Wrapper = styled.main`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    .form {
        max-width: 600px;
        min-width: 350px;
        border-radius: 10px;
        border: solid #ccc 2px;
        padding: 20px 50px 0 50px;
    }
    .login-form-forgot {
        float: right;
    }
    .ant-col-rtl .login-form-forgot {
        float: left;
    }
    .login-form-button {
        width: 100%;
    }
    .title {
        text-align: center;
    }
`

export default Wrapper
