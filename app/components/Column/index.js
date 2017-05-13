import styled from 'styled-components';

const Column = styled.div`
display: flex;
flex-direction: column;
width: calc(100% * ${(props) => props.width ? props.width / 12 : 1});
`;

export default Column;
