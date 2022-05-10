export default interface ICreateUserDTO {
    id: string;
    name: string;
    register_number: string;
    state_registration?: string;
    name_responsible: string;
    email: string;
    phone: string;
    zipcode: string;
    address: string;
    number: number;
    complement: string;
    district: string;
    city: string;
    state: string;
}
