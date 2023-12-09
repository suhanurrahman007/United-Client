import Container from "../../../components/Container";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import useAnnouncement from "../../../hooks/useAnnouncement";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const Announcement = () => {
  const [announcement] = useAnnouncement();

  return (
    <Container>
      <SectionTitle header={"Announcement"} miniHeader={"This is admin all announcement"}></SectionTitle>
      <div className="py-7">
        <>
          <Swiper
            slidesPerView={4}
            spaceBetween={30}
            centeredSlides={true}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {announcement &&
              announcement.map((item) => (
                <SwiperSlide key={item?._id}>
                  <div
                    className="hero w-60 h-48"
                    style={{
                      backgroundImage: `url(${item?.image})`,
                    }}
                  >
                    <div className="hero-overlay bg-black bg-opacity-60"></div>

                    <div className="hero-content text-center text-neutral-content">
                      <div className="max-w-md">
                        <h2>{item?.name}</h2>
                        <h1 className="mb-5 text-lg font-bold">
                          {item?.title}
                        </h1>
                        <p className="mb-5 text-xs text-justify text-gray-400">
                          {item?.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </>
      </div>
    </Container>
  );
};

export default Announcement;
