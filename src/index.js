import { createStore } from 'redux';

const ADD_TASK = 'ADD_TASK';
const REMOVE_TASK = 'REMOVE_TASK';
const form = document.querySelector('form');
const input = document.querySelector('.form-control');
const list = document.querySelector('.list-group');

const actionAddTodo = (text) => {
  return {
    type: ADD_TASK,
    payload: { id: Date.now().toString(), text },
  };
};

const actionDeleteTodo = (id) => {
  return { type: REMOVE_TASK, payload: id };
};

const todosReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_TASK:
      return [action.payload, ...state];
    case REMOVE_TASK:
      return state.filter((task) => task.id !== action.payload);
    default:
      return state;
  }
};

const todosStore = createStore(todosReducer);

todosStore.subscribe(() => console.log(todosStore.getState()));

const dispatchAddTask = (text) => {
  todosStore.dispatch(actionAddTodo(text));
};

const dispatchDeleteTask = (id) => {
  todosStore.dispatch(actionDeleteTodo(id));
};

const displayTask = () => {
  const todos = todosStore.getState();
  list.innerHTML = '';
  todos.forEach((todo) => {
    const btn = document.createElement('button');
    btn.classList.add('btn', 'btn-danger');
    btn.textContent = 'Delete';
    btn.addEventListener('click', () => dispatchDeleteTask(todo.id));
    const element = document.createElement('li');
    element.classList.add(
      'list-group-item',
      'd-flex',
      'justify-content-between',
      'align-items-center'
    );
    element.id = todo.id;
    element.textContent = todo.text;
    element.appendChild(btn);
    list.appendChild(element);
  });
};

todosStore.subscribe(displayTask);

const onSubmit = (e) => {
  e.preventDefault();
  if (input.value) {
    const todo = input.value;
    input.value = '';
    dispatchAddTask(todo);
  }
};

form.addEventListener('submit', onSubmit);
