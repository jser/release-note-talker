import * as React from "react";
import { JSerClient } from "./infra/JSerClient";
import { JSerItem } from "@jser/stat/lib/models/JSerItem";
import { MessageBar, MessageBarType, Spinner } from "office-ui-fabric-react";
import { ItemCard } from "./component/ItemCard";
import * as classnames from "classnames";

const client = new JSerClient();

const nextDayMessage = (items: any[]) => {
    const length = items.length;
    if (length < 5) {
        return "まだまだ先です";
    } else if (length < 10) {
        return "もうちょっと先です";
    } else if (length < 15) {
        return "もうすぐです";
    } else {
        return (
            <>
                すぐなので<a href={"https://gitter.im/jser/jser.info"}>Gitter</a>で聞いてみて
            </>
        );
    }
};

interface AppState {
    items: JSerItem[];
    isLoading: boolean;
}

class App extends React.Component<{}, AppState> {
    state = {
        items: [],
        isLoading: true
    };

    componentDidMount() {
        client.ready().then(() => {
            const items = client.fetchReleaseNotesInNextWeek();
            this.setState({
                items,
                isLoading: false
            });
        });
    }

    public render() {
        return (
            <div className="App">
                <header className={"App-header"}>
                    <h1 className={"App-title"}>JSer.info Release Note Talker</h1>
                    <MessageBar messageBarType={MessageBarType.info}>
                        次のJSer.infoの更新は{nextDayMessage(this.state.items)}（目安は毎週火曜日です）
                    </MessageBar>
                </header>
                <div className="App-description">
                    <p>
                        このサイトは<a href="https://jser.info/">JSer.info</a>で公開されるリリースノートに関する情報を募集するサイトです。
                        次のJSer.infoの更新で掲載予定のリリース情報が公開されています。
                    </p>
                    <p>これらのリリースノートに関係する情報をお持ちの方からの情報提供を募集しています。</p>
                    <ul>
                        <li>リリースノートを翻訳した</li>
                        <li>リリースノートに書かれてない変更点を記事にした</li>
                        <li>実際にアップデートしてみた結果や注意点について</li>
                    </ul>
                </div>
                <main
                    className={classnames("App-main", {
                        "App-loading": this.state.isLoading
                    })}
                >
                    {this.state.isLoading ? (
                        <Spinner label="Loading..." />
                    ) : (
                        this.state.items.map((item: JSerItem) => {
                            return <ItemCard className="App-itemCard" key={item.url} item={item} />;
                        })
                    )}
                </main>
            </div>
        );
    }
}

export default App;
