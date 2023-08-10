import { FunctionComponent } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import user from "../interface/user";
import { useDarkMode } from "../services/DarkModeContextServies";

interface NavbarProps {
    userInfo: user;
    setUserInfo: Function;
}

const Navbar: FunctionComponent<NavbarProps> = ({ userInfo, setUserInfo }) => {
    let navigate = useNavigate();
    const { isDark, toggleDarkMode } = useDarkMode();

    let logout = () => {
        sessionStorage.removeItem("userInfo");
        setUserInfo({ email: false, userType: false });
        navigate("/login");
    };

    return (
        <nav className={`navbar navbar-expand-lg ${isDark ? 'bg-dark' : 'bg-light'}`}>
            <div className="container-fluid">
                <NavLink className={`navbar-brand ${isDark ? 'text-white' : ''}`} to="#">
                    Dunder Mifflin
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                className={`nav-link ${isDark ? 'text-white' : ''}`}
                                aria-current="page"
                                to="/"
                            >
                                Home
                            </NavLink>
                        </li>
                        {["business", "user", "admin"].includes(userInfo.userType as string) && (
                            <li className="nav-item">
                                <NavLink className={`nav-link ${isDark ? 'text-white' : ''}`} to="/myfavcard">
                                    My Favorite Card
                                </NavLink>
                            </li>
                        )}

                        <li className="nav-item">
                            <NavLink className={`nav-link ${isDark ? 'text-white' : ''}`} to="/about">
                                About
                            </NavLink>
                        </li>
                        {userInfo.userType === "business" && (
                            <li className="nav-item">
                                <NavLink className={`nav-link ${isDark ? 'text-white' : ''}`} to="/mycard">
                                    My Card
                                </NavLink>
                            </li>
                        )}

                    </ul>
                    <div className="form-check form-switch me-4">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckDefault"
                            checked={isDark}
                            onChange={toggleDarkMode}
                        />
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                            {isDark ? (<i className="fa-regular fa-sun"></i>) : (<i className="fa-solid fa-moon"></i>)}

                        </label>
                    </div>
                    <form className="d-flex" role="search">
                        <button className={`btn ${isDark ? 'btn-outline-light' : 'btn-outline-primary'}`} onClick={logout}>
                            Logout
                        </button>
                    </form>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
