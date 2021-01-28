import React, { useState, useEffect } from 'react'
import axios from 'axios'


const TreeForm = props => {

    const [tree, setTree] = useState({
        genus: '',
        species: '',
        commonName: '',
        habitat: '',
        wholeTree: null
        // leaf: null,
        // trunk: null,
        // fruit: null,
        // bud: null
    })

    const textChangeHandler = e => {
        setTree({
            ...tree,
            [e.target.name]: e.target.value
        })
    }

    const nameChangeHandler = e => {
        let sciName = e.target.value
        setTree({
            ...tree,
            genus: sciName.split(' ')[0],
            species: sciName.split(' ')[1]
        })
    }
    const imageChangeHandler = e => {
        console.log(e.target.files[0])
        setTree({
            ...tree,
            [e.target.name]: e.target.files[0]
        })
    }

    const onSubmitHandler = e => {
        e.preventDefault()
        const data = new FormData()
        data.append("genus", tree.genus)
        data.append("species", tree.species)
        data.append("commonName", tree.commonName)
        data.append("habitat", tree.habitat)
        data.append("wholeTree", tree.wholeTree)
        axios.post('http://localhost:8000/api/trees/create/new', data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    return (
        <form encType='multipart/form-data' onSubmit={onSubmitHandler}>
            <div>
                <label htmlFor="sName">Scientific Name</label>
                <input type="text" name='sName' onChange={nameChangeHandler} />
            </div>
            <div>
                <label htmlFor="commonName">Common Name</label>
                <input type="text" name='commonName' onChange={textChangeHandler} />
            </div>
            <div>
                <label htmlFor="habitat">Habitat</label>
                <input type="text" name='habitat' onChange={textChangeHandler} />
            </div>
            <div>
                <label htmlFor="wholeTree">Whole Tree</label>
                <input type="file" name='wholeTree' onChange={imageChangeHandler} />
            </div>
            {/* <div>
                <label htmlFor="leaf">Leaf</label>
                <input type="file" name='leaf' onChange={imageChangeHandler} />
            </div>
            <div>
                <label htmlFor="trunk">Trunk</label>
                <input type="file" name='trunk' onChange={imageChangeHandler} />
            </div>
            <div>
                <label htmlFor="fruit">Fruit</label>
                <input type="file" name='fruit' onChange={imageChangeHandler} />
            </div>
            <div>
                <label htmlFor="bud">Bud</label>
                <input type="file" name='bud' onChange={imageChangeHandler} />
            </div> */}
            <button type="submit">Submit</button>
        </form>
    )
}


export default TreeForm