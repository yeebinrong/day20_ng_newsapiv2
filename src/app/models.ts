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

export interface Articles {
    saved?: boolean,
    alpha2Code: string,
    timestamp: Date,
    source: source,
    author: string,
    title: string,
    description: string,
    url: string,
    urlToImage: string,
    publishedAt: string,
    content: string
}

export interface Results {
    articles: Articles[]
}

export interface source {
    id: string,
    name: string
}