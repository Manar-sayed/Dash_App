export class Product {
  constructor(
    public id: any,
    public name: string,
    public arabicName: string,
    public describtion: string,
    public arabicDescribtion: string,
    public video: string,
    public categoryID: any,
    public photos: Photo[]
  ) {}
}

export interface Photo {
  ID: number;
  ProductID: number;
  ImageOrFile: File;
}
