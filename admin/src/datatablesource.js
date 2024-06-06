export const userColumns = [
    { field: "_id", headerName: "ID", width: 70 },
    {
      field: "username",
      headerName: "Никнейм",
      width: 230,
    },
    {
      field: "dateOfBirth",
      headerName: "Дата рождения",
      width: 100,
    },
    {
        field: "email",
        headerName: "Почта",
        width: 230,
    },
    {
      field: "phoneNumber",
      headerName: "Номер телефона",
      width: 100,
    },
    {
        field: "img",
        headerName: "Фотография",
        width: 230,
        renderCell: (params) => {
          return (
            <div className="cellWithImg">
              <img className="cellImg" src={params.row.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"} alt="avatar" />
              {params.row.username}
            </div>
          );
        },
      },
  ];

  
  export const bookingColumns = [
    {
      field: "username",
      headerName: "id пользователя",
      width: 70,
    },
    {
      field: "placename",
      headerName: "id места",
      width: 70,
    },
    {
      field: "date",
      headerName: "Дата",
      width: 110,
    },
    {
      field: "startTime",
      headerName: "Время начала",
      width: 70,
    },
    {
      field: "endTime",
      headerName: "Время окончания",
      width: 70,
    },
    {
      field: "totalTime",
      headerName: "Общее кол-во часов",
      width: 50,
    },
    {
      field: "amount",
      headerName: "Стоимость",
      width: 230,
    },
  ];

