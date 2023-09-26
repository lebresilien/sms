
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { Button } from "./Button";

type ModalProps = {
    showRemoveModal: boolean,
    setShowRemoveModal(arg0: boolean): void,
    deleting: boolean,
    remove(): void
}

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const DeleteModal = ({ showRemoveModal, setShowRemoveModal, deleting, remove}: ModalProps) => (

    <Dialog
        open={showRemoveModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => setShowRemoveModal(false)}
        aria-describedby="alert-dialog-slide-description"
    >
        <DialogTitle>{"Voulez-vous vraimment effectuer cette opération?"}</DialogTitle>
        <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">
                La Suppression d'une commande est irreversible.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button
                className="cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90" 
                onClick={() => setShowRemoveModal(false)}
            >
                Annuler
            </Button>
            <Button
                className="cursor-pointer rounded-lg border border-danger bg-danger p-2 text-white transition hover:bg-opacity-90"
                onClick={remove}
            >
                {deleting ? 'Suppression...' : 'Confirmer'}
            </Button>
        </DialogActions>
    </Dialog>

);

export default DeleteModal;
