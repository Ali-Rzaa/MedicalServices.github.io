import { UserModel } from "src/app/models/admin-models";
import {createAction, props} from '@ngrx/store'

export const updateUserProfileAction = createAction('update user profile',props<{userProfile:UserModel}>());
