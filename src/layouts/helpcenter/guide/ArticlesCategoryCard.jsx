// import node module libraries
import { Card, ListGroup } from "react-bootstrap";
import { Link } from "react-router-dom";

// import MDI icons
import Icon from "@mdi/react";
import { mdiArrowRight } from "@mdi/js";

const ArticlesCategoryCard = ({ item }) => {
  return (
    <Card className="border mb-4">
      <Card.Body className="p-3">
        {/* category title and description  */}
        <div className="mb-5">
          <h2 className="fw-semi-bold text-left">{item.title}</h2>
          <p className="text-left">{item.description}</p>
        </div>
        {/* articles list  */}
        <ListGroup as="ul" bsPrefix="list-unstyled">
          {item.articles.map((article, index) => {
            return (
              <ListGroup.Item
                as="li"
                className="mb-2 text-left"
                bsPrefix=" "
                key={index}
              >
                <Link
                  to={`/help/guide/${item.categoryslug}/${article.articleslug}`}
                  className="text-body"
                >
                  <Icon
                    path={mdiArrowRight}
                    className="me-1 text-muted "
                    size={0.6}
                  />
                  {article.articletitle}
                </Link>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      </Card.Body>
      <Card.Footer className="bg-light bg-opacity-50 border-top-0 pl-5">
        <Link to="#" className="text-inherit float-left">
          {item.totalarticles} articles <i className="mdi mdi-arrow-right"></i>
        </Link>
      </Card.Footer>
    </Card>
  );
};
export default ArticlesCategoryCard;
