import "./user.css";
import { PermIdentity, MailOutline } from "@material-ui/icons";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../redux/apiCalls";

export default function User() {
  const location = useLocation();
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) =>
    state.user.users.find((user) => user._id === userId)
  );

  const [inputs, setInputs] = useState({});
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setInputs(prev => {
      return {...prev, [e.target.name]: e.target.value};
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedUser = {...user, ...inputs};
    updateUser(userId, updatedUser, dispatch);
    console.log(updatedUser);
  };

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
        <Link to="/newUser">
          <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <div className="userShowTopTitle">
              <span className="userShowUsername">User ID: {user._id}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  name="username"
                  type="text"
                  placeholder={user.username}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  name="email"
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                  onChange={handleChange}
                />
              </div>
              <button onClick={handleSubmit} className="userUpdateButton">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
