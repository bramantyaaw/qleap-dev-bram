import { Carousel, Image, Modal } from "react-bootstrap";

const ModalImageSlider = ({
  show,
  setShow,
  dataArr,
  className,
  style,
  index,
  setIndex,
}) => {
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex + 1);
  };

  return (
    <Modal
      show={show}
      dialogClassName="my-modal-70"
      onHide={() => {
        setShow(false);
        setIndex(0);
      }}
      style={{
        borderRadius: "15px",
        width: "100%",
        height: "100%",
      }}
      centered
    >
      <div className={className}>
        <Carousel
          activeIndex={index - 1}
          onSelect={handleSelect}
          className="carousel-custom"
          style={style}
          slide={false}
        >
          {dataArr?.map((data) => {
            return (
              <Carousel.Item key={data?.id} className="" style={style}>
                <Image
                  className="w-100 h-100"
                  src={data?.photo}
                  alt=""
                  style={style}
                />
              </Carousel.Item>
            );
          })}
        </Carousel>
      </div>
    </Modal>
  );
};

export default ModalImageSlider;
