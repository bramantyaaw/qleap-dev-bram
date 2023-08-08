// import node module libraries
import { Breadcrumb } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SlArrowRight as ArrowIcon } from "react-icons/sl";

const GKBreadcrumb = ({ breadcrumb }) => {
  return (
    <Breadcrumb>
      {breadcrumb.map((item, index) => {
        return (
          <Breadcrumb.Item
            active={index === breadcrumb.length - 1 ? true : false}
            key={index}
          >
            {index === breadcrumb.length - 1 ? (
              item.page
            ) : (
              <Link to={item.link}>{item.page}</Link>
            )}
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};
export default GKBreadcrumb;
