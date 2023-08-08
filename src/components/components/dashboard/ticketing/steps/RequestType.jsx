import axios from "axios";
import { useState, useEffect } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { profileAction } from "../../../../../redux/action/profileAction";
import Faq from "../elements/faq/Faq";
import IssueDropdown from "../elements/dropdown/IssueDropdown";
import DisabledInput from "../elements/input/DisabledInput";
import TextForm from "../elements/text/TextForm";
import TextNote from "../elements/text/TextNote";

const RequestType = (props) => {
  const { next, setSelectedIdIssue, selectedIdIssue, token, uid, text } = props;
  const [issueType, setIssueType] = useState([]);
  const [groupOpt, setGroupOpt] = useState([]);
  const [displayPICIssue, setDisplayPICIssue] = useState("");

  const dispatch = useDispatch();

  const { profileData } = useSelector((state) => state.profileReducer);
  const newProfile = profileData?.data?.data;

  const fetchPIC = async () => {
    try {
      await axios
        .get("/services/ticketing/get-issue-list", {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          const objOpt = [];
          const newData = res?.data?.data;

          newData?.map((opt) => {
            if (objOpt?.indexOf(opt?.group_pic_id) === -1) {
              objOpt.push(opt?.group_pic_id);
            }
          });
          setGroupOpt(objOpt);
          setIssueType(newData);
        });
    } catch (err) {
      return err;
    }
  };

  const newGroupId = () => {
    if (selectedIdIssue === 0) {
      return setDisplayPICIssue("");
    } else {
      issueType?.filter((data) => {
        data?.id
          ?.toString()
          .toLowerCase()
          .includes(selectedIdIssue?.toString());

        return setDisplayPICIssue(data?.group_pic_id);
      });
    }
  };

  useEffect(() => {
    fetchPIC();
    profileData === null && dispatch(profileAction(token, uid));
  }, []);

  useEffect(() => {
    newGroupId();
  }, [selectedIdIssue]);

  return (
    <div>
      <Form>
        <Card className="mb-3 border-0">
          <Card.Header className=" px-3 py-3 border-bottom">
            <h6 className="mb-0">Request Type</h6>
          </Card.Header>
          <Card.Body className="px-4 submit-data-menu">
            {newProfile?.map((data, id) => {
              return (
                <Form.Group key={id} className="d-sm-flex w-100">
                  <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
                    <TextForm text="NIK" span="*" />
                    <DisabledInput
                      type="text"
                      placeholder={data?.nik}
                      value={data?.nik}
                      id="employee-nik"
                      name="employee-nik"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3">
                    <TextForm text="Name" span="*" />
                    <DisabledInput
                      type="text"
                      placeholder={data?.name}
                      value={data?.name}
                      id="employee-name"
                      name="employee-name"
                    />
                  </Form.Group>
                </Form.Group>
              );
            })}

            <TextForm text="Issue Type" span="*" />
            <Form.Group className="d-sm-flex w-100">
              <Form.Group className="mb-3 me-sm-3 w-100 w-sm-50">
                <IssueDropdown
                  setSelected={setSelectedIdIssue}
                  data={issueType}
                  group={groupOpt}
                />
              </Form.Group>
              <Form.Group className="mb-3 w-sm-50 w-100 ms-sm-3 d-flex align-items-center">
                {displayPICIssue === "" ? (
                  <Form.Text className="w-sm-50 w-100 pic-issue">
                    PIC Issue :
                  </Form.Text>
                ) : (
                  <Form.Text className="w-sm-50 w-100 pic-issue">
                    PIC Issue : {displayPICIssue ? displayPICIssue : null}
                  </Form.Text>
                )}
              </Form.Group>
            </Form.Group>
            <TextNote
              note="Note : SLA untuk issue ini 3 hari"
              className="fst-italic"
            />
          </Card.Body>
        </Card>
      </Form>
      <div className="faq-link">
        <Faq text={text} />
        <div className="submit-wrapper">
          {selectedIdIssue === "" ? (
            <Button
              className="btn-next btn-left mb-4 w-sm-100"
              onClick={next}
              disabled
            >
              Next
            </Button>
          ) : (
            <Button className="btn-next btn-left mb-4 w-sm-100" onClick={next}>
              Next
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
export default RequestType;
