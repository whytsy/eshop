import type { Roles } from "../store/UserStore"

interface UserDto {
    id: number
    email: string
    role: Roles
}

interface UserWithTokensDto extends UserDto {
    accessToken: string
    refreshToken: string
}

export type {
    UserDto,
    UserWithTokensDto
}