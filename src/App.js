import React,{useState,useEffect} from "react";
import List from "./list";
import Alert from "./alert";
import './index.css'
const getLocalStorage = ()=>{
    let list = localStorage.getItem('list')
    if(list){
        return JSON.parse(localStorage.getItem('list'));
    }else{
        return []
    }
}
function App() {
    // This is for the value gotten from the input
    const[name,setName] = useState('');

    // This is for the list gotten from input to render on the page

    const[list, setList] = useState(getLocalStorage());

    // This is to change the value if you are editing or not

    const[isediting,setIsEditing] = useState(false);

    // This is for editing the id when the edit button is clicked
    const [editId, setEditId] = useState(null);

    // This is to set alert
    const [alert,setAlert] = useState({show:false,msg:'',type:''});
    
    const handleSubmit = (e)=>{ 
        e.preventDefault();
        if(!name){
            // If user doesnt input anything,alert user
            showAlert(true,'danger','please enter value')

        }else if(name && isediting){
            // deal with editing
            setList(list.map((item)=>{
                if(item.id === editId){
                    return{...item,title:name}
                }
                return item
            }))
            setName('')
            setEditId(null) 
            setIsEditing(false)
            showAlert(true,'success','value changed')
        }else{
            // add item to list
            showAlert(true,'success','Item added to the list')
            const newItem = {id: new Date().getTime().toString(), title:name}
            setList([...list,newItem]);
            setName('')
        }
    }

    const showAlert = (show = false , type = '', msg = '')=>{
        setAlert({show:show,type:type,msg:msg})
    }
    const clearList = ()=>{
        showAlert(true,'danger','empty list')
        setList([])
    }

    const removeItem = (id)=>{
        showAlert(true,'danger','item removed');
        setList((removeId)=>{
            let remove = removeId.filter((fill)=> fill.id !== id);
            return remove;
        })
    }

    const editItem = (id)=>{
       const specificItem = list.find((item)=> item.id === id);
       setIsEditing(true);
       setEditId(id)
       setName(specificItem.title);
    }

    useEffect(()=>{
        localStorage.setItem('list',JSON.stringify(list));
    },[list])
    return(
        <section className="section-center">
            <form className="grocery-form" onSubmit={handleSubmit}>
            {alert.show && <Alert {...alert} displayAlert = {showAlert} list = {list}/>}
            <h3>grocery bud</h3>
            <div className="form-control">
               <input type="text" className="grocery" placeholder="eg. milk" 
               value={name}
               onChange={(e)=> setName(e.target.value)} /> 
               <button type ="submit" className="submit-btn">{
                isediting? 'edit' : 'submit'
               }</button>
            </div>
            </form>

               {list.length > 0 && (
                <div className="grocery-container">
                <List items={list} deleteItem = {removeItem} editItem = {editItem}/>
                <button className="clear-btn" onClick={clearList}>clear items</button>
            </div>
               )
               }
          
        </section>
    )

}

export default App;
