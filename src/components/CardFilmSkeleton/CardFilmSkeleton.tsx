import { Card, Skeleton } from "antd";
import React from "react";

const CardFilmSkeleton: React.FC = () => {
    return (
        <Card
            style={{ width: 300 }}
            cover={<Skeleton.Image style={{ width: 300, height: 450 }} active />}
        >
            <Card.Meta description={<Skeleton active />} />
        </Card>
    );
};

export default CardFilmSkeleton;
