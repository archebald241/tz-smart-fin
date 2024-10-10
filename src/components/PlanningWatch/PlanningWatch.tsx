import React, { useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";
import { TFilmStatus } from "../../models/films.models";
import { Button, DatePicker, Flex, Form, FormProps, Input, Modal } from "antd";
import { useShallow } from "zustand/shallow";

import ru from "antd/es/date-picker/locale/ru_RU";
import { usePlanningWatchStore } from "../../store/usePlanningWatchStore";
import { IPlanningWatchForm } from "../../models/planning.models";

interface IProps {
    filmId: string;
    isFavorite: boolean;
    status: TFilmStatus;
}

const PlanningWatch: React.FC<IProps> = ({ filmId, isFavorite, status }) => {
    const { planningWatching, setPlanningWatching } = usePlanningWatchStore(
        useShallow((state) => ({
            planningWatching: state.planningWatching,
            setPlanningWatching: state.setPlanningWatching,
        })),
    );
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const onFinish: FormProps<IPlanningWatchForm>["onFinish"] = (values) => {
        setPlanningWatching(filmId, {
            planed_date: values.planed_date.toISOString(),
            comment: values.comment,
        });
        setIsModalOpen(false);
    };

    const onCancelPlanningWatch = () => {
        setPlanningWatching(filmId, undefined);
        setIsModalOpen(false);
    };

    const plainingWatch = useMemo(() => planningWatching?.[filmId], [planningWatching, filmId]);

    useEffect(() => {
        if (isModalOpen && plainingWatch) {
            form.setFieldsValue({
                planed_date: dayjs(plainingWatch.planed_date),
                comment: plainingWatch.comment,
            });
        }
    }, [plainingWatch, isModalOpen]);

    if (!isFavorite || status === "WATCHED") {
        return null;
    }

    return (
        <div>
            <Button
                type="link"
                style={{ padding: 0, outline: "none" }}
                onClick={() => setIsModalOpen(true)}
            >
                {plainingWatch
                    ? dayjs(plainingWatch.planed_date).format("DD.MM.YYYY HH:mm")
                    : "Запланировать просмотр"}
            </Button>
            <Modal
                title="Запланировать просмотр"
                open={isModalOpen}
                onCancel={() => setIsModalOpen(false)}
                afterClose={() => form.resetFields()}
                footer={null}
            >
                <Form
                    name="planning_watch"
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                    form={form}
                >
                    <Form.Item<IPlanningWatchForm>
                        label="Дата просмотра"
                        name="planed_date"
                        rules={[{ required: true, message: "Выберите дату просмотра" }]}
                    >
                        <DatePicker
                            style={{ width: "100%" }}
                            showTime={{ minuteStep: 10, showSecond: false }}
                            locale={ru}
                            minDate={dayjs()}
                        />
                    </Form.Item>

                    <Form.Item<IPlanningWatchForm> label="Комментарий" name="comment">
                        <Input.TextArea />
                    </Form.Item>

                    <Flex justify="end" gap={8}>
                        {plainingWatch && (
                            <Button type="default" danger onClick={onCancelPlanningWatch}>
                                Удалить запись
                            </Button>
                        )}
                        <Button type="primary" htmlType="submit">
                            Сохранить
                        </Button>
                    </Flex>
                </Form>
            </Modal>
        </div>
    );
};

export default PlanningWatch;
