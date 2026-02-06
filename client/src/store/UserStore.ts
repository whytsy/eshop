import { makeAutoObservable } from "mobx"
import type { UserDto } from "../types/user.types";

export enum Roles {
    User = "USER",
    Moderator = "MODERATOR",
    Admin = "ADMIN",
    Superadmin = "SUPERADMIN"
}

const RolesHierarchy = {
    [Roles.User]: 0,
    [Roles.Moderator]: 1,
    [Roles.Admin]: 2,
    [Roles.Superadmin]: 3
}

export const isGraterRole = (firstRole: Roles, secondRole: Roles) => {
    return RolesHierarchy[firstRole] > RolesHierarchy[secondRole]
}

export const hasRequiredRole = (requieredRole: Roles, currentRole: Roles) => {
    return RolesHierarchy[currentRole] >= RolesHierarchy[requieredRole]
}

export class UserStore {

    private _isAuth: boolean;
    private _user: UserDto | null;

    constructor() {
        this._isAuth = false
        this._user = null
        makeAutoObservable(this)
    }

    setIsAuth(bool: boolean) {
        this._isAuth = bool
    }

    setUser(user: UserDto) {
        this._user = user
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }
}