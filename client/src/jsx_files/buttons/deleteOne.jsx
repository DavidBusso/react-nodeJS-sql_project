import axios from 'axios'
export default function DeleteOne(props) {
    const user= localStorage.getItem('user');
    const password= localStorage.getItem('password');
    const deleteOne = async () => {
        await deleteCurrent();
        await props.open();
        console.log(`http://localhost:3300/sql/${props.types}/user/${props.userId}/${props.data.id}`);
    }
    const deleteCurrent = async () => {
        await deleteChoose();
        await props.setData((prevData) => [...prevData])
    }
    
    const deleteChoose = async () => {
     await axios.delete(`http://localhost:3300/sql/${props.types}/user/${props.userId}/${props.data.id}`,{headers:{'auth':`${user}:${password}`}});
    }
    return (
        <div>
            <button onClick={deleteOne}>delete</button>
        </div>
    )
}