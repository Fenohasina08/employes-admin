import { useState } from "react";
import { useCreate, useNotify } from "react-admin";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Alert } from "@mui/material";

export const QuickInternCreate = () => {
  const [open, setOpen] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [managerId, setManagerId] = useState("");
  const [customError, setCustomError] = useState<string | null>(null);

  const [create, { isPending }] = useCreate();
  const notify = useNotify();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setFirstName("");
    setLastName("");
    setManagerId("");
    setCustomError(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
   };

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen} style={{ marginBottom: '1rem' }}>
        ➕ Ajouter stagiaire rapide
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Nouveau Stagiaire (Ajout Rapide)</DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent dividers>
            {customError && <Alert severity="error" style={{ marginBottom: '1rem' }}>{customError}</Alert>}
            
            <TextField
              label="Prénom"
              fullWidth
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              label="Nom"
              fullWidth
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              margin="normal"
            />
            <TextField
              label="ID du Manager (Employé)"
              fullWidth
              value={managerId}
              onChange={(e) => setManagerId(e.target.value)}
              required
              margin="normal"
              type="number"
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">Annuler</Button>
            <Button type="submit" color="primary" variant="contained" disabled={isPending}>
              {isPending ? "Création..." : "Enregistrer"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};