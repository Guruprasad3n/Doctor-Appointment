import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { Table, message } from "antd";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  const getDoctors = async () => {
    try {
      const res = await axios.get(
        `https://doctorappointment-pocm.onrender.com/api/v1/admin/getAllDoctors`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          },
        }
      );
      if (res.data.success) {
        setDoctors(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleAccountStatus = async (record, status) => {
    try {
      const res = await axios.post(
        `https://doctorappointment-pocm.onrender.com/api/v1/admin/changeAccountStatus`,
        { doctorId: record._id, userId: record.userId, status: status },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          },
        }
      );
      if (res.data.success) {
        message.success(res.data.message);
        window.location.reload();
      }
    } catch (e) {
      message.error(`Something Went Wrong`, e);
    }
  };

  useEffect(() => {
    getDoctors();
  }, []);

  const columns = [
    // {title:"UserId", dataIndex:"_id"},
    {
      title: "Name",
      dataIndex: "name",
      render: (text, record) => (
        <span>
          {record.firstName}
          {record.lastName}
        </span>
      ),
    },
    { title: "Status", dataIndex: "status", key: "DoctorName" },
    { title: "Phone", dataIndex: "phone", key: "DoctorPhone" },
    {
      title: "Actions",
      dataIndex: "actions",
      key: "DoctorApproval",
      render: (text, record) => (
        <div className="d-flex">
          {record.status === "pending" ? (
            <button
              className="btn btn-success"
              onClick={() => handleAccountStatus(record, "approved")}
            >
              Approve
            </button>
          ) : (
            <button className="btn btn-danger">Reject</button>
          )}
        </div>
      ),
    },
  ];
  console.log(doctors);
  return (
    <Layout>
      <h1 className="text-center">Doctors</h1>
      <div>
        <Table
          className="text-center m-3"
          columns={columns}
          dataSource={doctors}
          key={(record) => doctors._id}
        />
      </div>
    </Layout>
  );
}
export default Doctors;
