import { useRef, useState } from "react";
import "./css/base.css";

function AddDuty() {
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
        }
    }
}

export default AddDuty;
