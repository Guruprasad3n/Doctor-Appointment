import { useEffect, useState } from "react";

import axios from "axios";
import moment from "moment";
import { Table, message } from "antd";
import Layout from "../../Components/Layout";

function DoctorAppointment() {
  // /doctor-appointment

  const [appointment, setAppointment] = useState();
  const getAppointments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/doctor/doctor-appointment`,
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

  const handleStatus = async (record, status) => {
    try {
      const res = await axios.post(
        `http://localhost:8000/api/v1/doctor/update-status`,
        { appointmentId: record._id, status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          },
        }
      );
      if(res.data.success){
        message.success(res.data.message);
        getAppointments(  )
      }
    } catch (e) {
      console.log(e);
      message.error(`Something Went Wrong`);
    }
  };
  const colums = [
    { title: `ID`, dataIndex: `_id` },
    {
      title: `Date & Time`,
      dataIndex: `date`,
      render: (text, record) => (
        <span>
          {moment(record.date).format("DD-MM-YYYY")}
          {moment(record.time).format("HH:mm")}
        </span>
      ),
    },
    { title: `Status`, dataIndex: `status` },
    {
      title: "Actions",
      dataIndex: `actions`,
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" && (
            <div className="d-flex">
              <button
                className="btn btn-success"
                onClick={() => handleStatus(record, "approved")}
              >
                Approve
              </button>
              <button
                className="btn btn-danger ms-2"
                onClick={() => handleStatus(record, "rejected")}
              >
                Reject
              </button>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <Layout>
      <h4>Appointments</h4>
      <Table columns={colums} dataSource={appointment} />
    </Layout>
  );
}
export default DoctorAppointment;
