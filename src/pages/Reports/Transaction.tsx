import { useEffect, useState } from "react";
import Breadcrumb from "../../components/Breadcrumb";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import * as usersApi from "../../api/users";
import { Transaction } from "../../types";

  
const columns: GridColDef[] = [
    { field: 'key', headerName: 'N°', width: 50 },
    { field: 'sender', headerName: 'Sender', width: 150 },
    { field: 'phone', headerName: 'Destinataire', width: 100 },
    { field: 'message', headerName: 'Message', width: 300 },
    { field: 'qty', headerName: 'Quantité', width: 100 },
    { field: 'state', headerName: 'Etat', width: 150 },
    { field: 'created_at', headerName: 'Date', width: 150 },
];

const TransactionPage = () => {
    
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    useEffect(() => {
        usersApi.listTransaction()
        .then(resp => setTransactions(resp))
    }, []);

    
    return (
        <>
            <Breadcrumb pageName="Messages envoyés" />

            <div className="grid grid-cols-1 gap-8">
                
                <div className="col-span-5 xl:col-span-3">

                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <DataGrid 
                            rows={transactions} 
                            columns={columns}  
                            disableRowSelectionOnClick
                        />
                    </div>
                </div>
            </div>

        </>
    );
}

export default TransactionPage;