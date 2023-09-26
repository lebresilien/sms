import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import { Button } from "./Button";

type ModalProps = {
    showModal: boolean,
    setShowModal(arg0: boolean): void,
    update: boolean,
    value: string | number,
    setValue(val: any): void,
    loading: boolean,
    save(): void,
    title: string
}

const DialogModal = ({title, save, loading, showModal, setShowModal, update, value, setValue}: ModalProps) => (

    <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <DialogTitle>{!update ? `Ajouter un ${ title }` : 'Modification'}</DialogTitle>
        <DialogContent>
           
            <DialogContentText>
                L'ajout de groupe vous permetra par la suite d'envoyer des sms en masse.
            </DialogContentText>
            <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Nombre de sms commandés"
                type={typeof value === "number" ? "number" : "text"}
                fullWidth
                variant="standard"
                value={value}
                onChange={(e) => setValue(typeof value === "number" ? parseInt(e.target.value) : e.target.value)}
            />
        </DialogContent>
        <DialogActions>
            <Button
                onClick={() => setShowModal(false)}
                className="cursor-pointer rounded-lg border border-danger bg-danger p-2 text-white transition hover:bg-opacity-90"
            >
                Cancel
            </Button>
            <Button
                disabled={loading} 
                onClick={save}
                className="cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
            >
                {loading ? "Enregistrement..." : "Enregistrer"}
            </Button>
        </DialogActions>
    </Dialog>
);

export default DialogModal;