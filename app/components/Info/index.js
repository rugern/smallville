import styled from 'styled-components';

const Info = styled.h5`
margin: 0;
padding: 0;
text-align: ${(props) => props.center ? 'center' : 'left'};
`;

export default Info;
