import { useEffect } from "react";
import FilmsList from "./components/FilmsList";
import { useFilmsStore } from "./store/useFilmsStore";
import { Col, Row } from "antd";
import { useShallow } from "zustand/shallow";
import FiltersPanel from "./components/FiltersPanel";
import "./styles.scss";
import { usePlanningWatchStore } from "./store/usePlanningWatchStore";

function App() {
    const { getFilms } = useFilmsStore(
        useShallow((state) => ({
            getFilms: state.getFilms,
        })),
    );

    const { getPlanningWatch } = usePlanningWatchStore(
        useShallow((state) => ({
            getPlanningWatch: state.getPlanningWatch,
        })),
    );

    useEffect(() => {
        getFilms();
        getPlanningWatch();

        return () => {
            useFilmsStore.setState({ filters: {} });
        };
    }, []);

    return (
        <div className="main-container">
            <Row gutter={16} className="main-container__row">
                <Col className="gutter-row" span={4}>
                    <FiltersPanel />
                </Col>
                <Col className="gutter-row" span={20}>
                    <FilmsList />
                </Col>
            </Row>
        </div>
    );
}

export default App;
