const form = document.querySelector('form');
const input = document.querySelector('.form-control');
const list = document.querySelector('.list-group');

const createTodo = (todo) => {
  const li = document.createElement('li');
  li.className =  'list-group-item';
  li.textContent = todo;
  list.appendChild(li);
};

const onSubmit = (e) => {
  e.preventDefault();
  const todo = input.value;
  input.value = '';
  createTodo(todo);
};

form.addEventListener('submit', onSubmit);
