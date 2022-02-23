const initialState={
    data:[],
    isPending:true
}

export const projectReducer = (state=initialState,action) => {
   switch(action.type){
       case 'REQUEST_ROBOTS_PENDING':
           return {...state,isPending:true}
      case 'SENDING-DATA':
          return Object.assign({},state,{isPending:false,data:action.payload})
          case 'REQUEST_ROBOTS_FAILED':
            return Object.assign({}, state, {error: action.payload})
          default:
            return state
   }
}