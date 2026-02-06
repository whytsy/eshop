import { ROLES } from "../../../middleware/roleMiddleware";

export const usersData = [
    { email: "superadmin@shop.com", password: "Superadmin123!", role: ROLES.SUPERADMIN },
    { email: "admin@shop.com", password: "Admin123!", role: ROLES.ADMIN },
    { email: "moderator@shop.com", password: "Moder123!", role: ROLES.MODERATOR },
    { email: "user1@shop.com", password: "User1123!" },
    { email: "user2@shop.com", password: "User2123!" },
    { email: "user3@shop.com", password: "User3123!" },
    { email: "user4@shop.com", password: "User4123!" },
    { email: "user5@shop.com", password: "User5123!" }
];