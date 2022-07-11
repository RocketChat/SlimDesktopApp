import { UserResultAPI } from './user';
export interface APIResult {
    success: boolean;
    user ?: UserResultAPI;
}
