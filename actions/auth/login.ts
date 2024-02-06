'use server';

export async function login(email = 'admin@admin.com', password = 'admin') {
  const res = await fetch('https://thesis-spring-boot-ws.onrender.com/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email, password
    }),
  })

  const token = await res.json()

  return {token, status: res.status};
}