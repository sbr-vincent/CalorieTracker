import React, { useState, useEffect } from 'react'
import { useParams, useHistory} from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import axios from "axios"

const Update = () => {

    const {id} = useParams()
    const history = useHistory()
    const { logout, isAuthenticated } = useAuth0();

    const [formState, setformState] = useState({
        name: "",
        weight: "",
        height: "",
        goal: "",
        quote: "",
    })

    const [validState, setValidState] = useState({})

    const dashHandler = () => {
        history.push(`/list`)
    }

    const changeHandler = (e) => {
        const {name, value} = e.target;
        setformState({
            ...formState,
            [name] : value
        })
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.put(`http://localhost:8000/api/trackers/${id}/edit`, formState)
            .then(res => {
                console.log(res.data)
                history.push(`/trackers/${id}`)
            })
            .catch(err => {
                console.log("CATCH: ", err.response.data)
                const {errors} = err.response.data
                let errorObj = {}
                for(let [key,value] of Object.entries(errors)){
                    errorObj[key] = value.message
                }
                console.log(errorObj)
                setValidState(errorObj)
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/trackers/${id}`)
            .then(res => {
                console.log(res.data)
                setformState(res.data)})
            .catch(err => console.log(err))
        
    }, [])

    return (
        <div className="col-4 text-center mx-auto">
            <fieldset>
                <legend></legend>
                <button onClick={() => logout()} className="btn btn-outline-dark m-3">
                        Log Out
                    </button>
                <button onClick={() => dashHandler()} className="btn btn-outline-primary m-3">Dashboard</button> 
                <hr></hr>
                <h1 className="border rounded-pill bg-warning">Update User Info</h1>
                <hr></hr>
                <form onSubmit={submitHandler} className="mb-4">
                    <p>
                        Name:
                        <input type="text" name="name" onChange={changeHandler} value={formState.name}/>
                        {(validState.name) ? <p style={{color: "red"}}>{validState.name}</p> : null }
                    </p>
                    <p>
                        Weight lbs:
                        <input type="number" name="weight" onChange={changeHandler} value={formState.weight}/>
                        {(validState.weight) ? <p style={{color: "red"}}>{validState.weight}</p> : null }
                    </p>
                    <p>
                        Height in:
                        <input type="number" name="height" onChange={changeHandler} value={formState.height}/>
                        {(validState.height) ? <p style={{color: "red"}}>{validState.height}</p> : null }
                    </p>
                    <p>
                        Weight Goal:
                        <input type="number" name="goal" onChange={changeHandler} value={formState.goal}/>
                        {(validState.goal) ? <p style={{color: "red"}}>{validState.goal}</p> : null }
                    </p>
                    <p>
                        Personal Quote (Optional):
                    </p>
                    <p>
                        <textarea type="text" row="5" col="40" name="quote" onChange={changeHandler} value={formState.quote}/>
                    </p>
                    <button type="submit" className="btn btn-outline-primary">Update</button>
                </form>
            </fieldset>
        </div>
    )
}

export default Update