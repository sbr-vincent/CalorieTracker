import React from 'react'
import { useAuth0 } from '@auth0/auth0-react'

const LoginButton = () => {
    const { loginWithRedirect, isAuthenticated } = useAuth0();
    return (
        !isAuthenticated && (
            <div>
                <div className="row d-flex justify-content-center my-5" >
                    <button onClick={() => loginWithRedirect()} className="btn btn-outline-dark btn-lg text-center" style={{width: '25%'}}>
                        Login / Sign-Up
                    </button>
                </div>
                <div className="col-3 border border-dark text-center mx-auto">
                    <h2 className="border-bottom border-dark border-1">Nutrition Facts</h2>
                    <div>
                        <p>About 72 servings per container</p>
                        <div className="d-flex justify-content-between px-3 fw-bold border-bottom border-dark border-5">
                            <p>Serving Size</p>
                            <p>1 tsp (5mL)</p>
                        </div>
                    </div>
                    <div className="d-flex text-left">
                        <p >Amount Per Serving</p> 
                    </div>
                    <div className="d-flex justify-content-between px-3 fw-bold border-bottom border-dark border-3">
                            <h3>Calories</h3>
                            <h3>0</h3>
                    </div>
                    <div className="d-flex text-end border-bottom border-dark border-1">
                        <p> %Daily Value* </p> 
                    </div>
                    <div className="d-flex justify-content-between px-3 fw-bold border-bottom border-dark border-1">
                            <p>Total Fat <span className="fw-light">0g</span></p>
                            <h3>0%</h3>
                    </div>
                    <div className="d-flex justify-content-between px-3 fw-bold border-bottom border-dark border-1">
                            <p>Sodium <span className="fw-light">110mg</span></p>
                            <h3>5%</h3>
                    </div>
                    <div className="d-flex justify-content-between px-3 fw-bold border-bottom border-dark border-1">
                            <p>Total Carbohydrate <span className="fw-light">0g</span></p>
                            <h3>0%</h3>
                    </div>
                    <div className="d-flex justify-content-between px-3 fw-bold border-bottom border-dark border-5">
                            <p>Protein <span className="fw-light">0g</span></p>
                            <h3>0%</h3>
                    </div>
                    <div className="border-top border-dark border-5">
                            <p className="fw-light">Not a significant source of saturated fat, trans fat, cholesterol, dietary fiber, total sugars, added sugars, vitamin D, calcium,iron and potassium.</p>
                    </div>
                </div>
            </div>
        )
    )
}

export default LoginButton
