import React, { useState } from "react";
import "./Crud.css";
// import { useForm } from "react-hook-form";
// const Crud = () => {

//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors },
//         reset
//     } = useForm();

//     const [usersList, setUsersList] = useState([]);
//     const [editingId, setEditingId] = useState(null);

//     const getId = (prev) => {
//         if (prev?.length > 0)
//             return prev?.length + 1
//         else
//             return 1;
//     }
//     const mySubmitHandler = (data) => {
//         if (editingId) {
//             setUsersList(prev => prev.map((prevDataObj) => {
//                 if (data?.id == prevDataObj?.id) {
//                     return data;
//                 } else {
//                     return prevDataObj
//                 }
//             }))
//             setEditingId(null);
//         }
//         else
//             setUsersList(prev => [...prev, { id: getId(prev), name: data?.name, gender: data?.gender, active: data?.active, inactive: data?.inactive }]);
//     }

//     const handleUpdate = (data) => {
//         setEditingId(data.id);
//         reset({ id: data?.id, name: data?.name, gender: data?.gender, active: data?.active, inactive: data?.inactive })
//     }

//     const deleteHandler = (id) =>{
//         setUsersList(prev => {
//             return prev.filter(data => data?.id != id)
//         })
//     }
//     return (
//         <>
//             <form onSubmit={handleSubmit(mySubmitHandler)}>
//                 <div className="form-container">
//                     <label htmlFor="Name">Name</label>
//                     <input type="text" {...register("name", { required: true })}></input>
//                     {errors?.name ? <div>Name Required</div> : ''}

//                     <label htmlFor="Name">Gender</label>
//                     <select {...register("gender", { required: true })}>
//                         <option value="male">Male</option>
//                         <option value="female">Female</option>
//                     </select>

//                     <div>
//                         <label htmlFor="active">Active</label>
//                         <input type="checkbox"   {...register("active")} />

//                         <label htmlFor="inactive">In Active</label>
//                         <input type="checkbox"  {...register("inactive")} />

//                     </div>

//                     {editingId?<button type="submit">Update</button>: <button type="submit">Save</button>}

//                 </div>

//             </form >




//             <table>
//                 <thead>
//                     <th>Id</th>
//                     <th>Name</th>
//                     <th>Age</th>
//                     <th>Status</th>
//                     <th>Actions</th>
//                 </thead>
//                 <tbody>
//                     {usersList && usersList?.map((data, index) => {
//                         return <tr key={index}>
//                             <td>{data?.id}</td>
//                             <td>{data?.name}</td>
//                             <td>{data?.gender}</td>
//                             <td>{data?.active ? 1 : 0}</td>
//                             <td><button onClick={() => handleUpdate(data)}>update</button>
//                             </td>
//                             <td><button onClick={() => deleteHandler(data?.id)}>Delete</button></td>
//                         </tr>
//                     })}
//                 </tbody>
//             </table>

//         </>
//     )
// }



const Crud = () => {

    const [usersList, setUsersList] = useState([]);
    const [isEditingId, setIsEditingId] = useState(null);
    const [name_, setName] = useState("");
    const [gender, setGender] = useState("Female");


    const getId = (list) => {
        if (list?.length > 0) {
            return list?.length + 1
        } else
            return 1

    }

    const handleSave = () => {

        if (!isEditingId) {
            if (name_ && gender) {
                setUsersList(prev => {
                    return [...prev, { id: getId(prev), name: name_, gender: gender }]
                })
            }
        }

        else {
            setUsersList((prev)=>{
                return prev.map((da)=>{
                    if(da?.id == isEditingId){
                        return {
                            ...da,
                            name: name_,
                            gender: gender
                        }
                    }else
                        return da;
                })
            }

            )
        }
        setName("");
        setGender("Female");
        setIsEditingId(null);


    }

    const updateHandler = (data) => {

        setIsEditingId(data?.id);
        setName(data?.name);
        setGender(data?.gender);
    }

    const deleteHandler = (id) =>{
        setUsersList(prev => 
            prev.filter((data)=> data?.id != id )
        )
    }
    return (
        <>
            <div className="users-container">
                <div>
                    <label>
                        Name
                    </label>
                    <input type="text" value={name_} onChange={(e) => setName(e.target.value)} />
                </div>


                <div>

                    <label>
                        Gender
                    </label>
                    <select value={gender} onChange={(e) => {
                        if (e.target.value) {
                            setGender(e.target.value)
                        }
                        else
                            setGender("")

                    }}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                </div>
                <div>

                    {isEditingId ? <button onClick={handleSave}>Update</button> : <button onClick={handleSave}>Add</button>}
                </div>



            </div>
            <div>
                {usersList && usersList?.map((data, i) =>
                    <React.Fragment key={i}>
                        <div className="name-gender">
                            <div>{data?.id}</div>
                            <div>{data?.name}</div>
                            <div>{data?.gender}</div>
                            <button onClick={() => updateHandler(data)}>Update</button>

                            <button onClick={() => deleteHandler(data?.id)}>delete</button>
                        </div>
                    </React.Fragment>
                )}
            </div>
        </>
    )
}

export default Crud;

