import React from 'react'
import './main.css'

const Demo=()=> {
    return (
        <div>
            <div class="container-login100" >
		<div class="wrap-login100 p-l-55 p-r-55 p-t-80 p-b-30">
			<form class="login100-form validate-form">
				<span class="login100-form-title p-b-37">
					Login
				</span>

				<div class="wrap-input100 validate-input m-b-20" data-validate="Enter username or email">
					<input class="input100" type="text" name="username" placeholder="username or email"/>
					<span class="focus-input100"></span>
				</div>

				<div class="wrap-input100 validate-input m-b-25" data-validate = "Enter password">
					<input class="input100" type="password" name="pass" placeholder="password"/>
					<span class="focus-input100"></span>
				</div>

				<div class="container-login100-form-btn">
					<button class="login100-form-btn">
						Submit
					</button>
				</div>

				
			</form>

			
		</div>
	</div> 
        </div>
    )
}

export default  Demo
