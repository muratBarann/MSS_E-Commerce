import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { authStore } from "../../store/authStore";
import { loaderStore } from "../../store/loaderStore";
import { cartSidebarStore } from "../../store/cartSidebarStore";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CartSidebar from "../home/CartSidebar";
import axios from "axios";

function Header() {
  let navigate = useNavigate();
  const { logout, logoutStatus } = authStore();
  const { setLoadingStatus } = loaderStore();
  const { setSidebarActive } = cartSidebarStore();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    //TOKEN SÜRESİ GEÇMİŞSE OTOMATİK LOGOUT
    const nowDate = new Date().getTime();
    let tokenDate = new Date(localStorage.getItem("session_expire")).getTime();
    let difference = tokenDate - nowDate;
    if (difference < 0) {
      localStorage.removeItem("user_token");
      localStorage.removeItem("session_expire");
    }
  }, [logoutStatus]);

  useEffect(() => {
    if (logoutStatus === 204) {
      alert("Başarıyla çıkış yapıldı, yönlendiriliyorsunuz");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }else if(logoutStatus==="ERR_NETWORK"){
      alert("Hatalı çıkış yapıldı, lütfen destek birimimize ulaşın");
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [logoutStatus]);

  function handleLogout() {
    logout();
  }
  useEffect(() => {
    axios
      .get("https://e-commercemss.azurewebsites.net/api/Categories")
      .then((response) => {
        setCategories(response.data);
        setLoadingStatus(false);
      })
      .catch((error) => {
        console.error(error.response.data);
      });
  }, [setLoadingStatus]);
  

  return (
    <>
      <CartSidebar />
      <div className="text-center bg-black py-3">
        <p className="text-white fs-5 fw-semibold">
          Black Friday. <span className="text-primary">Save up to 50%!</span>
        </p>
      </div>
      <Navbar className="navbar sticky-top shadow-sm" key="lg" bg="light" expand="lg">
        <Container>
          <Navbar.Brand className="logo order-1 order-lg-0 col-lg-3 d-flex align-items-center justify-content-center justify-content-lg-start">
            {/* <img height="40px" alt="logo" src={logo}></img> */}
            <a
              href="/"
              className="logo text-decoration-none text-black display-5 fw-bold"
            >
              M<span className="text-primary">S</span>S
            </a>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-lg`} />
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-lg`}
            aria-labelledby={`offcanvasNavbarLabel-expand-lg`}
            placement="start"
            className="col-lg-6 order-2"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-lg`}>
                Menü
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="d-flex flex-column">
              <Form className="d-flex mt-2">
                <div className="p-1 bg-light rounded rounded-pill shadow-sm mb-2 w-100">
                  <div className="input-group">
                    <input
                      type="search"
                      placeholder="Nasıl bir ürün arıyorsunuz?"
                      aria-describedby="button-addon1"
                      className="form-control border-0 bg-light"
                    />
                    <div className="input-group-append">
                      <a href="#!" className="btn btn-link text-primary">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 20 20"
                          fill="none"
                        >
                          <path
                            fill="#000000"
                            fillRule="evenodd"
                            d="M4 9a5 5 0 1110 0A5 5 0 014 9zm5-7a7 7 0 104.2 12.6.999.999 0 00.093.107l3 3a1 1 0 001.414-1.414l-3-3a.999.999 0 00-.107-.093A7 7 0 009 2z"
                          />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </Form>
              <Nav className="d-flex justify-content-between fw-semibold">
                <Nav.Link href="/">Ana Sayfa</Nav.Link>
                <Nav.Link href="/admin">Admin</Nav.Link>
                <NavDropdown title="Kategoriler" id="collasible-nav-dropdown">
                  {categories.map((item, index) => (
                    <NavDropdown.Item
                      key={index}
                      href={`/category/${item.defination}`}
                    >
                      {item.defination}
                    </NavDropdown.Item>
                  ))}
                  {/* <NavDropdown.Divider /> */}
                </NavDropdown>
                <Nav.Link href="/contact">İletişim</Nav.Link>

                <Nav.Link href="/about">Hakkımızda</Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
          <Nav className="d-flex flex-row col-lg-3 justify-content-end order-3">
            {localStorage.getItem("user_token") ? (
              <Nav.Link onClick={handleLogout}>
                <div className="logout mx-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#000000"
                    width="24"
                    height="24"
                    viewBox="0 0 32 32"
                    version="1.1"
                  >
                    <path d="M3.651 16.989h17.326c0.553 0 1-0.448 1-1s-0.447-1-1-1h-17.264l3.617-3.617c0.391-0.39 0.391-1.024 0-1.414s-1.024-0.39-1.414 0l-5.907 6.062 5.907 6.063c0.196 0.195 0.451 0.293 0.707 0.293s0.511-0.098 0.707-0.293c0.391-0.39 0.391-1.023 0-1.414zM29.989 0h-17c-1.105 0-2 0.895-2 2v9h2.013v-7.78c0-0.668 0.542-1.21 1.21-1.21h14.523c0.669 0 1.21 0.542 1.21 1.21l0.032 25.572c0 0.668-0.541 1.21-1.21 1.21h-14.553c-0.668 0-1.21-0.542-1.21-1.21v-7.824l-2.013 0.003v9.030c0 1.105 0.895 2 2 2h16.999c1.105 0 2.001-0.895 2.001-2v-28c-0-1.105-0.896-2-2-2z" />
                  </svg>
                </div>
              </Nav.Link>
            ) : null}
            <Nav.Link
              href={localStorage.getItem("user_token") ? "/account" : "/login"}
            >
              <div className="user mx-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="26"
                  height="26"
                  viewBox="0 0 1024 1024"
                >
                  <path
                    fill="#000000"
                    d="M512 512a192 192 0 1 0 0-384 192 192 0 0 0 0 384zm0 64a256 256 0 1 1 0-512 256 256 0 0 1 0 512zm320 320v-96a96 96 0 0 0-96-96H288a96 96 0 0 0-96 96v96a32 32 0 1 1-64 0v-96a160 160 0 0 1 160-160h448a160 160 0 0 1 160 160v96a32 32 0 1 1-64 0z"
                  />
                </svg>
              </div>
            </Nav.Link>
            <Nav.Link href="/favorites">
              <div className="favorites mx-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M4.3314 12.0474L12 20L19.6686 12.0474C20.5211 11.1633 21 9.96429 21 8.71405C21 6.11055 18.9648 4 16.4543 4C15.2487 4 14.0925 4.49666 13.24 5.38071L12 6.66667L10.76 5.38071C9.90749 4.49666 8.75128 4 7.54569 4C5.03517 4 3 6.11055 3 8.71405C3 9.96429 3.47892 11.1633 4.3314 12.0474Z"
                    stroke="#000000"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <div
                  className="favorites-amount"
                  data-selector="favorite-count"
                >
                  0
                </div>
              </div>
            </Nav.Link>
            <Nav.Link
              href=""
              onClick={() => {
                setSidebarActive(true);
              }}
            >
              {" "}
              <div className="cart mx-3">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 32 32"
                  id="svg5"
                  version="1.1"
                >
                  <defs id="defs2" />

                  <g id="layer1" transform="translate(36,-244)">
                    <path
                      d="m -31.371094,255.00586 c -1.625564,0 -2.864805,1.51618 -2.589843,3.10351 l 2.27539,13.13477 c 0.27851,1.60776 1.701467,2.76172 3.314453,2.76172 h 16.767578 c 1.6146248,0 3.0129936,-1.16108 3.3105472,-2.74805 a 1.0001,1.0001 0 0 0 0.00195,-0.0137 l 2.2734375,-13.12109 v -0.002 c 0.2984384,-1.59859 -0.9594241,-3.11523 -2.5859375,-3.11523 z m 0,2 h 22.7675784 c 0.4158021,0 0.6977222,0.33936 0.6210937,0.74805 a 1.0001,1.0001 0 0 0 -0.00195,0.0137 l -2.2753911,13.12695 c -0.124292,0.65116 -0.680335,1.11133 -1.34375,1.11133 h -16.767578 c -0.666611,0 -1.23316,-0.46316 -1.34375,-1.10156 l -2.27539,-13.13672 c -0.07374,-0.42569 0.201707,-0.76172 0.61914,-0.76172 z"
                      id="rect40272"
                    />

                    <path
                      d="m -24.695312,246.07227 a 1,1 0 0 0 -0.556641,0.52734 l -4,9 a 1,1 0 0 0 0.507812,1.32031 1,1 0 0 0 1.320313,-0.50781 l 4,-9 a 1,1 0 0 0 -0.507813,-1.32031 1,1 0 0 0 -0.763671,-0.0195 z"
                      id="path41727"
                    />

                    <path
                      d="m -15.279297,246.07227 a 1,1 0 0 0 -0.763672,0.0195 1,1 0 0 0 -0.507812,1.32031 l 4,9 a 1,1 0 0 0 1.318359,0.50781 1,1 0 0 0 0.507813,-1.32031 l -4,-9 a 1,1 0 0 0 -0.554688,-0.52734 z"
                      id="path41729"
                    />

                    <path
                      d="m -20,259.00586 a 1,1 0 0 0 -1,1 v 8 a 1,1 0 0 0 1,1 1,1 0 0 0 1,-1 v -8 a 1,1 0 0 0 -1,-1 z"
                      id="path43195"
                    />

                    <path
                      d="m -24,259.00586 a 1,1 0 0 0 -1,1 v 8 a 1,1 0 0 0 1,1 1,1 0 0 0 1,-1 v -8 a 1,1 0 0 0 -1,-1 z"
                      id="path43243"
                    />

                    <path
                      d="m -16,259.00586 a 1,1 0 0 0 -1,1 v 8 a 1,1 0 0 0 1,1 1,1 0 0 0 1,-1 v -8 a 1,1 0 0 0 -1,-1 z"
                      id="path43245"
                    />
                  </g>
                </svg>
                <div className="cart-amount" data-selector="cart-count">
                  0
                </div>
              </div>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;