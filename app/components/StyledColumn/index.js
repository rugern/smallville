import styled from 'styled-components';
import Paper from 'material-ui/Paper';

const StyledColumn = styled(Paper)`
display: flex;
flex-direction: column;
padding: 20px;
margin: 10px;
width: calc(100% * ${(props) => props.width ? props.width / 12 : 1});
height: ${(props) => props.height || 'initial'};
overflow-x: scroll;
`;

export default StyledColumn;
