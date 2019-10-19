import React, { useState, useEffect } from 'react';
import axios from 'axios'
import { Spinner, Jumbotron, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

const Show = ( props ) => {

    const [data, setData] = useState([]);
    const [showLoading, setShowLoading] = useState(true);
    const apiUrl = "http://localhost:3000/api/v1/products/" + props.match.params.id;

    useEffect(() => {
        setShowLoading(false)
        const fetchData = async () => {
            const result = await axios(apiUrl)
            setData(result.data)
            setShowLoading(false)
        }

        fetchData()
    }, [])

    const editProduct = (id) => {
        props.history.push({
            pathname: '/edit/' + id
        })
    }

    const deleteProduct = (id) => {
        setShowLoading(true)
        const product = { 
            prod_name: data.prod_name,
            prod_desc: data.prod_desc,
            prod_price: parseInt(data.prod_price) }

            axios.delete(apiUrl, product)
                .then((result) => {
                    setShowLoading(false)
                    props.history.push('/list')
                }).catch((error) => setShowLoading(false))
    }

    return (
        <div>
            { showLoading && <Spinner animation="borderd" role="status">
                <span className="sr-only">Loading ...</span>
            </Spinner>}
            <Jumbotron>
                <h1>{ data.prod_name }</h1>
                <p>{ data.prod_desc }</p>
                <h2>Price: ${data.prod_price}</h2>
                <p><Button type="button" variant="primary" 
                    onClick={() => { editProduct(data._id) }}>Edit</Button></p>
                    <Button type="button" variant="danger"
                    onClick={ ()=> { deleteProduct(data._id) }}></Button>
            </Jumbotron>
        </div>
    )
}
 
export default withRouter(Show);