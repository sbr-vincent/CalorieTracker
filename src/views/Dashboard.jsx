import React, {useEffect, useState} from 'react'
import { useHistory } from "react-router-dom"
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

const Dashboard = () => {

    const { logout, isAuthenticated } = useAuth0();
    const [remove, removeAuthor] = useState(false)
    const [users, setUsers] = useState([])
    const history = useHistory()


    const deleteHandler = (id) => {
        console.log("DELETING ID:", id)
        axios.delete(`http://localhost:8000/api/trackers/${id}`)
            .then(res => removeAuthor(!remove))
            .catch(err => console.log(err))
    }

    const createHandler = () => {
        history.push(`/new`)
    }

    const detailHandler = (id) => {
        history.push(`/trackers/${id}`)
    }

    useEffect(() => {
        axios.get("http://localhost:8000/api/trackers")
        .then(res => setUsers(res.data))
        .catch(err => console.log(err))
    }, [remove])

    return (
        isAuthenticated && (
            <div className="col-4 text-center mx-auto">
                <fieldset>
                    <legend></legend>
                    <button onClick={() => logout()} className="btn btn-outline-dark">
                        Log Out
                    </button>
                    <button onClick={() => createHandler()} className="btn btn-outline-primary m-3">Add User</button> 
                    <h1 className="border rounded-pill bg-warning">List of Users</h1>
                    <hr></hr>
                    {
                        users.map((user, idx) => {
                            return (
                                <div key={idx}>
                                    <p>
                                        {user.name}
                                        <button onClick={() => detailHandler(user._id)} className="btn btn-outline-success mx-3">Details</button>
                                        <button onClick={() => deleteHandler(user._id)} className="btn btn-outline-danger mx-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                            </svg>
                                            Remove User
                                        </button>
                                    </p>
                                </div>
                            )
                        })
                    }
                </fieldset>
            </div>
        )
    )
}

export default Dashboard