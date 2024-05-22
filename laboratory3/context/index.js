import { createContext, useContext, useReducer, useMemo } from 'react'
import { auth, db } from './firebase'
import { signInWithEmailAndPassword, signOut } from 'firebase/auth'

const MyContext = createContext()
MyContext.displayName = 'TDaiContext'

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, userLogin: action.value }
    case 'USER_LOGOUT':
      return { ...state, userLogin: null }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

const MyContextControllerProvider = ({ children }) => {
  const initialState = { userLogin: null }
  const [controller, dispatch] = useReducer(reducer, initialState)
  const value = useMemo(() => [controller, dispatch], [controller, dispatch])
  return <MyContext.Provider value={value} > {children} </MyContext.Provider>
}

const useMyContextProvider = () => {
  const context = useContext(MyContext)
  if (!context) {
    return new Error('useMyContextController must inside in MyContextControllerProvider')
  }
  return context
}

const login = (dispatch, email, password) => {
  try {
    signInWithEmailAndPassword(auth, email, password)
    const unsubscribe = onSnapshot(doc(db, 'USERS', email), (u) => {
      if (u.exists()) {
        dispatch({ type: 'USER_LOGIN', value: u.data() });
      } else { alert('User not exist') }
    })
    return () => unsubscribe()
  } catch (error) {
    alert('Wrong Email and Password!')
    console.log(error.code, error.message)
  }
}

const logout = (dispatch) => {
  signOut(auth).then(() => dispatch({ type: 'USER_LOGOUT' }))
}

export {
  MyContextControllerProvider,
  useMyContextProvider,
  login,
  logout
}