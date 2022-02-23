import { GET_ALL_REQUIREMENTS,
  ADD_NEW_REQUIREMENT,
  NEW_REQUEST_REQUIREMENT ,
  CHECKING_ERROR_REQUIREMENTS,
GET_MY_OWN_REQUIREMENTS,
EDIT_REQUIREMENT,
RESET_STATUS,
DELETE_REQUIREMENT} from "../constants/AllConstants";

const initialState = {
    items: [],
    isLoading:false,
    addrequirementresponse:"",
    errorMessageRequirements:'',
    ownItems:[],
    editRequirementresponse:"",
    deleteRequirementResponse:""
    
  };

  const RequirementReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_ALL_REQUIREMENTS:
        return {
          ...state,
          items: action.payload.requirements,
          isLoading: false,
        };
     
        case NEW_REQUEST_REQUIREMENT:
          return {
            ...state,
            isLoading: action.payload,
          };
    
      
        case ADD_NEW_REQUIREMENT:
          return{
          ...state,
          addrequirementresponse:action.payload.status
          } 
          case GET_MY_OWN_REQUIREMENTS:
            return {
              ...state,
              ownItems: action.payload.Requirements,
              isLoading: false,
            };

            case EDIT_REQUIREMENT:
          return{
          ...state,
          editRequirementresponse:action.payload.status
          } 
          case CHECKING_ERROR_REQUIREMENTS:
            return{
                ...state,
                errorMessageRequirements:action.payload.data.message,
                

            };
            case DELETE_REQUIREMENT:
            return{
                ...state,
                deleteRequirementResponse:action.payload
                

            };

            case RESET_STATUS:{
              return{
                ...state,
                editRequirementresponse:'',
                addrequirementresponse:''
              }
            }

  
  
      default:
        return state;
    }
  };

  export default RequirementReducer;