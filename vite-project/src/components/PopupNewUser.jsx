import React from 'react'
import { collection, addDoc } from "firebase/firestore";
import { useForm } from "react-hook-form";
import { db } from '../firebase';
import './styles/popupnewuser.css';

const PopupNewUser = ({setPopup, users}) => {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const addUser = async (data) => {   
        const existingUser = users?.find(user => user.Nit === data.Nit);
        if (existingUser) {
            console.log("Error: NIT duplicado");
        } else {
            try {
                const docRef = await addDoc(collection(db, "Datos User"), {
                  ...data,    
                });
                console.log("Document written with ID: ", docRef.id);
              } catch (e) {
                console.error("Error adding document: ", e);
              }
        }
    }

    const handlePopUp = () => {
        setPopup(false)
    }

    return (
        <div className='container__form'>
            <div>
                <form onSubmit={handleSubmit(addUser)}>
                    <div className='div__container'>
                        <label className='form__label' htmlFor="Nombre">Nombre</label>
                        <input type="text"  id="Nombre" {...register("Nombre", { required: true })} />
                    </div>

                    <div className='div__container'>
                        <label className='form__label' htmlFor="Razón social">Razón social</label>
                        <input type="text"  id="Razón social" {...register("Razón social", { required: true })} />
                    </div>

                    <div className='div__container'>
                        <label className='form__label' htmlFor="Nit">Nit</label>
                        <input type="number"  id="Nit" {...register("Nit", { required: true })}/>
                    </div>

                    <div className='div__container'>
                        <label className='form__label' htmlFor="Código">Código Telefonico</label>
                        <input type="number"  id="Código" {...register("Código", { required: true })}/>
                    </div>

                    <div className='div__container'>
                        <label className='form__label' htmlFor="Teléfono">Teléfono</label>
                        <input type="number"  id="Teléfono" {...register("Teléfono", { required: true })}/>
                    </div>

                    {errors.exampleRequired && <span>This field is required</span>}
              
                    <input className='input__add' type="submit" value="AGREGAR" />
                </form>
            </div>
            <span className='close__button' onClick={handlePopUp}>X</span>
        </div>
    )
}

export default PopupNewUser

