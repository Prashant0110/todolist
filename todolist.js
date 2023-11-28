 

 // empty array to push here
 let todoList=[];


 //made function with objects and pushing and creating new todo list
  todoFun=(text)=>
  {
    const todoObj=
    {
        text,
        checked:false,
        id: Date.now(),
    }

    todoList.push(todoObj);
   

    renderTodo(todoList);
    console.log(todoObj);
    
  }

// event handlers for form submittion and input filled
  const form=document.querySelector('.js-form');

  form.addEventListener('submit',(e)=>
  {
    e.preventDefault();

    const todoInput=document.querySelector('.js-todo-input');
    
    const text=todoInput.value.trim();
    if(text!=='')
    {
        todoFun(text);
        todoInput.value='';
        todoInput.focus();//ensure direct typing without clicking on the input field

    }
  })



//setting up for work completion

  const list=document.querySelector('.js-todo-list');
  list.addEventListener('click',e=>
  {
    if(e.target.classList.contains('js-tick'))
    {
      const itemkeys=e.target.parentElement.getAttribute('data-id');
      Toggle(itemkeys);
    }
  })

  //marking if work has completed in todo list
  Toggle=(itemkey)=>
{
  const todoitems=todoList.find(item=>item.id===parseInt(itemkey))

  if(todoitems)
  {
    todoitems.checked=!todoitems.checked;
  }

  renderTodo(todoList);

}


renderTodo=()=>
{
  localStorage.setItem('storage',JSON.stringify(todoList));


  const list=document.querySelector('.js-todo-list');
  list.innerHTML='';

  todoList.forEach(todoObj => {
    
  
  const isChecked=todoObj.checked? 'done':'';
  const newList=document.createElement('li');
  newList.setAttribute('class',`todo-item ${isChecked}`);
  newList.setAttribute('data-id',todoObj.id);

  newList.innerHTML=
  `

  <input id="${todoObj.id}" type="checkbox"/>
  <label for="${todoObj.id}" class="tick js-tick"></label>
  <span> ${todoObj.text}</span>
  <button class="delete-todo js-delete-todo">
  <svg><use href="#delete-icon"></use></svg>
  </button>
`;

const checkbox = newList.querySelector('.js-tick');

checkbox.addEventListener('change', () => {
    // Toggle the 'checked' property directly
    todoObj.checked = !todoObj.checked;
    renderTodo();
});
  
  list.append(newList);
 });
}

//LocalStorage Setting Up



//now setting up for deleting

  // const deleteButtons = document.querySelectorAll('.js-delete-todo');

  // deleteButtons.forEach((deleteButton) => {
  //   deleteButton.addEventListener('click', (e) => {
  //     const deleteItemId = e.currentTarget.parentElement.getAttribute('data-id');
  //     del(deleteItemId);
  //   });
  // });

  //   del=(dellist)=>
  //   {
  //     todoList=todoList.filter(node=>node.id!==parseInt(dellist));
    
  //     renderTodo(todoList);
  //   }
  
  // --------------OR------------------------


  const lists = document.querySelector('.js-todo-list');
  lists.addEventListener('click', (e) => {
  if (e.target.classList.contains('js-delete-todo')) {
    const deleteItemId = e.target.parentElement.getAttribute('data-id');
    del(deleteItemId);
  }
});

del = (deleteItemId) => {
  todoList = todoList.filter((node) => node.id !== parseInt(deleteItemId));
  renderTodo(todoList);
};

document.addEventListener('DOMContentLoaded',e=>
{
  const ref=localStorage.getItem('storage');
  if(ref)
  {
    todoList=JSON.parse(ref);
    todoList.forEach(t=>
      {
        renderTodo(t);
      })
  }

})



    




























