import { useRecordContext, useGetList } from "react-admin";
import { Card, CardContent, Typography } from "@mui/material";

export const InternsByManager = () => {
  const employee = useRecordContext(); 

  const { data: interns, isPending, error } = useGetList(
    "interns",  
    {  

    }
  );

 };