import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
//Animation
import { motion } from 'framer-motion';
import { pageAnimation, titleAnim, fade } from '../animation';
import axios from 'axios';
import { useLocation, Link, useHistory } from 'react-router-dom';
import InsertPage from './InsertPage';

const ContactUs = (props) => {
  const [information, setinformation] = useState([]);
  const [flag, setFlag] = useState(false);
  const [sortBy,setSortBy] = useState();
  const [sortOrder,setSortOrder] = useState();

  // const [check, setCheck] = useState('');
  // const location = useLocation();
  //const pathId = location.pathname.split("/")[2];
  const pathId = props.match.params.pathId;
  const selectedId = props.match.params.id;
  // console.log(props);
  // console.log(pathId)
  // console.log(location)


  useEffect(() => {
    axios.get('http://localhost:5000/api/info/show')
      .then((res) => {
        // Iterate and Checked  = false Filled in res.data
        res.data.forEach((item) => {
          item.checked = false;
        })
        setinformation(res.data);
      })
      .catch((e) => console.log(e))
  }, []);

  useEffect(() => {
    setTimeout(() => {setFlag(false)},2000);
  },[flag]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/info/show',{params: {sortBy:sortBy, sortOrder:sortOrder}})
      .then((res) => {
        // Iterate and Checked  = false Filled in res.data
        res.data.forEach((item) => {
          item.checked = false;
        })
        setinformation(res.data);
      })
      .catch((e) => console.log(e))
  },[sortBy,sortOrder]);

  // const updateHandler = () => {
  //   const id = information.filter(item => item.checked === true).map((item) => item._id)[0];
  //   const name = information.filter(item => item.checked === true).map((item) => item.name)[0];
  //   const email = information.filter(item => item.checked === true).map((item) => item.email)[0];
  //   const phoneNumber = information.filter(item => item.checked === true).map((item) => item.phoneNumber)[0];
  //   const hobbies = information.filter(item => item.checked === true).map((item) => item.hobbies)[0];
  //   const list = {
  //     "id": id,
  //     "name": name,
  //     "email": email,
  //     "phoneNumber": phoneNumber,
  //     "hobbies": hobbies,
  //   }
  //   //console.log(list,'idddddddddddd');
  //   axios.get('http://localhost:5000/api/info/update', list)
  //     .then((res) => {

  //       console.log(res)
  //     })
  // }

  // const DeleteHandler = (e) => {
  //   const list = information.filter(item => item.checked === true).map((item) => item._id);
  //   console.log(list)
  //   console.log(information);
  //   axios.post('http://localhost:5000/api/info/delete', list)
  //     .then((res) => {
  //       const updatedInfo = information.filter((item) => item.checked === false);
  //       setinformation(updatedInfo)
  //     })
  //     .catch((e) => console.log(e.message));
  //   history.push('/contact');
  //   window.location.reload(false);
  // }

  const MailHandler = (e) => {
    const list = information.filter(item => item.checked === true).map((item) => item._id);
    axios.post('http://localhost:5000/api/info/mail',list)
    .then((res) => {
      setFlag(true);
    })
    .catch((e) => console.log(e.message));
  }

  const Delete1Handler = (id) => {
    axios.post('http://localhost:5000/api/info/delete', [id])
      .then((res) => {
        const updatedInfo = information.filter((item) => item._id !== id);
        setinformation(updatedInfo)
      })
      .catch((e) => console.log(e.message));
    //history.push('/contact');
    window.location.reload(false);
  }

  const sortUserRecord = (field) => {
    if(sortBy === field){
      setSortOrder(sortOrder===1 ? -1 : 1)
    }
    else {
      setSortBy(field);
      setSortOrder(1);
    }
  }

  // useEffect(() => {
  //   console.log(updateObject, 'This is update object')
  // }, [updateObject])

  return (
    <ContactStyle
      style={{ background: '#1b1b1b' }}
      variants={pageAnimation}
      exit="exit"
      initial="hidden"
      animate="show"
    >

      {pathId === 'updatepage' && <InsertPage updateObject={information.filter((item) => item._id === selectedId)[0]} />}
      {pathId === 'insertpage' && <InsertPage updateObject={''} />}



      <Title>
        <Hide>
          {information.length > 0 ? <div>
            <TableStyle>
              <tbody>
                <motion.tr variants={titleAnim}>
                  <ThTdStyleWithOutCursor>Select Row</ThTdStyleWithOutCursor>
                  <ThTdStyleWithCursor onClick={(e) => sortUserRecord('_id')}>Sr No</ThTdStyleWithCursor>
                  <ThTdStyleWithCursor onClick={(e) => sortUserRecord('name')}>Name</ThTdStyleWithCursor>
                  <ThTdStyleWithCursor onClick={(e) => sortUserRecord('email')}>Email</ThTdStyleWithCursor>
                  <ThTdStyleWithCursor onClick={(e) => sortUserRecord('phoneNumber')}>PhoneNumber</ThTdStyleWithCursor>
                  <ThTdStyleWithCursor onClick={(e) => sortUserRecord('hobbies')}>Hobbies</ThTdStyleWithCursor>
                  <ThTdStyleWithOutCursor>Edit</ThTdStyleWithOutCursor>
                </motion.tr>
                {information.map((info, idx) => {
                  return (
                    <motion.tr variants={fade} key={info._id}>
                      <ThTdStyleWithOutCursor><Input type="checkbox" onChange={(e) => {
                        info.checked = e.target.checked;
                      }} /></ThTdStyleWithOutCursor>
                      <ThTdStyleWithOutCursor>{idx + 1}</ThTdStyleWithOutCursor>
                      <ThTdStyleWithOutCursor>{info.name}</ThTdStyleWithOutCursor>
                      <ThTdStyleWithOutCursor>{info.email}</ThTdStyleWithOutCursor>
                      <ThTdStyleWithOutCursor>{info.phoneNumber}</ThTdStyleWithOutCursor>
                      <ThTdStyleWithOutCursor>{info.hobbies}</ThTdStyleWithOutCursor>
                      <ThTdStyleWithOutCursor>
                        <Button><Link to={`/contact/updatepage/${info._id}`}>Update</Link></Button>
                        <Button onClick={(e) => {Delete1Handler(info._id)}}>Delete</Button>
                      </ThTdStyleWithOutCursor>
                    </motion.tr>
                  )
                })}
              </tbody>
            </TableStyle>
          </div> : <p></p>}
        </Hide>
      </Title>
      <div>
        <Hide1>
          <Link to={'/contact/insertpage'}>
            <Social variants={fade} onClick={() => {

            }}>
              <h2>Insert Data</h2>
            </Social>
          </Link>
        </Hide1>
        <Hide1>
            <Social variants={fade} onClick={MailHandler}>
              <h2>Mail</h2>
            </Social>
        </Hide1>
        {flag ?<Highlight>Mail Sent</Highlight> :''}
      </div>

    </ContactStyle>
  );
};

