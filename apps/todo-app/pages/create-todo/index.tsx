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
 * This component renders a Create Todo page with a TodoForm component for creating new todos.
 * @returns JSX element displaying the create todo page.
 */
const CreateTodo = () => {
  return (
    <div>
      <Title>Create Todo</Title>
      <TodoForm isEditMode={false}></TodoForm>
    </div>
  );
};

export default CreateTodo;
