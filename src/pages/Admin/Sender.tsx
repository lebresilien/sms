import Breadcrumb from "../../components/Breadcrumb";
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Sender } from "../../types";
import { useEffect, useState } from "react";
import * as usersApi from "../../api/users";
import { Button } from "../../components/Button";
import Alert from '@mui/material/Alert';
import DeleteModal from "../../components/DeleteModal";
import DialogModal from "../../components/DialogModal";

const columns: GridColDef[] = [
    { field: 'key', headerName: 'N°' },
    { field: 'name', headerName: 'Nom', width: 250},
    { field: 'slug', headerName: 'Slug', width: 250},
];

const OrderList = () => {

    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [senders, setSenders] = useState<Sender[]>([]);
    const [update, setUpdate] = useState(false) ;
    const [showModal, setShowModal] = useState(false) ;
    const [name, setName] = useState('');
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const [Id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorModal, setErrorModal] = useState('');

    useEffect(() => {
        usersApi.listSender()
        .then(resp => setSenders(resp))
    }, []);

    const deleteSender = () => {
        
        setDeleting(true);

        usersApi.deleteOrder(Id)
        .then(() => {
            setSenders(() => {
                setShowRemoveModal(false);
                const rowToDeleteIndex = senders.findIndex(sender => sender.id === Id)
                return [
                    ...senders.slice(0, rowToDeleteIndex),
                    ...senders.slice(rowToDeleteIndex + 1),
                ];
            });

            setDeleting(false);
        })
        .catch(err => {
            setErrorModal(err.response.data.message)
            setDeleting(false);
            setShowRemoveModal(false);
        });
    }

    const displayRemoveModal = (arrayId: GridRowSelectionModel) => {
        if(arrayId.length == 0) {
            setErrorModal('Selectionner un element');
        } else {
            setShowRemoveModal(true);
            setId(arrayId[0] as string);
        }
    }

    const updateOrder = (arrayId: GridRowSelectionModel) => {

        if(arrayId.length != 1 ) {
            setErrorModal('Selectionner un element');
            return;
        }

        setUpdate(true);

        const sender = senders.find(sender => sender.id === arrayId[0]);
        
        setName(sender ? sender.name : '');
        setId(arrayId[0] as string);

        setShowModal(true);
    }

    const save = () => { 

        setLoading(true);
        setErrorModal('');

        if(update) {

            usersApi.updateSender(Id, name)
            .then(() => {

                setSenders((prevSenders) => {

                    const rowToUpdateIndex = senders.findIndex(sender => sender.id === Id)
              
                    return prevSenders.map((order, index) =>
                      index === rowToUpdateIndex ? { ...order, name: name } : order,
                    );

                });

                setLoading(false);
                setShowModal(false);
            })
            .catch(err => {
                setErrorModal(err.response.data.message);
                setLoading(false);
                setShowModal(false);
            })

        } else {

            usersApi.addSender(name)
            .then((newSender) => {

                const item = {id: newSender.id, key: (senders.length + 1), name: newSender.name, slug: newSender.slug};

                setSenders((prevSenders) => [...prevSenders, item]);

                setLoading(false);
                setShowModal(false);
            })
            .catch((err) => {
                setErrorModal(err.response.data.message)
                setLoading(false);
            })

        }
    }

    const displayModal = () => { 
        setUpdate(false);
        setShowModal(true);
        setName('');
        setErrorModal('');
    }

    return (
        <>

            <Breadcrumb pageName="Commandes" />

            <div className="grid grid-cols-1 gap-8">

                <div className="col-span-5 xl:col-span-3">

                    {errorModal && ((<div className="my-3"><Alert severity="error">{ errorModal }</Alert></div>))}

                    <div className="flex flex-row justify-between items-center mb-5">

                        <div className="flex flex-row space-x-4">

                             <Button 
                                onClick={() => updateOrder(rowSelectionModel)}
                                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                            >
                                Modifier
                            </Button>

                            <Button
                                onClick={() => displayRemoveModal(rowSelectionModel)}
                                className="w-full cursor-pointer rounded-lg border border-danger bg-danger p-2 text-white transition hover:bg-opacity-90"
                            >
                                Supprimer
                            </Button>
                        </div>

                        <div className="flex flex-row">
                            <Button
                                onClick={displayModal}
                                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                            >
                                +Ajouter
                            </Button>
                        </div>

                    </div>

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <DataGrid 
                            rows={senders} 
                            columns={columns} 
                            checkboxSelection 
                            disableRowSelectionOnClick
                            onRowSelectionModelChange={(newRowSelectionModel) => {
                                setRowSelectionModel(newRowSelectionModel);
                            }}
                            rowSelectionModel={rowSelectionModel}
                        />

                    </div>
                
                </div>

            </div>

            <DeleteModal 
                showRemoveModal={showRemoveModal}
                setShowRemoveModal={setShowRemoveModal}
                deleting={deleting}
                remove={deleteSender}
            />

            <DialogModal 
                title={"Sender"}
                showModal={showModal}
                setShowModal={setShowModal}
                update={update}
                value={name}
                setValue={setName}
                loading={loading}
                save={save}
            />

        </>
    );
}

export default OrderList;