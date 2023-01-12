export interface User {
    userId: number,
    username: string,
    gender: string,
    address: string,
    mobile: string,
    dob: string,
    age: number
    Discontinued?: boolean;
    inEdit?: boolean | string;
}