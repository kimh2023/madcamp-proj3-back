interface vertex {
  x: number;
  y: number;
}

export interface ProductResponseDto {
  product: {
    // productLabels: [Array],
    name: string;
    displayName: string;
    description: string;
    productCategory: string;
  };
  score: number;
  image: string;
}

export interface ProductDto {
  id: number;
  name: string;
  score: number;
  image: string;
  link: string;
  price: number;
  rating: number;
}

export interface LocalizedObjectAnnotationDto {
  name: string;
  score: number;
  vertices: vertex[];
  products?: Array<ProductDto | null>;
}

export interface SearchResponseDto {
  success: boolean;
  localizedObjectAnnotations?: LocalizedObjectAnnotationDto[];
}
