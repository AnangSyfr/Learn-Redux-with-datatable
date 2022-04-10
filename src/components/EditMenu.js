import React, { useEffect, useState } from "react";
import { FormControl, FormLabel, Input, Button } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getMenus, menuSelectors, updateMenus } from "../features/menuSlices";
import { useNavigate, useParams } from "react-router-dom";

const EditMenu = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();
    const menu = useSelector((state) => menuSelectors.selectById(state, id));
    const [formInput, setFormInput] = useState({
        id: "",
        nama: "",
        harga: "",
    });

    useEffect(() => {
        dispatch(getMenus());
    }, [dispatch]);

    useEffect(() => {
        if (menu) {
            setFormInput({
                id: id,
                nama: menu.nama,
                harga: menu.harga,
            });
        }
    }, [menu]);

    const handleInput = (e) => {
        setFormInput({
            ...formInput,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(updateMenus(formInput));
        navigate("/");
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormControl py={"2"} px={"5"}>
                <FormLabel>Nama</FormLabel>
                <Input
                    type={"text"}
                    name={"nama"}
                    value={formInput.nama}
                    onChange={handleInput}
                />
            </FormControl>
            <FormControl py={"2"} px={"5"}>
                <FormLabel>Price</FormLabel>
                <Input
                    type={"text"}
                    name={"harga"}
                    value={formInput.harga}
                    onChange={handleInput}
                />
            </FormControl>
            <FormControl py={"2"} px={"5"}>
                <Button type="submit" colorScheme={"teal"}>
                    Simpan
                </Button>
                <Button
                    ml={"3"}
                    colorScheme={"orange"}
                    onClick={() => navigate("/")}
                >
                    Kembali
                </Button>
            </FormControl>
        </form>
    );
};

export default EditMenu;
