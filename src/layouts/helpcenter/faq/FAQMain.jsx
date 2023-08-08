import { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AllFAQsList from "../../../layouts/helpcenter/faq/AllFAQsList";
import { faqAction } from "../../../redux/action/faqAction";
import HelpCenterLayout from "../HelpCenterLayout";
import GuideTemplate from "../GuideTemplate";

const FAQMain = () => {
  const dispatch = useDispatch();

  const { faqData } = useSelector((state) => state.faqReducer);

  // const items = faqData?.data?.data;
  const win = window.localStorage;

  useEffect(() => {
    const token = win.getItem("access_token");
    dispatch(faqAction(token));
  }, []);

  return (
    <GuideTemplate>
      <AllFAQsList />
    </GuideTemplate>
  );
};
export default FAQMain;
