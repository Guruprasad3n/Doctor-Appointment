import Layout from "../../Components/Layout";
import { useEffect, useState } from "react";
import { Col, Form, Input, Row, TimePicker, message } from "antd";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { hideLoading, showLoading } from "../../redux/features/alertSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";

function Profile() {
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
        `https://doctorappointment-pocm.onrender.com/api/v1/doctor/updateProfile`,
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
  const getDoctorInformation = async () => {
    try {
      const res = await axios.post(
        `https://doctorappointment-pocm.onrender.com/api/v1/doctor/getDoctorInfo`,
        { userId: params.id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          },
        }
      );
      if (res.data.success) {
        setDoctor(res.data.data);
      }
    } catch (e) {
      console.log(e);
    }
  };
  // console.log(doctor);
  useEffect(() => {
    getDoctorInformation();
  }, []);

  return (
    <Layout>
      <h1>Profile</h1>
      {doctor && (
        <Form
          layout="vertical"
          onFinish={handleFinish}
          className="m-2"
          initialValues={{
            ...doctor,
            timings: [
              moment(doctor.timings[0]).format("HH:mm"),
              moment(doctor.timings[1]).format("HH:mm"),
            ],
          }}
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
          <h6 className="">Professional Details: </h6>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specilization"
                name="specilization"
                required
                rules={[{ required: true }]}
                className="m-4"
              >
                <Input type="text" placeholder="Specilization" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                required
                rules={[{ required: true }]}
                className="m-4"
              >
                <Input type="text" placeholder="Experience" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Fee"
                name="fee"
                required
                rules={[{ required: true }]}
                className="m-4"
              >
                <Input type="number" placeholder="Fee" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Timimgs"
                name="timimgs"
                required
                rules={[{ required: true }]}
                className="m-4"
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}></Col>
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
}
export default Profile;
