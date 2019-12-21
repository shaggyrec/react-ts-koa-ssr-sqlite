export default interface PageSchema {
    id?: number;
    title: string;
    description: string;
    header: string;
    content: string;
    created: Date;
    alias: string;
    countviews: number;
    userId: number;
    active?: boolean;
    tags?: any;
    next?: PageSchema[];
    excludeFromBlog?: boolean;
}
