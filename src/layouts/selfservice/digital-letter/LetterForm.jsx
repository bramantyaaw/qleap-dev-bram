import axios from "axios";
import { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { async } from "regenerator-runtime";
import ProcessLoadingModal from "../../../components/components/elements/modal/ProcessLoadingModal";

export const LetterForm = (props) => {
  const { token, uid, getItem, setLetterName } = props;
  const [letters, setLetters] = useState([]);
  const [needId, setNeedId] = useState(0);
  const [modalLoading, setModalLoading] = useState(false);

  const fetchLetters = async () => {
    try {
      await axios
        .get(`/services/digital-latter/get-need`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setLetters(res?.data?.data);
        });
    } catch (err) {
      return err;
    }
  };

  const getLetterData = async () => {
    try {
      setModalLoading(true);
      await axios
        .post(
          `/services/digital-latter/get-pdf-digital-latter`,
          {
            uid: uid,
            need_id: parseInt(needId),
          },
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        )
        .then((res) => {
          setModalLoading(false);
          getItem(res?.data?.data?.base64);
        });
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchLetters();
  }, [token, uid]);

  useEffect(() => {
    getLetterData();
  }, [needId]);

  return (
    <div>
      <Form>
        <Form.Group className="d-sm-flex w-100">
          <Form.Group className="mb-3 me-sm-3 w-100">
            <Form.Label htmlFor="letter-type">Letter Type</Form.Label>
            <br />
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => {
                setLetterName(e.target.options[e.target.selectedIndex].text);
                setNeedId(e.target.value);
              }}
            >
              <option>Select digital letter</option>
              {letters?.map((data, key) => {
                return (
                  <option value={data?.need_id} key={key} text={data?.need}>
                    {data?.need}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
        </Form.Group>
      </Form>
      {modalLoading && (
        <ProcessLoadingModal show={modalLoading} setShow={setModalLoading} />
      )}
    </div>
  );
};
