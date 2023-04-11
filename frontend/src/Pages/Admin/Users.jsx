import { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import axios from "axios";
import { Table } from "antd";
function Users() {
  const [users, setUsers] = useState([]);
  const getUsers = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/v1/admin/getAllUsers`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          },
        }
      );
      if (res.data.success) {
        setUsers(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  const columns = [
    { title: "Name", dataIndex: "name" },
    { title: "Email", dataIndex: "email" },
    { title: "Doctor", dataIndex: "isDoctor", render:(text, record)=>(
        <span>{record.isDoctor? 'Yes':'No'}</span>
    ) },


    { title: "Actions", dataIndex: "actions", render:(text, record)=>(
        <div className="d-flex" key={users._id} >
            <button className="btn btn-danger">Block</button>
        </div>
    ) },
];
// console.log(users)
  return (
    <Layout>
      <h1 className="text-center">Users</h1>
      <Table className="text-center m-3" columns={columns} dataSource={users} key={users._id} />
    </Layout>
  );
}
export default Users;
