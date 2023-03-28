import { UserModel } from "src/app/models/admin-models";
import {createReducer, on} from '@ngrx/store'
import { updateUserProfileAction } from "../actions/user-action";

export interface userStateModel{
    user: UserModel
}
export const initialState:userStateModel = {
    user :  {firstName: null,
            lastName: null,
            image: null,
            userId: null,
            email: null}
}

export const getUserProfileReducer = createReducer(initialState, on(updateUserProfileAction,(state,action)=>{
    return {...state,user:action.userProfile}
}))