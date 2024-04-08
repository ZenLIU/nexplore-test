function UpdateButton(props: { onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void }) {
    return (
        <button onClick={(e) => props.onClick(e)}>Update</button>
    );
}

export default UpdateButton;
