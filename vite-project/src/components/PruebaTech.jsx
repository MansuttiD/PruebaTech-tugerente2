import React, { useState, useEffect, useRef } from "react";
import { collection, getDocs, query, limit } from "firebase/firestore";
import { db } from "../firebase";
import { Autocomplete, TextField, Button } from "@mui/material";
import { Search } from "@mui/icons-material";
import PopupNewUser from "./PopupNewUser";
import "./styles/pruebatech.css";

const PruebaTech = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState([]); // Para almacenar la información de Firestore
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("Nombre");
  const [popup, setPopup] = useState(false);
  const [limitScroll, setLimitScroll] = useState(20)

  const q = query(collection(db, "Datos User"), limit(limitScroll));
  const containerRef = useRef(null);

  const fetchData = async () => {
    // Define una función asincrónica para cargar la información de Firestore
    try {
      const querySnapshot = await getDocs(q);
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setData(newData);
      console.log(newData);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handlePopUp = () => {
    setPopup(true);
  };

  const handleSelect = (event, value) => {
    setSelected(value);
  };

  const handleScroll = () => {
    console.log('cualquiercosa');
    const container = containerRef.current;
    const isScrollAtBottom =
      container.scrollHeight - container.scrollTop === container.clientHeight;
  
    if (isScrollAtBottom) {
      console.log('Scroll al final');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>Ocurrió un error: {error}</div>;
  }



  return (
    <div className="container">
      <div className="container__selects">
        <label className="contariner__selects-label">
          Nombre
          <input
            defaultChecked={filter === "Nombre" ? true : false}
            type="radio"
            value="Nombre"
            name="category"
            onClick={(e) => setFilter(e.target.value)}
          />
        </label>
        {/* <label className="contariner__selects-label">
          Razon Social
          <input
            defaultChecked={filter === "Razón social" ? true : false}
            type="radio"
            value="Razón social"
            name="category"
            onClick={(e) => setFilter(e.target.value)}
          />
        </label>
        <label className="contariner__selects-label">
          Codigo
          <input
            defaultChecked={filter === "Código" ? true : false}
            type="radio"
            value="Código"
            name="category"
            onClick={(e) => setFilter(e.target.value)}
          />
        </label>
        <label className="contariner__selects-label">
          Telefono
          <input
            defaultChecked={filter === "Teléfono" ? true : false}
            type="radio"
            value="Teléfono"
            name="category"
            onClick={(e) => setFilter(e.target.value)}
          />
        </label>
        <label className="contariner__selects-label">
          Nit
          <input
            defaultChecked={filter === "Nit" ? true : false}
            type="radio"
            value="Nit"
            name="category"
            onClick={(e) => setFilter(e.target.value)}
          />
        </label> */}
      </div>

      {/* se crea el componente Autocomplete que permite buscar entre los usuarios con material UI */}
      <Autocomplete
        options={data}
        ListboxComponent="ul"
        ListboxProps={{ ref: containerRef, style: { maxHeight: 200, overflowY: 'auto' } }}
        onScroll={() => handleScroll()}
        getOptionLabel={(option) => option[filter].toString()}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Buscar"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <>
                  <Search />
                  {params.InputProps.startAdornment}
                </>
              ),
            }}
          />
        )}
        value={selected}
        onChange={handleSelect}
      />

      {popup ? (
        ""
      ) : (
        <Button onClick={handlePopUp} variant="contained" color="primary">
          Agregar Usuario
        </Button>
      )}

      {popup ? (
        <Button variant="contained" color="primary">
          <PopupNewUser users={data} setPopup={setPopup} />
        </Button>
      ) : (
        ""
      )}
    </div>
  );
};

export default PruebaTech;
