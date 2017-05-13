import styled from 'styled-components';

const CustomListItem = styled.div`
background-color: ${(props) => props.active ? 'rgba(0, 151, 167, 0.2)' : 'none'};
display: flex;
justify-content: space-between;
padding: 5px 10px;
font-size: 14px;
cursor: ${(props) => props.deactivated ? 'default' : 'pointer'};

&:hover {
  background-color: ${(props) => props.active ? 'rgba(0, 151, 167, 0.4)' : 'rgba(255, 255, 255, 0.1)'};
}
`;

export default CustomListItem;
