export default function ArrangementByBooleanTrue(props){
    const arrangementByBooleanTrue=()=>{
        props.data.sort((a, b) => b.completed-a.completed)
        props.setData((prevData)=>[...prevData])
    }
    return(
        <div>
            <button onClick={arrangementByBooleanTrue}>ArrangementByBooleanTrue</button>
        </div>
    )
}
