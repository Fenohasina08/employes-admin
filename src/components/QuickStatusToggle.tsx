import { useRecordContext, useUpdate } from "react-admin";
import { Button } from "@mui/material";

export const QuickStatusToggle = () => {
   const record = useRecordContext();
  
   const [update, { isPending }] = useUpdate();

   if (!record) return null;

   const handleToggle = (e: React.MouseEvent) => {
     e.stopPropagation(); 

     update(
      "employees",  
      {
        id: record.id,                  
        data: { active: !record.active },  
        previousData: record            
      }
    );
  };

  return (
    <Button
      variant="contained"
      size="small"
      color={record.active ? "error" : "success"}
      disabled={isPending}
      onClick={handleToggle}
    >
      {record.active ? "Désactiver" : "Activer"}
    </Button>
  );
};