import React, { useEffect, useState } from 'react';
import { MetaTags } from 'react-meta-tags';
import { Container, Row } from 'reactstrap';
import LeftSideContent from './LeftSideContent';
import RightSideContent from './RightSideContent';
import Section from './Section';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getToken } from '../../../services/LocalStorageService';
import { useGetLoggedUserQuery } from '../../../services/userAuthApi';
import { setUserInfo, unsetUserInfo } from '../../../features/userSlice';


const MyProfile = () => {
    const [profile, setProfile] = useState([])
    const dispatch = useDispatch()
    const { access_token } = getToken()
    const { data, isSuccess } = useGetLoggedUserQuery(access_token)
    console.log(data)
    const id = 1;
    const [userData, setUserData] = useState({ email: "", name: "" })
    // useEffect(() => {
        
    //     axios.get(`http://0.0.0.0:9000/api/seeker/${id}`).then((response) => {
    //         setProfile(response.data);
    //       console.log(response.data)
    //     });
    //   }, []);

  // Store User Data in Local State
  useEffect(() => {
      if (data && isSuccess) {
          setUserData({
              email: data.email,
              name: data.name,
            })
            console.log(data, "DATA Myprofile")
    } 
  }, [data, isSuccess])

    // Store User Data in Redux Store
    useEffect(() => {
        if (data && isSuccess) {
          dispatch(setUserInfo({
            email: data.email,
            name: data.name
          }))
        }
      }, [data, isSuccess, dispatch])

    return (
        <React.Fragment>
            <MetaTags>
                <title>My Profile | Jobcy - Job Listing Template | Themesdesign</title>
            </MetaTags>
            <Section />
            <section className="section">
                <Container>
                    <Row>
                        <LeftSideContent />
                        <RightSideContent />
                    </Row>
                </Container>
            </section>
        </React.Fragment>
    )
}

export default MyProfile
