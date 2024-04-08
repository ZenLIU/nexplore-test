
import { useEffect, useState } from "react";
import AddDuty from "./AddDuty";
import ListItem from "./ListItem";
import { DutyListItem } from "./iDutyListItem";

function DutyList() {
    const [items, setItems] = useState<DutyListItem[]>([]);

    async function refreshData() {
        try {
            console.log('refreshData()');
            const items: DutyListItem[] = await fetchData();
            setItems(items);
        } catch (err) {
            console.error(err);
        }
    }

    async function fetchData() {

        const response = await fetch(import.meta.env.VITE_API_HOST + '/v1/duty-list/items');
        const items: DutyListItem[] = await response.json() as DutyListItem[];
        console.log(items);
        return items;
    }

    useEffect(() => {
        //call API to get duty list item
        fetchData().then(
            (items) => {
                console.log(items);
                setItems(items);
            }
        ).catch(() => { });
    }, []);

    return (
        <div>
            <ul>
                {items.map(item => (
                    <ListItem id={item.id} name={item.name} key={item.id} refreshData={refreshData} />
                ))}
            </ul>
            <div>
                <AddDuty refreshData={refreshData} />
            </div>
        </div>
    );
}

export default DutyList;
