import { Button } from "./Button";
import { GridRowSelectionModel } from '@mui/x-data-grid';

type Props = {
    rowSelectionModel: GridRowSelectionModel,
    update(row: GridRowSelectionModel): void,
    displayExcelModal?(row: GridRowSelectionModel): void,
    displayAddModal(): void,
    pending: boolean,
    displayRemoveModal(row: GridRowSelectionModel): void
}

const Menu = ({ update, rowSelectionModel, displayExcelModal, displayAddModal, pending, displayRemoveModal }: Props) => (

    <div className="flex flex-row justify-between items-center mb-5">
        <div className="flex flex-row space-x-4">
            
            <Button 
                onClick={() => update(rowSelectionModel)}
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
            >
                Modifier
            </Button>

            {displayExcelModal && ((
                <Button 
                    onClick={() => displayExcelModal(rowSelectionModel)}
                    className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                >
                    Importer
                </Button>
            ))}

            <Button
                disabled={pending}
                onClick={() => displayRemoveModal(rowSelectionModel)}
                className="w-full cursor-pointer rounded-lg border border-danger bg-danger p-2 text-white transition hover:bg-opacity-90"
            >
                Supprimer
            </Button>

        </div>

        <div className="flex flex-row">
            <Button
                onClick={displayAddModal}
                className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
            >
                +Ajouter
            </Button>
        </div>

    </div>
);

export default Menu;