import { ChangeEvent, useState, useEffect } from "react";
import * as usersApi from "../../api/users";
import { Sender } from "../../types";
import Sms from "../../components/Sms";


const Simple = () => {

    const [balance, setBalance] = useState(0);
    const [airtime, setAirtime] = useState(0);
    const [countSms, setCountSms] = useState(0);
    const [destinations, setDestinations] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] =  useState(false);
    const [showError, setShowError] =  useState('');
    const [pending, setPending] =  useState(false);
    const [senders, setSenders] =  useState<Sender[]>([]);

    useEffect(() => {
        usersApi.balanceTransaction()
        .then((res) => { 
            setBalance(res.balance);
            setSenders(res.senders);
        })
    }, [])

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDestinations(event.target.value as string);
        const spl = destinations.split(';');
        setCountSms(spl.length)
    };

    const blurHandler = () => { 
        destinations.split(';').forEach(element => {
            if(element.length != 9) {
                setError(true);
                return;
            }
        });
    }

    const sendMessage = () => {      
       
        if(!error) {

            setPending(true);
            setShowError('');

            usersApi.addTransaction(destinations.split(';'), Math.ceil(airtime/countSms), 1, message, airtime)
            .then(() => {
                setPending(false);
            })
            .catch(err => { 
                setPending(false);
                setShowError(err.response.data.message);
            })
        }
    };
   
    return (
        <>
            <Sms
                title="Sms simple"
                balance={balance}
                senders={senders}
                blurHandler={blurHandler}
                destinations={destinations}
                handleChange={handleChange}
                countSms={countSms}
                error={error}
                setError={setError}
                pending={pending}
                sendMessage={sendMessage}
                showError={showError}
                airtime={airtime}
                setAirtime={setAirtime}
                message={message}
                setMessage={setMessage}
            />
        </>
    );
}

export default Simple;
