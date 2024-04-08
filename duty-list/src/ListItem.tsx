import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";
import { useEffect, useRef, useState } from "react";

function ListItem(props: { id: string }) {
    const [dutyName, setDutyName] = useState<string>("item1");
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
            <li>{dutyName} < UpdateButton onClick={editItem} /><DeleteButton /></li>

        );
    }

    function editItem(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        console.log(e);
        console.log("Update id:" + props.id);
        setIsEditMode(true);
        // txtDutyRef.current!.value = "item1";
    }

    function cancelEdit() {
        setIsEditMode(false);
    }

    function saveEdit() {
        console.log("Save button click");
        const dutyName: string = (txtDutyRef.current != null) ? txtDutyRef.current.value : "";
        console.log("Duty Name: " + dutyName);
        setDutyName(dutyName);
        //cal API to save
        setIsEditMode(false);
    }
}

export default ListItem;
