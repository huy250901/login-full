export interface Crop {
    aspect?: number;
    x: number;
    y: number;
    width: number;
    height: number;
    unit: 'px' | '%';
  }

  export interface IData {
    id: number;
    status: string;
    date: string;
    client: string;
    currency: string;
    total: number;
    invoice: string;
  }
  
  export  interface IDatas {
    Products: IData[];
    ProductByID: any;
    InforUser: any;
  }
  
