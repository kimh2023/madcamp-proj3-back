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
  name: string;
  category: string;
  score: number;
}

export interface LocalizedObjectAnnotationDto {
  name: string;
  score: number;
  vertices: vertex[];
  products?: ProductDto[];
}

export interface SearchResponseDto {
  localizedObjectAnnotations: LocalizedObjectAnnotationDto[];
}
