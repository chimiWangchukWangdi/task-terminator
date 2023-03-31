import styled from 'styled-components';
import TodoForm from '../../components/todo-form';

const Title = styled.h2`
  color: black;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 5px;
  margin-bottom: 20px;
`;

/**
 * EditTodo component for editing an existing todo item
 * @function
 * @returns {JSX.Element} JSX Element that renders EditTodo component
 */
const EditTodo = () => {
  return (
    <div>
      <Title>Edit Todo</Title>
      <TodoForm isEditMode={true}></TodoForm>
    </div>
  );
};

export default EditTodo;
