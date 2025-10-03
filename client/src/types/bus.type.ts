import type { Marca } from "./marca.type";

export interface BusJsonInfo {
    content:          Bus[];
    pageable:         Pageable;
    last:             boolean;
    totalElements:    number;
    totalPages:       number;
    size:             number;
    number:           number;
    sort:             Sort;
    first:            boolean;
    numberOfElements: number;
    empty:            boolean;
}

export interface Bus {
    numeroBus:       string;
    placa:           string;
    fechaCreacion:   Date;
    caracteristicas: string;
    marca:           Marca;
    activo:          boolean;
    id:              number;
}

export interface Pageable {
    pageNumber: number;
    pageSize:   number;
    sort:       Sort;
    offset:     number;
    paged:      boolean;
    unpaged:    boolean;
}

export interface Sort {
    empty:    boolean;
    sorted:   boolean;
    unsorted: boolean;
}