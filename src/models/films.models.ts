export type TFilmStatus = "WATCHED" | "NO_WATCHED";

export interface IFilm {
    id: string;
    poster: string;
    name: string;
    year: number;
    genre: string;
    status: TFilmStatus;
    isFavorite: boolean;
    rating: number;
}

export interface IFilmPatchRequest {
    status?: TFilmStatus;
    isFavorite?: boolean;
    rating?: number;
}

export interface IFilmsFilters {
    year?: number;
    search?: string;
    isFavorite?: boolean;
    genre?: string;
}

export interface IFilmsStore {
    loading: boolean;
    films?: IFilm[];
    filters: IFilmsFilters;
    getFilms: () => Promise<void>;
    patchFilm: (filmId: string, patchRequest: IFilmPatchRequest) => Promise<void>;
    setFilters: <K extends keyof IFilmsFilters>(key: K, value: IFilmsFilters[K]) => void;
    resetFilms: () => void;
}
