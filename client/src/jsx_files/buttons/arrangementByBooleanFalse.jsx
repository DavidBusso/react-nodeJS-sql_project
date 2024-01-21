export default function ArrangementByBooleanFalse(props){
    const arrangementByBooleanFalse=()=>{
        props.data.sort((a, b) => a.completed-b.completed)
        props.setData((prevData)=>[...prevData])
    }
    return(
        <div>
            <button onClick={arrangementByBooleanFalse}>ArrangementByBooleanFalse</button>
        </div>
    )
}