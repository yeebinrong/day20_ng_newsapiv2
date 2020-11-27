export interface ApiKey {
    id:string;
    key:string;
}

export interface countryList {
    name: string,
    alpha2Code: string,
    flag: string
}

export interface countryListwithKey {
    id: string,
    array: countryList[]
}