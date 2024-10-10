import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import { Flex } from "antd";
import CardFilm from "../CardFilm";
import CardFilmSkeleton from "../CardFilmSkeleton";
import { useFilmsStore } from "../../store/useFilmsStore";
import { IFilm } from "../../models/films.models";
import { useShallow } from "zustand/shallow";

const FilmsList: React.FC = () => {
    const { films, loading, filters } = useFilmsStore(
        useShallow((state) => ({
            films: state.films,
            loading: state.loading,
            filters: state.filters,
        })),
    );

    const filteredFilms = useMemo(() => {
        if (!films) return [];

        return films.filter((film) => {
            return Object.entries(filters).every(([key, value]) => {
                if (key === "search") {
                    return film.name.toLowerCase().includes(value.toLowerCase());
                }
                return film[key as keyof IFilm] === value;
            });
        });
    }, [films, filters]);

    return (
        <div className={styles.root}>
            <Flex wrap gap={32} justify="center">
                {!loading
                    ? filteredFilms?.map((film) => <CardFilm key={film.id} film={film} />)
                    : new Array(5).fill(null).map((_, index) => <CardFilmSkeleton key={index} />)}
            </Flex>
        </div>
    );
};

export default FilmsList;
