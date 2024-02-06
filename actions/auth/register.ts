'use server';

interface Params {
  personalId: number,
  email: string,
  password: string,
  name: string,
  lastname: string
}

export async function authRegister({ personalId, email, password, name, lastname}: Params) {
  const res = await fetch('https://thesis-spring-boot-ws.onrender.com/api/v1/registration', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalId,
      email, 
      password,
      name,
      lastname
    }),
  })

  return {status: res.status};
}