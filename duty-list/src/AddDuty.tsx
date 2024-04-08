import { useRef, useState } from "react";
import "./css/base.css";

function AddDuty(props: { refreshData: () => Promise<void> }) {
    console.log("render");
    // const [dutyName, setDutyName] = useState<string>("");
    const dutyNameRef = useRef<HTMLInputElement>(null);
    const [errMsgCSS, setErrMsgCSS] = useState<string>("errmsg hidden");
    return (
        <>
            <label>Duty Name:</label>
            <input type="text" ref={dutyNameRef} />
            <button onClick={submitItem}>Add Item</button >
            <div className={errMsgCSS}>Duty Name is required!</div>
        </>
    );

    function submitItem() {
        //reset error msg
        // errMsgRef.current!.style.display = "none";
        setErrMsgCSS("err-msg hidden");

        console.log(dutyNameRef.current?.value);
        const dutyName: string = (dutyNameRef.current != null) ? dutyNameRef.current.value : "";
        //validate the value
        if (dutyName == "") {
            //display error msg
            // console.log(errMsgRef.current?.style);
            // errMsgRef.current!.style.display = "block";
            setErrMsgCSS("err-msg");
        } else {
            //call API to add item
            fetch(import.meta.env.VITE_API_HOST + '/v1/duty-list/items', {
                method: "POST", // *GET, POST, PUT, DELETE, etc.            
                headers: {
                    "Content-Type": "application/json",
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify({ name: dutyName }), // body data type must match "Content-Type" header
            }).then((response) => {
                console.log(response);
                response.json().then((data: { success: boolean, err_msg: string }) => {
                    if (data.success) {
                        props.refreshData().then(
                            () => {
                                window.alert("Add success.");

                                //clear the textbox
                                if (dutyNameRef.current != null) {
                                    dutyNameRef.current.value = "";
                                }
                            }
                        ).catch(() => { });
                    } else {
                        window.alert("Add failed.");
                    }
                }).catch(() => { });
            }).catch(() => {
                window.alert("Add failed.");
            });
        }
    }
}

export default AddDuty;
