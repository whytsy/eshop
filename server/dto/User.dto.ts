import { type ROLE } from "../middleware/roleMiddleware";
import { type UserInstance } from "../database/models/User.model";

interface UserDtoAttrs {
    id: number
    email: string
    role: ROLE
}

export class UserDto {
    id: number;
    email: string;
    role: ROLE;

    constructor(model: UserInstance | UserDtoAttrs) {
        this.id = model.id
        this.email = model.email
        this.role = model.role
    }
}