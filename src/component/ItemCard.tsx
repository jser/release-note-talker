import * as React from "react";
import {
    ActionButton,
    DocumentCard,
    DocumentCardActivity,
    DocumentCardTitle,
    DocumentCardType
} from "office-ui-fabric-react";
import * as dayjs from "dayjs";
import { JSerItem } from "@jser/stat/lib/models/JSerItem";
import * as classnames from "classnames";
export const ItemCard = (props: { item: JSerItem; className: string }) => {
    return (
        <DocumentCard className={classnames("ItemCard", props.className)} type={DocumentCardType.normal}>
            <a className={"ItemCard-title"} title={props.item.title} href={props.item.url}>
                {props.item.title}
            </a>
            <DocumentCardTitle title={props.item.content} showAsSecondaryTitle={true} />
            <DocumentCardActivity
                people={[{ name: "Azu", profileImageSrc: "https://github.com/azu.png" }]}
                activity={dayjs(props.item.date).format("YYYY-MM-DD HH:mm:ss に追加")}
            />

            <footer style={{ display: "flex", alignItems: "stretch", height: "40px" }}>
                <ActionButton marginHeight={10} iconProps={{ iconName: "FavoriteStar" }}>
                    もっと詳しく知りたい
                </ActionButton>
                <ActionButton
                    className={"ItemCard-button"}
                    marginHeight={10}
                    iconProps={{ iconName: "CircleAddition" }}
                >
                    情報を提供する
                </ActionButton>
            </footer>
        </DocumentCard>
    );
};
