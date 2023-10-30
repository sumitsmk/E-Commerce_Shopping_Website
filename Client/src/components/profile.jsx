import { Link } from "react-router-dom";
import profileIcon from "./images/img2.jpeg";
import { useState, useEffect } from "react";

function Profile() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const imageDimensions = {
    width: "70px",
    height: "70px",
    borderRadius: "70px",
  };
  const first = sessionStorage.getItem("first_name");
  const last = sessionStorage.getItem("last_name");
  const emaill = sessionStorage.getItem("email");
  const mob = sessionStorage.getItem("mob_no");
  const gender = sessionStorage.getItem("gender");

  const handleSectionClick = (section) => {
    setDisplaySection(section);
  };

  const [displaySection, setDisplaySection] = useState("profile");
  const showProfile = displaySection === "profile";
  const showUpdate = displaySection === "update";
  const showPassword = displaySection === "password";

  return (
    <>
      <div style={{ margin:"10px" }}>
        <div className="card text">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills">
            <li className="nav-item">
                <h3>Manage your Profile</h3>
              </li>
              <li className="nav-item d-flex ms-auto order-5">
              <li className="nav-item">
                <button
                  className={`nav-link ${showProfile ? "active" : ""}`}
                  onClick={() => handleSectionClick("profile")}
                >
                  Profile
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${showUpdate ? "active" : ""}`}
                  onClick={() => handleSectionClick("update")}
                >
                  Update Profile
                </button>
              </li>
              <li className="nav-item">
                <button
                  className={`nav-link ${showPassword ? "active" : ""}`}
                  onClick={() => handleSectionClick("password")}
                >
                  Change Password
                </button>
              </li>
              </li>
            </ul>
          </div>
          {/* ------------------------------------------------------------------------- */}
          {showProfile && (
            <div id="profileCard" style={{ margin: "20px" }}>
              <div
                className="card-body"
                style={{
                  margin: "5px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                  width: "30rem",
                  backgroundColor: "#DCDCDC",
                }}
              >
                <h6 className="card-title">
                  {first} {last}
                </h6>
                <p className="card-text">Account Holder</p>
              </div>
              <div
                className="card-body"
                style={{
                  margin: "5px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                  width: "30rem",
                  backgroundColor: "#DCDCDC",
                }}
              >
                <h6 className="card-title">{gender}</h6>
                <p className="card-text">Gender</p>
              </div>
              <div
                className="card-body"
                style={{
                  margin: "5px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                  width: "30rem",
                  backgroundColor: "#DCDCDC",
                }}
              >
                <h6 className="card-title">{emaill}</h6>
                <p className="card-text">Email Id</p>
              </div>
              <div
                className="card-body"
                style={{
                  margin: "5px",
                  border: "1px solid grey",
                  borderRadius: "5px",
                  width: "30rem",
                  backgroundColor: "#DCDCDC",
                }}
              >
                <h6 className="card-title">Contact No</h6>
                <p className="card-text">{mob}</p>
              </div>
            </div>
          )}
          {/* ------------------------------------------------------------------------- */}

          {/* ------------------------------------------------------------------------- */}
          {showPassword && (
            <div
              id="passwordCard"
              className="col-12 d-flex justify-content"
              style={{ margin: "20px" }}
            >
              <div className="form">
                <form>
                  <div className="mb-3">
                    <label htmlFor="currentPassword">Current Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="newPassword">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="confirmPassword">Confirm Password</label>
                    <input
                      type="password"
                      className="form-control"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <div className="mb-3">
                      <button type="submit" className="btn btn-success">
                        Change Password
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* ------------------------------------------------------------------------- */}

          {/* ------------------------------------------------------------------------- */}
          {showUpdate && (
            <div
              id="updateCard"
              style={{ margin: "20px" }}
              className="col-12 d-flex justify-content"
            >
              <div>
                <div className="col"></div>
                <div className="col">
                  <div className="form">
                    <div className="mb-3">
                      <label htmlFor="">First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          //   setFirstName(e.target.value)
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="">Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          //   setLastName(e.target.value)
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="">Email</label>
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => {
                          //   setEmail(e.target.value)
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="">Mobile Number</label>
                      <input
                        type="tel"
                        className="form-control"
                        onChange={(e) => {
                          //   setMobile(e.target.value)
                        }}
                      />
                    </div>

                    <div className="mb-3">
                      <button className="btn btn-success">Update</button>
                    </div>
                  </div>
                </div>
                <div className="col"></div>
              </div>
            </div>
          )}
          {/* ------------------------------------------------------------------------- */}
        </div>
      </div>
    </>
  );
}

export default Profile;
