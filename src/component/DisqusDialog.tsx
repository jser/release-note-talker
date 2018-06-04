import * as React from "react";
import { DefaultButton, DialogFooter } from "office-ui-fabric-react";
import { JSerItem } from "@jser/stat/lib/models/JSerItem";
import { Modal } from "office-ui-fabric-react/lib/components/Modal";

export interface DisqusDialogProps {
    item: JSerItem;
}

export class DisqusDialog extends React.Component<
    DisqusDialogProps,
    {
        hideDialog: boolean;
    }
> {
    constructor(props: DisqusDialogProps) {
        super(props);
        this.state = {
            hideDialog: true
        };
    }

    public render() {
        return (
            <Modal
                containerClassName={"DisqusDialog"}
                isOpen={!this.state.hideDialog}
                onDismiss={this._closeDialog}
                isBlocking={false}
                isDarkOverlay={false}
            >
                <header className="DisqusDialog-header">
                    <h1 className={"DisqusDialog-headerTitle"}>情報提供</h1>
                </header>
                <div className={"DisqusDialog-body"}>
                    <p>Disqusのコメント欄を利用しています。</p>
                    <p>匿名でも書くことができます。</p>
                    <iframe
                        className="DisqusDialog-frame"
                        src={`/disqus-iframe.html?shortname=jser-info-report&url=${this.props.item.url}`}
                    />
                </div>
                <DialogFooter>
                    <DefaultButton onClick={this._closeDialog} text="Close" />
                </DialogFooter>
            </Modal>
        );
    }

    public showDialog = (): void => {
        this.setState({ hideDialog: false });
    };

    private _closeDialog = (): void => {
        this.setState({ hideDialog: true });
    };
}
