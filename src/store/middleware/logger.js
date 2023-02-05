export const loggerMiddleWare = (state) => (next) => (action) =>{
    if(!action.type){
        return next(action);
    }

    console.log('type : ' , action.type);
    console.log('payload : ', action.payload);
    console.log('currunt State : ', state.getState());

    next(action);

    console.log('Next State : ', state.getState());
}