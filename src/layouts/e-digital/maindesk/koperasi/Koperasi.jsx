import axios from "axios";
import { useEffect, useState } from "react";
import { DynamicTable } from "../../../../components/components/elements/table/DynamicTable";
import { ManagementTabs } from "../../../../components/components/elements/tabs/ManagementTabs";
import {
  addCommas,
  engDateFormat,
  getDateValue,
  monthDiff,
  romanize,
} from "../../../../config/helper/utils";
import EdigitalLayout from "../../../home/EDigitalLayout";
import { UploadKoperasi } from "./UploadKoperasi";

export const Koperasi = () => {
  const [token, setToken] = useState(localStorage.getItem("access_token"));
  const [uid, setUid] = useState(localStorage.getItem("uid"));
  const [loan, setLoan] = useState([]);
  const [savings, setSavings] = useState([]);

  const fetchLoan = async () => {
    try {
      await axios
        .get(`/services/koperasi/get-loan`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          let loanData = [];

          res?.data?.data?.map((data, key) => {
            let total = parseInt(data?.loan) + parseInt(data?.interest);

            let created_date = engDateFormat(data?.created_date);

            let end_installment = engDateFormat(data?.end_installment);

            let diff1 = monthDiff(
              getDateValue(new Date(created_date)),
              getDateValue(new Date(end_installment))
            );

            let cicilan = Math.round(total / parseInt(diff1));

            let diff2 = monthDiff(
              getDateValue(new Date(created_date)),
              getDateValue(new Date())
            );

            let sisa = Math.round(cicilan * parseInt(diff2));

            loanData?.push({
              no: parseInt(key) + 1,
              no_form: data?.form_no,
              tahap: romanize(data?.batch),
              nama_anggota: data?.name,
              nik: data?.nik,
              level: data?.level,
              pokok_pinjaman: addCommas(data?.loan),
              bunga: addCommas(data?.interest),
              total: addCommas(total),
              cicilan: cicilan ? addCommas(cicilan) : "-",
              awal: data?.created_date,
              akhir: data?.end_installment,
              nomor_rekening: data?.acc_no,
              perusahaan: data?.bu_code,
              sisa_pinjaman: sisa ? addCommas(sisa) : "-",
            });
          });

          setLoan(loanData);
        });
    } catch (err) {
      return err;
    }
  };

  const fetchSavings = async () => {
    try {
      await axios
        .get(`/services/koperasi/get-saving`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          let savingData = [];
          let counter = {};

          res?.data?.data?.map((data, key) => {
            let string = JSON.stringify(data?.name);
            counter[string] = (counter[string] || 0) + 1;

            savingData?.push({
              no: parseInt(key) + 1,
              nama_anggota: data?.name,
              nik: data?.nik,
              simpanan_pokok: addCommas(data?.deposit),
              simpanan_wajib: addCommas(
                parseInt(data?.deposit) * counter[string]
              ),
            });
          });

          const obj = {};
          let count = 1;
          for (let i = 0, len = savingData.length; i < len; i++) {
            obj[savingData[i]["nama_anggota"]] = savingData[i];
          }

          savingData = new Array();

          for (const key in obj) {
            obj[key]["no"] = count++;
            savingData.push(obj[key]);
          }

          setSavings(savingData);
        });
    } catch (err) {
      return err;
    }
  };

  const tabs = [
    {
      id: 1,
      eventKey: "empData",
      title: "Upload File",
      content: <UploadKoperasi token={token} uid={uid} />,
    },
    {
      id: 2,
      eventKey: "loan",
      title: "Loan",
      content: (
        <DynamicTable title={"Loan"} data={loan} searchable={"nama_anggota"} />
      ),
    },
    {
      id: 3,
      eventKey: "savings",
      title: "Savings",
      content: (
        <DynamicTable
          title={"Savings"}
          data={savings}
          searchable={"nama_anggota"}
        />
      ),
    },
  ];

  const data = [
    {
      title: "Koperasi",
      tabs: tabs,
    },
  ];

  useEffect(() => {
    fetchLoan();
    fetchSavings();
  }, []);

  useEffect(() => {
    setToken(localStorage.getItem("access_token"));
    setUid(localStorage.getItem("uid"));
  }, [localStorage]);

  return (
    <EdigitalLayout>
      <ManagementTabs data={data} />
    </EdigitalLayout>
  );
};
