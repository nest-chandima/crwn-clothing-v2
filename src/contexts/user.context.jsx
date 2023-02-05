// import { createContext,  useEffect, useReducer } from "react";
// import { OnAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/firebase.utils";
// import { createAction } from "../utils/reducer/reducer.utils";

// export const UserContext = createContext({
//     curruntUser: null,
//     setCurruntUser : () => null
// });

// export const USER_ACTION_TYPE = {
//     SET_CURRUNT_USER : 'SET_CURRUNT_USER',
// }

// const userReducer = (state,action) =>{
//     const {type,payload} = action;

//     switch(USER_ACTION_TYPE.SET_CURRUNT_USER){
//         case 'SET_CURRUNT_USER':
//             return {
//                 ...state,
//                 curruntUser : payload
//             };
//         default:
//             throw new Error(`Uncaught Handeler ${type} in user reducer`);
//     }
// };

// const INITIAL_STATE = {
//     curruntUser : null
// };

// export const UserProvider = ({ children }) => {
//     // const [curruntUser, setCurruntUser] = useState(null);
//     const [{curruntUser},dispatch] = useReducer(userReducer, INITIAL_STATE);

//     const setCurruntUser = (user) =>{
//         dispatch(createAction(USER_ACTION_TYPE.SET_CURRUNT_USER, user));
//     }
//     const value = { curruntUser, setCurruntUser };


//     useEffect(()=>{
//         const unsubscribe  = OnAuthStateChangedListener((user)=>{
//             if(user){
//                 createUserDocumentFromAuth(user);
//             } 

//             setCurruntUser(user);
//         })
//         return unsubscribe;
//     },[]);

//     return <UserContext.Provider value={value}>{children}</UserContext.Provider>
// }