import useReport from "../../../../hooks/useReport";
import Container from "../../../../components/Container";
import SectionTitle from "../../../../components/SectionTitle/SectionTitle";
import usePrivetAxios from "../../../../hooks/usePrivetAxios";
import Swal from "sweetalert2";
import Footer from "../../../../Share/Footer/Footer";

const Activities = () => {
  const [report, refetch] = useReport();
  console.log(report);
  const privetAxios = usePrivetAxios();

  const handleAction = (id) => {
    privetAxios.put(`/report/${id}`, { status: "Success" })
    .then(res => {
        console.log(res.data)
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            icon: "success",
            title: "Wow...",
            text: "Action successfully....!!",
          });
          refetch();
        }
    })
    .catch(error =>{
        console.log(error.massage);
    })
  };
  return (
    <div>
      <Container>
        <SectionTitle
          header={"All Report"}
          miniHeader={"User all Report here"}
        ></SectionTitle>
        <div className="">
          {report?.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center space-y-10"
            >
              <p className="text-2xl font-semibold text-justify">
                {item.report}
              </p>
              {item?.status ? (
                <button className="btn badge badge-outline badge-success">
                  {item?.status}
                </button>
              ) : (
                <button
                  onClick={() => handleAction(item?._id)}
                  className="btn badge badge-outline badge-warning"
                >
                  Action
                </button>
              )}
            </div>
          ))}
        </div>
      </Container>
      <Footer></Footer>
    </div>
  );
};

export default Activities;
