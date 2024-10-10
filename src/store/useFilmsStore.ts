import { IFilmsStore } from "../models/films.models";
import { persist } from "zustand/middleware";
import { getFilmsListApi, updateFilmApi } from "../api/films.api";
import { notification } from "antd";
import { create } from "zustand";

export const useFilmsStore = create(
    persist<IFilmsStore>(
        (set, get) => ({
            loading: true,
            films: [],
            filters: {},
            planningWatching: {},
            async getFilms() {
                if (get().films?.length) {
                    return;
                }

                set({ loading: true });

                return getFilmsListApi()
                    .then((films) => set({ films }))
                    .catch(() =>
                        notification.error({ message: "Ошибка при получении списка фильмов" }),
                    )
                    .finally(() => set({ loading: false }));
            },
            async patchFilm(filmId, patchRequest) {
                const { films: initFilms } = get();

                if (!initFilms) {
                    return;
                }

                const films = [...initFilms].map((film) =>
                    film.id === filmId ? { ...film, ...patchRequest } : film,
                );

                set({ films });

                return updateFilmApi(filmId, patchRequest).catch(() => {
                    set({ films: initFilms });
                    notification.error({ message: "Ошибка при обновлении фильма" });
                });
            },
            setFilters(key, value) {
                const filters = { ...get().filters };

                if (!value) {
                    delete filters[key];
                } else {
                    filters[key] = value;
                }

                set({ filters });
            },
            resetFilms() {
                set({ films: undefined, filters: {} });
                get().getFilms();
            },
        }),
        {
            name: "films-storage",
        },
    ),
);
