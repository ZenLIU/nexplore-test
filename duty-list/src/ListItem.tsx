// import UpdateButton from "./UpdateButton";
// import DeleteButton from "./DeleteButton";
import { useEffect, useRef, useState } from "react";

function ListItem(props: { id: string, name: string, key: string, refreshData: () => Promise<void> }) {
    const [dutyName, setDutyName] = useState<string>(props.name);
    const [isEditMode, setIsEditMode] = useState<boolean>(false);
    const txtDutyRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (txtDutyRef.current != null)
            txtDutyRef.current.value = dutyName;
    }, [isEditMode]);

    if (isEditMode) {
        //edit mode
        return (
            <li><input type="text" ref={txtDutyRef} /><button onClick={saveEdit}>Save</button><button onClick={cancelEdit}>Cancel</button></li>
        );
    } else {
        return (
            <li>{dutyName} <button onClick={editItem}>Update</button><button onClick={deleteItem}>Delete</button></li>

        );
    }

    function deleteItem() {
        if (confirm('Confirm to delete item?')) {
            fetch(import.meta.env.VITE_API_HOST + '/v1/duty-list/items/' + props.id, {
                method: "DELETE", // *GET, POST, PUT, DELETE, etc.            
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
            }).then((response) => {
                console.log(response);
                response.json().then((data: { success: boolean, err_msg: string }) => {
                    if (data.success) {
                        // setDutyName(dutyName);                                                
                        props.refreshData().then(
                            () => {
                                window.alert("Delete success.");
                            }
                        ).catch(() => { });
                    } else {
                        window.alert("Delete failed.");
                    }
                }).catch(() => { });
            }).catch(() => {
                window.alert("Delete failed.");
            });
        }
    }

    function editItem(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        console.log(e);
        console.log("Update id:" + props.id);
        setIsEditMode(true);
    }

    function cancelEdit() {
        setIsEditMode(false);
    }

    function saveEdit() {
        console.log("Save button click");
        const dutyName: string = (txtDutyRef.current != null) ? txtDutyRef.current.value : "";
        console.log("Duty Name: " + dutyName);

        //cal API to save
        console.log(import.meta.env.VITE_API_HOST + '/v1/duty-list/items/' + props.id);
        fetch(import.meta.env.VITE_API_HOST + '/v1/duty-list/items/' + props.id, {
            method: "PUT", // *GET, POST, PUT, DELETE, etc.            
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: JSON.stringify({ name: dutyName }), // body data type must match "Content-Type" header
        }).then((response) => {
            console.log(response);
            response.json().then((data: { success: boolean, err_msg: string }) => {
                if (data.success) {
                    setDutyName(dutyName);
                    window.alert("Update success.");
                } else {
                    window.alert("Update failed.");
                }
                setIsEditMode(false);
            }).catch(() => { });
        }).catch(() => {
            window.alert("Update failed.");
            setIsEditMode(false);
        });
    }
}

export default ListItem;
