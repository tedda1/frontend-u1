const form = document.getElementById('userForm');
const list = document.getElementById('userList');
let editingId = null;

function loadUsers() {
  fetch('/users')
    .then(res => res.json())
    .then(users => {
      list.innerHTML = '';
      users.forEach(u => {
        const li = document.createElement('li');
        li.textContent = `${u.name} (${u.email})`;
        li.innerHTML += ` <button onclick="editUser(${u.id}, '${u.name}', '${u.email}')">Editar</button>
                          <button onclick="deleteUser(${u.id})">Excluir</button>`;
        list.appendChild(li);
      });
    });
}

form.addEventListener('submit', e => {
  e.preventDefault();
  const name = form.name.value.trim();
  const email = form.email.value.trim();

  if (!name || !email) return alert('Preencha todos os campos.');

  const data = { name, email };
  const method = editingId ? 'PUT' : 'POST';
  const url = editingId ? `/users/${editingId}` : '/users';

  fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }).then(() => {
    form.reset();
    editingId = null;
    loadUsers();
  });
});

function editUser(id, name, email) {
  form.name.value = name;
  form.email.value = email;
  editingId = id;
}

function deleteUser(id) {
  fetch(`/users/${id}`, { method: 'DELETE' }).then(loadUsers);
}

loadUsers();
