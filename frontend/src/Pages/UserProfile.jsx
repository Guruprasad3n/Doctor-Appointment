import { useDispatch, useSelector } from "react-redux";
import Layout from "../Components/Layout";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
import moment from "moment";
import axios from "axios";

// http://localhost:8000/api/v1/user/userdata-update

function UserProfile() {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  // const format = "HH:mm";
  // Handle Form For Update DOctor Data
  const handleFinish = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `https://doctorappointment-pocm.onrender.com/api/v1/user/userdata-update`,
        {
          ...values,
          userId: user._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        message.success(res.data.message);
        navigate("/");
      } else {
        message.error(res.data.success);
      }
    } catch (e) {
      dispatch(hideLoading());
      console.log(e);
      message.error("Something Went Worng");
    }
    console.log(values);
  };

  // getDoctor Details
  //   const getDoctorInformation = async () => {
  //     try {
  //       const res = await axios.post(
  //         `http://localhost:8000/api/v1/doctor/getDoctorInfo`,
  //         { userId: params.id },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem(`token`)}`,
  //           },
  //         }
  //       );
  //       if (res.data.success) {
  //         setDoctor(res.data.data);
  //       }
  //     } catch (e) {
  //       console.log(e);
  //     }
  //   };
  // console.log(doctor);
  useEffect(() => {
    // getDoctorInformation();
  }, []);

  return (
    <Layout>
      <h1>User Profile</h1>

        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-2"
          
        >
          <h6 className="">Persional Details: </h6>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                name="firstName"
                required
                rules={[{ required: true }]}
                className="m-4"
              >
                <Input type="text" placeholder="First Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                name="lastName"
                required
                rules={[{ required: true }]}
                className="m-4"
              >
                <Input type="text" placeholder="Last Name" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone No"
                name="phone"
                required
                rules={[{ required: true }]}
                className="m-4"
              >
                <Input type="text" placeholder="Phone" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                required
                rules={[{ required: true }]}
                className="m-4"
              >
                <Input type="text" placeholder="Email" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item label="Website" name="website" className="m-4">
                <Input type="text" placeholder="Website" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                required
                rules={[{ required: true }]}
                className="m-4"
              >
                <Input type="text" placeholder="Address" />
              </Form.Item>
            </Col>
          </Row>
         
        <button className="btn btn-primary form-btn m-4" type="submit">
                Update
              </button>
        </Form>
    </Layout>
  );
}
export default UserProfile;
