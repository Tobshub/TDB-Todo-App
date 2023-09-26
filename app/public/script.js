
let TODOS = [];

async function FetchTodos() {
  const res = await fetch("/todo", { method: "GET" }).then(res => res.json())
  TODOS = res
}

async function DeleteTodo(id) {
  const res = await fetch("/todo", { method: "DELETE", body: JSON.stringify({ id }) }).then(res => res.json())
  console.log(res)
  await FetchTodos()
  RenderTodos()
}


function RenderTodos() {
  const todos = document.getElementById("todos")
  todos.innerHTML = "";
  for (const todo of TODOS) {
    const li = document.createElement("li")
    li.innerText = todo.content
    const clicker = document.createElement("input")
    clicker.type = "checkbox"
    clicker.onclick = async (ev) => {
      if (ev.target.checked) {
        await DeleteTodo(todo.id)
      }
    }
    li.appendChild(clicker)
    todos.appendChild(li)
  }
}

window.onload = async () => {
  await FetchTodos()
  RenderTodos()
}

const form = document.getElementById("new_todo_form")
const input = document.getElementById("input")

form.onsubmit = async (ev) => {
  ev.preventDefault()
  const content = input.value

  const res = await fetch("/todo", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ content })
  }).then(res => res.json())

  TODOS.push(res)
  RenderTodos()
  input.value = ""
}
