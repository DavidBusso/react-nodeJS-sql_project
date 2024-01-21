export default function ArrangementByLetters(props) {
    const arrangementByLetters = () => {
        props.data.sort((a, b) => a.title.localeCompare(b.title))
        props.setData((prevData) => [...prevData])
    }
    return (
        <div>
            <button onClick={arrangementByLetters}>ArrangementByLetters</button>
        </div>
    )
}