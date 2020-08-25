import React from 'react'
import Logout from '../logout'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'
import './index.css'

const Header = ({ isAutheticated }) => {
    return (
        <div className="menu">
            {
                isAutheticated ?
                    (
                        <Menu mode="horizontal">
                            <Menu.Item key="mail" >
                                <Link to="/users">Alunos</Link>
                            </Menu.Item>
                            <Menu.Item key="app" >
                                <Logout />
                            </Menu.Item>
                        </Menu>
                    )
                    :
                    (
                        <Menu mode="horizontal">
                            <Menu.Item key="mail" >
                                <Link to="/new-account">Novo Usuário</Link>
                            </Menu.Item>
                            <Menu.Item key="app" >
                                <Link to="/">Login</Link>
                            </Menu.Item>
                        </Menu>
                    )

            }


        </div>
    )
}


export default Header