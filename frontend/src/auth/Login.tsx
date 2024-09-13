

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import useToast from "../hooks/useToast";
import InputCtrl from "../controllers/InputCtrl";
import { AppDispatch } from "../redux/store";
import { loginAuth } from "../redux/actions/user";
import { Button } from "react-bootstrap";

const Login = () => {

  const dispatch = useDispatch<AppDispatch>();
  const { showToast } = useToast();
  const [hidePassword, setHidePassword] = useState(true);
  const navigate = useNavigate()

  const defaultValues: any = {
    email: "",
    password: "",
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      ...defaultValues,
    },
    mode: "onBlur",
  });

  const showError = (_fieldName: string): any => {
    const keyList: Array<string> = _fieldName.split(".");
    const [key1, key2] = keyList;
    let error;
    if (key1 && key2) {
      const errorObj = (errors as any)[key1];
      error = errorObj ? errorObj[key2] : null;
    } else if (key1) {
      error = (errors as any)[key1];
    }
    return error ? error.message || "Field is required" : null;
  };

  const onSubmit = async (data: any) => {

    const payload = {
      email: data?.email,
      password: data?.password
    }
    dispatch(loginAuth(payload)).then((res:any)=>{
      if (res?.status === 200 && res?.data?.token) {
        navigate("/")
      }
    })
  };
  const togglePasswordVisibility = (type: string) => {
    if (type === "password") setHidePassword(!hidePassword);
  }



  return (
    <>
      {/* { <Navigate to={redirectUrl}></Navigate>} */}

      <div className={`container-fluid `}>

        <div className="login-page h-100 ">
          <div className="d-flex flex-column align-items-center justify-content-center p-2 shadow rounded">
            <div className="form col-md-5 col-sm-8 col-12 ">

              <div className="header text-center">

                <h2> Login</h2>
                <h6>Welcome back</h6>
              </div>
              <form
                className="w-100 text-start"
                autoComplete="off"
                onSubmit={handleSubmit(onSubmit)}
              >
                {/* <form action="" className="text-white"> */}
                <div className="mb-3">
                  <div className="input-container">
                    <InputCtrl
                      control={control}
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Email address"
                      label="Email address"
                      showError={showError}
                      required={true}
                      disabled={false}
                      className=""
                      componentName="Email"
                    />
                    <i
                      className="input-icon fa fa-envelope fa-lg fa-fw"
                      aria-hidden="true"
                    ></i>
                  </div>
                </div>
                <div className="input-container">
                  <InputCtrl
                    control={control}
                    type={hidePassword ? "password" : "text"}
                    name="password"
                    id="password"
                    placeholder="Enter Password"
                    label="Password"
                    showError={showError}
                    required={true}
                    disabled={false}
                    className="mb-3"
                  />
                  <i
                    className="input-icon fa fa-lock fa-lg fa-fw"
                    aria-hidden="true"
                  ></i>
                  <i
                    onClick={() => togglePasswordVisibility("password")}
                    className={`input-icon-eye ${hidePassword ? "fa fa-eye-slash" : " fa fa-eye"
                      }`}
                  ></i>
                </div>
                <div className="mb-2 d-flex justify-content-center">
                  <Button className="signInBtn" type="submit" disabled={false}>
                    Sign in
                  </Button>
                </div>
                <div className="mb-2">

                  <a href="/register" className="d-flex justify-content-center" type="submit">Don’t have an account? Sign Up</a>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
