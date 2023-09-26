import { useEffect, useState, useRef, ChangeEvent } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { DataGrid, GridRowsProp, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Alert from '@mui/material/Alert';
import * as usersApi from "../../api/users";
import { Button } from "../../components/Button";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { read, utils } from 'xlsx';
import { Contact } from "../../types";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Snackbar from '@mui/material/Snackbar';
import DeleteModal from "../../components/DeleteModal";
import Menu from "../../components/Menu";

  
const columns: GridColDef[] = [
    { field: 'key', headerName: 'N°', width: 150 },
    { field: 'name', headerName: 'Nom', width: 350 },
    { field: 'count', headerName: 'Membre', width: 150 },
];

const GroupList = () => {

    const [showAlert, setShowAlert] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [pending, setPending] = useState(false);
    const [showSnack, setShowSnack] = useState(false);
    const [update, setUpdate] = useState(false);
    const [excelModal, setExcelModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [name, setName] = useState('');
    const [Id, setId] = useState('');
    const [error, setError] = useState('') ;
    const [groups, setGroups] = useState<GridRowsProp>([]);
    const [contacts, setContacts] = useState<Contact[]>([]);
    const [file, setFile] = useState<Blob>();
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);

    const excelFile = useRef<HTMLInputElement>(null);

    useEffect(() => {
        usersApi.listGroups()
        .then(resp => setGroups(resp))
    }, []);

    const displayRemoveModal = (arrayId: GridRowSelectionModel) => {

        if(arrayId.length == 0) {
            setShowAlert(true);
        }
        else {

            setDeleting(true);
            setId(arrayId[0] as string);
            
        }
    }

    const deleteGroup = () => {
        
        setPending(true);

        usersApi.deleteGroup(Id)
        .then(() => {
            setGroups(() => {
                const rowToDeleteIndex = groups.findIndex(group => group.id === Id)
                return [
                    ...groups.slice(0, rowToDeleteIndex),
                    ...groups.slice(rowToDeleteIndex + 1),
                ];
            });
            setPending(false);
            setDeleting(false);
        })
    }

    const updateGroup = (arrayId: GridRowSelectionModel) => {

        if(arrayId.length == 1 ) {

            setUpdate(true);

            const group = groups.find(group => group.id === arrayId[0]);
            
            setName(group?.name);
            setId(arrayId[0] as string);

            setShowModal(true);

        } else {
            setShowAlert(true);
        } 
    }

    const displayAddModal = () => {
        setError('');
        setUpdate(false);
        setShowModal(true);
        {update ? '' : setName('')}
    }

    const save = () => { 

        setLoading(true);

        if(update) {

            usersApi.updateGroup(Id, name)
            .then(() => {

                setGroups((prevGroups) => {

                    const rowToUpdateIndex = groups.findIndex(group => group.id === Id)
              
                    return prevGroups.map((group, index) =>
                      index === rowToUpdateIndex ? { ...group, name: name } : group,
                    );

                });

                setLoading(false);
                setShowModal(false);
            })

        } else {

            usersApi.addGroup(name)
            .then((newGroup) => {

                const item = {id: newGroup.id, key: (groups.length + 1), name: newGroup.name};

                setGroups((prevGroups) => [...prevGroups, item]);

                setLoading(false);
                setShowModal(false);
            })
            .catch((err) => {
                setError(err.response.data.message)
                setLoading(false);
            })

        }
    }

    const displayExcelModal = (arrayId: GridRowSelectionModel) => {

        if(arrayId.length == 0) {
            setShowAlert(true);
            return;
        }

        setId(arrayId[0] as string);

        if(excelFile.current) {
                excelFile.current.click();
        }

    }

    const uploadFile = () => {

        if(!file) {
            setError('Une erreur est survenu');
            return ;
        }

        setPending(true);

        const data = new FormData();
        data.append('file', file);
        data.append('group_id', Id);

        usersApi.uploadContact(data)
        .then(() => {
            setPending(false);
            setExcelModal(false);
            setShowSnack(true);
        })
        .catch((err) => {
            setError(err.response.data.message)
            setPending(false);
        });
        
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        
        const files = e.target.files;

        if (files && files.length) {

            setExcelModal(true);

            const file = files[0];
            setFile(file);
            const reader = new FileReader();

            reader.onload = (event) => {
                const wb = read(event.target?.result);
                const sheets = wb.SheetNames;

                if (sheets.length) {
                    const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
                    setContacts(rows)
                }
            }
            reader.readAsArrayBuffer(file);
        }
    }


    return (
        <>
            <Breadcrumb pageName="Groups" />

            <div className="grid grid-cols-1 gap-8">
                
                <div className="col-span-5 xl:col-span-3">

                    {showAlert && ((<div className="my-3"><Alert severity="error" >Selectionner au moins une ligne</Alert></div>))}

                    <Menu 
                        rowSelectionModel={rowSelectionModel}
                        update={updateGroup}
                        displayExcelModal={displayExcelModal}
                        displayAddModal={displayAddModal}
                        pending={pending}
                        displayRemoveModal={displayRemoveModal}
                    />

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <DataGrid 
                            rows={groups} 
                            columns={columns} 
                            checkboxSelection 
                            disableRowSelectionOnClick
                            onRowSelectionModelChange={(newRowSelectionModel) => {
                                setRowSelectionModel(newRowSelectionModel);
                            }}
                            rowSelectionModel={rowSelectionModel}
                        />

                        <input
                            onChange={(e) => onChange(e)}
                            ref={excelFile}
                            type="file" 
                            className="hidden"
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        />
                    </div>
                </div>
            </div>

            <Dialog open={showModal} onClose={() => setShowModal(false)}>
                <DialogTitle>{!update ? "Ajouter un groupe" : "Modification"}</DialogTitle>
                <DialogContent>
                    {error && ((<div className="my-3"><Alert severity="error" >{error}</Alert></div>))}
                    <DialogContentText>
                        L'ajout de groupe vous permetra par la suite d'envoyer des sms en masse.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="nom du groupe"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
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

            <DeleteModal 
                showRemoveModal={deleting}
                setShowRemoveModal={setDeleting}
                deleting={pending}
                remove={deleteGroup}
            />

            <Dialog
                open={excelModal}
                onClose={() => setExcelModal(false)}
                scroll={'paper'}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
                <DialogContent dividers={true}>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                            <TableRow>
                                <TableCell align="right">Noms&nbsp;</TableCell>
                                <TableCell align="right">Email&nbsp;</TableCell>
                                <TableCell align="right">Téléphone&nbsp;</TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {contacts.map((contact) => (
                                <TableRow
                                    key={contact.phone}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="row">
                                    {contact?.name}
                                </TableCell>
                                <TableCell align="right">{contact?.email}</TableCell>
                                <TableCell align="right">{contact.phone}</TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </DialogContent>
                <DialogActions>
                    <Button
                        className="rounded-lg border border-danger bg-danger p-2 text-white transition hover:bg-opacity-90"
                        onClick={() => setExcelModal(false)}
                    >
                        Annuler
                    </Button>
                    <Button 
                    className="rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                        disabled={pending} 
                        onClick={uploadFile}
                    >
                        {pending ? 'Importation...' : 'Importer'} 
                    </Button>
                </DialogActions>
            </Dialog>

            <Snackbar open={showSnack} autoHideDuration={6000} onClose={() => setShowSnack(false)}>
                <Alert  severity="success" sx={{ width: '100%' }}>
                    Importation reussie
                </Alert>
            </Snackbar>
        </>
    );
}

export default GroupList;