const Hide = styled.div`
  overflow: hidden;
`;

const Hide1 = styled(motion.div)`
  overflow: hidden;
  font-family: 'Lora';
  :hover {
    background: #23d997;
  }
`;

const ContactStyle = styled(motion.div)`
  padding: 5rem 10rem;
  color: #fff;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1500px) {
    padding: 2rem;
    font-size: 1rem;
  }
`;

const TableStyle = styled(motion.table)`
  border: 1px solid #23d997;
  border-collapse: collapse;
  padding: 15px;
  font-size: 1.5rem;
`
const ThTdStyleWithCursor = styled(motion.th)`
  border: 1px solid #23d997;
  font-family:'Lora';
  padding: 15px;
  font-weight: normal;
  max-width:250px;
  word-wrap:break-word;
  cursor: pointer;
  /* white-space:pre-wrap; 
  
  overflow-x:none; */
`;

const ThTdStyleWithOutCursor = styled(motion.th)`
  border: 1px solid #23d997;
  font-family:'Lora';
  padding: 15px;
  font-weight: normal;
  max-width:250px;
  word-wrap:break-word;
  /* white-space:pre-wrap; 
  
  overflow-x:none; */
`;

const Title = styled.div`
  margin-bottom: 4rem;
  color: #fff;
  display: flex;
  align-items: center;
`;
// const Circle = styled.div`
//   border-radius: 50%;
//   width: 5rem;
//   height: 5rem;
//   background: #fff;
//   @media (max-width: 1500px) {
//     display: none;
//   }
// `;

const Social = styled(motion.div)`
  display: flex;
  align-items: center;
  cursor: pointer;
  border:  1px solid #23d997;
  margin: 10px;
  display: flex;
  justify-content: center;
  text-decoration:none;
  h2 {
    margin: 1rem;
    font-size: 2rem;
  }
  @media (max-width: 1500px) {
    h2 {
      margin: 1rem 0rem;
      font-size: 2.5rem;
    }
  }
`;

const Input = styled(motion.input)`
  width:20px;
  height:20px;
  border:3px;
`;

const Button = styled(motion.button)`
  width: 100%;
  font-family: 'Merriweather';
  font-size:1.2rem;
  color:#fff;
  margin:2% 0%;

`;


const Highlight = styled(motion.div)`
  font-family:'Lora';
  font-size: 1.5rem;
  color: #23d997;
  margin-top:1rem;
`;
export default ContactUs;
