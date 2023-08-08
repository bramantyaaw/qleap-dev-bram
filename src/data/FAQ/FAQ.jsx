import axios from "axios";
import React, { useState, useEffect } from "react";

const urlGetFaq = "/services/get-faq-list";

//const token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI4djlmd2MzMExUYnRldWlkMDA0UmNBQjZHZDd2ZUI4U3RWNE9VVmdfbEFNIn0.eyJleHAiOjE2NzM5OTE0MjEsImlhdCI6MTY3Mzk0ODIyMSwianRpIjoiYTc5MmU1MGItYzcxYS00MjkxLTk5MGItN2QwNjgwZjQxOTI0IiwiaXNzIjoiaHR0cHM6Ly9zc28uZXJhamF5YS5jb20vYXV0aC9yZWFsbXMvZXJhamF5YSIsImF1ZCI6WyJrZGwiLCJsZWdhbC1zeXN0ZW0iLCJhY2NvdW50Il0sInN1YiI6IjdlZGY4OGY0LTNiZTEtNDhjMC04MjJiLTFhMTRjZTNmZWExNyIsInR5cCI6IkJlYXJlciIsImF6cCI6InFsZWFwIiwic2Vzc2lvbl9zdGF0ZSI6ImI0YTIwNTQ5LWJhM2MtNDc4OS1hMDU5LWM1NmM3ZjZjZjg5ZCIsImFjciI6IjEiLCJhbGxvd2VkLW9yaWdpbnMiOlsiaHR0cHM6Ly9kZXZlbG9wbWVudC5lcmFqYXlhLmNvbSIsImh0dHBzOi8vcWxlYXAuZXJhamF5YS5jb20iLCJodHRwOi8vcWxlYXAuZXJhamF5YS5jb20iLCJodHRwOi8vZGV2ZWxvcG1lbnQuZXJhamF5YS5jb20iXSwicmVhbG1fYWNjZXNzIjp7InJvbGVzIjpbImRlZmF1bHQtcm9sZXMtZXJhamF5YSIsImVyYWpheWEudXNlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJrZGwiOnsicm9sZXMiOlsidXNlciJdfSwicWxlYXAiOnsicm9sZXMiOlsiZW1wbG95ZWUiXX0sImxlZ2FsLXN5c3RlbSI6eyJyb2xlcyI6WyJ1c2VyIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6Im9wZW5pZCBwcm9maWxlIGVtYWlsIiwic2lkIjoiYjRhMjA1NDktYmEzYy00Nzg5LWEwNTktYzU2YzdmNmNmODlkIiwibmlrIjoiMjAxODAzMTQ3IiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJuYW1lIjoiSXZhbiBQcmFkYW5hIHByYWRhbmEiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJpdmFuLnByYWRhbmEiLCJnaXZlbl9uYW1lIjoiSXZhbiBQcmFkYW5hIiwiZmFtaWx5X25hbWUiOiJwcmFkYW5hIiwiZW1haWwiOiJpdmFuLnByYWRhbmFAZXJhamF5YS5jb20ifQ.1UyfXIe_o4SanhNK0FfBwktoVfpu7gLlJn2gn_sCXjwZS7drEE_EU6wULmRDrM3U_Qlf0G99NIW9SeL10bnQkff0_F6VAknf4azF78EzCNA1s44UgR7IY1l00bnxdtqlMHy6FMtT-f6YScOMMb2MPDlguuJlVx3eRRKqHGXu90DJ_ZQF2FT9Hi60OO6pKSfnysJAbV0BS1O0sf4K95O_DHATW0FntTpuOl5VJCAxhYn7FhRrgSexWtbF-pqRoAOMQyvxb6We__fPUsK6_p5aqtQEMRVv0H8qfdG43JXmZ3XGN_7UCeFNZg_AMgZ7RwtQGlnjLMM-xD3sP9DcI93Yfg'

const FAQ = ({ setPost, token }) => {
  const fetchData = async () => {
    try {
      const { data } = await axios.get(urlGetFaq, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPost(data);
    } catch (err) {
      return err;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <></>;
};

export default FAQ;
