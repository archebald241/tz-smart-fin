import { IFilm, IFilmPatchRequest } from "../models/films.models";
import axiosInstance from "./axios";

export const getFilmsListApi = (): Promise<IFilm[]> => {
    return axiosInstance.get<IFilm[]>("/films");
};

export const updateFilmApi = (filmId: string, data: IFilmPatchRequest): Promise<void> => {
    return axiosInstance.patch(`/films/${filmId}`, data);
};
