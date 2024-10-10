import React, { useMemo } from "react";
import styles from "./styles.module.scss";
import { Flex, Rate } from "antd";
import { IFilm } from "../../models/films.models";
import PlanningWatch from "../PlanningWatch";
import { useFilmsStore } from "../../store/useFilmsStore";
import { usePlanningWatchStore } from "../../store/usePlanningWatchStore";
import { useShallow } from "zustand/shallow";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

interface IProps {
    film: IFilm;
}

const CardFilmBody: React.FC<IProps> = ({ film }) => {
    const { patchFilm } = useFilmsStore(useShallow((state) => ({ patchFilm: state.patchFilm })));
    const { setPlanningWatching } = usePlanningWatchStore(
        useShallow((state) => ({ setPlanningWatching: state.setPlanningWatching })),
    );

    const handleChangeRate = (value: number) => {
        patchFilm(film.id, { rating: value });
    };

    const handleChangeStatus = () => {
        const newState = film.status === "WATCHED" ? "NO_WATCHED" : "WATCHED";
        patchFilm(film.id, { status: newState });

        if (newState === "WATCHED") {
            setPlanningWatching(film.id, undefined);
        }
    };

    const iconStatus = useMemo(() => {
        return film.status === "WATCHED" ? (
            <CheckOutlined style={{ color: "green", fontSize: 16 }} />
        ) : (
            <CloseOutlined style={{ color: "red", fontSize: 16 }} />
        );
    }, [film.status]);

    return (
        <Flex vertical gap={8}>
            <div className={styles.description_item}>
                Год выхода: <span>{film.year}</span>
            </div>
            <div className={styles.description_item}>
                Жанр: <span>{film.genre}</span>
            </div>
            <Flex align="center" gap={8}>
                <span>Просмотрено:</span>
                <div className={styles.status_icon} onClick={handleChangeStatus}>
                    {iconStatus}
                </div>
            </Flex>
            <Rate allowHalf value={film.rating} onChange={handleChangeRate} />
            <PlanningWatch filmId={film.id} isFavorite={film.isFavorite} status={film.status} />
        </Flex>
    );
};

export default CardFilmBody;
