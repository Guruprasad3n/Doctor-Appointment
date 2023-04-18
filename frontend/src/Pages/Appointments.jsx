import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import axios from "axios";
import moment from "moment";
import { Table } from "antd";
function Appointments() {
  const [appointment, setAppointment] = useState();
  const getAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/user/user-appointments`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          },
        }
      );

      if (res.data.success) {
        setAppointment(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getAppointments();
  }, []);

  const colums = [
    { title: `ID`, dataIndex: `_id` },
    // {
    //   title: `Name`,
    //   dataIndex: `name`,
    //   render: (text, record) => (
    //     <span>
    //       {record.doctorId.firstName} {record.doctorId.lastName}
    //     </span>
    //   ),
    // },
    // {
    //   title: `Phone`,
    //   dataIndex: `phone`,
    //   render: (text, record) => <span>{record.doctorId.phone}</span>,
    // },
    {
      title: `Date & Time`,
      dataIndex: `date`,
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}&nbsp
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    { title: `Status`, dataIndex: `status` },
  ];
  // console.log(appointment);
  return (
    <Layout>
      <h4>Appointments</h4>
      <Table columns={colums} dataSource={appointment} />
    </Layout>
  );
}
export default Appointments;
