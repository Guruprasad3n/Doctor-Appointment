import { DatePicker, TimePicker, message } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/features/alertSlice";
const { default: Layout } = require("../Components/Layout");
function BookingPage() {
  const { user } = useSelector((state) => state.user);
  const [doctor, setDoctor] = useState([]);
  const [date, setData] = useState();
  const [time, setTime] = useState();
  const [isAvailable, setIsAvailable] = useState();
  const params = useParams();
  const dispatch = useDispatch();
  const getUserData = async () => {
    try {
      let res = await axios.post(
        `http://localhost:8000/api/v1/doctor/getDoctorById`,
        {
          doctorId: params.doctorId,
        },
        {
          headers: {
            Authorization: "Bearer" + " " + localStorage.getItem("token"),
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

  // Booking Button
  const handleBooking = async () => {
    try {
      setIsAvailable(true);
      if (!date && !time) {
        return alert(`Date & Time Required`);
      }
      dispatch(showLoading());
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/book-appointment`,
        {
          doctorId: params.doctorId,
          userId: user._id,
          doctorInfo: doctor,
          date: date,
          userInfo: user,
          time: time,
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
      }
    } catch (e) {
      dispatch(hideLoading());
      console.log(e);
    }
  };

  const handelAvailable = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        `http://localhost:8000/api/v1/user/check-Availity`,
        {
          doctorId: params.doctorId,
          date,
          time,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem(`token`)}`,
          },
        }
      );
      dispatch(hideLoading());
      if (res.data.success) {
        setIsAvailable(true);
        message.success(res.data.message);
      } else {
        message.error(res.data.message);
      }
    } catch (e) {
      dispatch(hideLoading());
      console.log(e);
    }
  };

  useEffect(() => {
    getUserData();
    // eslint-disable-next-line
  }, []);
  console.log(doctor);
  return (
    <Layout>
      <h1 className="text-center">Booking Page</h1>
      <div className="container m-2">
        {doctor && (
          <>
            <h4>
              Dr.{doctor.firstName} {doctor.lastName}
            </h4>
            <h4>Fee.{doctor.fee}</h4>
            <h4>Timings: {doctor.timings}</h4>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="m-2"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setData(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                className="m-2"
                format="HH:mm"
                onChange={(value) => {
                  setTime(moment(value).format("HH:mm"));
                }}
              />
              <button
                className="btn btn-primary mt-2"
                onClick={handelAvailable}
              >
                Check Availability
              </button>

              <button className="btn btn-dark mt-2" onClick={handleBooking}>
                Book Appointment
              </button>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
}
export default BookingPage;
