import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import { Input, Select, Checkbox, Divider, Button, Flex } from "antd";
import { useFilmsStore } from "../../store/useFilmsStore";
import { useShallow } from "zustand/shallow";
import { usePlanningWatchStore } from "../../store/usePlanningWatchStore";

const FiltersPanel: React.FC = () => {
    const { filters, resetFilms, films, setFilters } = useFilmsStore(
        useShallow((state) => ({
            filters: state.filters,
            resetFilms: state.resetFilms,
            films: state.films,
            setFilters: state.setFilters,
        })),
    );
    const { resetPlanningWatch } = usePlanningWatchStore(
        useShallow((state) => ({
            resetPlanningWatch: state.resetPlanningWatch,
        })),
    );

    const yearsOptions = useMemo(() => {
        return [...new Set(films?.map((film) => film.year))]
            .map((year) => ({
                value: year,
                label: year,
            }))
            .sort((a, b) => +a.value - +b.value);
    }, [films]);

    const genresOptions = useMemo(() => {
        return [...new Set(films?.map((film) => film.genre))]
            .map((genre) => ({
                value: genre,
                label: genre,
            }))
            .sort((a, b) => a.value.localeCompare(b.value));
    }, [films]);

    const handleChangeSearch = (value: string) => {
        setFilters("search", value);
    };

    const handleChangeIsFavorite = (value: boolean) => {
        setFilters("isFavorite", value);
    };

    const handleChangeYear = (value: number) => {
        setFilters("year", value);
    };

    const handleChangeGenre = (value: string) => {
        setFilters("genre", value);
    };

    const handlerReset = () => {
        resetPlanningWatch();
        resetFilms();
    };

    return (
        <div className={styles.root}>
            <div>
                <h2>Фильтрация</h2>
                <div className={styles.filters_wrapper}>
                    <Flex vertical gap={16}>
                        <Input.Search
                            placeholder="Поиск"
                            onSearch={handleChangeSearch}
                            allowClear
                            value={filters.search}
                        />
                        <Checkbox
                            checked={filters.isFavorite}
                            onChange={(e) => handleChangeIsFavorite(e.target.checked)}
                        >
                            Избранное
                        </Checkbox>
                    </Flex>
                    <Divider />
                    <Flex vertical gap={16}>
                        <Flex vertical gap={4}>
                            <span>Год</span>
                            <Select
                                showSearch
                                options={yearsOptions}
                                style={{ width: "100%" }}
                                onChange={handleChangeYear}
                                allowClear
                                value={filters.year}
                            />
                        </Flex>
                        <Flex vertical gap={4}>
                            <span>Жанр</span>
                            <Select
                                showSearch
                                options={genresOptions}
                                style={{ width: "100%" }}
                                onChange={handleChangeGenre}
                                allowClear
                                value={filters.genre}
                            />
                        </Flex>
                    </Flex>
                    <Divider />
                    <Flex justify="center">
                        <Button onClick={handlerReset}>Перезагрузить фильмы</Button>
                    </Flex>
                </div>
            </div>
        </div>
    );
};

export default FiltersPanel;
