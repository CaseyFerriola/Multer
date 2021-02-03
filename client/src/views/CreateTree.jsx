import React, { useState, useEffect } from 'react'
import TreeForm from '../components/TreeForm'


const CreateTree = props => {
    return (
        <>
            <TreeForm loggedUser = { props.loggedUser }/>
        </>
    )
}

export default CreateTree