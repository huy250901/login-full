export interface LoginFormValues {
    username: string;
    password: string;
    
}


export interface ISignUpParams{
    email:string;
    password:string;
    repeatPassword:string;
    name:string;
    gender:string ;
    region:string ;
    state:string;
}

export interface IGenderParams{
    label:string;
    value:string;
}

export interface ILocationParams{
    id:string | number; 
    pid:number|null;
    name:string;
    createdAt:number;
}
export interface ICity {
    id: number;
    name: string;
  }
  export interface AuthToken {
    accessToken: string;
    expiresIn: number;
    tokenType: string;
  }
  
 