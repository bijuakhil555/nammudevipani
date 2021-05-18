import React, { useEffect, useState } from 'react'
// import firebase from 'firebase/app';
import firebase from './Firebase'

import {isAuthenticated,authenticate,signOut} from './Auth'
import {Link,Redirect} from 'react-router-dom'
import { ProductConsumer } from '../Context'
// import { browserHistory } from 'react-router'

import Nav from '../nav'



export default function Login(props) {


    return (
        <>
            <div className="">
                <div>
                    <RenderForm />
                </div>
            </div>
        </>
    )
}


const RenderForm = () => {


    // declare variables to store form data
    const [values, setValues] = useState({
        otp: '',
        mobile: '',
        confirmationResult: '',
        c_error:'',
        redirectToReffer:false,
    })


    // hande form data change and set variable
    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value })
        console.log(values)
    }

    const redirectUser = ()=>{
        if(values.redirectToReffer){
            return <Redirect to='/'/>
            
        }
        if(isAuthenticated().phoneNumber){
            return <Redirect to='/'/>
        }
    }
    


    const getOtp = () => {
        let phoneNumber = "+91" + values.mobile
        let recaptcha = new firebase.auth.RecaptchaVerifier('recaptcha-container')
        
        firebase.auth().signInWithPhoneNumber(phoneNumber, recaptcha)
        .then(function (e) {
            
            setValues({ ...values, confirmationResult: e })
            console.log("OTP is sent");
            
        })
        .catch(function (error) {
            console.log(error);
            alert(error)
            
        });
    }


    const submitOTP = (e)=>{

        let code = values.otp
        values.confirmationResult.confirm(code).then((result)=>{
            console.log(result.user,"User")
            authenticate({
                phoneNumber : "+91" + values.mobile
            },()=>{
                e.trigger_init_user()
                e.trigger_init_address()
                setValues({
                    ...values,
                    redirectToReffer:true,
                })
            })

            
        }).catch(err=>{
            console.log("error")
            alert("error or wrong otp")

        })

    }



    return (
        <>

            {
                values.confirmationResult.length === 0 &&


                 < div className="">


<div class="container-login100" >
		<div class="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
			<form class="login100-form validate-form">
				<span class="login100-form-title p-b-37">
					Login
				</span>

				<div class="wrap-input100 validate-input m-b-20" data-validate="Enter username or email">
					
					<input className="input100"
                                           type="text" name="mobile"
                                           placeholder="Mobile Number"
                                           onChange={handleChange('mobile')}
                                           value={values.mobile}
                                           required/>
                    
                    
                    <span class="focus-input100"></span>

				</div>
                <div id="recaptcha-container"></div>

				<div class="container-login100-form-btn">
                <Link
                                        className='login100-form-btn'
                                        onClick={() => {
                                            getOtp()
                                        }}
                                    >Submit</Link>
					
				</div>

				
			</form>

			
		</div>
	</div> 

                </div>

            }
            


            {
                values.confirmationResult.length !== 0 &&
                <div className="row">

<div class="container-login100" >
		<div class="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
			<form class="login100-form validate-form">
				<span class="login100-form-title p-b-37">
					Login
				</span>

				<div class="wrap-input100 validate-input m-b-20" data-validate="Enter username or email">
                <input className="input100"
                                                       id="otp"
                                                       type="text"
                                                       name="otp"
                                                       placeholder="OTP"
                                                       onChange={handleChange('otp')}
                                                       value={values.otp}
                                                       required/>
					
                    
                    
                    <span class="focus-input100"></span>

				</div>
                <div id="recaptcha-container"></div>

				<div class="container-login100-form-btn">
                <ProductConsumer>
                                                    {(contextVal)=>{
                                                        return(
                                                            <div
                                                                onClick={()=>{submitOTP({
                                                                    trigger_init_user : contextVal.initCartItems,
                                                                    trigger_init_address:   contextVal.initUserAddress,
                                                                })}}
                                                                className="login100-form-btn"
                                                            >
                                                            Submit
                                                        </div>

                                                        )
                                                    }}
                                                </ProductConsumer>

                                                <div
                                                    onClick={() => {
                                                        setValues({...values, confirmationResult: ''})
                                                    }}
                                                    className="login100-form-btn"
                                                >
                                                    Retry
                                                </div>
					
				</div>

				
			</form>

			
		</div>
	</div> 

                    












                 
            </div>

            }
            <br /><br />
            {/* <div className="alert alert-warning">
                Fake Auth button -- for testing only &nbsp;
                <br /> Use when phone auth not work &nbsp;
            {
                
                !isAuthenticated().phoneNumber &&
                <div
                    onClick={()=>{
                        authenticate({
                            phoneNumber : "+91989898989"
                        },()=>{
                            setValues({
                                ...values,
                                redirectToReffer:true,
                            })
                        })
                    }}
                    className="btn btn-danger">
                    Login
                </div>
            }
            </div> */}

            {redirectUser()}

        </>
    )
}


