import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

const Create = () => {

    const history = useHistory()

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
        console.log("Banana")
        console.log(value)

        if(value === 'true'){
            console.log("I'm Boolean")
            setformState({
                ...formState,
                [name] : false
            })
        }else if (value === 'false'){
            console.log("I'm Boolean")
            setformState({
                ...formState,
                [name] : true
            })
        }
        else{
            console.log("Bloop")
            setformState({
                ...formState,
                [name] : value
            })
        }
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/trackers/new", formState)
            .then(res => {
                console.log(res.data)
                history.push("/list")
            })
            .catch(err => {
                // console.log("CATCH: ", err.response.data)
                const {errors} = err.response.data
                let errorObj = {}
                for(let [key,value] of Object.entries(errors)){
                    errorObj[key] = value.message
                }
                console.log(errorObj)
                setValidState(errorObj)
            })
    }

    return (
        <div className="col-4 text-center mx-auto">
            <fieldset>
                <legend></legend>
                <button onClick={() => dashHandler()} className="btn btn-outline-primary mb-3">Dashboard</button> 
                <h1 className="border rounded-pill bg-warning">Add User</h1>
                <hr></hr>
                <form onSubmit={submitHandler}>
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
                    <button type="submit" className="btn btn-outline-primary">Add a User</button>
                </form>
            </fieldset>
        </div>
    )
}

export default Create