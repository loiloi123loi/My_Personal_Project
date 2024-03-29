import styled from 'styled-components'

const Wrapper = styled.div`
    .my_sider {
        overflow: auto;
        height: 100vh;
        position: fixed;
        left: 0px;
        top: 0px;
        bottom: 0px;
        flex: 0 0 200px;
        max-width: 200px;
        min-width: 200px;
        width: 200px;
        padding-left: 2px;
    }

    .logo {
        color: rgb(255, 255, 255);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 40px 10px 20px;
        font-weight: bold;
        position: fixed;
        z-index: 1;
        width: 190px;
        background-color: rgb(0, 21, 41);
    }

    .logo img {
        width: 50px;
    }

    .sider_menu {
        margin-top: 70px;
        padding-bottom: 50px;
    }

    .my_cre {
        color: rgb(255, 255, 255);
        bottom: 0;
        position: fixed;
        padding: 10px 10px 15px 10px;
        font-weight: bold;
        width: 190px;
        background-color: rgb(0, 21, 41);
    }

    .profile-btn {
        color: rgb(255, 255, 255);
        margin-bottom: 10px;
        width: 100%;
        display: flex;
        align-items: center;
        background-color: rgb(0, 21, 41);
        flex: 3;
    }

    .profile-btn span {
        color: rgb(255, 255, 255);
    }

    .profile-btn:hover {
        background-color: rgb(0, 21, 41);
    }

    .my_cre p {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .container {
        margin: 0 0 0 200px;
    }

    .container p {
        font-size: 16px;
        line-height: 1.5;
    }

    .my_sider:hover::-webkit-scrollbar-thumb {
        background-color: rgba(217, 217, 227, 0.4);
    }

    .chat_loading {
        margin: 15px 100px 0;
        overflow: initial;
    }

    .chat_in_the_end {
        margin: 15px 100px 80px;
        overflow: initial;
    }

    .chat_item_block {
        padding: 10px;
        text-align: center;
    }

    .chat_form_area {
        margin: 0px 16px;
        position: fixed;
        overflow: auto;
        left: 200px;
        right: 0px;
        bottom: 0px;
        display: flex;
        justify-content: center;
        background-color: rgb(245, 245, 245);
        max-height: 150px;
    }

    .form_chat {
        display: flex;
        gap: 10px;
        justify-content: center;
        margin: 10px;
        width: 50%;
        border-radius: 8px;
    }

    .form_chat_item {
        flex-grow: 1;
        overflow-y: auto;
        border-radius: 8px;
        border: 1px solid rgb(204, 204, 204);
    }

    ::-webkit-scrollbar {
        width: 8px;
    }

    ::-webkit-scrollbar-thumb {
        background-color: #001529;
        border-radius: 9999px;
    }

    ::-webkit-scrollbar-track {
        /* Màu sắc của phần bên trong thanh cuộn */
    }

    ::-webkit-scrollbar-thumb:hover {
        background-color: rgba(217, 217, 227, 0.8);
    }
`

export default Wrapper
