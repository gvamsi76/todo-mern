import React, { useEffect, useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { decodeToken, ReadFromLocalstorage, RemoveLocalStorage, token } from './utility';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../redux/store';
import { GetUser } from '../redux/actions/user';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const CustomNavbar = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate= useNavigate()

  const userData = useSelector((state: any) => state?.user?.singleUser)
console.log(userData ,"userData")

  const toggleMenu = () => {
    setMenuOpen((prev: any) => !prev);
  };
  const data :any = decodeToken(token)

  console.log(data ,"data")
  const handleLogout =()=>{
    RemoveLocalStorage("token")
    navigate("/login")
  }

  useEffect(() => {
    if (data) {
      dispatch(GetUser(data?.id))
    }
  }, [])

  return (
    <Navbar bg="light" expand="md" sticky='top'>
      <Container fluid>
        <Navbar.Brand href="#">
          {/* <img src="/images/lOGO.svg" className='img-fluid' alt="LOGO" /> */}
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarSupportedContent" />

        <Navbar.Collapse id="navbarSupportedContent">
          <Nav className="m-auto mb-2 mb-lg-0"></Nav>
          <div className="position-relative me-1" role='button'>
            {/* <IoMdNotificationsOutline className='theme-color fs-4 position-relative' size={30} /> */}
            <span className="position-absolute p-1 border border-light rounded-circle notification-indicator" style={{ background: 'var(--theme-color)' }}>
              <span className="visually-hidden">New alerts</span>
            </span>
          </div>
          <div className="mx-2">
            <div className="topbar-profile-image border-2 border d-flex align-items-center justify-content-center">
              {/* <img src={profilePicUrl!=="http://st-ai-task-management-apis.npit.pro/"?profilePicUrl:"./dummy-user.jpg"} className='img-fluid rounded-circle border object-fit-cover' /> */}
            </div>
          </div>

          <div className='mx-2' onClick={toggleMenu}>
            <p className='mb-1 small fw-bold text-dark ms-2' >{userData?.name}</p>
            <div className="theme-toggle">

              {menuOpen && (
                <div className="theme-menu" onClick={()=>handleLogout()}>
                  <ul>
                    <li>
                      Logout
                    </li>

                  </ul>
                </div>
              )}
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
