export default function ArrangementByNumbers(props){
    const arrangementByNumbers=()=>{
        props.data.sort((a, b) => a.id-b.id)
        props.setData((prevData)=>[...prevData])
    }
    return(
        <div>
            <button onClick={arrangementByNumbers}>ArrangementByNumbers</button>
        </div>
    )
}