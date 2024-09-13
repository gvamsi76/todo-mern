import React, { useState } from 'react'
import InputCtrl from '../controllers/InputCtrl'
import { useForm } from 'react-hook-form';
import { Button, Card, Col, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { signUpAuth } from '../redux/actions/user';
import { useNavigate } from 'react-router-dom';


const defaultValues: any = {
    name: "",
    email: "",
    password: "",
};
interface SignUpPayload {
    name: string;
    email: string;
    password: string;
  }

function Signup() {
    const [hidePassword, setHidePassword] = useState(true);

    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()

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
        try {
          const payload: SignUpPayload = {
            name: data.name,
            email: data.email,
            password: data.password,
          };

          const response = await dispatch(signUpAuth(payload)).then((res:any)=>{
            if (res?.data?.success) {
                navigate("/login")
            }
          });

        } catch (error) {
          console.error('Registration failed:', error);
        }
      };
    return (
        <div className="text-center d-flex align-items-center justify-content-center mt-5 ">
            <div className="d-flex flex-column align-items-center justify-content-center p-2 shadow rounded">

                <form
                    className="w-100 text-start"
                    autoComplete="off"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <Card.Body>
                        <Row>

                            <InputCtrl
                                control={control}
                                type="text"
                                name="name"
                                id="name"
                                placeholder="First Name"
                                label="First Name"
                                showError={showError}
                                required={true}
                                disabled={false}
                                className="mb-3"
                                componentName="FullName"
                            />

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
                                className="mb-3"
                                componentName="Email"
                            />


                            <InputCtrl
                                control={control}
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter Password"
                                label="Password"
                                showError={showError}
                                required={true}
                                disabled={false}
                                className="mb-3"
                                componentName="FullName"
                            />

                            <InputCtrl
                                control={control}
                                type="password"
                                name="Password"
                                id="confirmPassword"
                                placeholder="Confirm Password"
                                label="Confirm Password"
                                showError={showError}
                                required={true}
                                disabled={false}
                                className="mb-3"
                                componentName="FullName"
                            />

                        </Row>
                    </Card.Body>
                    <div className="d-flex justify-content-center align-items-center mt-2">
                        <div className="button-list">
                            <Button
                                variant="primary"
                                type="submit"
                                disabled={false}
                                className="rounded-pill px-4 py-2"
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup