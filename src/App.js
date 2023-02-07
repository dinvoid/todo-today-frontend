import './App.css'
import React, { useState, useEffect } from 'react'

import Modal from './components/Modal'
import axios from 'axios';

function App() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [data, setData] = useState([]);

    const [isUpdating, setisUpdating] = useState('')
    const [openModal, setOpenModal] = useState(false)


    //create function to fetch all todo items from database, i will use effect hook
    useEffect(() => {
        async function getItemList() {
            const res = await axios.get('https://todo-today.onrender.com/api/item')
                //  console.log(res.data)
            setData(res.data);
        }
        getItemList()
    }, []);

    //add new item
    const addItem = async(e) => {
        e.preventDefault()
        if (!title || !description) {
            return alert("Title and description cannot be empty");
        }

        try {
            const res = await axios.post('https://todo-today.onrender.com/api/item', {
                title: title,
                description: description

            })
            console.log(res)
            setData(prev => [...prev, res.data])
            setTitle('')
            setDescription('')

        } catch (err) {
            console.log(err)
        }
    }

    //delete item when click
    const deleteItem = async(id) => {
            try {
                const res = await axios.delete(`https://todo-today.onrender.com/api/item/${id}`)
                console.log(res.data)
                    // filter an array of items to return a new array with only the items that meet certain criteria.
                const newItem = data.filter(item => item._id !== id)
                setData(newItem)
            } catch (err) {
                console.log(err)

            }
        }
        //update item
        //before updating we need to show input fields where we will create our updated item 

    const clearItem = () => {
        if (title && description) {
            setTitle('')
            setDescription('')
        }

    }

    return (

        <
        div className = "App" >
        <
        h1 > To Do Today < /h1> <
        form className = "form" >
        <
        div className = "inputs" >
        <
        input type = "text"
        placeholder = "Your title"
        onChange = { e => { setTitle(e.target.value) } }
        value = { title }
        /> <
        textarea placeholder = "Description..."
        onChange = { e => { setDescription(e.target.value) } }
        value = { description } > < /textarea> < /
        div > <
        div className = "form-activity" >
        <
        button type = "submit"
        onClick = { e => { addItem(e) } } > Add < /button> <
        button type = "button"
        className = "cancel"
        onClick = {
            () => { clearItem() }
        } > Clear < /button> < /
        div > <
        /form>

        <
        div className = "todo-list-item" >

        {
            openModal && ( <
                >
                <
                div className = "backdrop" > < /div> <
                Modal data = { data }
                setData = { setData }
                isUpdating = { isUpdating }
                onClose = { setOpenModal }
                /> < / >
            )
        } {
            data.map((item) => (

                <
                div className = "todo-item"
                key = { item._id } >

                <
                div className = "item" >
                <
                p className = "todo-title" > < strong > { item.title } < /strong></p >
                <
                p className = "todo-desc" > { item.description } < /p> < /
                div > <
                span className = "activity" >
                <
                button className = "edit-button"
                onClick = {
                    () => {
                        if (window.confirm("Are you sure you want to delete this item?")) {
                            deleteItem(item._id)
                        }
                    }
                } >
                Delete <
                /button> <
                button className = "update-button"
                onClick = {
                    () => {
                        setisUpdating(item._id);
                        setOpenModal(!openModal)
                    }
                } > Edit < /button>

                <
                /span>  

                <
                /div>
            ))
        } <
        /div>

        <
        /div>
    );
}

export default App;