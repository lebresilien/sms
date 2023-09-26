import Breadcrumb from "../../components/Breadcrumb";
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { Order } from "../../types";
import { useEffect, useState } from "react";
import * as usersApi from "../../api/users";
import { Button } from "../../components/Button";
import Alert from '@mui/material/Alert';
import DeleteModal from "../../components/DeleteModal";
import DialogModal from "../../components/DialogModal";

const columns: GridColDef[] = [
    { field: 'key', headerName: 'N°' },
    { field: 'sms_command', headerName: 'Sms Commandé', width: 250},
    { field: 'sms_delivery', headerName: 'Sms Livrée', width: 250},
];

const OrderList = () => {

    const [showRemoveModal, setShowRemoveModal] = useState(false);
    const [deleting, setDeleting] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [update, setUpdate] = useState(false) ;
    const [showModal, setShowModal] = useState(false) ;
    const [smsCommand, setSmsCommand] = useState<number>(0);
    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([]);
    const [Id, setId] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorModal, setErrorModal] = useState('');

    useEffect(() => {
        usersApi.listOrder()
        .then(resp => setOrders(resp))
    }, []);

    const deleteOrder = () => {
        
        setDeleting(true);

        usersApi.deleteOrder(Id)
        .then(() => {
            setOrders(() => {
                setShowRemoveModal(false);
                const rowToDeleteIndex = orders.findIndex(order => order.id === Id)
                return [
                    ...orders.slice(0, rowToDeleteIndex),
                    ...orders.slice(rowToDeleteIndex + 1),
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

        const order = orders.find(order => order.id === arrayId[0]);
        
        setSmsCommand(order ? order.sms_command : 0);
        setId(arrayId[0] as string);

        setShowModal(true);
    }

    const save = () => { 

        setLoading(true);
        setErrorModal('');

        if(update && smsCommand) {

            usersApi.updateOrder(Id, smsCommand)
            .then(() => {

                setOrders((prevOrders) => {

                    const rowToUpdateIndex = orders.findIndex(order => order.id === Id)
              
                    return prevOrders.map((order, index) =>
                      index === rowToUpdateIndex ? { ...order, sms_command: smsCommand } : order,
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

            usersApi.addOrder(smsCommand)
            .then((newOrder) => {

                const item = {id: newOrder.id, key: (orders.length + 1), sms_command: newOrder.sms_command, sms_delivery: newOrder.sms_delivery};

                setOrders((prevOrders) => [...prevOrders, item]);

                setLoading(false);
                setShowModal(false);
                console.log('lastIndex', );
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
        setSmsCommand(0);
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
                            rows={orders} 
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
                remove={deleteOrder}
            />

            <DialogModal 
                title={"groupe"}
                showModal={showModal}
                setShowModal={setShowModal}
                update={update}
                value={smsCommand}
                setValue={setSmsCommand}
                loading={loading}
                save={save}
            />

        </>
    );
}

export default OrderList;