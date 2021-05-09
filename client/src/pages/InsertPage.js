import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useHistory } from 'react-router-dom';
import { pageAnimation, titleAnim, fade } from '../animation';
import axios from 'axios';

const InsertPage = ({ updateObject }) => {

    const history = useHistory();
    // console.log(updateObject,'uppppppppppppdate');

    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [phoneNumber, setPhoneNumber] = useState();
    const [hobbies, setHobbies] = useState();
    const [error, setError] = useState();
    useEffect(() => {
        if (updateObject) {
            setName(updateObject.name);
            setPhoneNumber(updateObject.phoneNumber);
            setEmail(updateObject.email);
            setHobbies(updateObject.hobbies);
        }

    }, [updateObject])

    const exitDetailHandler = (e) => {
        const element = e.target;
        //console.log(element)
        if (element.classList.contains('shadow')) {
            document.body.style.overflow = 'auto';
            history.push('/contact');
        }
    }

    const HandleSubmit = (e) => {
        e.preventDefault();
        if (updateObject) {
            console.log(name, email, phoneNumber, hobbies, 'isss');
            axios.post('http://localhost:5000/api/info/update', {
                "_id": updateObject._id,
                "name": name,
                "email": email,
                "phoneNumber": phoneNumber,
                "hobbies": hobbies,
            })
                .then((res) => history.push('/contact'))
                .catch((e) => {setError(e.validation.body.message); console.log(e)});
            setHobbies(''); setName(''); setPhoneNumber(''); setEmail('');
        }
        else {
            axios.post('http://localhost:5000/api/info/insert', {
                "name": name,
                "email": email,
                "phoneNumber": phoneNumber,
                "hobbies": hobbies,
            })
                .then((res) => history.push('/contact'))
                .catch((e) => {  console.log(e.response); setError(e.response.data.validation.body.message);});
            setHobbies(''); setName(''); setPhoneNumber(''); setEmail('');
        }


    }


    return (
        <div>
            <CardShadow className="shadow" onClick={exitDetailHandler}>
                <Detail>
                    {error && <div>{error}</div>}
                    <Form variants={fade} onSubmit={HandleSubmit}>
                        <Label for="fname">Name:</Label>
                        <br></br>
                        <Input type="text" id="fname" name="fname" defaultValue={updateObject ? updateObject.name : ''} onChange={(e) => { setName(e.target.value) }} />
                        <br></br>
                        <Label for="email">Email:</Label>
                        <br></br>
                        <Input type="email" id="email" name="email" defaultValue={updateObject ? updateObject.email : ''} onChange={(e) => { setEmail(e.target.value) }} />
                        <br></br>
                        <Label for="pn">PhoneNumber:</Label>
                        <br></br>
                        <Input type="number" id="phoneNumber" name="pn" defaultValue={updateObject ? updateObject.phoneNumber : ''} onChange={(e) => { setPhoneNumber(e.target.value) }} />
                        <br></br>
                        <Label for="hobbies">Hobbies:</Label>
                        <br></br>
                        <Input type="text" id="hobbies" name="hobbies" defaultValue={updateObject ? updateObject.hobbies : ''} onChange={(e) => { setHobbies(e.target.value) }} />
                        <br></br>
                        <button type="submit">{updateObject ? 'Update Data' : 'Insert Data'}</button>
                    </Form>
                </Detail>

            </CardShadow>
        </div>
    )
};

const CardShadow = styled(motion.div)`
    width: 100%;
    overflow-y : scroll;
    min-height: 100vh;
    background: rgba(0,0,0,0.5);
    position: fixed;
    top:0;
    left:0;
    z-index:10;
    display: flex;

    &::-webkit-scrollbar{
      width:0.5rem;
        }

    &::-webkit-scrollbar-thumb {
        background: #ff7676;
    }

    &::-webkit-scrollbar-track {
        background: white;
    }
    
`;

const Detail = styled(motion.div)`
    width:60%;
    border-radius:1rem;
    padding:2rem 5rem;
    position: absolute;
    top:10%;
    left: 20%;
    background: #282828;
    z-index:15;
`;

const Form = styled(motion.form)`
    width:100%;
    color: white;
`;

const Label = styled(motion.label)`
    font-size:1.5rem;
    font-family: "Merriweather";
    color: white;
`;

const Input = styled(motion.input)`
    width: 100%;
    border: 2px solid #23d997;
    height: 40px;
    margin-bottom: 20px;
    color:black;
    font-family:'Merriweather','Lora';
    padding:1.1rem 0rem;
    font-size:1.5rem;
`;


export default InsertPage;