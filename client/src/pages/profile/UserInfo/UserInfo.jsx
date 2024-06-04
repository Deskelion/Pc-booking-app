import React from "react";
import "./userInfo.css";
import { useLocation } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";

function UserInfo({ user }) {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const { data, loading, reFetch } = useFetch(`/users/${id}`);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day < 10 ? "0" + day : day}.${
      month < 10 ? "0" + month : month
    }.${year}`;
  };

  return (
    <div className="userInfo-container">
      <div className="user-photo-container">
        <img
          src={
            data.img ||
            "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
          }
          alt="User's Photo"
          className="user-photo"
        />
      </div>
      <div className="user-info">
        <div className="info-row">
          <p className="userInfo-label">Никнейм:</p>
          <p className="userInfo-value">{data.username}</p>
        </div>
        <div className="info-row">
          <p className="userInfo-label">Почта:</p>
          <p className="userInfo-value">{data.email}</p>
        </div>
        <div className="info-row">
          <p className="userInfo-label">Дата рождения:</p>
          <p className="userInfo-value">{formatDate(data.dateOfBirth)}</p>
        </div>
        <div className="info-row">
          <p className="userInfo-label">Номер телефона:</p>
          <p className="userInfo-value">{data.phoneNumber}</p>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
