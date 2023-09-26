import { ChangeEvent, useState, useEffect } from "react";
import * as usersApi from "../../api/users";
import { GroupContact, Sender } from "../../types";
import Sms from "../../components/Sms";


const Simple = () => {

    const [balance, setBalance] = useState(0);
    const [airtime, setAirtime] = useState(0);
    const [countSms, setCountSms] = useState(0);
    const [destinations, setDestinations] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] =  useState(false);
    const [showError, setShowError] =  useState('');
    const [selectedGroup, setSelectedGroup] = useState('');
    const [pending, setPending] =  useState(false);
    const [groups, setGroups] =  useState<GroupContact[]>([]);
    const [senders, setSenders] =  useState<Sender[]>([]);

    useEffect(() => {
        usersApi.balanceTransaction()
        .then((res) => { 
            setBalance(res.balance);
            setGroups(res.groups);
            setSenders(res.senders);
        })
    }, []);

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

    const handleChangeGroup = (event: ChangeEvent<HTMLInputElement>) => {
        
        setSelectedGroup(event.target.value);
        
        const find = groups.find(g => g.name === event.target.value);
        
        let value = "";

        for(const i in find?.contacts) {
            if(parseInt(i) == find.contacts.length -1) value += find.contacts[parseInt(i)];
            else value += find.contacts[parseInt(i)] + ";";
        }

        setCountSms(value.split(";").length);

        setDestinations(value);
    }
   
    return (
        <>
            <Sms
                title="Sms groupé"
                balance={balance}
                senders={senders}
                groups={groups}
                destinations={destinations}
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
                handleChangeGroup={handleChangeGroup}
                selectedGroup={selectedGroup}
            />
        </>
    );
}

export default Simple;
