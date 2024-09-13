import React, { useEffect, useState } from 'react'
import { Button, Card, Container, Row, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { GoPlus } from 'react-icons/go';
import PageTitleBox from '../common/PageTitleBox';
import { FaRegTrashAlt } from 'react-icons/fa';
import { HiMiniPencilSquare } from "react-icons/hi2";
import { Paginate } from '../common/Pagenate';
import AppLoader from '../common/AppLoader';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { useSelector } from 'react-redux';
import { deleteTodo, getAllTodos } from '../redux/actions/todo';

function TodoList() {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const dispatch = useDispatch<AppDispatch>()

  const todoList = useSelector((state: any) => state?.todo?.todos)


  const handlePageClick = (event: any) => {
    const selectedPage = event.selected + 1;
    setCurrentPage(selectedPage);
  };
  const handleDelete = async (id: any) => {
    setLoading(true);
    try {
      dispatch(deleteTodo(id)).then((res:any)=>{
        if (res?.status === 200) {
          
          dispatch(getAllTodos({ pageNo: currentPage, limit: 10 }))
        }
      })

    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(getAllTodos({ pageNo: currentPage, limit: 10 }))

  }, [])
  return (
    <Container >
      <PageTitleBox
        title="Todo"
        name="Todo"
        pageTitle="Todo List"
        rightItem={
          <Row className=" d-flex justify-content-end">
            <Button onClick={() => navigate('/todo')}>
              <GoPlus /> Add
            </Button>
          </Row>
        }
      />
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: 'calc(100vh - 200px)' }}
        >
          <AppLoader variant="primary" />
        </div>
      ) : (
        <Card className="border-0 p-3 shadow-sm">
          <div className="table-responsive overflow-auto">
            <Table>
              <thead>
                <tr>
                  <th>Title </th>
                  <th>Discription </th>
                  <th>completed</th>
                  <th>Action</th>

                </tr>
              </thead>
              <tbody>
                {todoList &&
                  todoList.map((item: any, index: number) => (
                    <tr key={index} className="hand" >
                      <td>{item?.title}</td>
                      <td>{item?.description}</td>
                      <td>{item?.completed === true ? "Completed" : "In Completed"}</td>

                      <td>
                        {/* <span>{item?.status} */}
                        <div className='d-flex gap-2'>
                          <FaRegTrashAlt
                            className="text-danger"
                            onClick={() => handleDelete(item?._id)}
                            role="button"

                          />
                          <HiMiniPencilSquare
                            className="text-danger"
                            onClick={() => navigate(`/todo/${item?._id}`)}
                            role="button"
                          />

                        </div>

                        {/* </span> */}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          <div className=" d-flex justify-content-end ">
            <Paginate
              handlePageClick={handlePageClick}
              pageCount={totalPages}
              pageNo={currentPage}
            />
          </div>
        </Card>
      )}
    </Container>
  )
}

export default TodoList