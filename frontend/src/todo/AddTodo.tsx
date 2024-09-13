import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import PageTitleBox from '../common/PageTitleBox'
// import { FaRegTrashAlt } from "react-icons/fa";
import InputCtrl from '../controllers/InputCtrl';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import useToast from '../hooks/useToast';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { CreateTodo, GetTodo } from '../redux/actions/todo';
import SelectCtrl from '../controllers/SelectCtrl';
import { useSelector } from 'react-redux';



const defaultValues = {
    title: "",
    description: "",
    completed: "",
};
function AddTodo() {
    const [progress, setProgress] = useState(false);
    const navigate = useNavigate()
    const { showToast } = useToast()

    const params = useParams()
    const data = useSelector((state :any)=>state?.todo?.todoList)
    const dispatch = useDispatch<AppDispatch>()

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
        getValues,
    } = useForm({
        mode: "onBlur",
        ...defaultValues
    });


    const onSubmit = async (data: any) => {
        setProgress(true);
        const payload = {
            id: params?.id ? params?.id : 0,
            title: data?.title,
            description: data?.description,
            completed: data.completed === "True" ?  true : false,
        };
        try {
            setProgress(true);
            dispatch(CreateTodo(payload)).then((res:any)=>{
                console.log(res ,"resx")
                if (res?.payload) {
                    navigate(-1)
                }
            })
        } catch (error) {
            console.log(error, "errr");
        } finally {
            setProgress(false);
        }
    };



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

    console.log(params ,"params")
    useEffect(() => {
        if (params?.id) {
          dispatch(GetTodo(params?.id))
        }
        
    }, [])
    useEffect(() => {
        if (data && params?.id) {
          reset(data); 
        }
      }, [data, reset])

    return (
        <Container>
            <PageTitleBox
                title="Todo Details"
                name="Todo"
                pageTitle="Todo / Todo Details"
            />
            <Card className="border-0 p-3 shadow-sm">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <Row className="my-3">
                        <Col md={6}>
                            <div className="mb-3">
                                <InputCtrl
                                    control={control}
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder={'Title'}
                                    label={"Title"}
                                    showError={showError}
                                    required={true}
                                    disabled={progress}
                                    className="mb-3 inputChange"
                                />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                <InputCtrl
                                    control={control}
                                    type="text"
                                    name="description"
                                    id="description"
                                    placeholder={'Description'}
                                    label={"Description"}
                                    showError={showError}
                                    required={true}
                                    disabled={progress}
                                    className="mb-3 inputChange"
                                />
                            </div>
                        </Col>
                        <Col md={6}>
                            <div className="mb-3">
                                {/* <InputCtrl
                                    control={control}
                                    type="text"
                                    name="completed"
                                    id="completed"
                                    placeholder={'completed'}
                                    label={"completed"}
                                    showError={showError}
                                    required={true}
                                    disabled={progress}
                                    className="mb-3 inputChange"
                                /> */}
                                <SelectCtrl
                                    control={control}
                                    name="completed"
                                    id="completed"
                                    placeholder={"Select"}
                                    label={"Completed"}
                                    required={true}
                                    disabled={progress}
                                    className="mb-3 w-100 mb-5"
                                    options={
                                        [
                                            {
                                                value: "True",
                                                label: "Completed"
                                            },
                                            {
                                                label: "In Completed",
                                                value: "False"
                                            }
                                        ]
                                    }
                                    showError={showError}
                                />
                            </div>
                        </Col>

                        <div className="d-flex align-items-center justify-content-between">
                            <div className="d-flex gap-3">
                                <Button className="btn-light" type="button" onClick={() => navigate(-1)}>Cancel</Button>
                                <Button className="save-btn" type="submit">Save</Button>
                            </div>
                            <div>
                                {/* <FaRegTrashAlt
                                    className="text-danger"
                                    // onClick={handleShow}
                                    role="button"
                                /> */}
                            </div>
                        </div>
                    </Row>
                </form>
            </Card>
        </Container>
    )
}

export default AddTodo