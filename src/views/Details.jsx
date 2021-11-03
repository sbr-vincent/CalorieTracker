import React, {useEffect, useState}from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

const Details = () => {

    const {id} = useParams()
    const history = useHistory()
    const [remove, removeItem] = useState(false)
    const { logout, isAuthenticated } = useAuth0();
    const [validState, setValidState] = useState({})
    const [userState, setUserState] = useState(null)
    const [foodState, setFoodState] = useState(false)
    const [exerciseState, setExerciseState] = useState(false)

    const [formState, setformState] = useState({
        foodItem: "",
        calorie: "",
    })

    const [formExerciseState, setformExerciseState] = useState({
        activity: "",
        calorie: "",
    })

    const dashHandler = () => {
        history.push(`/list`)
    }

    const updateHandler = () => {
        history.push(`/trackers/${id}/edit`)
    }

    const addHandler = () => {
        setFoodState(true)
        console.log(userState.food)
        console.log("foodstate:", foodState)
    }

    const addExerciseHandler = () => {
        setExerciseState(true)
        console.log("exerciseState:", exerciseState)
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

    const changeExerciseHandler = (e) => {
        const {name, value} = e.target;
        console.log("Banana")
        console.log(value)

        if(value === 'true'){
            console.log("I'm Boolean")
            setformExerciseState({
                ...formExerciseState,
                [name] : false
            })
        }else if (value === 'false'){
            console.log("I'm Boolean")
            setformExerciseState({
                ...formExerciseState,
                [name] : true
            })
        }
        else{
            console.log("Bloop")
            setformExerciseState({
                ...formExerciseState,
                [name] : value
            })
        }
    }

    const deleteHandler = (deleteItem, id) => {
        console.log("DELETING ID:", id)
        console.log("DELETING Item:", deleteItem)
        if(deleteItem.activity){
            console.log("Activity!!")
            axios.delete(`http://localhost:8000/api/trackers/exercise/${id}`)
                .then(res => {
                    axios.put(`http://localhost:8000/api/trackers/${userState._id}/edit`, {base: (userState.base - parseInt(deleteItem.calorie))})
                        .then(res => {
                            setUserState(res.data)
                            removeItem(!remove)
                        })
                })
                .catch(err => console.log(err))
        }
        else{
            console.log("FoodItem!!")
            axios.delete(`http://localhost:8000/api/trackers/food/${id}`)
                .then(res => {
                    console.log("deleteItem", deleteItem.calorie)
                    axios.put(`http://localhost:8000/api/trackers/${userState._id}/edit`, {base: (userState.base + parseInt(deleteItem.calorie))})
                        .then(res => {
                            setUserState(res.data)
                            removeItem(!remove)
                        })
                })
                .catch(err => console.log(err))
        }
    }

    const submitHandler = e => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/trackers/food/${userState._id}`, formState)
            .then(res => {
                console.log(res.data)
                setFoodState(false)
                setExerciseState(false)
                setformState({foodItem: '', calorie: ''})
                // foodCountState(foodCount - parseInt(formState.calorie))
                axios.put(`http://localhost:8000/api/trackers/${id}/edit`, {base: (userState.base - parseInt(formState.calorie))})
                    .then(res => {
                        console.log(res.data)
                        setUserState(res.data)
                })
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

    const submitExerciseHandler = e => {
        e.preventDefault();
        axios.post(`http://localhost:8000/api/trackers/exercise/${userState._id}`, formExerciseState)
            .then(res => {
                console.log(res.data)
                setExerciseState(false)
                setFoodState(false)
                setformExerciseState({activity: '', calorie: ''})
                axios.put(`http://localhost:8000/api/trackers/${id}/edit`, {base: (userState.base + parseInt(formExerciseState.calorie))})
                    .then(res => {
                        console.log(res.data)
                        setUserState(res.data)
                })
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

    useEffect(() => {
        axios.get(`http://localhost:8000/api/trackers/${id}`)
            .then(res => setUserState(res.data))
            .catch(err => console.log(err))
    }, [remove, foodState, userState, exerciseState])

    return (
        <div className="col-6 text-center mx-auto">
            {
                (userState) ?
                <fieldset>
                    <legend></legend>
                    <button onClick={() => logout()} className="btn btn-outline-dark m-3">
                        Log Out
                    </button>
                    <button onClick={() => dashHandler()} className="btn btn-outline-primary m-3">Dashboard</button> 
                    <button onClick={() => updateHandler()} className="btn btn-outline-warning m-3">Settings</button> 

                    <div> 
                        <h1 className="border rounded-pill bg-warning">Hello, {userState.name}</h1>
                        <h4>Remaining Calories for the Day: 
                            {
                                (userState.base > 0)? <span className="fs-2 text-success"> {userState.base} </span>: <span className="fs-2 text-danger"> {userState.base} </span>
                            }
                        </h4>
                            
                        <h5>Personal Quote: "{userState.quote}"</h5>
                    

                        {
                            (foodState)? 
                            <form onSubmit={submitHandler} className="d-flex justify-content-center mt-4">
                                <p className="me-3">
                                    Food Item:
                                    <input type="text" name="foodItem" onChange={changeHandler} value={formState.foodItem}/>
                                    {(validState.foodItem) ? <p style={{color: "red"}}>{validState.foodItem}</p> : null }
                                </p>
                                <p className="me-3">
                                    Calories:
                                    <input type="number" name="calorie" onChange={changeHandler} value={formState.calorie}/>
                                    {(validState.calorie) ? <p style={{color: "red"}}>{validState.calorie}</p> : null }
                                </p>
                                <button type="submit" className="btn btn-primary h-25">Add</button>
                            </form> :
                            <button onClick={() => addHandler()} className="btn btn-primary h-25">Add Food</button>
                        }

                        {
                            (exerciseState)? 
                            <form onSubmit={submitExerciseHandler} className="d-flex justify-content-center mt-3">
                                <p className="me-3">
                                    Exercise:
                                    <input type="text" name="activity" onChange={changeExerciseHandler} value={formExerciseState.activity}/>
                                    {(validState.activity) ? <p style={{color: "red"}}>{validState.activity}</p> : null }
                                </p>
                                <p className="me-3">
                                    Calories:
                                    <input type="number" name="calorie" onChange={changeExerciseHandler} value={formExerciseState.calorie}/>
                                    {(validState.calorie) ? <p style={{color: "red"}}>{validState.calorie}</p> : null }
                                </p>
                                <button type="submit" className="btn btn-primary h-25">Add</button>
                            </form> :
                            <button onClick={() => addExerciseHandler()} className="btn btn-primary h-25 ms-3">Add Exercise</button>
                        }
                    </div>
                    <hr></hr>

                    <div className="d-flex justify-content-around mt-4">
                        <div className="me-5">
                            <h4>Foods</h4>
                            <ul className="list-unstyled">
                                {
                                    userState.food.map((food, idx) => {
                                        return (
                                            <li key={idx} className="d-flex justify-content-between mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                                                </svg> {food.foodItem} {food.calorie}
                                                <button onClick={() => deleteHandler(food, food._id)} className="btn btn-outline-danger mx-3"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                    </svg> Delete
                                                </button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>

                        <div className="ms-5">
                            <h4>Exercises</h4>
                            <ul className="list-unstyled">
                                {
                                    userState.exercise.map((exercise, idx) => {
                                        return (
                                            <li key={idx} className="d-flex justify-content-between mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-caret-right" viewBox="0 0 16 16">
                                                    <path d="M6 12.796V3.204L11.481 8 6 12.796zm.659.753 5.48-4.796a1 1 0 0 0 0-1.506L6.66 2.451C6.011 1.885 5 2.345 5 3.204v9.592a1 1 0 0 0 1.659.753z" />
                                                </svg>{exercise.activity} {exercise.calorie}
                                                <button onClick={() => deleteHandler(exercise, exercise._id)} className="btn btn-outline-danger mx-3"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                                    <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                                                    </svg> Delete
                                                </button>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        
                    </div>
                </fieldset> : <h1>Loading...</h1>
            }

        </div>
    )
}

export default Details