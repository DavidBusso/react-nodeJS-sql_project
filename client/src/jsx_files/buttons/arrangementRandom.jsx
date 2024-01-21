export default function ArrangementRandom(props){
    const arrangementRandom=()=>{
        props.data.sort((a, b) => b.completed-a.completed)
        props.setData((prevData)=>[...prevData])
    }
    return(
        <div>
            <button onClick={arrangementRandom}>ArrangementRandom</button>
        </div>
    )
}
