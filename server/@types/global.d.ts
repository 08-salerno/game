import { User } from '../../src/modules/api/types';

declare global {
    namespace Express {
        interface Request {
            authorizedUser: User
        }

        interface Response {
            // возможно понадобится
        }
    }
}
