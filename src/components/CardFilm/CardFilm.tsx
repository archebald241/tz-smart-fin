import React from "react";
import styles from "./styles.module.scss";
import { Card, Image, Skeleton, Tooltip } from "antd";
import { HeartFilled } from "@ant-design/icons";
import { IFilm } from "../../models/films.models";
import { useFilmsStore } from "../../store/useFilmsStore";
import { usePlanningWatchStore } from "../../store/usePlanningWatchStore";
import { useShallow } from "zustand/shallow";
import classNames from "classnames";
import CardFilmBody from "../CardFilmBody";

interface ICardFilmProps {
    film: IFilm;
}

const CardFilm: React.FC<ICardFilmProps> = ({ film }) => {
    const { patchFilm } = useFilmsStore(useShallow((state) => ({ patchFilm: state.patchFilm })));
    const { setPlanningWatching } = usePlanningWatchStore(
        useShallow((state) => ({ setPlanningWatching: state.setPlanningWatching })),
    );

    const handleFavoriteFilm = () => {
        const newState = !film.isFavorite;
        patchFilm(film.id, { isFavorite: newState });

        if (!newState) {
            setPlanningWatching(film.id, undefined);
        }
    };

    return (
        <>
            <div className={styles.card_container}>
                <Tooltip title={film.isFavorite ? "Удалить из избранного" : "Добавить в избранное"}>
                    <HeartFilled
                        className={classNames(styles.favorite_icon, {
                            [styles.favorite_icon_active]: film.isFavorite,
                        })}
                        onClick={handleFavoriteFilm}
                    />
                </Tooltip>
                <Card
                    hoverable
                    className={styles.card}
                    cover={
                        <Image
                            width={300}
                            height={450}
                            src={film.poster}
                            style={{ borderRadius: "inherit" }}
                            preview={false}
                            placeholder={
                                <Skeleton.Image style={{ width: 300, height: 450 }} active />
                            }
                        />
                    }
                >
                    <Card.Meta
                        title={<Tooltip title={film.name}>{film.name}</Tooltip>}
                        description={<CardFilmBody film={film} />}
                    />
                </Card>
            </div>
        </>
    );
};

export default CardFilm;
