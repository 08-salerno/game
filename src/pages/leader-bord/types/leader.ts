import { ratingFieldName } from '../api';

export type Leader = {
    [ratingFieldName]: string;
    login: string;
}
