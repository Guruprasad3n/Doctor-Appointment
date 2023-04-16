import { useNavigate } from "react-router-dom";

function DoctorList(props) {
    const navigate = useNavigate()
    const {doctor} = props
  return (
    <>
      <div className="card m-2" style={{cursor:"pointer"}} onClick={()=> navigate(`/doctor/book-appointment/${doctor._id}`) } >
        <div className="card-header">
            Dr.{doctor.firstName} {doctor.lastName}
        </div><div className="card-body">
            <p>
                <b>Specilization</b>:  {doctor.specilization}
            </p>
            <p>
                <b>Experience</b>: {doctor.experience}
            </p>
            <p>
                <b>Fees Per Conseltation</b>: {doctor.fee}
            </p>
            <p>
                <b>Timings</b>: {doctor.timings[0]} - {doctor.timings[0]}
            </p>
        </div>
      </div>
    </>
  );
}
export default DoctorList;
