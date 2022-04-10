import React, { useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { saveMenus } from "../features/menuSlices";
import { useNavigate } from "react-router-dom";

const AddMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [formInput, setFormInput] = useState({
        nama: "",
        harga: "",
    });

    const handleInput = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(saveMenus(formInput));
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl py={"2"} px={"5"}>
                <FormLabel>Nama</FormLabel>
                <Input type={"text"} name={"nama"} onChange={handleInput} />
            </FormControl>
            <FormControl py={"2"} px={"5"}>
                <FormLabel>Price</FormLabel>
                <Input type={"text"} name={"harga"} onChange={handleInput} />
            </FormControl>
            <FormControl py={"2"} px={"5"}>
                <Button type="submit" colorScheme={"teal"}>
                    Simpan
                </Button>
                <Button ml={"3"} colorScheme={"orange"}>
                    Kembali
                </Button>
            </FormControl>
        </form>
    );
};

export default AddMenu;
