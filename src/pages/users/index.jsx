import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Table } from 'antd'


const Users = () => {
    const [users, setUsers] = useState([])
    const token = window.localStorage.getItem("AuthToken")

    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            width: 100
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: 500,
        },
        {
            title: 'User',
            dataIndex: 'user',
            width: 200
        },
        {
            title: 'Email',
            dataIndex: 'email',
            width: 300
        },
        {
            title: 'Feedbacks',
            dataIndex: 'feedbacks',
            width: 250,
        },

    ];

    const data = users.map((item) => {
        return {
            id: item.id,
            name: item.name,
            user: item.user,
            email: item.email,
            feedbacks: <Link to={`/users/feedbacks/${item.id}`}>Go to Feedback</Link>
        }
    })

    useEffect(() => {
        axios
            .get("https://ka-users-api.herokuapp.com/users", {
                headers: {
                    Authorization: token
                }
            })
            .then((res) => setUsers(res.data))
    }, [])



    return (
        <>
            <h2 style={{ color: "white" }}>Alunos</h2>
            <Table size="default" columns={columns} dataSource={data} pagination={{ pageSize: 10 }} />,
        </>
    )
}

export default Users