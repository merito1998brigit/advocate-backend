// import firebase from 'firebase/app'
import { notification } from 'antd'
// import 'firebase/auth'
// import decode from 'jwt-decode'
import * as constants from '_constants'
import callApi from 'utils/callApi'
import { getFormData } from 'utils'
// import 'firebase/database'
// import 'firebase/storage'

// const firebaseConfig = {
//   apiKey: 'AIzaSyAE5G0RI2LwzwTBizhJbnRKIKbiXQIA1dY',
//   authDomain: 'cleanui-72a42.firebaseapp.com',
//   databaseURL: 'https://cleanui-72a42.firebaseio.com',
//   projectId: 'cleanui-72a42',
//   storageBucket: 'cleanui-72a42.appspot.com',
//   messagingSenderId: '583382839121',
// }

// const firebaseApp = firebase.initializeApp(firebaseConfig)
// const firebaseAuth = firebase.auth
// export default firebaseApp

export function mockLogin(email, password) {
  console.log("email passowef",email, password)
  return true
}

export function mockLoadCurrentAct() {
  const token = getToken()
  console.log('dsfg', token)
  if (typeof token !== 'undefined') {
  const data= {
   user:{ email: 'admin@gmail.com',
    id: '1232',
    role: 'admin',
    phone: '9998989878',
    name: 'Admin',
   
  },
   token
}
  return  data
}
return null
}


export async function login1(email, password) {
  console.log('login1',email,password)
  const formData = new FormData()
  formData.append('email', email)
  formData.append('password', password)

  try {
    const loginResponse = await callApi('/api/backend/v1/login', {
      method: 'POST',
      body: JSON.stringify({email,password}),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    console.log("Login Response",loginResponse)
    // if (!loginResponse.ok) {
    //   notification.warning({
    //     message: constants.STRINGS.loginFailed,
    //     description: constants.LOGIN_FAIL_MESSAGE,
    //   })
    //   return null
    // }
    // const resJSON = await loginResponse.json()
    // const resJSON = loginResponse;
    // console.log(resJSON)
    // if (loginResponse.status === 200) {
    if (loginResponse && loginResponse.token) {
      console.log('setting token', loginResponse.token)
      setToken(loginResponse.token)
      return loginResponse
    }
    return null
  } catch (err) {
    console.log(err)
    return notification.warning({
      message: constants.STRINGS.error,
      description: err.message,
    })
  }
}

const setToken = (token) => {
  localStorage.setItem('token', token)
}
const getToken = () => {
  return localStorage.getItem('token')
  // return null
}
const removeToken = () => {
  localStorage.removeItem('token')
}

export async function currentAccountJwt() {
  const token = getToken()
  console.log('dsfg', token)
  if (typeof token !== 'undefined') {
    try {
      const loginResponse = await fetch('/api/backend/v1/login', {
        method: 'GET',
        headers: {
          Authorization: token,
        },
      })
      console.log("hello ",loginResponse.status)
      if (!loginResponse.ok) {
        notification.warning({
          message: constants.STRINGS.error,
          description: 'Invalid user credentials!',
        })
        return null
      }
      const resJSON = await loginResponse.json()
      console.log(resJSON)
      if (loginResponse.status === 200) {
        return resJSON
      }
      // removeToken(token)
      notification.warning({
        message: constants.SESSION_EXPIRED_MESSAGE,
        description: constants.SESSION_EXPIRED_MESSAGE_DESC,
      })

      return null
    } catch (error) {
      return null
    }
  }
  return null
} 

export async function logoutJwt() {
  removeToken()
  return true
}


export async function deleteUser(userId) {
  try {
    const res = await callApi(`/api/backend/v1/users/${userId}`, {
      method: 'DELETE',
    })
    if (res) return res
    return null
  } catch (err) {
    notification.error({
      message: 'Error deleting!',
      description: err.message,
    })
    return null
  }
}

// set user inactive
export async function editUser(values, userId) {
  try {
    const res = await callApi(`${constants.CATALOG_API_URL.editUser}/${userId}`, {
      method: 'PATCH',
      body: getFormData(values),
    })
    if (res) return res
    return null
  } catch (err) {
    console.error(err)
    return null
  }
}

// set user inactive
export async function updateUserPassword(values, userId) {
  try {
    const res = await callApi(`${constants.CATALOG_API_URL.updateUserPassword}/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
    if (res) return res
    return null
  } catch (err) {
    console.error(err)
    return null
  }
}

export async function addUser(values) {
  try {
    const res = await callApi(constants.CATALOG_API_URL.signup, {
      method: 'POST',
      body: getFormData(values),
    })
    if (res) return res
    return null
  } catch (err) {
    notification.error({
      message: 'Error!',
      description: err.message,
    })
    console.error(err)
    return null
  }
}



export async function loginSocial(email, accessToken) {
  console.log('in loginSocial services')
  const loginData = {
    email,
    accessToken,
  }
  const loginResponse = await fetch('/api/users/login_google', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(loginData),
  })

  const resJSON = await loginResponse.json()
  console.log(loginResponse)
  console.log(resJSON)
  if (loginResponse.ok) {
    setToken(resJSON.token)
    return true
  }
  return notification.warning({
    message: loginResponse.status,
    description: resJSON.message,
  })
}

// export async function currentAccount() {
//   let userLoaded = false
//   function getCurrentUser(auth) {
//     return new Promise((resolve, reject) => {
//       if (userLoaded) {
//         resolve(firebaseAuth.currentUser)
//       }
//       const unsubscribe = auth.onAuthStateChanged(user => {
//         userLoaded = true
//         unsubscribe()
//         resolve(user)
//       }, reject)
//     })
//   }
//   return getCurrentUser(firebaseAuth())
// }

// export async function logout() {
//   return firebaseAuth()
//     .signOut()
//     .then(() => true)
// }


