import { JSerStat } from "@jser/stat";
import { fetchItems, fetchPosts } from "@jser/data-fetcher";
import { JSerItem } from "@jser/stat/lib/models/JSerItem";

const isReleaseNoteItem = (item: JSerItem): boolean => {
    const isReleaseNote = item.tags.some(tag => {
        return tag === "ReleaseNote";
    });
    // if (isReleaseNote) {
    //     return item.tags.some(tag => {
    //         return tag === "library" || tag === "Tools" ;
    //     });
    // }
    return isReleaseNote;
};

export class JSerClient {
    private stat!: JSerStat;

    ready() {
        return Promise.all([fetchItems(), fetchPosts()])
            .then(([items, posts]) => {
                return new JSerStat(items, posts);
            })
            .then(stat => {
                this.stat = stat;
            });
    }

    fetchReleaseNotesInNextWeek() {
        const jserWeeks = this.stat.getJSerWeeks();
        const latestWeek = jserWeeks[jserWeeks.length - 1];
        const now = new Date();
        const endDate = latestWeek.endDate;
        const unpublishedItems = this.stat.findItemsBetween(endDate, now);
        return unpublishedItems.filter(isReleaseNoteItem);
    }
}
