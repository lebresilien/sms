import { ChangeEvent, useState } from "react";
import Breadcrumb from "./Breadcrumb";
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import FormControl from '@mui/material/FormControl';
import InputLabel from "@mui/material/InputLabel";
import MenuItem from '@mui/material/MenuItem';
import { Button } from "./Button";
import Alert from "@mui/material/Alert";
import { Sender, Group, GroupContact } from "../types";

const MAX_CHARACTER = 10; 

type Props = {
    title: string,
    balance: number,
    senders: Sender[],
    groups?: GroupContact[],
    destinations: string,
    handleChange?(event: ChangeEvent<HTMLInputElement>): void,
    countSms: number,
    blurHandler?(): void,
    error: boolean,
    setError(val: boolean): void,
    pending: boolean,
    sendMessage(): void,
    showError: string,
    airtime: number,
    setAirtime(val: number): void,
    message: string,
    setMessage(val: string): void,
    handleChangeGroup?(event: SelectChangeEvent): void,
    selectedGroup?: string
}

const Sms = ({
    title,
    balance,
    senders,
    groups,
    blurHandler,
    destinations,
    handleChange,
    countSms,
    error,
    setError,
    pending,
    sendMessage,
    showError,
    airtime,
    setAirtime,
    message,
    setMessage,
    handleChangeGroup,
    selectedGroup
}: Props) => {

    const [sender, setSender] = useState('');
    const [count, setCount] = useState(0);

    const handleChangeSender = (event: SelectChangeEvent) => {
        setSender(event.target.value as string);
    };

    const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value as string);
        const countMessages = Math.ceil(message.length / MAX_CHARACTER);
        setCount(countMessages);
        setAirtime(countMessages * destinations.split(';').length)
    };

    return (
        <>
            <Breadcrumb pageName={title} />

            <div className="grid grid-cols-1 gap-8">

                <div className="col-span-5 xl:col-span-3">

                {showError && ((<div className="my-3"><Alert severity="error" >{ showError }</Alert></div>))}

                    <div className="flex p-5 flex-row items-center justify-between rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
    
                        <span className="font-semibold text-black dark:text-white">Solde sms: { balance }</span>
                        
                        <span className="font-semibold text-black dark:text-white">Crédit à utiliser: { message ?  airtime : 0 }</span>
                        
                        <span className="font-semibold text-black dark:text-white">Nombre de destinataire: { countSms }</span>
                        
                    </div>

                    <div className="flex p-5 mt-3 flex-col justify-between rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">

                        <TextField
                            variant={groups ? "filled" : "standard" }
                            disabled={groups ? true : false}
                            autoComplete="off"
                            error={error}
                            value={destinations}
                            onChange={handleChange}
                            onBlur={blurHandler}
                            onFocus={() => setError(false)}
                            id="standard-basic" 
                            label="Numéro Destinataire" 
                            helperText={groups ? "" : "Entrer les Numeros separés par les points virgule (;)"}
                        />

                        <div className="flex flex-row my-3 my-3">

                            <div className="flex flex-col w-1/2 space-y-5">

                                {groups && ((
                                    <FormControl fullWidth>

                                        <InputLabel id="demo-simple-select-label-8l">Sélectionner le groupe</InputLabel>

                                        <Select
                                            labelId="ddemo-simple-select-label-8l"
                                            id="demo-simple-select-label-8l"
                                            value={selectedGroup}
                                            label="Selectionner le groupe"
                                            onChange={handleChangeGroup}
                                        >
                                            {groups?.map((group) => (
                                                <MenuItem value={group.name} key={group.id}>{group.name}</MenuItem>
                                            ))}
                                            
                                        </Select>

                                    </FormControl>
                                ))}

                                <FormControl fullWidth>

                                    <InputLabel id="demo-simple-select-label">Sender</InputLabel>
                                    
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={sender}
                                        label="Sendereee"
                                        onChange={handleChangeSender}
                                    >
                                        {senders?.map((sender) => (
                                            <MenuItem value={sender.id} key={sender.id}>{sender.slug}</MenuItem>
                                        ))}
                                        
                                    </Select>
                                    
                                </FormControl>

                                <TextField 
                                    id="standard-basic" 
                                    label="Message" 
                                    variant="outlined" 
                                    multiline 
                                    value={message}
                                    onChange={handleChangeMessage}
                                    minRows={3}
                                />

                                <TextField 
                                    id="standard-basic-3" 
                                    variant="filled"
                                    value={message ? count + " message(s) pour " +   message.length + " caractères" : ""}
                                    onChange={handleChangeMessage}
                                    disabled
                                />

                                <Button 
                                    className="rounded-lg border border-primary bg-primary p-2 text-white transition hover:bg-opacity-90"
                                        disabled={pending} 
                                        onClick={sendMessage}
                                >
                                    {pending ? 'Envoi en cours...' : 'Envoyer les messages'} 
                                </Button>

                            </div>

                            <div className="flex flex-col w-1/2 px-5">

                                <TextField 
                                    id="standard-basic-form" 
                                    variant="filled" 
                                    label="Visualiser le message"
                                    multiline 
                                    value={message}
                                    fullWidth 
                                    minRows={6}
                                    disabled
                                />
                            
                            </div>

                        </div>

                    </div>    

                </div>  

            </div>
        </>
    );
}

export default Sms;
