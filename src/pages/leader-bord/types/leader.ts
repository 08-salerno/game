import { ratingFieldName } from '../api';

export type Leader = {
    [ratingFieldName]: number;
    login: string;
}
