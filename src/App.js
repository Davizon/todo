import React from 'react';
import { TodoCounter } from './components/TodoCounter';
import { TodoSearch } from './components/TodoSearch';
import { TodoList } from './components/TodoList';
import { TodoItem } from './components/TodoItem';
import { CreateTodoButton } from './components/CreateTodoButton';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {

  const [patito, savePatito] = useLocalStorage('PATITO_V1', 'Pedro');
  const [todos, saveTodos] = useLocalStorage('TODOS_V1', []);
  
  const [searchValue, setSearchValue] = React.useState('');

  const completedTodos = todos.filter(todo => !!todo.completed).length;
  const totalTodos = todos.length;

  let searchedTodos = [];

  if (!searchValue >= 1) {
    searchedTodos = todos;
  }else {
    searchedTodos = todos.filter(todo => {
      const todoText = todo.text.toLowerCase();
      const searchText = searchValue.toLowerCase();
      return todoText.includes(searchText);
    })
  }
  // Creamos la función en la que actualizaremos nuestro localStorage

  const toggleCompleteTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    const newTodos = [...todos];
    newTodos[todoIndex].completed = !newTodos[todoIndex].completed;
    saveTodos(newTodos);
  }
  const deleteTodo = (id) => {
    const todoIndex = todos.findIndex(todo => todo.id === id);
    const newTodos = [...todos];
    newTodos.splice(todoIndex, 1);
    saveTodos(newTodos);
  }
  return (
    <React.Fragment>
      <TodoCounter total={totalTodos} completed={completedTodos} />
      <TodoSearch searchValue={searchValue} setSearchValue={setSearchValue}/>
      <h1>{patito}</h1>
      <TodoList>
        {searchedTodos.map(todo => (
          <TodoItem
            key={todo.id}
            text={todo.text}
            completed={todo.completed}
            onComplete={() => {toggleCompleteTodo(todo.id)}}
            onDelete={() => {deleteTodo(todo.id)}}
            
          />
        ))}
      </TodoList>

      <CreateTodoButton />
    </React.Fragment>
  );
}

export default App;
