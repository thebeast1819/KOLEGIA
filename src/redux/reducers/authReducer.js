import { VERIFY_EMAIL, VERIFY_OTP,
    ADD_USER_DETAILS,
     LOGIN_WITH_GOOGLE,
    LOGIN_WITH_EMAIL,CHECKING_ERROR,
    LOGIN_WITH_GOOGLE_ERROR,
USER_LOGOUT,
VERIFY_EMAIL_FOR_RESET,
RESET_PASSWORD,
EDIT_PROFILE,
RESET_PROFILE_STATUS,
GET_DASHBOARD_STATS,
RESET_ERROR_MESSAGE,CHANGE_PASSWORD} from "../constants/AllConstants";

const initialState={
    otpStatusCode:'',
   loginStatusCode:'',
   resetStatusCode:'',
   changePasswordResponse:'',
    errorMessage:'',
    otpId:'',
    addUserResponse:'',
    loginWithGoogleResponse:'',
    loginWithGoogleErrorResponse:'',
    loginWithEmailResponse:'',
    isLoggedIn:false,
    logoutUserResponse:'',
    requestId:'',
    editProfileResponse:'',
    editProfileData:'',
    dashboardStats:''
}

const AuthReducer=(state=initialState,action)=>{
    switch(action.type){
        case VERIFY_EMAIL:
            return{
                ...state,
                loginStatusCode:action.payload.status,
                otpId:action.payload.data.otp_id
            };
            case VERIFY_EMAIL_FOR_RESET:
                return{
                    ...state,
                    resetStatusCode:action.payload.status,
                    otpId:action.payload.data.otp_id
                };
            
               
                    case VERIFY_OTP:
                        return{
                            ...state,
                            otpStatusCode:action.payload.status,
                            requestId:action.payload.data.reset_request_id
                            
                        };
                    case ADD_USER_DETAILS:
                            return{
                                ...state,
                                addUserResponse:action.payload,
                                status:action.payload.status
                            };
                    case LOGIN_WITH_GOOGLE:
                                return{
                                    ...state,
                                    loginWithGoogleResponse:action.payload,
                                    isLoggedIn:action.payload.data.isLoggedIn
                                };
                    case LOGIN_WITH_GOOGLE_ERROR:
                                    return{
                                        ...state,
                                        loginWithGoogleErrorResponse:action.payload
                                    };
                    case LOGIN_WITH_EMAIL:
                                    return{
                                        ...state,
                                        loginWithEmailResponse:action.payload,
                                        status:action.payload.status
                                    };
                    case CHECKING_ERROR:
                                        return{
                                            ...state,
                                            errorMessage:action.payload.data.message,
                                            status:action.payload.status
                    
                                        };
                    case USER_LOGOUT:
                                            return{
                                                ...state,
                                                logoutUserResponse:action.payload.status
                                            }
                                     case RESET_PASSWORD:
                                                return{
                                                    ...state,
                                                    loginWithEmailResponse:action.payload,
                                                }
                                                case CHANGE_PASSWORD:
                                                    return{
                                                        ...state,
                                                        changePasswordResponse:action.payload.status,
                                                    }
                    case EDIT_PROFILE:
                                 return{
                                     ...state,
                                     editProfileResponse:action.payload.status,
                                     editProfileData:action.payload.data
                                 }        
                    case RESET_PROFILE_STATUS:
                        return{
                        ...state,
                        editProfileResponse:''  ,
                        changePasswordResponse:'' ,
                        loginWithGoogleResponse:'' 
                        }          
                        
                        case RESET_ERROR_MESSAGE:
                            return{
                            ...state,
                            errorMessage:'', 
                            }       
                        
                        case GET_DASHBOARD_STATS:
                            return{
                                ...state,
                                dashboardStats:action.payload.data.stats
                            }
                    default:
                     return state;
    }
}

export default AuthReducer;