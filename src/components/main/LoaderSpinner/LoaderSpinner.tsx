import React from 'react';
import { Discuss } from 'react-loader-spinner';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    top: 30%;
    left: 30%;
`

const LoaderSpinner = () => {
    return (
        <Container>
            <Discuss
                visible={true}
                height="200"
                width="200"
                ariaLabel="comment-loading"
                wrapperStyle={{}}
                wrapperClass="comment-wrapper"
                color="#fff"
                backgroundColor="#F4442E"
            />
        </Container>
    );
}

export default LoaderSpinner;
