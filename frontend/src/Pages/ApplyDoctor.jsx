import Layout from "../Components/Layout";
import { Col, Form, Input, Row, TimePicker } from "antd";
function ApplyDoctor() {
  const handleFinish = (values) => {
    console.log(values);
  };
  return (
    <Layout>
      <h1 className="text-center">ApplyDoctor</h1>
      <Form layout="vertical" onFinish={handleFinish} className="m-2">
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
          <button className="btn btn-primary form-btn" type="submit" >Submit</button>
          </Col>
        </Row>
       
      </Form>
    </Layout>
  );
}
export default ApplyDoctor;
